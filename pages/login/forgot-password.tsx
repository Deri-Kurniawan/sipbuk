import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import SafeLayout from "@/layouts/SafeLayout";
import Image from "next/image";
import forgotPasswordImage from "@/assets/forgot-password.jpg";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

export function getStaticProps() {
    return {
        props: {
            AES_KEY: process.env.AES_KEY
        }
    }
}

interface ForgotPasswordProps {
    AES_KEY: string;
}

export default function ForgotPassword({ AES_KEY }: ForgotPasswordProps) {
    const router = useRouter();

    const handleFormSubmit = (e: any) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const { email } = Object.fromEntries(formData.entries());

        (async () => {
            const payload = JSON.stringify({
                email: email,
            })

            try {
                const response = await fetch('/api/auth/login/forgot-password', {
                    method: 'POST',
                    body: payload,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                const result = await response.json();

                if (result.code === 200) {
                    toast.success('Email berhasil dikirim, silahkan cek email anda.');
                    router.push('/login');
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                console.log("client error", error)
                toast.error('Terjadi kesalahan, silahkan coba lagi.');
            }
        })();
    };

    return (
        <>
            <Head>
                <title>Lupa Kata Sandi - SIPBUK</title>
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
                                src={forgotPasswordImage}
                                alt=""
                                priority
                            />
                        </div>
                        {/* form */}
                        <div className="col-span-2 lg:col-span-1">
                            <h2 className="text-[30px] md:text-[40px] font-bold leading-[38px] md:leading-[48px] mb-2 md:mb-4">
                                Lupa Kata Sandi
                            </h2>
                            <p className="max-w-xl mb-4 text-base font-normal">
                                Dengan memasukan Email dan klik tombol lupa kata sandi, kami akan mengirimkan email berisi link untuk mereset kata sandi anda.
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

                                <button
                                    className="w-full max-w-xl mt-4 btn btn-outline btn-ghost"
                                    type="submit"
                                >
                                    Kirim Email Reset Kata Sandi
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </SafeLayout>
            <Footer />
        </>
    );
}
