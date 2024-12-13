import { useEffect, useState } from "react";
import BorderStruktur from "../components/BorderStruktur";
import AOS from "aos";
import "aos/dist/aos.css";

const StrukturKelas = () => {
    const [aosLoaded, setAosLoaded] = useState(false);

    useEffect(() => {
        if (!aosLoaded) {
            AOS.init();
            AOS.refresh();
            setAosLoaded(true);
        }
    }, [aosLoaded]);

    return (
        <div className="z-1 relative h-auto lg:overflow-hidden">
            {/* Wali Kelas */}
            <div data-aos="fade-up" data-aos-duration="500" className="mt-14 md:mt-10">
                <BorderStruktur Jabatan="Wali Kelas" Nama="Ibu Kurnia Sari" Width="150px" />
            </div>
            <div className="flex flex-col justify-center items-center">
                <img src="LineVertikal.svg" alt="" data-aos="fade-up" data-aos-duration="550" />

                <div className="lg:flex">
                    <img
                        src="LineHorizontal.svg"
                        alt=""
                        className="relative top-[-1rem]"
                        data-aos="fade-up"
                        data-aos-duration="600"
                    />
                    <img
                        src="LineHorizontal.svg"
                        alt=""
                        className="relative top-[-1rem] hidden lg:flex"
                        data-aos="fade-up"
                        data-aos-duration="600"
                    />
                    <img
                        src="LineHorizontal.svg"
                        alt=""
                        className="relative top-[-1rem] hidden lg:flex lg:w-[4.2rem]"
                        data-aos="fade-up"
                        data-aos-duration="600"
                    />
                </div>

                <div
                    className="flex gap-[10.6rem] lg:gap-[27.4rem] relative top-[-1.93rem]"
                    data-aos="fade-up"
                    data-aos-duration="800">
                    <img src="LineKananKiri.svg" alt="" />
                    <img src="LineKananKiri.svg" alt="" />
                </div>

                <div
                    className="flex gap-[10.6rem] lg:gap-[27.4rem] relative top-[-3rem]"
                    data-aos="fade-up"
                    data-aos-duration="1000">
                    <img src="Circle.svg" alt="" />
                    <img src="Circle.svg" alt="" />
                </div>

                {/* Ketua dan Wakil Ketua */}
                <div className="flex relative top-[-3rem]" data-aos="fade-up" data-aos-duration="1200">
                    <div className="relative left-[0.2rem]">
                        <BorderStruktur Jabatan="Ketua Kelas" Nama="Sulaiman S." Width="120px" />
                    </div>
                    <img src="LineHorizontalPendek.svg" className="relative top-3" />
                    <div className="relative right-[0.2rem]">
                        <BorderStruktur Jabatan="Wakil Ketua" Nama="Bagas P." Width="120px" />
                    </div>
                </div>

                <div data-aos="fade-up" data-aos-duration="120" className="">
                    <img src="LineVertikal2.svg" alt="" className="relative top-[-3.8rem]" />
                </div>

                {/* Sekretaris dan Bendahara */}
                <div className="lg:flex">
                    <img
                        src="LineHorizontal.svg"
                        alt=""
                        className="relative top-[-5.5rem]"
                        data-aos="fade-up"
                        data-aos-duration="600"
                    />
                    <img
                        src="LineHorizontal.svg"
                        alt=""
                        className="relative top-[-5.5rem] hidden lg:flex"
                        data-aos="fade-up"
                        data-aos-duration="600"
                    />
                </div>

                <div
                    className="flex gap-[10.6rem] relative top-[-6.45rem] lg:gap-[27.4rem]"
                    data-aos="fade-up"
                    data-aos-duration="800">
                    <img src="LineKananKiri.svg" alt="" />
                    <img src="LineKananKiri.svg" alt="" />
                </div>
                <div
                    className="flex gap-[10.6rem] relative top-[-7.2rem] lg:gap-[27.4rem]"
                    data-aos="fade-up"
                    data-aos-duration="1000">
                    <img src="Circle.svg" alt="" />
                    <img src="Circle.svg" alt="" />
                </div>

                <div
                    className="flex gap-[5rem] relative top-[-7.3rem] lg:gap-[22rem]"
                    data-aos="fade-up"
                    data-aos-duration="1200">
                    <div className="flex-col">
                        <BorderStruktur Jabatan="Sekretaris 1" Nama="Syahrani N." Width="120px" />
                        <div className="py-[3%]"></div>
                        <BorderStruktur Jabatan="Sekretaris 2" Nama="Thalia S." Width="120px" />
                    </div>

                    <div className="flex-col">
                        <BorderStruktur Jabatan="Bendahara 1" Nama="Nisa Rahma" Width="120px" />
                        <div className="py-[3%]"></div>
                        <BorderStruktur Jabatan="Bendahara 2" Nama="Insan Aulia" Width="120px" />
                    </div>
                </div>

                <div className="relative top-[-15rem]" data-aos="fade-up" data-aos-duration="900">
                    <img src="LineVertikal3.svg" alt="" />
                </div>

                {/* Keamanan */}
                <div className="lg:flex">
                    <img
                        src="LineHorizontal.svg"
                        alt=""
                        className="relative top-[-16.5rem]"
                        data-aos="fade-up"
                        data-aos-duration="600"
                    />
                </div>

                <div
                    className="flex gap-[10.6rem] lg:gap-[23.1rem] relative top-[-17.44rem]"
                    data-aos="fade-up"
                    data-aos-duration="800">
                    <img src="LineKananKiri.svg" alt="" />
                    <img src="LineKananKiri.svg" alt="" />
                </div>
                <div
                    className="flex gap-[10.6rem] relative top-[-18.3rem] lg:gap-[23.1rem]"
                    data-aos="fade-up"
                    data-aos-duration="1000">
                    <img src="Circle.svg" alt="" />
                    <img src="Circle.svg" alt="" />
                </div>

                <div
                    className="flex gap-[5rem] relative top-[-18.5rem] lg:gap-[17.5rem]"
                    data-aos="fade-up"
                    data-aos-duration="1100">
                    <div className="flex-col">
                        <BorderStruktur Jabatan="Keamanan" Nama="Shiva Rika" Width="120px" />
                  
                    </div>
                </div>

                {/* Garis Pemisah untuk Anggota */}
                <div className="relative top-[-15rem]">
                    <img src="LineHorizontal.svg" alt="" className="my-2" data-aos="fade-up" data-aos-duration="1200" />
                </div>

                {/* Anggota */}
                <div className="flex flex-col mt-4 relative top-[-10rem]">
                    <h3 className="text-lg font-semibold">:</h3>
                    <div className="flex flex-wrap justify-center">
                        {[
                            "Aditya Iman", "Aditya Putra", "Agus Surya", "Andini Chresia",
                            "Anindya Ayu", "Ardi Dwi", "Aura Citra", "Bagus Rino",
                            "Dani Sheva", "Fadila Ramadani", "M. Aufa Nur", "Nabila Ananda",
                            "Nilam Sari", "Nuzula Rahma", "Octavia Nadya", "Putri Ayu",
                            "Putri Febriana", "Rangga Adi", "Ririn Fajar", "Risa Aprilia",
                            "Sella Manda", "Susanti", "Tutik Hidayah", "Widya Astutik"
                        ].map((nama, index) => (
                            <div key={index} data-aos="fade-up" data-aos-duration={`${1300 + index * 50}`} className="mt-2">
                                <BorderStruktur Jabatan="Anggota" Nama={nama} Width="120px" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StrukturKelas;