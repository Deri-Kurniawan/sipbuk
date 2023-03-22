import Navbar from "@/components/Navbar";
import SafeLayout from "@/layouts/SafeLayout";
import guavaImg from "@/assets/guava.jpg";
import Question from "@/components/Question";
import { GrPrevious, GrNext } from "react-icons/gr";
import { FormEventHandler, useEffect, useState } from "react";
import Head from "next/head";
import { getCookie, hasCookie } from "cookies-next";

const questionList = [
  {
    sympCode: "G1",
    question: "Daun jambu dilapisi lapisan berwarna hitam seperti arang?",
    image: guavaImg,
  },
  {
    sympCode: "G2",
    question: "Daun memiliki bercak berwarna merah bata?",
    image: guavaImg,
  },
  {
    sympCode: "G3",
    question: "Warna daun berubah menjadi kuning?",
    image: guavaImg,
  },
];

export async function getServerSideProps({ req, res }: { req: any, res: any }) {
  try {
    // @ts-ignore
    const userCookie = JSON.parse(getCookie("user", { req, res }));

    return {
      props: {
        user: userCookie,
      }
    }
  } catch (error) {
    // console.log(error)
    return {
      props: {
        user: null,
      }
    };
  }
}

interface ConsultProps {
  user: any;
}

export default function Consult({ user }: ConsultProps) {
  const [questionOnViewport, setQuestionOnViewPort] = useState({
    id: "question-0",
    index: 0,
  });

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const data = Object.fromEntries(formData.entries());

    const remapData: any = {};

    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        remapData[key] = Number(data[key]);
      }
    }

    console.log(remapData);
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
      if (e.key === "ArrowRight") {
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
      if (e.key === "ArrowLeft") {
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
  }, [questionOnViewport.index]);

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

  return (
    <>
      <Head>
        <title>Konsultasi - SIPBUK</title>
        <meta name="description" content="Sistem Pakar berbasis web ini dapat membantu anda dalam mendiagnosa hama dan penyakit pada tanaman jambu kristal anda, serta dapat memberikan solusi atas masalah yang dialami oleh tanaman jambu kristal anda secara gratis." />
      </Head>
      <Navbar isSticky={false} user={user} />
      <SafeLayout>
        <main className="safe-horizontal-padding my-[16px] md:my-[48px]">
          {/* questions */}
          <form onSubmit={handleFormSubmit}>
            {questionList.map((ql, index) => (
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
                className="capitalize btn btn-active btn-ghost"
                type="submit"
              >
                Yakin dan Diagnosa
              </button>
            </div>
          </form>
          {/* end of questions */}
        </main>
      </SafeLayout>
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
    </>
  );
}
