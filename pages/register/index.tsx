import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SafeLayout from "@/layouts/SafeLayout";
import Image from "next/image";
import guavaImg from "@/assets/guava.jpg";
import Link from "next/link";
import Head from "next/head";

export default function Register() {
  return (
    <>
      <Head>
        <title>Daftar - SIPBUK</title>
        <meta name="description" content="Sistem Pakar berbasis web ini dapat membantu anda dalam mendiagnosa hama dan penyakit pada tanaman jambu kristal anda, serta dapat memberikan solusi atas masalah yang dialami oleh tanaman jambu kristal anda secara gratis." />
      </Head>
      <Navbar />
      <SafeLayout>
        <main className="safe-horizontal-padding my-[16px] md:my-[48px]">
          <div className="md:grid grid-flow-row grid-cols-2 gap-[32px] items-start">
            {/* image */}
            <div className="hidden lg:block">
              <Image
                className="w-[481px] h-[410px] bg-primary rounded-2xl object-cover"
                src={guavaImg}
                alt=""
                priority
              />
            </div>
            {/* form */}
            <div className="col-span-2 lg:col-span-1">
              <h2 className="text-[30px] md:text-[40px] font-bold leading-[38px] md:leading-[48px] mb-2 md:mb-4">
                Daftar
              </h2>
              <p className="max-w-xl mb-4 text-base font-normal">
                Dengan mendaftar, anda dapat masuk serta melihat riwayat
                konsultasi sebelumnya dan menyimpan riwayat konsultasi
                selanjutnya.
              </p>
              <form>
                {/* name */}
                <div className="w-full max-w-xl form-control">
                  <label className="label" htmlFor="fullname">
                    <span className="text-base label-text">Nama Lengkap</span>
                  </label>
                  <input
                    type="fullname"
                    className="w-full input input-bordered"
                    id="fullname"
                    placeholder=""
                  />
                </div>
                {/* email */}
                <div className="w-full max-w-xl form-control">
                  <label className="label" htmlFor="email">
                    <span className="text-base label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    className="w-full input input-bordered"
                    id="email"
                    placeholder=""
                  />
                </div>
                {/* password */}
                <div className="w-full max-w-xl form-control">
                  <label className="label" htmlFor="password">
                    <span className="text-base label-text">Kata sandi</span>
                  </label>
                  <input
                    type="password"
                    className="w-full input input-bordered"
                    id="password"
                    placeholder=""
                  />
                </div>
                <button
                  className="w-full max-w-xl mt-4 btn btn-outline btn-ghost"
                  type="submit"
                >
                  Daftar
                </button>
              </form>
              <p className="mt-4">
                Sudah Punya Akun?{" "}
                <Link className="text-blue-400" href="/login">
                  Masuk disini
                </Link>
              </p>
            </div>
          </div>
        </main>
      </SafeLayout>
      <Footer />
    </>
  );
}