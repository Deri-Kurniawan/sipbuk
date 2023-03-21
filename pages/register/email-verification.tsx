import Navbar from '@/components/Navbar'
import Head from 'next/head'
import emailVerifiedImage from '@/assets/email-verified.jpg'
import somethingWrongImage from '@/assets/something-wrong.jpg'
import Image from 'next/image'

export function getServerSideProps(context: any) {
    const { status = null, email = null, reason = null } = context.query;

    if (!status && !email && !reason) {
        return {
            props: {
                imageSrc: somethingWrongImage,
                title: 'Maaf ada kesalahan',
                message: 'Maaf ada kesalahan, silahkan coba lagi.',
            }
        }
    }

    if (status === 'success') {
        return {
            props: {
                imageSrc: emailVerifiedImage,
                title: 'Email Berhasil Diverifikasi',
                message: `Email anda berhasil diverifikasi, silahkan masuk dengan email ${email || 'anda'}`
            }
        }
    }

    if (status === 'failed' && reason === 'already_verified') {
        return {
            props: {
                imageSrc: emailVerifiedImage,
                title: 'Email Sudah Diverifikasi',
                message: `Email anda sudah diverifikasi, silahkan masuk dengan email ${email || 'anda'}`
            }
        }
    }

    if (status === 'failed' && reason === 'broken_link') {
        return {
            props: {
                imageSrc: somethingWrongImage,
                title: 'Maaf link rusak',
                message: `Maaf link ini rusak, silahkan melakukan pengiriman verifikasi email yang baru.`
            }
        }
    }

    return {
        props: {
            imageSrc: somethingWrongImage,
            title: 'Email Gagal Diverifikasi',
            message: 'Email anda gagal diverifikasi, silahkan coba lagi.'
        }

    }
}

export default function EmailVerification({ imageSrc, title, message }: { imageSrc: any, title: string, message: string }) {

    return (
        <>
            <Head>
                <title>{`${title} - SIPBUK`}</title>
            </Head>
            <Navbar />
            <main>
                <div className="safe-horizontal-padding my-[16px] md:my-[48px]">
                    <div className='flex flex-col items-center justify-center flex-1 gap-2'>
                        <a href="https://www.freepik.com/free-vector/college-admission-concept-illustration_29808816.htm#query=verify%20email&position=6&from_view=keyword&track=ais" title='Image by storyset on Freepik'>
                            <Image src={imageSrc} width={300} height={300} alt="" />
                        </a>

                        <h2 className="text-[30px] md:text-[40px] font-bold leading-[38px] md:leading-[48px] mb-2 md:mb-4 text-center">
                            {title}
                        </h2>
                        <p className="mb-3 text-base font-normal text-center md:text-lg md:mb-7">
                            {message}
                        </p>
                    </div>
                </div>
            </main>
        </>
    )
}
