"use client";

import Navbar from "@/components/Navbar";
import SafeLayout from "@/layouts/SafeLayout";
import guavaImg from "@/assets/guava.jpg";
import Question from "@/components/Question";
import { GrPrevious, GrNext } from "react-icons/gr";
import { FormEventHandler, useEffect, useState } from "react";

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

export default function Consult() {
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
      <Navbar isSticky={false} />
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
                <Question {...ql} />
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
            onClick={() => {
              const prevQuestionIndex = questionOnViewport.index - 1;
              if (prevQuestionIndex >= 0) {
                const prevQuestion = document.getElementById(
                  `question-${prevQuestionIndex}`
                );
                prevQuestion?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
          >
            <GrPrevious className="text-lg font-extrabold" /> &nbsp;
            <p className="hidden text-base font-bold md:block">
              Pertanyaan Sebelumnya
            </p>
          </button>
          {/* middle */}
          <p className="text-base font-bold">
            {questionOnViewport.index + 1} dari {questionList.length}
          </p>
          {/* next */}
          <button
            className="flex-1 md:flex-none btn btn-ghost"
            onClick={() => {
              const nextQuestionIndex = questionOnViewport.index + 1;
              if (nextQuestionIndex < questionList.length) {
                const nextQuestion = document.getElementById(
                  `question-${nextQuestionIndex}`
                );
                nextQuestion?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            }}
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
