import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

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
  const { email, password } = req.body;

  POST.Validation(req, res, req.body);

  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return res
        .status(400)
        .json({ code: 400, message: "Email tidak terdaftar!" });
    }

    if (user.password !== password) {
      return res.status(400).json({ code: 400, message: "Password salah!" });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        code: 400,
        message: `Hallo ${user.fullname}, \nEmail anda belum terverifikasi! \nSilahkan cek email anda`,
      });
    }

    res.status(200).json({ code: 200, message: "Masuk Berhasil!", data: user });

    // res.redirect(200, "/auth/email-verified");
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
    email: string;
    password: string;
  }
) => {
  const { email, password } = payload;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!email) {
    return res
      .status(400)
      .json({ code: 400, message: "Email tidak boleh kosong!" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ code: 400, message: "Email tidak valid!" });
  }

  if (!password) {
    return res
      .status(400)
      .json({ code: 400, message: "Password tidak boleh kosong!" });
  }
};
