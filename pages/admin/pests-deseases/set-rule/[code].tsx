import { loggedInUserDataType } from '@/types';
import { getCookie, hasCookie } from 'cookies-next';
import Head from "next/head";
import Navbar from '@/components/Navbar';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { BsPlus } from "react-icons/bs"
import { NextApiRequest, NextApiResponse } from 'next';
import { uncertaintyValueRawData } from '@/prisma/data';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';

type getServerSidePropsType = {
    params: {
        code: string;
    };
    req: NextApiRequest;
    res: NextApiResponse;
}

export async function getServerSideProps({ params: { code }, req, res }: getServerSidePropsType) {
    const prisma = new PrismaClient();
    const isCookieExist = hasCookie("user", { req, res });

    try {
        // @ts-ignore
        const userCookie = isCookieExist ? JSON.parse(getCookie("user", { req, res })) : null;

        if (userCookie.role !== 'admin') {
            return {
                redirect: {
                    destination: '/dashboard',
                    permanent: true,
                }
            }
        }

        const pestsOrDeseases = await prisma.pestsAndDeseases.findUnique({
            where: {
                code: parseInt(code),
            },
            include: {
                PestsAndDeseasesHasSymptoms: {
                    include: {
                        symptoms: true,
                    },
                },
            },
        })

        const symptoms = await prisma.symptoms.findMany()

        return {
            props: {
                user: userCookie,
                pestsOrDeseases: JSON.parse(JSON.stringify(pestsOrDeseases)),
                symptoms: JSON.parse(JSON.stringify(symptoms)),
            }
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/admin/pests-deseases',
            }
        };
    }
}

type AdminProps = {
    user: loggedInUserDataType;
    pestsOrDeseases: any;
    symptoms: any;
}

const Admin = ({ user, pestsOrDeseases, symptoms }: AdminProps) => {
    const [selectedSymptomData, setSelectedSymptomData] = useState<number[]>(() => {
        const _selectedSymptomData = pestsOrDeseases.PestsAndDeseasesHasSymptoms.map((v: any) => v.symptomCode)
        return _selectedSymptomData;
    });
    const [selectedSymptomDataCF, setSelectedSymptomDataCF] = useState<number[]>(() => {
        const _selectedSymptomDataCF = pestsOrDeseases.PestsAndDeseasesHasSymptoms.map((v: any) => v.expertCF)
        return _selectedSymptomDataCF;
    });
    const [fetchIsLoading, setFetchIsLoading] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const pestAndDeseaseCode = pestsOrDeseases.code;
        // @ts-ignore
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());

        // remap var data to contain only selected symptoms by code
        const selectedSymptoms = selectedSymptomData.map((code) => {
            return {
                symptomCode: code,
                expertCF: data[code],
            }
        })

        if (selectedSymptomData.length === 0) {
            toast.error('Sistem gagal menyimpan rule, silahkan pilih gejala terlebih dahulu', {
                duration: 5000,
            });
            setFetchIsLoading(false);
            return;
        }

        const fetchCreatePestOrDesease = (async (pestAndDeseaseCode: number) => {
            setFetchIsLoading(true);

            return await fetch(`/api/admin/pests-deseases/set-rule`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pestAndDeseaseCode,
                    data: [...selectedSymptoms.map((symptom) => ({
                        ...symptom,
                        pestAndDeseaseCode,
                        expertCF: Number(symptom.expertCF),
                    }))],
                }),
            })
        })

        toast.promise(fetchCreatePestOrDesease(pestAndDeseaseCode)
            .then((res) => res.json())
            .then((res) => {
                router.push(`/admin/pests-deseases`);
            })
            .catch(() => {
                toast.error('Sistem gagal menyimpan rule, ada kesalahan pada sistem', {
                    duration: 5000,
                });
                setFetchIsLoading(false);
            }), {
            loading: 'Sistem sedang menyimpan rule...',
            success: 'Sistem berhasil menyimpan rule',
            error: 'Sistem gagal menyimpan rule',
        }, {
            duration: 5000,
        });
    }

    const handleSelectOneSymptom = (symptomCode: number) => {
        if (selectedSymptomData.find((v) => v === symptomCode)) {
            setSelectedSymptomData(selectedSymptomData.filter((v) => v !== symptomCode))
        } else {
            setSelectedSymptomData([...selectedSymptomData, symptomCode])
        }
    }

    return (
        <>
            <Head>
                <title>Dashboard Admin Data Hama dan Penyakit - SIPBUK</title>
                <meta name="description" content="Sistem Pakar berbasis web ini dapat membantu anda dalam mendiagnosis hama dan penyakit pada tanaman jambu kristal anda, serta dapat memberikan solusi atas masalah yang dialami oleh tanaman jambu kristal anda secara gratis." />
            </Head>
            <Navbar userFullname={user.fullname} role={user.role} />
            <main className="safe-horizontal-padding my-[16px] md:my-[48px]">
                <div className="text-sm breadcrumbs">
                    <ul>
                        <li>
                            <Link href="/admin">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                                Admin
                            </Link>
                        </li>
                        <li>
                            <Link href="/admin/pests-deseases">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                                Data Hama dan Penyakit
                            </Link>
                        </li>
                        <li>
                            <a>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
                                Pengaturan Rule untuk {pestsOrDeseases.name}
                            </a>
                        </li>
                    </ul>
                </div>
                <form onSubmit={onSubmitHandler} ref={formRef}>
                    <div className="flex items-center justify-between">
                        <h4 className="mb-2 text-xl font-bold">
                            Pengaturan Rule untuk ({pestsOrDeseases.name})
                        </h4>
                        <button className={`btn btn-primary ${fetchIsLoading ? 'loading' : ''}`} type='submit' disabled={fetchIsLoading}>Simpan Rule</button>
                    </div>
                    <div className="mt-4">
                        <div className="mb-4 mockup-code">
                            <pre data-prefix=">">
                                <code>Aturan dipilih: </code>
                                <code>{JSON.stringify(selectedSymptomData)}</code>
                            </pre>
                        </div>
                        <div className="w-full overflow-x-auto">
                            <table className="table w-full">
                                <thead>
                                    <tr>
                                        <th>
                                            <label>
                                                <input type="checkbox" className="checkbox" onClick={() => {
                                                    if (selectedSymptomData.length === symptoms.length) {
                                                        setSelectedSymptomData([])
                                                    } else {
                                                        setSelectedSymptomData(symptoms.map((symptom: any) => symptom.code))
                                                    }
                                                }} checked={
                                                    selectedSymptomData.length === symptoms.length ? true : false
                                                } />
                                            </label>
                                        </th>
                                        <th>Kode Gejala</th>
                                        <th>Info Gejala</th>
                                        <th>CF Pakar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {symptoms.map((symptom: any, index: number) => (
                                        <tr key={index}>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" value={symptom.code} onClick={() => handleSelectOneSymptom(symptom.code)} checked={selectedSymptomData.find((v) => v === symptom.code) ? true : false} />
                                                </label>
                                            </th>
                                            <td>{`G${symptom.code}`}</td>
                                            <td>{symptom.info}</td>
                                            <td>
                                                <select className="w-full max-w-xs select select-bordered" name={symptom.code} disabled={selectedSymptomData.find((v) => v === symptom.code) ? false : true} defaultValue={
                                                    selectedSymptomDataCF.find((v, i) => i === selectedSymptomData.findIndex((v) => v === symptom.code)) ? selectedSymptomDataCF.find((v, i) => i === selectedSymptomData.findIndex((v) => v === symptom.code)) : 0
                                                }>
                                                    {[...uncertaintyValueRawData].sort((a, b) => a.value - b.value).slice(1).map((item, index) => (
                                                        <option key={index} value={item.value}>{item.label}</option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </main>
        </>
    )
}

export default Admin;