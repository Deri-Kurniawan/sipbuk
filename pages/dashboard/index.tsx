import React from 'react'
import { hasCookie, getCookie, deleteCookie } from "cookies-next";
import { PrismaClient } from '@prisma/client';
import { serverSideAESDecrypt } from '@/utils/cryptoAES';
import Navbar from '@/components/Navbar';

export async function getServerSideProps({ req, res }: { req: any, res: any }) {
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
        const userFromDB = await prisma.user.findUnique({
            where: {
                email: userCookie.email
            }
        });

        if (!userFromDB) {
            deleteCookie("user", { req, res });
            return {
                redirect: {
                    destination: '/login',
                    permanent: true,
                }
            }
        }

        if (serverSideAESDecrypt(userFromDB.password) !== serverSideAESDecrypt(userCookie.password)) {
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
            }
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
    user: any;
}

export default function Dashboard({ user }: DashboardProps) {
    return (
        <>
            <Navbar user={user} />
            <h1>Dashboard</h1>
        </>
    )
}
