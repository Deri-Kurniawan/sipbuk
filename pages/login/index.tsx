import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SafeLayout from "@/layouts/SafeLayout";
import Image from "next/image";
import loginRegisterImage from "@/assets/login-register.jpg";
import Link from "next/link";
import Head from "next/head";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import CryptoJS from "crypto-js";
import { setCookie } from 'cookies-next';

export function getStaticProps() {
  return {
    props: {
      AES_KEY: process.env.AES_KEY
    }
  }
}

interface LoginProps {
  AES_KEY: string;
}

export default function Login({ AES_KEY }: LoginProps) {
  const router = useRouter();

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());

    (async () => {
      const payload = JSON.stringify({
        email,
        password: CryptoJS.AES.encrypt(password.toString() || '', AES_KEY).toString(),
      })

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          body: payload,
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const result = await response.json();

        if (result.code === 200) {
          setCookie('user', JSON.stringify(result.data), {
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
          });

          toast.success(`Selamat datang ${result.data.fullname}!`, {
            duration: 6000,
            icon: '👋',
          })

          router.push('/');
        }

        if (result.code === 400) {
          toast.error(result.message, {
            duration: 6000,
          })
        }

        if (result.code === 500) {
          toast.error(result.message, {
            duration: 6000,
          })
        }
      } catch (error: any) {
        console.log("client catch", error);
        if (error.code === 400) {
          toast.error(error.message, {
            duration: 6000,
          })
        }
      }
    })();
  };

  return (
    <>
      <Head>
        <title>Masuk - SIPBUK</title>
        <meta name="description" content="Sistem Pakar berbasis web ini dapat membantu anda dalam mendiagnosa hama dan penyakit pada tanaman jambu kristal anda, serta dapat memberikan solusi atas masalah yang dialami oleh tanaman jambu kristal anda secara gratis." />
      </Head>
      <Navbar />
      <SafeLayout>
        <main className="safe-horizontal-padding my-[16px] md:my-[48px]">
          <div className="md:grid grid-flow-row grid-cols-2 gap-[32px] items-center">
            {/* image */}
            <div className="hidden lg:block">
              <Image
                className="object-cover bg-primary"
                src={loginRegisterImage}
                alt=""
                priority
              />
            </div>
            {/* form */}
            <div className="col-span-2 lg:col-span-1">
              <h2 className="text-[30px] md:text-[40px] font-bold leading-[38px] md:leading-[48px] mb-2 md:mb-4">
                Masuk
              </h2>
              <p className="max-w-xl mb-4 text-base font-normal">
                Dengan masuk, anda dapat melihat riwayat konsultasi sebelumnya
                dan menyimpan riwayat konsultasi selanjutnya.
              </p>
              <form onSubmit={handleFormSubmit}>
                {/* email */}
                <div className="w-full max-w-xl form-control">
                  <label className="label" htmlFor="email">
                    <span className="text-base label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    className="w-full input input-bordered"
                    name="email"
                    id="email"
                    placeholder=""
                  />
                  {/* email error */}
                </div>
                {/* password */}
                <div className="w-full max-w-xl form-control">
                  <label className="label" htmlFor="password">
                    <span className="text-base label-text">Kata sandi</span>
                  </label>
                  <input
                    type="password"
                    className="w-full input input-bordered"
                    name="password"
                    id="password"
                    placeholder=""
                  />
                  {/* password error */}
                </div>
                <p className="mt-4">
                  Lupa Kata sandi?{" "}
                  <Link className="text-blue-400" href="/login/forgot-password">
                    Atur ulang Kata sandi
                  </Link>
                </p>
                <button
                  className="w-full max-w-xl mt-4 btn btn-outline btn-ghost"
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
