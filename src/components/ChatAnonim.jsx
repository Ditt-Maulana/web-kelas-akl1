import React, { useState, useEffect, useRef, useCallback } from "react";
import { addDoc, collection, query, orderBy, onSnapshot, getDocs } from "firebase/firestore";
import { db, auth } from "../firebase";
import axios from "axios";
import Swal from "sweetalert2";

const MESSAGE_LIMIT = 20;
const MESSAGE_MAX_LENGTH = 60;
const IP_CACHE_DURATION = 60 * 60 * 1000; // 1 jam

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);
  const [userIp, setUserIp] = useState("");
  const [messageCount, setMessageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const chatsCollectionRef = collection(db, "chats");
  const messagesEndRef = useRef(null);

  const showError = useCallback((title, text) => {
    Swal.fire({
      icon: "error",
      title,
      text,
      customClass: { container: "sweet-alert-container" }
    });
  }, []);

  const fetchBlockedIPs = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "blacklist_ips"));
      return querySnapshot.docs.map((doc) => doc.data().ipAddress);
    } catch (error) {
      console.error("Gagal mengambil daftar IP yang diblokir:", error);
      return [];
    }
  };

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    }, 100);
  }, []);

  const getUserIp = async () => {
    try {
      const cachedIp = localStorage.getItem("userIp");
      const ipExpiration = localStorage.getItem("ipExpiration");
      
      if (cachedIp && ipExpiration && new Date().getTime() < parseInt(ipExpiration)) {
        setUserIp(cachedIp);
        return;
      }

      const { data } = await axios.get("https://ipapi.co/json");
      const newUserIp = data.network;
      
      const expirationTime = new Date().getTime() + IP_CACHE_DURATION;
      localStorage.setItem("userIp", newUserIp);
      localStorage.setItem("ipExpiration", expirationTime.toString());
      
      setUserIp(newUserIp);
    } catch (error) {
      console.error("Gagal mendapatkan alamat IP:", error);
      showError("Error", "Gagal mendapatkan alamat IP");
    }
  };

  const checkMessageCount = useCallback(() => {
    const currentDateString = new Date().toDateString();
    const storedDateString = localStorage.getItem("messageCountDate");

    if (currentDateString === storedDateString) {
      const userSentMessageCount = parseInt(localStorage.getItem(userIp)) || 0;
      if (userSentMessageCount >= MESSAGE_LIMIT) {
        showError("Message limit exceeded", "You have reached your daily message limit.");
      } else {
        setMessageCount(userSentMessageCount);
      }
    } else {
      localStorage.removeItem(userIp);
      localStorage.setItem("messageCountDate", currentDateString);
    }
  }, [userIp, showError]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const isBlocked = await isIpBlocked();
      if (isBlocked) {
        showError("Blocked", "You are blocked from sending messages.");
        return;
      }

      if (messageCount >= MESSAGE_LIMIT) {
        showError("Message limit exceeded", "You have reached your daily message limit.");
        return;
      }

      const senderImageURL = auth.currentUser?.photoURL || "/AnonimUser.png";
      const trimmedMessage = message.trim().substring(0, MESSAGE_MAX_LENGTH);

      const updatedSentMessageCount = messageCount + 1;
      localStorage.setItem(userIp, updatedSentMessageCount.toString());
      setMessageCount(updatedSentMessageCount);

      await addDoc(chatsCollectionRef, {
        message: trimmedMessage,
        sender: { image: senderImageURL },
        timestamp: new Date(),
        userIp
      });

      setMessage("");
      setShouldScrollToBottom(true);
    } catch (error) {
      console.error("Error sending message:", error);
      showError("Error", "Failed to send message");
    }
  };

  useEffect(() => {
    const queryChats = query(chatsCollectionRef, orderBy("timestamp"));
    const unsubscribe = onSnapshot(queryChats, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id
      }));
      setMessages(newMessages);
      if (shouldScrollToBottom) scrollToBottom();
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [shouldScrollToBottom, scrollToBottom]);

  useEffect(() => {
    getUserIp();
    checkMessageCount();
    scrollToBottom();
  }, [checkMessageCount, scrollToBottom]);

  return (
    <div className="p-4" id="ChatAnonim">
      <h1 className="text-center text-4xl font-semibold mb-6" id="Glow">
        Text Anonim
      </h1>

      <div 
        className="mt-5 max-h-[60vh] overflow-y-auto scrollbar-thin" 
        id="KotakPesan"
      >
        {isLoading ? (
          <div className="text-center text-white opacity-60">Loading...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-white opacity-60">Belum ada pesan</div>
        ) : (
          messages.map((msg, index) => (
            <div key={msg.id || index} className="flex items-start text-sm py-2">
              <img 
                src={msg.sender.image} 
                alt="User Avatar" 
                className="h-7 w-7 mr-2 rounded-full"
                loading="lazy"
              />
              <div className="relative top-1">{msg.message}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex items-center mt-5 gap-2" id="InputChat">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Ketik pesan Anda..."
          maxLength={MESSAGE_MAX_LENGTH}
          className="bg-transparent flex-grow pr-4 w-4 placeholder:text-white 
                     placeholder:opacity-60 focus:outline-none focus:ring-1 
                     focus:ring-white/30 rounded"
        />
        <button 
          onClick={sendMessage}
          className="p-2 hover:opacity-80 transition-opacity"
          disabled={!message.trim() || messageCount >= MESSAGE_LIMIT}
        >
          <img 
            src="/paper-plane.png" 
            alt="Send Message" 
            className="h-4 w-4 lg:h-6 lg:w-6" 
          />
        </button>
      </div>
    </div>
  );
}

export default Chat;
