import Navbar from "@/components/Navbar";
import Question from "@/components/Question";
import { GrPrevious, GrNext } from "react-icons/gr";
import { FormEventHandler, Fragment, useEffect, useRef, useState } from "react";
import Head from "next/head";
import { getCookie, hasCookie } from "cookies-next";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { NextApiRequest, NextApiResponse } from "next";
import { AiOutlineQuestionCircle } from "react-icons/ai";

type getServerSidePropsType = {
  req: NextApiRequest;
  res: NextApiResponse;
};

export async function getServerSideProps({ req, res }: getServerSidePropsType) {
  const prisma = new PrismaClient();
  const isCookieExist = hasCookie("user", { req, res });

  const fetchSymptoms = await prisma.symptoms.findMany({
    orderBy: {
      code: "asc",
    },
  });

  await prisma.$disconnect();

  const questionList = fetchSymptoms.map(({ code, info, imageUrl }: { code: number, info: string, imageUrl: string }) => ({
    sympCode: code,
    question: info,
    image: imageUrl,
  }));

  try {
    // @ts-ignore
    const userCookie = isCookieExist ? JSON.parse(getCookie("user", { req, res })) : null;

    return {
      props: {
        user: userCookie,
        questionList: JSON.parse(JSON.stringify(questionList)),
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {
        user: null,
        questionList: JSON.parse(JSON.stringify(questionList)),
      }
    };
  }
}

interface ConsultProps {
  user: {
    id: string;
    email: string;
    fullname: string;
    password: string;
    isVerified: boolean;
  } | null;
  questionList: {
    sympCode: number;
    question: string;
    image: string;
  }[];
}

export default function Consult({ user, questionList }: ConsultProps) {
  const [fetchIsLoading, setFetchIsLoading] = useState(false);
  const [questionOnViewport, setQuestionOnViewPort] = useState({
    id: "question-0",
    index: 0,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (e: any) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    const remapDataToObject: any = {};

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        remapDataToObject[key] = Number(data[key]);
      }
    }

    // check if value is 0 for all keys
    const isAllValueZero = Object.values(remapDataToObject).every(
      (value) => value === 0
    );

    if (isAllValueZero) {
      toast.error("Mohon pilih setidaknya salah satu jawaban selain 'Sangat Tidak Yakin");
      return;
    }

    // manipulate data for test purpose (development only)
    // remapDataToObject["13"] = 0.4; //sedikit yakin
    // remapDataToObject["19"] = 0.6; // cukup yakin
    // remapDataToObject["20"] = 0.8; // yakin

    const remapDataToArray = [remapDataToObject];

    const fetchCertaintyFactorInferenceEngine = (async () => {
      setFetchIsLoading(true);

      return await fetch("/api/inference-engine", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: remapDataToArray,
          userId: user === null ? "" : user.id,
        }),
      })
    });

    toast.promise(fetchCertaintyFactorInferenceEngine()
      .then((res) => res.json())
      .then((res) => {
        if (typeof window !== undefined && !user) {
          const diagnosesHistoryId = localStorage.getItem("diagnosesHistoryId");

          if (diagnosesHistoryId === null) {
            const newData = [res.diagnoseId];
            localStorage.setItem("diagnosesHistoryId", JSON.stringify(newData));
          } else {
            const oldData = JSON.parse(diagnosesHistoryId);
            const newData = [...oldData, res.diagnoseId];
            localStorage.setItem("diagnosesHistoryId", JSON.stringify(newData));
          }
        }

        router.push(`/consult/${res.diagnoseId}`);
      })
      .catch(() => {
        toast.error('Sistem gagal mendiagnosa, ada kesalahan pada sistem', {
          duration: 5000,
        });
        setFetchIsLoading(false);
      }), {
      loading: 'Sistem sedang mendiagnosa...',
      success: 'Sistem berhasil mendiagnosa',
      error: 'Sistem gagal mendiagnosa',
    }, {
      duration: 5000,
    });

  };

  const handleClickNextQuestion = () => {
    const nextQuestionIndex = questionOnViewport.index + 1;
    if (nextQuestionIndex < questionList.length) {
      const nextQuestion = document.getElementById(
        `question-${nextQuestionIndex}`
      );
      setQuestionOnViewPort({
        id: `question-${nextQuestionIndex}`,
        index: nextQuestionIndex,
      });
      nextQuestion?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleClickPrevQuestion = () => {
    const prevQuestionIndex = questionOnViewport.index - 1;
    if (prevQuestionIndex >= 0) {
      const prevQuestion = document.getElementById(
        `question-${prevQuestionIndex}`
      );
      setQuestionOnViewPort({
        id: `question-${prevQuestionIndex}`,
        index: prevQuestionIndex,
      });
      prevQuestion?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    const handleRightArrowKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "ArrowRight") {
        const nextQuestionIndex = questionOnViewport.index + 1;
        if (nextQuestionIndex < questionList.length) {
          const nextQuestionId = `question-${nextQuestionIndex}`;
          const nextQuestionElement = document.getElementById(nextQuestionId);

          if (nextQuestionElement) {
            setQuestionOnViewPort({
              id: nextQuestionId,
              index: nextQuestionIndex,
            });
            nextQuestionElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }
      }
    };

    const handleLeftArrowKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "ArrowLeft") {
        const prevQuestionIndex = questionOnViewport.index - 1;
        if (prevQuestionIndex >= 0) {
          const prevQuestionId = `question-${prevQuestionIndex}`;
          const prevQuestionElement = document.getElementById(prevQuestionId);

          if (prevQuestionElement) {
            setQuestionOnViewPort({
              id: prevQuestionId,
              index: prevQuestionIndex,
            });
            prevQuestionElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }
      }
    };

    document.addEventListener("keydown", handleRightArrowKey);
    document.addEventListener("keydown", handleLeftArrowKey);

    return () => {
      document.removeEventListener("keydown", handleRightArrowKey);
      document.removeEventListener("keydown", handleLeftArrowKey);
    };
  }, [questionOnViewport.index, questionList.length]);

  useEffect(() => {
    const questionElements = document.querySelectorAll(".query-question");
    questionElements.forEach((questionElement) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setQuestionOnViewPort(() => {
                const id = entry.target.id;
                const index = parseInt(id.split("-")[1]);
                return { id, index };
              });
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(questionElement);
    });
  }, []);

  useEffect(() => {
    const handleCtrlEnter = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter" && !fetchIsLoading) {
        formRef && formRef.current && formRef.current.requestSubmit();
      }
    };

    document.addEventListener("keydown", handleCtrlEnter);

    return () => {
      document.removeEventListener("keydown", handleCtrlEnter);
    };
  }, [fetchIsLoading])

  return (
    <>
      <Head>
        <title>Konsultasi - SIPBUK</title>
        <meta name="description" content="Sistem Pakar berbasis web ini dapat membantu anda dalam mendiagnosa hama dan penyakit pada tanaman jambu kristal anda, serta dapat memberikan solusi atas masalah yang dialami oleh tanaman jambu kristal anda secara gratis." />
      </Head>
      <Navbar isSticky={false} user={user} />
      <main className="safe-horizontal-padding mt-[16px] md:mt-[48px]">
        {questionList && questionList?.length > 0 ? (
          <Fragment>
            <div className="flex flex-col items-center justify-center text-center my-[112px] lg:my-[172px]">
              <h4 className="mb-3 text-3xl font-bold max-w-[552px]">
                Lingkungan Konsultasi
              </h4>
              <p className="mb-6 text-base max-w-[552px]">
                Dalam lingkungan konsultasi, anda akan diberikan beberapa pertanyaan pilihan, yang harus anda pilih sesuai dengan yang anda ketahui atau anda yakini.
              </p>
              <a href="#question-start"
                className={`capitalize btn btn-active btn-ghost`}
                type="submit"
              >
                Memulai
              </a>
            </div>
            {/* questions */}
            <form ref={formRef} onSubmit={handleFormSubmit} id="question-start">
              {questionList.map((ql: any, index: number) => (
                <div
                  key={index}
                  className="query-question"
                  id={`question-${index}`}
                >
                  <Question {...ql} index={index} />
                </div>
              ))}
              <div className="flex flex-col items-center justify-center text-center mb-[112px] lg:mb-[172px]">
                <h4 className="mb-3 text-3xl font-bold max-w-[552px]">
                  Apakah anda sudah yakin dengan semua jawaban anda?
                </h4>
                <p className="mb-6 text-base max-w-[552px]">
                  Jika belum yakin, anda dapat mengeceknya kembali. Jika sudah
                  yakin, anda bisa klik tombol <b>*Yakin dan Diagnosa*</b> berikut
                </p>
                <button
                  className={`${fetchIsLoading ? 'loading' : ''} capitalize btn btn-active btn-ghost`}
                  type="submit"
                  disabled={fetchIsLoading}
                >
                  {fetchIsLoading ? 'Memproses...' : 'Yakin dan Diagnosa'}
                </button>
              </div>
            </form>
            {/* end of questions */}
          </Fragment>
        ) : (
          <div className="flex flex-col items-center justify-center text-center mb-[112px] lg:mb-[172px]">
            <h4 className="mb-3 text-3xl font-bold max-w-[552px]">
              Maaf, terjadi kesalahan
            </h4>
            <p className="mb-6 text-base max-w-[552px]">
              Terjadi kesalahan pada sistem. Silahkan coba lagi nanti.
            </p>
            <Link href="/" className="capitalize btn btn-active btn-ghost">
              Kembali ke Beranda
            </Link>
          </div>
        )}
      </main>
      {/* floating question navigator bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white h-[72px] border-t border-black/50">
        <div className="flex flex-row items-center justify-between h-full gap-4 md:gap-0">
          {/* previous */}
          <button
            className="flex-1 md:flex-none btn btn-ghost"
            onClick={handleClickPrevQuestion}
          >
            <GrPrevious className="text-lg font-extrabold" /> &nbsp;
            <p className="hidden text-base font-bold md:block">
              Pertanyaan Sebelumnya
            </p>
          </button>
          {/* middle */}
          <p className="text-base font-bold">
            <span>
              {questionOnViewport.index + 1} dari {questionList.length}
            </span>
          </p>
          {/* next */}
          <button
            className="flex-1 md:flex-none btn btn-ghost"
            onClick={handleClickNextQuestion}
          >
            <p className="hidden text-base font-bold md:block">
              Pertanyaan Selanjutnya
            </p>{" "}
            &nbsp;
            <GrNext className="text-lg font-extrabold" />
          </button>
        </div>
      </div>

      {/* floating shortcut help */}
      <label htmlFor="kbd-modal" className="fixed right-0 hidden lg:block hover:cursor-help bottom-1/4" title="Pintasan Papan Ketik">
        <div className="flex items-center justify-center w-12 h-10 rounded-tl-lg rounded-bl-lg shadow-lg bg-primary">
          <AiOutlineQuestionCircle className="text-3xl" />
        </div>
      </label>
      {/* end of floating shortcut help */}

      {/* floating shorcut help modal */}
      <input type="checkbox" id="kbd-modal" className="modal-toggle" />
      <div className="modal">
        <div className="w-11/12 max-w-3xl modal-box">
          <h3 className="text-4xl font-bold text-center">Pintasan Papan Ketik</h3>
          <div className="py-6">
            <div className="w-full overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>Pengikat Kunci</th>
                    <th>Fungsi</th>
                    <th>Coba Fungsi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <kbd className="kbd">Ctrl</kbd>
                      <span className="px-2">+</span>
                      <kbd className="kbd">▶︎</kbd>
                    </td>
                    <td>Pertanyaan Selanjutnya</td>
                    <td><button className="btn" onClick={handleClickNextQuestion}>Coba</button></td>
                  </tr>
                  <tr>
                    <td>
                      <kbd className="kbd">Ctrl</kbd>
                      <span className="px-2">+</span>
                      <kbd className="kbd">◀︎</kbd>
                    </td>
                    <td>Pertanyaan Sebelumnya</td>
                    <td><button className="btn" onClick={handleClickPrevQuestion}>Coba</button></td>
                  </tr>
                  <tr>
                    <td>
                      <kbd className="kbd">Ctrl</kbd>
                      <span className="px-2">+</span>
                      <kbd className="kbd">Enter</kbd>
                    </td>
                    <td>Selesai dan Diagnosa</td>
                    <td><button className="btn" onClick={() => {
                      if (!fetchIsLoading) {
                        formRef && formRef.current && formRef.current.requestSubmit();
                      }
                    }}>Coba</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-action">
            <label htmlFor="kbd-modal" className="btn">Tutup</label>
          </div>
        </div>
      </div>
      {/* end of floating shorcut help modal */}
    </>
  );
}
