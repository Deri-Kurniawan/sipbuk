import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SafeLayout from "@/layouts/SafeLayout";
import Image from "next/image";
import forgotPasswordImage from "@/assets/forgot-password.jpg";
import Head from "next/head";
import { toast } from "react-hot-toast";
import { PrismaClient } from "@prisma/client";
import CryptoJS from "crypto-js";
import { useRouter } from "next/router";
import { useState } from "react";

const prisma = new PrismaClient();

export async function getServerSideProps(context: any) {
  const { token = null } = context.query;

  if (!token) {
    return {
      props: {
        AES_KEY: process.env.AES_KEY,
        _nextStep: false,
        _token: null,
      },
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        // @ts-ignore
        passwordResetToken: token,
      },
    });

    console.log(user)

    if (!user) {
      return {
        props: {
          AES_KEY: process.env.AES_KEY,
          _nextStep: false,
          _token: null,
        },
      };
    }

    return {
      props: {
        AES_KEY: process.env.AES_KEY,
        _nextStep: true,
        _token: token,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      props: {
        AES_KEY: process.env.AES_KEY,
        _nextStep: false,
        _token: null,
      },
    };
  }
}

interface ForgotPasswordProps {
  AES_KEY: string;
  _nextStep: boolean;
  _token: string | null;
}

export default function ForgotPassword({
  AES_KEY,
  _nextStep,
  _token,
}: ForgotPasswordProps) {
  const [nextStep, setNextStep] = useState(() => _nextStep);
  const [fetchIsLoading, setFetchIsLoading] = useState(false);
  const router = useRouter();

  const handleFormFirstStep = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { email } = Object.fromEntries(formData.entries());

    (async () => {
      const payload = JSON.stringify({
        email: email,
      });

      e.target.email.value = "";

      try {
        setFetchIsLoading(true);
        const response = await fetch("/api/auth/login/forgot-password", {
          method: "POST",
          body: payload,
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();

        if (result.code === 200) {
          toast.success(result.message, {
            duration: 5000,
          });
        } else {
          toast.error(result.message, {
            duration: 5000,
          });
        }
        setFetchIsLoading(false);
      } catch (error) {
        console.log("client error", error);
        toast.error("Terjadi kesalahan, silahkan coba lagi.", {
          duration: 5000,
        });
        setFetchIsLoading(false);
      }
    })();
  };

  const handleFormNextStep = (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { password, passwordConfirm } = Object.fromEntries(
      formData.entries()
    );

    console.log("token", _token);

    (async () => {
      const payload = JSON.stringify({
        token: _token,
        password: CryptoJS.AES.encrypt(password.toString(), AES_KEY).toString() || '',
        passwordConfirm: CryptoJS.AES.encrypt(
          passwordConfirm.toString() || '',
          AES_KEY
        ).toString(),
      });

      console.log(payload)

      try {
        setFetchIsLoading(true);
        const response = await fetch(
          "/api/auth/login/forgot-password/next-step",
          {
            method: "POST",
            body: payload,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const result = await response.json();

        if (result.code === 200) {
          toast.success(result.message, {
            duration: 5000,
          });
          router.push("/login");
        } else {
          toast.error(result.message, {
            duration: 5000,
          });
        }
        setFetchIsLoading(false);
      } catch (error) {
        console.log("client error", error);
        toast.error("Terjadi kesalahan, silahkan coba lagi.", {
          duration: 5000,
        });
        setFetchIsLoading(false);
      }

    })();
  };

  return (
    <>
      <Head>
        <title>{`${nextStep ? 'Ubah Kata Sandi' : 'Lupa Kata Sandi'} - SIPBUK`}</title>
        <meta
          name="description"
          content="Sistem Pakar berbasis web ini dapat membantu anda dalam mendiagnosa hama dan penyakit pada tanaman jambu kristal anda, serta dapat memberikan solusi atas masalah yang dialami oleh tanaman jambu kristal anda secara gratis."
        />
      </Head>
      <Navbar />
      <SafeLayout>
        <main className="safe-horizontal-padding my-[16px] md:my-[48px]">
          <div className="md:grid grid-flow-row grid-cols-2 gap-[32px] items-center">
            {/* image */}
            <div className="hidden lg:block">
              <Image
                className="object-cover bg-primary"
                src={forgotPasswordImage}
                alt=""
                priority
              />
            </div>
            <div className="col-span-2 lg:col-span-1">
              <h2 className="text-[30px] md:text-[40px] font-bold leading-[38px] md:leading-[48px] mb-2 md:mb-4">
                {nextStep ? "Ubah Kata Sandi" : "Lupa Kata Sandi"}
              </h2>
              <p className="max-w-xl mb-4 text-base font-normal">
                {nextStep
                  ? "Saat ini, Anda memiliki kesempatan untuk mengganti kata sandi Anda."
                  : "Dengan memasukan Email dan klik tombol Kirimi Saya Email, kami akan mengirimkan email berisi link untuk mereset kata sandi anda."}
              </p>
              {/* form */}

              {nextStep ? (
                <form onSubmit={handleFormNextStep}>
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
                  </div>

                  <div className="w-full max-w-xl form-control">
                    <label className="label" htmlFor="confirm-password">
                      <span className="text-base label-text">
                        Konfirmasi Kata sandi
                      </span>
                    </label>
                    <input
                      type="password"
                      className="w-full input input-bordered"
                      name="passwordConfirm"
                      id="confirm-password"
                      placeholder=""
                    />
                  </div>

                  <button className="mt-4 text-blue-400" onClick={() => setNextStep(false)} type="button">
                    Kirimi saya email lagi
                  </button>

                  <button
                    className={`w-full max-w-xl mt-4 btn btn-outline btn-ghost ${fetchIsLoading ? 'loading' : ''}`}
                    type="submit"
                  >
                    {fetchIsLoading ? "Memuat" : `Kirim Email Reset Kata Sandi`}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleFormFirstStep}>
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
                  </div>

                  <button
                    className={`w-full max-w-xl mt-4 btn btn-outline btn-ghost ${fetchIsLoading ? 'loading' : ''}`}
                    type="submit"
                  >
                    {fetchIsLoading ? "Memuat" : `Kirimi Saya Email`}
                  </button>
                </form>
              )}
            </div>
          </div>
        </main>
      </SafeLayout>
      <Footer />
    </>
  );
}