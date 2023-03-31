import React from 'react'
import { PrismaClient } from '@prisma/client';
import Head from 'next/head';
import { getCookie } from "cookies-next";
import Navbar from '@/components/Navbar';
import SafeLayout from '@/layouts/SafeLayout';

export async function getServerSideProps({ params: { diagnoseId }, req, res }: any) {
    const prisma = new PrismaClient();

    // @ts-ignore
    const findDiagnoseHistory = await prisma.usersDiagnoseHistory.findUnique({
        where: {
            id: diagnoseId
        },
        include: {
            pestsAndDeseases: true,
        }
    });

    if (!findDiagnoseHistory) {
        return {
            notFound: true,
        }
    }

    try {
        // @ts-ignore
        const userCookie = JSON.parse(getCookie("user", { req, res }));

        prisma.$disconnect();
        return {
            props: {
                user: userCookie,
                diagnoseHistory: JSON.parse(JSON.stringify(findDiagnoseHistory))
            }
        }
    } catch (error) {
        return {
            props: {
                user: null,
                diagnoseHistory: JSON.parse(JSON.stringify(findDiagnoseHistory))
            }
        }
    }

}

interface DiagnoseResultProps {
    user: any;
    diagnoseHistory: {
        id: string,
        userId: string,
        pestAndDeseaseCode: number,
        finalCF: number,
        userInputData: string, //json
        createdAt: string,
        updatedAt: string,
        pestsAndDeseases: {
            code: number,
            name: string,
            imageUrl: string,
            createdAt: string,
            updatedAt: string
        }
    };
}

export default function DiagnoseResult({ user, diagnoseHistory }: DiagnoseResultProps): JSX.Element {

    const getPercentageAccuration = (floatAccuration: number): string => {
        if (floatAccuration === 1) return `${(floatAccuration * 100).toFixed(0)}%`;
        if ((floatAccuration * 100) % 2 === 0) return `${(floatAccuration * 100).toFixed(0)}%`;
        return `${(floatAccuration * 100).toFixed(2)}%`;
    }

    const getAccurationLevel = (accurate: number): string => {
        if (accurate === 1) {
            return "Sangat Tinggi"
        } else if (accurate >= 0.8) {
            return "Tinggi"
        } else if (accurate >= 0.6) {
            return "Sedang"
        } else if (accurate >= 0.4) {
            return "Rendah"
        } else {
            return "Sangat Rendah"
        }
    }

    return (
        <>
            <Head>
                <title>Konsultasi - SIPBUK</title>
                <meta name="description" content="Sistem Pakar berbasis web ini dapat membantu anda dalam mendiagnosa hama dan penyakit pada tanaman jambu kristal anda, serta dapat memberikan solusi atas masalah yang dialami oleh tanaman jambu kristal anda secara gratis." />
            </Head>
            <Navbar isSticky={true} user={user} />
            <SafeLayout>
                <main className="safe-horizontal-padding my-[16px] md:my-[48px]">
                    <div className="h-full md:h-[482px] bg-primary rounded-2xl flex flex-col justify-center items-center p-8 md:p-6 mb-[112px] lg:mb-[172px]">
                        <h2 className="text-center leading-[38px] md:leading-[48px] text-[30px] md:text-[40px] font-bold mb-4">
                            Hasil Diagnosa
                        </h2>
                        <p className="text-center text-base leading-[24px] max-w-[660px]">
                            Hasil Diagnosa menunjukan bahwa Tanaman Jambu Kristal anda, terdiagnosa terkena <b className='capitalize'>{diagnoseHistory.pestsAndDeseases.name}</b> dengan tingkat <b>Akurasi {getAccurationLevel(diagnoseHistory.finalCF)}</b> sebesar <b>{getPercentageAccuration(diagnoseHistory.finalCF)}</b>
                        </p>
                    </div>
                </main>
            </SafeLayout>
        </>
    )
}
