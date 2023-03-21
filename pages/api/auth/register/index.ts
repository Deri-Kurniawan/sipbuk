import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import nodemailer from "nodemailer";
import CryptoJS from "crypto-js";

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
  const hashAES: {
    password: string;
  } = req.body;

  const fullname = req.body.fullname;
  const email = req.body.email;

  const password = CryptoJS.AES.decrypt(
    hashAES.password,
    `${process.env.AES_KEY}`
  ).toString(CryptoJS.enc.Utf8);

  POST.Validation(req, res, { fullname, email, password });

  try {
    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      return res
        .status(400)
        .json({ code: 400, message: "Email sudah terdaftar!" });
    }

    const verifyToken = uuidv4();

    const user = await prisma.user.create({
      data: {
        uuid: `user-${uuidv4()}`,
        fullname,
        email,
        password: hashAES.password,
        isVerified: false,
        verifyToken,
      },
    });

    // nodemailer here
    const mailOptions = {
      from: `SIPBUK <${process.env.NODEMAILER_USER}>`,
      to: email,
      subject: "Verifikasi Akun Email SIPBUK",
      html: `<h2>Hallo ${fullname}!</h2><p>Untuk melanjutkan pendaftaran anda di aplikasi SIPBUK (Sistem Pakar Jambu Kristal), silahkan <a href="${`${process.env.BASE_URL}/api/auth/register/account-activation?token=${verifyToken}`}">Klik disini</a> untuk melakukan verifikasi akun anda</p>`,
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({ code: 201, message: "Daftar Berhasil!", user });
  } catch (error) {
    console.log("api", error);
    res.status(500).json({ code: 500, message: "Internal server error!" });
  }

  prisma.$disconnect();
}

POST.Validation = async (
  req: NextApiRequest,
  res: NextApiResponse,
  payload: {
    fullname: string;
    email: string;
    password: string;
  }
) => {
  const { fullname, email, password } = payload;
  const fullnameRegex = /^[a-zA-Z ]{2,30}$/;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!fullname) {
    return res
      .status(400)
      .json({ code: 400, message: "Nama Lengkap tidak boleh kosong!" });
  }

  if (fullname.length < 2) {
    return res.status(400).json({
      code: 400,
      message: "Nama Lengkap setidaknya terdiri dari 2 huruf!",
    });
  }

  if (!fullnameRegex.test(fullname)) {
    return res
      .status(400)
      .json({ code: 400, message: "Nama Lengkap harus berupa huruf alfabet!" });
  }

  if (!email) {
    return res
      .status(400)
      .json({ code: 400, message: "Email tidak boleh kosong!" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ code: 400, message: "Email tidak valid!" });
  }

  const userExist = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      email: true,
    },
  });

  if (userExist) {
    return res
      .status(400)
      .json({ code: 400, message: "Email sudah terdaftar!" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ code: 400, message: "Password tidak boleh kosong!" });
  }

  if (password.length < 6) {
    return res.status(400).json({
      code: 400,
      message: "Password setidaknya terdiri dari 6 karakter!",
    });
  }
};
