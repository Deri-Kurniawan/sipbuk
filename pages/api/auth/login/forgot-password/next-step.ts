import CryptoJS from "crypto-js";
import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case "POST":
      POST(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res
        .status(405)
        .end({ code: 405, message: `Method ${method} Not Allowed` });
      break;
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const hashAES = req.body;

  const token = req.body.token;

  const password = CryptoJS.AES.decrypt(
    hashAES.password,
    `${process.env.AES_KEY}`
  ).toString(CryptoJS.enc.Utf8);

  const passwordConfirm = CryptoJS.AES.decrypt(
    hashAES.passwordConfirm,
    `${process.env.AES_KEY}`
  ).toString(CryptoJS.enc.Utf8);

  if (!token) {
    return res.status(400).json({
      code: 400,
      message: "Token tidak boleh kosong!",
    });
  }

  if (!password) {
    return res.status(400).json({
      code: 400,
      message: "Password tidak boleh kosong",
    });
  }

  if (!passwordConfirm) {
    return res.status(400).json({
      code: 400,
      message: "Konfirmasi password tidak boleh kosong",
    });
  }

  if (password !== passwordConfirm) {
    return res.status(400).json({
      code: 400,
      message: "Password dan konfirmasi password tidak sama",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      code: 400,
      message: "Password minimal 6 karakter",
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      // @ts-ignore
      passwordResetToken: token,
    },
  });

  if (!user) {
    return res.status(400).json({
      code: 400,
      message: "Token tidak valid!",
    });
  }

  try {
    const newToken = uuidv4();

    const userUpdated = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: CryptoJS.AES.encrypt(
          password,
          `${process.env.AES_KEY}`
        ).toString(),
        // @ts-ignore
        passwordResetToken: newToken,
      },
    });

    const mailOptions = {
      from: `SIPBUK <${process.env.NODEMAILER_USER}>`,
      to: userUpdated.email,
      subject: "Kata Sandi Akun SIPBUK anda Berhasil Diubah",
      html: `<h2>Hallo ${
        userUpdated.fullname
      }!</h2><p>Kata Sandi anda telah diubah pada ${new Date(
        userUpdated.updatedAt
      ).toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      })}.<br/>Jika anda tidak melakukan perubahan, harap segera ubah kata sandi anda <a href="${
        process.env.BASE_URL
      }/login/forgot-password">Di sini</a>.</p><p>Terima kasih!</p><p>Admin SIPBUK</p><p>${new Date(
        userUpdated.updatedAt
      )}</p>`,
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(200).json({
      code: 200,
      message: "Password berhasil diubah, silahkan masuk kembali!",
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: "Internal Server Error",
    });
  }
}
