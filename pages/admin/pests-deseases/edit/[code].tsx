import { loggedInUserDataType } from '@/types';
import { getCookie, hasCookie } from 'cookies-next';
import Head from "next/head";
import Navbar from '@/components/Navbar';
import { PrismaClient } from '@prisma/client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/prisma';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

type getServerSidePropsType = {
    params: {
        code: string;
    };
    req: NextApiRequest;
    res: NextApiResponse;
}

export async function getServerSideProps({ params: { code }, req, res }: getServerSidePropsType) {
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

        const pestsDesease = await prisma.pestsAndDeseases.findUnique({
            where: {
                code: parseInt(code),
            },
        })

        return {
            props: {
                user: userCookie,
                pestsDesease: JSON.parse(JSON.stringify(pestsDesease)),
            }
        }
    } catch (error) {
        console.log(error)
        return {
            redirect: {
                destination: '/admin/pests-deseases',
                permanent: true,
            }
        }
    }
}

type AdminCreateProps = {
    user: loggedInUserDataType;
    pestsDesease: {
        code: number;
        name: string;
        solution: string;
        activeIngredient: string;
        createdAt: Date;
        updatedAt: Date;
    };
}

const AdminEditPestOrDesease = ({ user, pestsDesease }: AdminCreateProps) => {
    const [solution, setSolution] = useState<string>(pestsDesease.solution);
    const [activeIngredient, setActiveIngredient] = useState<string>(pestsDesease.activeIngredient);
    const [fetchIsLoading, setFetchIsLoading] = useState<boolean>(false);

    const [solutionQuillEditor, setSolutionQuillEditor] = useState<any>(null);
    const [activeIngredientQuillEditor, setActiveIngredientQuillEditor] = useState<any>(null);

    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const onSubmitHandler = async (e: any, pestOrDeseaseCode: number) => {
        e.preventDefault();

        // @ts-ignore
        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData.entries());

        const fetchCreatePestOrDesease = (async (pestOrDeseaseCode: number) => {
            setFetchIsLoading(true);

            return await fetch(`/api/admin/pests-deseases`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pestOrDeseaseCode,
                    data: {
                        name: data.name,
                        solution,
                        activeIngredient,
                    }
                }),
            })
        })

        toast.promise(fetchCreatePestOrDesease(pestOrDeseaseCode)
            .then((res) => res.json())
            .then((res) => {
                router.push(`/admin/pests-deseases`);
            })
            .catch(() => {
                toast.error('Sistem gagal menyimpan pembaruan data, ada kesalahan pada sistem', {
                    duration: 5000,
                });
                setFetchIsLoading(false);
            }), {
            loading: 'Sistem sedang menyimpan pembaruan data...',
            success: 'Sistem berhasil menyimpan pembaruan data',
            error: 'Sistem gagal menyimpan pembaruan data',
        }, {
            duration: 5000,
        });
    }

    useEffect(() => {
        setSolutionQuillEditor(<ReactQuill theme="snow" value={solution} onChange={setSolution} />)
        setActiveIngredientQuillEditor(<ReactQuill theme="snow" value={activeIngredient} onChange={setActiveIngredient} />)
    }, [])

    return (
        <>
            <Head>
                <title>Ubah Data Hama atau Penyakit - SIPBUK Admin</title>
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
                            <Link href="/admin/pests-deseases/create">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 mr-2 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                Ubah Data Hama atau Penyakit ({pestsDesease.name})
                            </Link>
                        </li>
                    </ul>
                </div>
                <h4 className="mt-1 mb-2 text-xl font-bold">
                    Ubah Data Hama atau Penyakit
                </h4>
                <div className="mt-2">
                    <form onSubmit={(e: any) => onSubmitHandler(e, pestsDesease.code)} ref={formRef}>
                        <div className="form-control">
                            <label className="label" htmlFor='name'>
                                <span className="label-text">Nama Hama atau Penyakit</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="name" placeholder="Nama ... atau Hama ..." className="w-full input input-bordered" id='name' required disabled={fetchIsLoading} defaultValue={pestsDesease.name} />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Solusi</span>
                            </label>
                            {!solutionQuillEditor ? (
                                <div className="flex flex-col gap-4 items-center justify-center w-full text-base text-center border border-black/10 h-36 loading">
                                    <span>Memuat Konten Editor</span>
                                    <progress className="progress w-56"></progress>
                                </div>
                            ) : solutionQuillEditor}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Bahan Aktif</span>
                            </label>
                            {!activeIngredientQuillEditor ? (
                                <div className="flex flex-col gap-4 items-center justify-center w-full text-base text-center border border-black/10 h-36 loading">
                                    <span>Memuat Konten Editor</span>
                                    <progress className="progress w-56"></progress>
                                </div>
                            ) : activeIngredientQuillEditor}
                        </div>
                        <button type="submit" className={`mt-4 btn btn-primary ${fetchIsLoading ? 'loading' : ''}`} disabled={fetchIsLoading}>Simpan Perubahan</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default AdminEditPestOrDesease;