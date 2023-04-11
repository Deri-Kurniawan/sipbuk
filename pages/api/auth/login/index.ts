import { serverSideAESDecrypt } from "@/utils/cryptoAES";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { regexp } from "@/utils/regexp";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  switch (method) {
    case "POST":
      const hashAES: {
        password: string;
      } = req.body;

      const email = req.body.email;

      const password = serverSideAESDecrypt(hashAES.password);

      if (!email) {
        return res
          .status(400)
          .json({ code: 400, message: "Email harus diisi!" });
      }

      if (!regexp.email.test(email)) {
        return res
          .status(400)
          .json({ code: 400, message: "Format email salah!" });
      }

      if (!password) {
        return res
          .status(400)
          .json({ code: 400, message: "Kata sandi harus diisi!" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .json({ code: 400, message: "Kata sandi kurang dari 6 karakter!" });
      }

      try {
        const user = await prisma.user.findFirst({
          where: {
            email,
          },
          select: {
            id: true,
            email: true,
            fullname: true,
            password: true,
            isVerified: true,
          },
        });

        if (!user) {
          return res
            .status(400)
            .json({ code: 400, message: "Email tidak terdaftar!" });
        }

        const decryptedUserPassword = serverSideAESDecrypt(user.password);

        if (decryptedUserPassword !== password) {
          return res
            .status(400)
            .json({ code: 400, message: "Password salah!" });
        }

        if (!user.isVerified) {
          return res.status(400).json({
            code: 400,
            message: `Halo ${user.fullname}! Email anda belum terverifikasi. Silakan periksa kotak masuk dan folder spam email anda.`,
          });
        }

        res.status(200).json({
          code: 200,
          message: `Selamat datang ${user.fullname}!`,
          data: user,
        });
        await prisma.$disconnect();
      } catch (error) {
        console.log("api", error);
        res.status(500).json({ code: 500, message: "Kesalahan Server!" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res
        .status(405)
        .end({ code: 405, message: `Method ${method} Not Allowed` });
      break;
  }
}
