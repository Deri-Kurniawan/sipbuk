import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SafeLayout from "@/layouts/SafeLayout";
import Image from "next/image";
import expertImg from "@/assets/expert.jpg";
import developerImg from "@/assets/developer.jpg";

export const metadata = {
  title: "Tentang | SIPBUK",
  description:
    "Aplikasi Sistem Pakar Diagnosa Hama dan Penyakit pada Tanaman Jambu Kristal dengan Metode Certainty Factor adalah sebuah aplikasi yang dikembangkan untuk membantu petani dalam mengidentifikasi hama dan penyakit pada tanaman jambu kristal. Aplikasi ini menggunakan metode certainty factor sebagai dasar untuk membuat keputusan dalam proses diagnosa.",
};

export default function About() {
  return (
    <SafeLayout>
      <Navbar />
      <main className="safe-horizontal-padding my-[16px] md:my-[48px]">
        {/* about the app */}
        <div className="h-full md:h-[482px] bg-primary rounded-2xl flex flex-col justify-center items-center p-8 md:p-6 mb-[112px] lg:mb-[172px]">
          <h2 className="text-center leading-[38px] md:leading-[48px] text-[30px] md:text-[40px] font-bold mb-4">
            Tentang Aplikasi SIPBUK
          </h2>
          <p className="text-center text-base leading-[24px] max-w-[660px]">
            Aplikasi Sistem Pakar Diagnosa Hama dan Penyakit pada Tanaman Jambu
            Kristal dengan Metode Certainty Factor adalah sebuah aplikasi yang
            dikembangkan untuk membantu petani dalam mengidentifikasi hama dan
            penyakit pada tanaman jambu kristal. Aplikasi ini menggunakan metode
            certainty factor sebagai dasar untuk membuat keputusan dalam proses
            diagnosa.
          </p>
        </div>

        {/* expert info */}
        <div className="grid grid-flow-row grid-cols-2 items-center gap-[40px] md:gap-[80px] lg:gap-[50px] mb-[112px] lg:mb-[172px]">
          {/* image */}
          <div className="col-span-2 md:col-span-1">
            <Image
              src={expertImg}
              className="object-cover md:h-[332px] md:w-[380px] lg:h-auto lg:w-[480px] bg-primary rounded-2xl"
              alt=""
            />
          </div>
          {/* info */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-base lg:text-xl">
              <h3 className="font-bold text-2xl md:text-3xl leading-[37px] md:leading-[48px] mb-4">
                Tentang Pakar
              </h3>
              <table className="text-left mb-4">
                <tbody>
                  <tr className="align-text-top">
                    <th>Nama</th>
                    <td className="px-2">:</td>
                    <td>Bambang Ismail</td>
                  </tr>
                  <tr className="align-text-top">
                    <th>Pekerjaan</th>
                    <td className="px-2">:</td>
                    <td>
                      Penyuluh Pertanian Lapangan & Pembina Tanaman Jambu
                      Kristal
                    </td>
                  </tr>
                  <tr className="align-text-top">
                    <th>Pengalaman</th>
                    <td className="px-2">:</td>
                  </tr>
                </tbody>
              </table>
              <p>
                Memiliki pengalaman dibidang budidaya tanaman jambu kristal di
                Desa Sukamanah, Kecamatan Gegerbitung, Kabupaten Sukabumi pada
                tahun 2015.
              </p>
            </div>
          </div>
        </div>

        {/* expert info */}
        <div className="grid grid-flow-row grid-cols-2 items-center gap-[40px] md:gap-[80px] lg:gap-[50px]">
          {/* image */}
          <div className="col-span-2 md:col-span-1 md:order-last flex justify-start md:justify-end">
            <Image
              src={developerImg}
              className="lg:max-h-[432px] object-cover md:h-[332px] md:w-[380px] lg:h-auto lg:w-[480px] bg-primary rounded-2xl"
              alt=""
            />
          </div>
          {/* info */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-base lg:text-xl">
              <h3 className="font-bold text-2xl md:text-3xl leading-[37px] md:leading-[48px] mb-4">
                Tentang Pengembang
              </h3>
              <table className="text-left mb-4">
                <tbody>
                  <tr className="align-text-top">
                    <th>Nama</th>
                    <td className="px-2">:</td>
                    <td>Deri Kurniawan</td>
                  </tr>
                  <tr className="align-text-top">
                    <th>Pekerjaan</th>
                    <td className="px-2">:</td>
                    <td>Mahasiswa</td>
                  </tr>
                  <tr className="align-text-top">
                    <th>Tugas</th>
                    <td className="px-2">:</td>
                  </tr>
                </tbody>
              </table>
              <p>
                Sebagai pengembang aplikasi dan juga seorang knowledge engineer
                dari aplikasi SIPBUK.
              </p>
            </div>
          </div>
        </div>

        {/* developer info */}
        <div>
          <div>
            {/* info */}
            <div></div>
            {/* image */}
            <div></div>
          </div>
        </div>
      </main>
      <Footer />
    </SafeLayout>
  );
}
