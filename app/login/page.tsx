import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SafeLayout from "@/layouts/SafeLayout";
import Image from "next/image";
import guavaImg from "@/assets/guava.jpg";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Navbar />
      <SafeLayout>
        <main className="safe-horizontal-padding my-[16px] md:my-[48px]">
          <div className="md:grid grid-flow-row grid-cols-2 gap-[32px] items-center">
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
                Masuk
              </h2>
              <p className="font-normal text-base mb-4 max-w-xl">
                Dengan masuk, anda dapat melihat riwayat konsultasi sebelumnya
                dan menyimpan riwayat konsultasi selanjutnya.
              </p>
              <form>
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
                  {/* email error */}
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
                  {/* password error */}
                </div>
                <p className="mt-4">
                  Lupa Kata sandi?{" "}
                  <Link className="text-blue-400" href="#">
                    Atur ulang Kata sandi
                  </Link>
                </p>
                <button
                  className="btn btn-outline btn-ghost w-full max-w-xl mt-4"
                  type="submit"
                >
                  Masuk
                </button>
              </form>
              <p className="mt-4">
                Belum Punya Akun?{" "}
                <Link className="text-blue-400" href="/register">
                  Daftar disini
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
