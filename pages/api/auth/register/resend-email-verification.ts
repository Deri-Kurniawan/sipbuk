import { transporter } from "@/utils/nodemailer/transporter";
import { regexp } from "@/utils/regexp";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "PUT":
      const { email } = req.body;
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
      try {
        const user = await prisma.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
            email: true,
            fullname: true,
            verifyToken: true,
            isVerified: true,
          },
        });

        if (!user) {
          return res
            .status(400)
            .json({ code: 400, message: "Email tidak terdaftar!" });
        }

        if (user.isVerified) {
          return res.status(400).json({
            code: 400,
            message: `Email anda sudah terverifikasi!`,
          });
        }

        const verifyToken = `vt-${uuidv4()}`;

        await prisma.user.update({
          where: {
            email,
          },
          data: {
            verifyToken,
          },
        });

        // nodemailer here
        const mailOptions = {
          from: `SIPBUK <${process.env.NODEMAILER_USER}>`,
          to: email,
          subject: "Verifikasi Akun Email SIPBUK",
          html: `<h2>Hallo ${
            user.fullname
          }!</h2><p>Untuk melanjutkan pendaftaran anda di aplikasi SIPBUK (Sistem Pakar Jambu Kristal), silahkan <a href="${`${process.env.BASE_URL}/api/auth/register/account-activation?token=${verifyToken}`}">Klik disini</a> untuk melakukan verifikasi akun anda.</p><p>Jika link tidak dapat di klik silahkan gunakan link berikut:<br/><a href="${`${process.env.BASE_URL}/api/auth/register/account-activation?token=${verifyToken}`}">${`${process.env.BASE_URL}/api/auth/register/account-activation?token=${verifyToken}`}</a></p>`,
        };

        transporter.sendMail(mailOptions, function (error: any, info: any) {
          if (error) {
            console.log("nodemailer transporter", error);
            res.status(500).json({
              code: 500,
              message:
                "Daftar Berhasil! Email verifikasi gagal dikirim karena kesalahan server",
            });
          } else {
            console.log("Email sent: " + info.response);
            res.status(201).json({
              code: 201,
              message: `Daftar Berhasil! Silahkan cek email anda untuk melakukan verifikasi akun. Jika tidak ada di inbox, silahkan cek di folder spam atau promosi.`,
            });
          }
        });

        res.status(200).json({
          code: 200,
          message: `Kami telah mengirimkan email verifikasi ke email ${user.email}`,
          data: user,
        });
        await prisma.$disconnect();
      } catch (error) {
        console.log("api", error);
        res.status(500).json({ code: 500, message: "Internal server error!" });
      }
  }
}