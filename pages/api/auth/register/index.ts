import { serverSideAESDecrypt } from "@/utils/cryptoAES";
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
import { regexp } from "@/utils/regexp";
import { transporter } from "@/utils/nodemailer/transporter";

const prisma = new PrismaClient();

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
  const password = serverSideAESDecrypt(hashAES.password);

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

  if (!regexp.fullname.test(fullname)) {
    return res
      .status(400)
      .json({ code: 400, message: "Nama Lengkap harus berupa huruf alfabet!" });
  }

  if (!email) {
    return res
      .status(400)
      .json({ code: 400, message: "Email tidak boleh kosong!" });
  }

  if (!regexp.email.test(email)) {
    return res.status(400).json({ code: 400, message: "Email tidak valid!" });
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

    const verifyToken = `vt-${uuidv4()}`;

    await prisma.user.create({
      data: {
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
  } catch (error) {
    console.log("api", error);
    res.status(500).json({ code: 500, message: "Internal server error!" });
  }

  await prisma.$disconnect();
}
