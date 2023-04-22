import React, { useEffect, useState } from 'react';
import { hasCookie, getCookie, deleteCookie } from "cookies-next";
import { PrismaClient } from '@prisma/client';
import { serverSideAESDecrypt } from '@/utils/cryptoAES';
import Navbar from '@/components/Navbar';
import Head from 'next/head';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { NextApiRequest, NextApiResponse } from 'next';

type getServerSidePropsType = {
    req: NextApiRequest;
    res: NextApiResponse;
};

export async function getServerSideProps({ req, res }: getServerSidePropsType) {
    const prisma = new PrismaClient();
    const hasLoggedIn = hasCookie("user", { req, res });

    if (!hasLoggedIn) {
        return {
            redirect: {
                destination: '/login',
                permanent: true,
            }
        }
    }

    try {
        // @ts-ignore
        const userCookie = JSON.parse(getCookie("user", { req, res }));
        const foundedUser = await prisma.user.findUnique({
            where: {
                authToken: userCookie.authToken,
            }
        });
        const _userDiagnosesHistory = await prisma.usersDiagnoseHistory.findMany({
            where: {
                userId: foundedUser?.id,
            },
            include: {
                pestsAndDeseases: true,
            }
        })

        await prisma.$disconnect();
        if (!foundedUser) {
            deleteCookie("user", { req, res });
            return {
                redirect: {
                    destination: '/login',
                    permanent: true,
                }
            }
        }

        return {
            props: {
                user: userCookie,
                _userDiagnosesHistory: JSON.parse(JSON.stringify(_userDiagnosesHistory)),
            },
        }
    } catch (error) {
        console.log(error)
        deleteCookie("user", { req, res });
        return {
            redirect: {
                destination: '/login',
                permanent: true,
            }
        };
    }
}

interface DashboardProps {
    user: {
        id: string;
        email: string;
        fullname: string;
        password: string;
        isVerified: boolean;
    };
    _userDiagnosesHistory: {
        id: string;
        userId: string;
        pestsAndDeseasesId: string;
        finalCF: number;
        userInputData: string; //json
        createdAt: Date;
        updatedAt: Date;
        pestsAndDeseases: {
            code: number;
            name: string;
            imageUrl: string;
            createdAt: Date;
            updatedAt: Date;
            solution: string;
        }
    }[];
}

const dayTimeText = () => {
    const newDate = new Date();
    const time = newDate.getHours();
    if (time >= 0 && time < 12) {
        return "Pagi";
    }
    if (time >= 12 && time < 15) {
        return "Siang";
    }
    if (time >= 15 && time < 18) {
        return "Sore";
    }
    if (time >= 18 && time < 24) {
        return "Malam";
    }
}

export default function Dashboard({ user, _userDiagnosesHistory }: DashboardProps) {
    const [userDiagnosesHistory, setUserDiagnosesHistory] = useState(_userDiagnosesHistory);
    const [localStorageDiagnosesHistory, setLocalStorageDiagnosesHistory] = useState([]);
    const [selectedDiagnosesHistoryId, setSelectedDiagnosesHistoryId]: string[] | any = useState([]);
    const [onDeleteSelectedDiagnoseHistory, setOnDeleteSelectedDiagnoseHistory] = useState(false);
    const [isLoadingSaveDiagnoseHistory, setIsLoadingSaveDiagnoseHistory] = useState(false);
    const globalCheckboxRef = React.useRef<HTMLInputElement>(null);

    const handleClickAcceptSaveDiagnoseHistory = async () => {
        const savedLocalStorageDiagnosesHistory = (async () => {
            setIsLoadingSaveDiagnoseHistory(true);
            return await fetch("/api/dashboard/diagnoses-history", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    diagnosesId: localStorageDiagnosesHistory,
                    userId: user.id,
                }),
            })
        });

        toast.promise(savedLocalStorageDiagnosesHistory()
            .then((res) => res.json())
            .then((res) => {
                setUserDiagnosesHistory([...userDiagnosesHistory, ...res.data]);

                if (typeof window !== "undefined") {
                    localStorage.removeItem("diagnosesHistoryId");
                }

                setLocalStorageDiagnosesHistory([]);
                setIsLoadingSaveDiagnoseHistory(false);
            })
            .catch(() => {
                toast.error("Riwayat diagnosa gagal disimpan", {
                    duration: 5000,
                });
            }), {
            loading: "Menyimpan riwayat diagnosa...",
            success: "Riwayat diagnosa berhasil disimpan",
            error: "Riwayat diagnosa gagal disimpan",
        }, {
            duration: 5000,
        });
    }

    const handleClickRefuseSaveDiagnoseHistory = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("diagnosesHistoryId");
            setLocalStorageDiagnosesHistory([]);
        }
        setLocalStorageDiagnosesHistory([]);
    }

    const handleClickDeleteSelectedDiagnoseHistory = async () => {
        const deletedDiagnosesHistory = (async () => {
            setOnDeleteSelectedDiagnoseHistory(true);

            return await fetch("/api/dashboard/diagnoses-history", {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "DELETE",
                body: JSON.stringify({
                    diagnosesId: selectedDiagnosesHistoryId,
                    userId: user.id,
                }),
            })
        });

        toast.promise(deletedDiagnosesHistory()
            .then((res) => {
                setOnDeleteSelectedDiagnoseHistory(false);
                return res.json()
            })
            .then((res) => {
                setUserDiagnosesHistory(userDiagnosesHistory.filter((diagnosesHistory: any) => !selectedDiagnosesHistoryId.includes(diagnosesHistory.id)));
                setSelectedDiagnosesHistoryId([]);
                console.log(res);
            })
            .catch(() => {
                setOnDeleteSelectedDiagnoseHistory(false);
                toast.error("Riwayat diagnosa gagal dihapus", {
                    duration: 5000,
                });
            }), {
            loading: "Menghapus riwayat diagnosa...",
            success: "Riwayat diagnosa berhasil dihapus",
            error: "Riwayat diagnosa gagal dihapus",
        }, {
            duration: 7000,
        });
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            setLocalStorageDiagnosesHistory(JSON.parse(localStorage.getItem("diagnosesHistoryId") || "[]"));
        }
    }, [])

    return (
        <>
            <Head>
                <title>Dashboard - SIPBUK</title>
                <meta name="description" content="Sistem Pakar berbasis web ini dapat membantu anda dalam mendiagnosa hama dan penyakit pada tanaman jambu kristal anda, serta dapat memberikan solusi atas masalah yang dialami oleh tanaman jambu kristal anda secara gratis." />
            </Head>
            <Navbar user={user} />
            <main className="safe-horizontal-padding my-[16px] md:my-[48px]">
                <h4 className="mb-3 text-xl font-bold">
                    Selamat {dayTimeText()} 👋 {user.fullname || "Tanpa nama"}
                </h4>
                <div className='transition-all duration-500 ease-in-out'>
                    {localStorageDiagnosesHistory.length > 0 && (
                        <div className={`my-6 shadow-lg alert`}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="flex-shrink-0 w-6 h-6 stroke-info"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>{`Kamu punya ${localStorageDiagnosesHistory.length} riwayat diagnosa sebelumnya, apakah ingin anda simpan?`}</span>
                            </div>
                            <div className="flex-none">
                                <button className={`btn btn-sm btn-ghost`} onClick={handleClickRefuseSaveDiagnoseHistory} disabled={isLoadingSaveDiagnoseHistory}>Tolak</button>
                                <button className={`btn btn-sm btn-primary ${isLoadingSaveDiagnoseHistory ? 'loading' : ''}`} onClick={handleClickAcceptSaveDiagnoseHistory} disabled={isLoadingSaveDiagnoseHistory}>Terima</button>
                            </div>
                        </div>
                    )}
                    {selectedDiagnosesHistoryId.length > 0 && (
                        <div className={`my-6 shadow-lg alert`}>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="flex-shrink-0 w-6 h-6 stroke-info"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                <span>{`${selectedDiagnosesHistoryId.length} riwayat diagnosa dipilih`}</span>
                            </div>
                            <div className="flex-none">
                                <button className={`btn btn-sm btn-primary ${onDeleteSelectedDiagnoseHistory ? "loading" : ""}`} onClick={handleClickDeleteSelectedDiagnoseHistory} disabled={onDeleteSelectedDiagnoseHistory}>{onDeleteSelectedDiagnoseHistory ? "Menghapus" : "Hapus"}</button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-full mt-8 overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" ref={globalCheckboxRef} onChange={() => {
                                            if (globalCheckboxRef.current?.checked) {
                                                setSelectedDiagnosesHistoryId(userDiagnosesHistory.map((diagnosesHistory: any) => diagnosesHistory.id));
                                            } else {
                                                setSelectedDiagnosesHistoryId([]);
                                            }
                                        }} />
                                    </label>
                                </th>
                                <th>Terdiagnosa</th>
                                <th>Persentase</th>
                                <th>Tanggal Konsultasi</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userDiagnosesHistory.length > 0 ? (
                                <>
                                    {userDiagnosesHistory.map((diagnosesHistory: {
                                        id: string;
                                        userId: string;
                                        pestsAndDeseasesId: string;
                                        finalCF: number;
                                        userInputData: string; //json
                                        createdAt: Date;
                                        updatedAt: Date;
                                        pestsAndDeseases: {
                                            code: number;
                                            name: string;
                                            imageUrl: string;
                                            createdAt: Date;
                                            updatedAt: Date;
                                            solution: string;
                                        }
                                    }, index: number) => (
                                        <tr key={index.toString()}>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" value={diagnosesHistory.id} checked={
                                                        selectedDiagnosesHistoryId.includes(diagnosesHistory.id)
                                                    } onChange={() => {
                                                        if (selectedDiagnosesHistoryId.includes(diagnosesHistory.id)) {
                                                            setSelectedDiagnosesHistoryId(selectedDiagnosesHistoryId.filter((selectedDiagnosesHistoryId: string) => selectedDiagnosesHistoryId !== diagnosesHistory.id));
                                                        } else {
                                                            setSelectedDiagnosesHistoryId([...selectedDiagnosesHistoryId, diagnosesHistory.id]);
                                                        }
                                                    }} />
                                                </label>
                                            </th>
                                            <td>
                                                {diagnosesHistory.pestsAndDeseases.name}
                                            </td>
                                            <td>
                                                {diagnosesHistory.finalCF % 2 === 0 ? (diagnosesHistory.finalCF * 100).toFixed(0) : (diagnosesHistory.finalCF * 100).toFixed(2)}%
                                            </td>
                                            <td>{new Date(diagnosesHistory.createdAt).toLocaleString("id-ID", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "numeric",
                                                second: "numeric",
                                            })}</td>
                                            <th>
                                                <Link href={`/consult/${diagnosesHistory.id}`} className="btn btn-ghost btn-xs">Lihat Detail</Link>
                                            </th>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center">
                                        <div className="text-gray-500">Tidak ada riwayat diagnosa</div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </>
    )
}
