import Image from "next/image";
import Navbar from "@/components/Navbar";
import guavaImg from "../assets/guava.jpg";
import Link from "next/link";
import SafeLayout from "@/layouts/SafeLayout";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SafeLayout>
      <Navbar />
      <main className="px-[20px] lg:px-[119px] my-[16px] md:my-[48px]">
        <div className="md:grid grid-flow-row grid-cols-12 gap-[32px] items-center">
          {/* hero left */}
          <div className="col-span-12 lg:col-span-7 lg:max-w-[600px]">
            <h2 className="text-[30px] md:text-[40px] font-bold leading-[38px] md:leading-[48px] mb-2 md:mb-4">
              Diagnosa Hama dan Penyakit Pada Tanaman Jambu Kristal Anda
              Sekarang
            </h2>
            <p className="font-normal text-sm md:text-lg mb-3 md:mb-7">
              Sistem berbasis web ini dapat membantu anda dalam mendiagnosa hama
              dan penyakit pada tanaman jambu kristal anda, serta dapat
              memberikan solusi atas masalah yang dialami oleh tanaman jambu
              kristal anda secara gratis.
            </p>

            <div className="flex flex-1 flex-wrap gap-4">
              <Link
                className="btn btn-outline btn-info text-sm md:text-base capitalize"
                href="/consult"
              >
                Konsultasi Sekarang
              </Link>
              <Link
                className="btn btn-outline btn-success text-sm md:text-base capitalize"
                href="/about"
              >
                Tentang Aplikasi
              </Link>
            </div>
          </div>
          {/* hero right */}
          <div className="hidden lg:flex justify-end lg:col-span-5">
            <Image
              className="w-[481px] h-[410px] rounded-2xl object-cover"
              src={guavaImg}
              alt=""
              priority
            />
          </div>
        </div>
      </main>
      <Footer />
    </SafeLayout>
  );
}
