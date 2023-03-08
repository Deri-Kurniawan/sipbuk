import Image from "next/image";
import RadioButton from "./RadioButton";

interface Props {
  sympCode: string;
  image: string | any;
  question?: string;
  index: number;
}

export default function Question({
  sympCode,
  image,
  question = "Pertanyaan Tidak Diisi",
  index,
}: Props) {
  return (
    <div className="grid grid-flow-row grid-cols-2 items-center gap-[40px] md:gap-[80px] lg:gap-[50px] py-[56px] lg:py-[86px]">
      {/* image */}
      <div className="col-span-2 md:col-span-1">
        <Image
          src={image}
          className="object-cover md:h-[332px] md:w-[380px] lg:h-auto lg:w-[480px] bg-primary rounded-2xl"
          alt=""
          priority
        />
      </div>
      {/* info */}
      <div className="col-span-2 md:col-span-1">
        <div className="bg-primary text-sm mb-[10px] p-2 rounded-md">
          Pertanyaan {++index}
        </div>
        <h2 className="text-lg font-bold mb-[10px]">
          Apakah gejala berikut ada pada tanaman anda?
        </h2>
        <h3 className="mb-4 text-3xl font-bold">{question}</h3>
        <p className="mb-4 text-sm text-red-500">
          *Pilihlah sesuai dengan tingkat keyakinan anda
        </p>
        <RadioButton sympCode={sympCode} />
      </div>
    </div>
  );
}
