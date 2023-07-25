import { deleteCookie, getCookie } from "cookies-next";
import prisma from "@/prisma";

export default async function handler(req, res) {
  const isCookieExist = getCookie("user", { req, res });

  switch (req.method) {
    case "GET":
      // @ts-ignore
      const userCookie = isCookieExist
        ? JSON.parse(getCookie("user", { req, res }))
        : null;

      if ((userCookie && userCookie.role !== "admin") || !userCookie) {
        return {
          redirect: {
            destination: "/dashboard",
            permanent: true,
          },
        };
      }

      const foundedUser = await prisma.user.findUnique({
        where: {
          authToken: userCookie.authToken,
        },
      });

      if (!foundedUser) {
        deleteCookie("user", { req, res });
        return res.status(401).json({
          code: 401,
          message: "Unauthorized",
        });
      }

      return res.status(200).json({
        code: 200,
        message: "Berhasil mendapatkan data user",
      });
      break;
  }
}
