import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SafeLayout from "@/layouts/SafeLayout";
import Image from "next/image";
import guavaImg from "@/assets/guava.jpg";
import Link from "next/link";

export default function Register() {
  return (
    <>
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
              <p className="font-normal text-base md:text-lg mb-4 max-w-xl">
                Dengan mendaftar, anda dapat masuk serta melihat riwayat
                konsultasi sebelumnya dan menyimpan riwayat konsultasi
                selanjutnya.
              </p>
              <form>
                {/* name */}
                <div className="form-control w-full max-w-xl">
                  <label className="label" htmlFor="fullname">
                    <span className="label-text text-base">Nama Lengkap</span>
                  </label>
                  <input
                    type="fullname"
                    className="input input-bordered w-full"
                    id="fullname"
                    placeholder=""
                  />
                </div>
                {/* email */}
                <div className="form-control w-full max-w-xl">
                  <label className="label" htmlFor="email">
                    <span className="label-text text-base">Email</span>
                  </label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    id="email"
                    placeholder=""
                  />
                </div>
                {/* password */}
                <div className="form-control w-full max-w-xl">
                  <label className="label" htmlFor="password">
                    <span className="label-text text-base">Kata sandi</span>
                  </label>
                  <input
                    type="password"
                    className="input input-bordered w-full"
                    id="password"
                    placeholder=""
                  />
                </div>
                <button
                  className="btn btn-outline btn-ghost w-full max-w-xl mt-4"
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
