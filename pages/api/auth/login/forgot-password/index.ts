import { regexp } from "@/utils/regexp";
import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { v4 as uuidv4 } from "uuid";
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
  const { email } = req.body;

  if (!email) {
    return res
      .status(400)
      .json({ code: 400, message: "Email tidak boleh kosong!" });
  }

  if (!regexp.email.test(email)) {
    return res.status(400).json({ code: 400, message: "Email tidak valid!" });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      email: true,
    },
  });

  if (!user) {
    return res
      .status(400)
      .json({ code: 400, message: "Email tidak terdaftar!" });
  }

  try {
    const newToken = `t-${uuidv4()}`;

    const userUpdated = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        // @ts-ignore
        passwordResetToken: newToken,
      },
    });

    const mailOptions = {
      from: `SIPBUK <${process.env.NODEMAILER_USER}>`,
      to: userUpdated.email,
      subject: "Mengatur ulang Kata Sandi Akun SIPBUK anda",
      html: `<h2>Hallo ${
        userUpdated.fullname
      }!</h2><p>Untuk mereset kata sandi anda di aplikasi SIPBUK (Sistem Pakar Jambu Kristal), silahkan <a href="${`${process.env.BASE_URL}/login/forgot-password?token=${newToken}`}">Klik disini</a> untuk melakukan perubahan kata sandi akun anda</p>`,
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
      if (error) {
        console.log(error);
        res.status(200).json({
          code: 200,
          message:
            "Email untuk ubah kata sandi gagal dikirim! silahkan coba lagi",
        });
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json({
          code: 200,
          message: "Email untuk ubah kata sandi berhasil dikirim!",
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      code: 500,
      message: "Internal server error",
    });
  }
}
