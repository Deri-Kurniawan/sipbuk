// @ts-nocheck

import React, { Fragment } from 'react'
import { PrismaClient } from '@prisma/client';
import Head from 'next/head';
import { getCookie } from "cookies-next";
import Navbar from '@/components/Navbar';
import SafeLayout from '@/layouts/SafeLayout';
import CertaintyFactor from '@/utils/certaintyFactor';
import Link from 'next/link';

export async function getServerSideProps({ params: { diagnoseId }, req, res }: any) {
    const prisma = new PrismaClient();

    const foundDiagnoseHistory = await prisma.usersDiagnoseHistory.findUnique({
        where: {
            id: diagnoseId
        },
        include: {
            pestsAndDeseases: true,
        }
    });


    if (!foundDiagnoseHistory) {
        return {
            notFound: true,
        }
    }

    const CFInstance = new CertaintyFactor(JSON.parse(foundDiagnoseHistory.userInputData))
    const newHistoryStep = (await CFInstance.calculateCombinationRule()).calculatedCombinationRuleCF;

    try {
        const userCookie = JSON.parse(getCookie("user", { req, res }));

        await prisma.$disconnect();
        return {
            props: {
                user: userCookie,
                diagnoseHistory: JSON.parse(JSON.stringify(foundDiagnoseHistory)),
                diagnoseHistoryStep: JSON.parse(JSON.stringify(newHistoryStep))
            }
        }
    } catch (error) {
        return {
            props: {
                user: null,
                diagnoseHistory: JSON.parse(JSON.stringify(foundDiagnoseHistory)),
                diagnoseHistoryStep: JSON.parse(JSON.stringify(newHistoryStep))
            }
        }
    }

}

interface DiagnoseResultProps {
    user: any;
    diagnoseHistory: {
        id: string;
        userId: string;
        pestAndDeseaseCode: number;
        finalCF: number;
        userInputData: string; //json
        createdAt: string;
        updatedAt: string;
        pestsAndDeseases: {
            code: number;
            name: string;
            imageUrl: string;
            solution: string; //string html
            activeIngredient: string; //string html
            createdAt: string;
            updatedAt: string
        }
    };
    diagnoseHistoryStep: {
        code: number;
        name: string;
        imageUrl: string;
        createdAt: string;
        updatedAt: string;
        PestsAndDeseasesHasSymptoms: {
            id: number;
            pestAndDeseaseCode: number;
            symptomCode: number;
            expertCF: number;
            symptoms: {
                code: number;
                info: string;
                imageUrl: string;
                createdAt: string;
                updatedAt: string
            };
            userCF: number;
        }[];
        calculatedSingleRuleCF: number;
        combinationRuleCF: number;
        finalCF: number;
    }[];
}

export default function DiagnoseResult({ user, diagnoseHistory, diagnoseHistoryStep }: DiagnoseResultProps): JSX.Element {

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

    const toFixedEmitter = (num: number): number => {
        return Number(num) % 2 === 0 ? Number(num).toFixed(0) : Number(num).toFixed(4);
    }

    const userInputParsed = JSON.parse(diagnoseHistory.userInputData)[0];

    return (
        <>
            <Head>
                <title>Konsultasi - SIPBUK</title>
                <meta name="description" content="Sistem Pakar berbasis web ini dapat membantu anda dalam mendiagnosa hama dan penyakit pada tanaman jambu kristal anda, serta dapat memberikan solusi atas masalah yang dialami oleh tanaman jambu kristal anda secara gratis." />
            </Head>
            <Navbar isSticky={true} user={user} />
            <SafeLayout>
                <main className="safe-horizontal-padding my-[16px] md:my-[48px]">
                    <div className="h-full md:h-[482px] bg-primary rounded-2xl flex flex-col justify-center items-center p-6 md:p-6">
                        <h2 className="text-center leading-[38px] md:leading-[48px] text-[30px] md:text-[40px] font-bold mb-4">
                            Hasil Diagnosa
                        </h2>
                        <p className="text-center text-base leading-[24px] max-w-[660px]">
                            Hasil Diagnosa menunjukan bahwa Tanaman Jambu Kristal anda, terdiagnosa terkena <b className='capitalize'>{diagnoseHistory.pestsAndDeseases.name}</b> dengan tingkat <b>Akurasi {getAccurationLevel(diagnoseHistory.finalCF)}</b> sebesar <b>{getPercentageAccuration(diagnoseHistory.finalCF)}</b>
                        </p>
                        <a href="#solusi" className="mt-5 btn btn-active btn-ghost">Lihat Solusi</a>
                    </div>

                    <section id='solusi' className='pt-20'>
                        <h2 className="text-center leading-[38px] md:leading-[48px] text-[30px] md:text-[40px] font-bold mb-4">
                            Solusi
                        </h2>
                        <p className="text-center text-base leading-[24px] max-w-[660px] m-auto mb-10">
                            Berikut merupakan cara pengendalian, serta bahan aktif yang dapat anda gunakan
                        </p>
                        <div className='flex flex-col lg:flex-row'>
                            <div className='flex-grow'>
                                <h3 className="text-center leading-[38px] md:leading-[48px] text-[20px] md:text-[30px] font-bold mb-4">
                                    Cara Pengendalian
                                </h3>
                                <p className='text-justify md:text-left text-base leading-[24px] max-w-[660px] m-auto'>
                                    Untuk pengendalian {diagnoseHistory.pestsAndDeseases.name} pada tanaman jambu kristal, ada beberapa langkah yang dapat dilakukan, antara lain:
                                </p>
                                <div className='text-justify md:text-left prose prose-p:my-3 text-base leading-[24px] max-w-[660px] m-auto' dangerouslySetInnerHTML={{ __html: diagnoseHistory.pestsAndDeseases.solution }}></div>
                            </div>
                            <div className="hidden divider lg:flex lg:divider-horizontal">
                                Solusi
                            </div>
                            <div className="flex divider lg:hidden lg:divider-horizontal">
                            </div>
                            <div>
                                <h3 className="text-center leading-[38px] md:leading-[48px] text-[20px] md:text-[30px] font-bold mb-4">
                                    Bahan Aktif
                                </h3>
                                <p className='text-justify md:text-left text-base leading-[24px] max-w-[660px] m-auto'>
                                    Penggunaan bahan aktif untuk pengendalian {diagnoseHistory.pestsAndDeseases.name} pada tanaman jambu kristal yang dapat anda gunakan diantaranya:
                                </p>
                                <div className='text-justify md:text-left prose prose-p:my-3 text-base leading-[24px] max-w-[660px] m-auto' dangerouslySetInnerHTML={{ __html: diagnoseHistory.pestsAndDeseases.activeIngredient }}></div>
                            </div>
                        </div>
                    </section>

                    <div tabIndex={0} className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box my-[42px] lg:my-[102px]">
                        <input type="checkbox" className="peer" />

                        <div className="text-xl font-medium collapse-title">
                            Perhitungan Yang Dilakukan Sistem
                        </div>
                        <div className="collapse-content">
                            {/* collapse 1 */}
                            <div tabIndex={0} className="my-3 border collapse collapse-plus border-base-300 bg-base-100 rounded-box lg:my-4">
                                <input type="checkbox" className="peer" />

                                <div className="text-xl font-medium collapse-title">
                                    1. Perhitungan Dengan Kaidah Tunggal
                                </div>
                                <div className="collapse-content">
                                    <div className='mockup-code'>
                                        <pre>Rumus:</pre>
                                        <pre>CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>] = CF[<span className='text-red-400'>H</span>] * CF[<span className='text-yellow-400'>E</span>]</pre>
                                        <br />
                                        <pre>Dimana: </pre>
                                        <pre><span className='text-red-400'>H</span> = Nilai Keyakinan Pengguna </pre>
                                        <pre><span className='text-yellow-400'>E</span> = Nilai Keyakinan Pakar </pre>
                                    </div>
                                    {/* collapsed content */}
                                    <div className='my-4 mockup-code'>
                                        {diagnoseHistoryStep.map((step, i) => (
                                            <Fragment key={i}>
                                                <pre>{++i}. {step.name}:</pre>
                                                <br />
                                                <table className='text-center'>
                                                    <tbody>
                                                        {step.PestsAndDeseasesHasSymptoms.map((PD, j) => (
                                                            <Fragment key={`${j}-spadhs`}>
                                                                <tr>
                                                                    <td><pre data-prefix={++j}>CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>{j}</sub></pre></td>
                                                                    <td><pre>=</pre></td>
                                                                    <td><pre className='text-red-400'>{userInputParsed[PD.symptomCode]}</pre></td>
                                                                    <td><pre>*</pre></td>
                                                                    <td><pre className='text-yellow-400'>{PD.expertCF}</pre></td>
                                                                </tr>
                                                                <tr>
                                                                    <td></td>
                                                                    <td><pre>=</pre></td>
                                                                    <td><pre>{(PD.expertCF * userInputParsed[PD.symptomCode] % 2 === 0 ? (
                                                                        PD.expertCF * userInputParsed[PD.symptomCode]
                                                                    ).toFixed(0) : (
                                                                        PD.expertCF * userInputParsed[PD.symptomCode]
                                                                    ).toFixed(2))}</pre></td>
                                                                </tr>
                                                            </Fragment>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <br />
                                            </Fragment>
                                        ))}
                                    </div>
                                    {/* end of collapsed content */}
                                </div>
                            </div>
                            {/* end of collapse 1 */}
                            {/* collapse 2 */}
                            <div tabIndex={0} className="my-3 border collapse collapse-plus border-base-300 bg-base-100 rounded-box lg:my-4">
                                <input type="checkbox" className="peer" />

                                <div className="text-xl font-medium collapse-title">
                                    2. Perhitungan Dengan Kaidah Kombinasi
                                </div>
                                <div className="collapse-content">
                                    {/* collapsed content */}
                                    <div className='mockup-code'>
                                        <pre>Rumus:</pre>
                                        <pre>1. Diawali dengan:</pre>
                                        <pre>CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>1,2</sub> = CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>1</sub> * CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>2</sub> + (1 - CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>1</sub>)
                                        </pre>
                                        <pre>Dimana </pre>
                                        <pre>CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>1,2</sub> = Mengkombinasikan hasil kaidah tunggal CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>1</sub> dengan CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>2</sub></pre>
                                        <br />
                                        <pre>2. Dilanjutkan dengan</pre>
                                        <pre>
                                            CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>old,3</sub> = CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>old</sub> * CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>3</sub> + (1 - CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>old</sub>)
                                        </pre>
                                        <pre>Dimana </pre>
                                        <pre>CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>old,3</sub> = Mengkombinasikan hasil kaidah kombinasi sebelumnya yaitu CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>1,2</sub> atau CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>old</sub> dengan CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>3</sub></pre>
                                        <br />
                                        <pre>3. Diakhiri dengan</pre>
                                        <pre>
                                            Hasil Persentase = CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>old,n</sub> * 100
                                        </pre>
                                        <pre>Dimana</pre>
                                        <pre>CF[<span className='text-red-400'>H</span>,<span className='text-yellow-400'>E</span>]<sub>old,n</sub> = Hasil kaidah kombinasi terakhir</pre>
                                    </div>
                                    {/* algorithm intepreter 2 */}
                                    <div className='my-4 mockup-code'>
                                        {diagnoseHistoryStep.map((step, i: number) => (
                                            <Fragment key={`${i}-dhs`}>
                                                <pre>{++i}.{step.name}:</pre>
                                                <br />
                                                <table className='text-left'>
                                                    <tbody>
                                                        {JSON.parse(JSON.stringify(step.combinationRuleCF)).map((PD, j) => (
                                                            <Fragment key={`${j}-padhs`}>
                                                                <tr>
                                                                    <td><pre data-prefix={j + 1}>CF[H,E]<sub>{j === 0 ? (
                                                                        <>
                                                                            <span className='text-red-400'>1</span>,<span className='text-yellow-400'>2</span>
                                                                        </>
                                                                    ) : (<>
                                                                        <span className='text-red-400'>old</span>,<span className='text-yellow-400'>{j + 2}</span>
                                                                    </>)}</sub></pre></td>
                                                                    <td><pre>=</pre></td>
                                                                    <td><pre className='text-red-400'>{j === 0 ? toFixedEmitter(step.calculatedSingleRuleCF[0]) : toFixedEmitter(step.calculatedSingleRuleCF[j])}</pre></td>
                                                                    <td><pre>+</pre></td>
                                                                    <td>
                                                                        <pre className='text-yellow-400'>
                                                                            {j === 0 ? toFixedEmitter(step.calculatedSingleRuleCF[1]) : toFixedEmitter(step.combinationRuleCF[j - 1])}
                                                                        </pre>
                                                                    </td>
                                                                    <td><pre>*</pre></td>
                                                                    <td><pre>(1</pre></td>
                                                                    <td><pre>-</pre></td>
                                                                    <td><pre className='text-red-400'>{j === 0 ? toFixedEmitter(step.calculatedSingleRuleCF[0]) : toFixedEmitter(step.calculatedSingleRuleCF[j])})</pre></td>
                                                                </tr>
                                                                <tr>
                                                                    <td><pre></pre></td>
                                                                    <td><pre>=</pre></td>
                                                                    <td><pre>{toFixedEmitter(PD)}</pre></td>
                                                                </tr>
                                                            </Fragment>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <br />
                                            </Fragment >
                                        ))}
                                    </div>
                                    {/* end of collapsed content */}
                                </div>
                            </div>
                            {/* end of collapse 2 */}
                        </div>
                    </div>

                    <div className="flex flex-col items-center justify-center text-center my-[82px] lg:my-[142px]">
                        <h4 className="mb-3 text-3xl font-bold max-w-[552px]">
                            Apakah anda ingin melakukan diagnosa lagi?
                        </h4>
                        <p className="mb-6 text-base max-w-[552px]">
                            Jika iya, klik tombol <b>*Diagnosa Ulang*</b> dibawah
                        </p>
                        <Link
                            href="/consult"
                            className={`capitalize btn btn-active btn-ghost`}
                        >
                            Diagnosa Ulang
                        </Link>
                    </div>
                </main>
            </SafeLayout>
        </>
    )
}