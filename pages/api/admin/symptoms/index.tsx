import prisma from "@/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method } = req;
    const { info, imageUrl }: { info: string, imageUrl: string } = req.body;

    switch (method) {
        case "POST":
            try {
                const createPestOrDesease = await prisma.symptoms.create({
                    // @ts-ignore
                    data: {
                        info,
                        imageUrl: imageUrl ? imageUrl : "https://res.cloudinary.com/sipbuk/image/upload/v1689001147/symptoms/default.webp",
                    },
                });

                if (!createPestOrDesease) {
                    return res.status(404).json({
                        code: 404,
                        message: "Data gejala gagal disimpan",
                    });
                }

                await prisma.$disconnect();
                res.status(200).json({
                    code: 200,
                    message: "Berhasil menyimpan data gejala",
                    data: createPestOrDesease,
                });
            } catch (error: any) {
                console.log(error);
                res.status(500).json({
                    code: 500,
                    message: "Gagal menyimpan data gejala",
                });
            }
            break;
        case "DELETE":
            try {
                const symptomsOnPestsAndDeseasesHasSymptoms = await prisma.pestsAndDeseasesHasSymptoms.deleteMany({
                    where: {
                        symptomCode: {
                            in: req.body.selectedSymptoms,
                        }
                    }
                });

                if (!symptomsOnPestsAndDeseasesHasSymptoms) {
                    return res.status(404).json({
                        code: 404,
                        message: "Gejala tidak ditemukan",
                    });
                }

                const deleteSymptom = await prisma.symptoms.deleteMany({
                    where: {
                        code: {
                            in: req.body.selectedSymptoms,
                        },
                    },
                });

                if (!deleteSymptom) {
                    return res.status(404).json({
                        code: 404,
                        message: "Gejala tidak ditemukan",
                    });
                }

                await prisma.$disconnect();

                res.status(200).json({
                    code: 200,
                    message: "Berhasil menghapus Gejala",
                    data: symptomsOnPestsAndDeseasesHasSymptoms,
                });
            } catch (error: any) {
                console.log(error);
                res.status(500).json({
                    code: 500,
                    message: "Gagal menghapus Gejala",
                });
            }
            break;
        default:
            res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
            res
                .status(405)
                .end({ code: 405, message: `Method ${method} Not Allowed` });
            break;
    }
}
