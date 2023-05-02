const extLink = (label: string, url: string) =>
  `<a href="${url}" target="_blank">${label}</a>`;

export const symptomsRawData = [
  {
    code: 1,
    info: "Bintik-bintik coklat bekas tusukan pada buah",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 2,
    info: "Buah membusuk ",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 3,
    info: "Pada biji buah muda terdapat bintik-bintik berwarna kehitaman",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 4,
    info: "Bercak coklat pada buah",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 5,
    info: "Buah mengalami kerontokan",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 6,
    info: "Pada batang, daun dan buah terlihat ada serbuk putih",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 7,
    info: "Tanaman di hinggapi banyak semut",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 8,
    info: "Mengalami kerontokan pada saat muncul bunga",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 9,
    info: "Bakal buah mengalami kerontokan",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 10,
    info: "Terdapat lubang-lubang kecil pada daun",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 11,
    info: "Pucuk daun mengulung",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 12,
    info: "Daun mengkerut dan keriting",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 13,
    info: "Kerontokan pada daun",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 14,
    info: "Daun menjadi kering",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 15,
    info: "Terdapat lubang kecil bekas gigitan di buah",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 16,
    info: "Daun memiliki bercak berwarna merah bata",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 17,
    info: "Bercak kering berwarna putih berbentuk oval di daun ",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 18,
    info: "Warna daun berubah menjadi kuning",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 19,
    info: "Daun jambu dilapisi lapisan berwarna hitam seperti arang ",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 20,
    info: "Di daun terlihat banyak bercak hitam",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 21,
    info: "Daun menjadi sobek",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 22,
    info: "Daun berlubang besar",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 23,
    info: "Terdapat bintik bintik memar pada kulit buah",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 24,
    info: "Bintik-bintik hitam pada daun, tangkai, atau kulit buah",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 25,
    info: "Daun menguning",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 26,
    info: "Pertumbuhan tanaman terasa lambat",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 27,
    info: "Akar berubah warna menjadi warna hitam atau coklat",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 28,
    info: "Beberapa bagian tanaman menjadi layu",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
  {
    code: 29,
    info: "Bercak kecil sebesar ukuran jarum",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
  },
];

export const pestsAndDeseasesRawData = [
  {
    code: 1,
    name: "Hama Lalat buah",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
    solution: `
      <ol>
        <li>
          <p>Membersihkan area sekitar tanaman</p>
          <p>Pastikan area sekitar tanaman jambu kristal selalu bersih dari sisa-sisa buah yang jatuh atau buah yang busuk. Sisa-sisa buah yang jatuh dapat menjadi tempat berkembang biaknya hama lalat buah.</p>
        </li>
        <li>
          <p>Pemangkasan cabang dan daun yang terinfeksi</p>
          <p>Cabang atau daun yang terinfeksi oleh hama lalat buah harus segera dipangkas dan dibuang jauh dari tanaman jambu kristal.</p>
        </li>
        <li>
          <p>Menggunakan perangkap lalat buah</p>
          <p>Anda dapat menggunakan perangkap lalat buah untuk menangkap hama lalat buah yang berkeliaran di sekitar tanaman. Pastikan untuk membersihkan perangkap secara teratur.</p>
        </li>
        <li>
          <p>Penggunaan Insektisida</p>
          <p>Anda juga dapat menggunakan insektisida untuk membunuh hama lalat buah. Namun, pastikan untuk memilih insektisida yang aman dan tidak merusak tanaman jambu kristal.</p>
        </li>
        <li>
          <p>Memanfaatkan predator alami</p>
          <p>Beberapa jenis serangga seperti lebah dan capung dapat menjadi predator alami dari hama lalat buah. Anda dapat mempertimbangkan untuk menanam tanaman-tanaman tertentu yang menarik kedatangan serangga-serangga tersebut.</p>
        </li>
        <li>
          <p>Menerapkan rotasi tanaman</p>
          <p>Hama lalat buah dapat bertahan hidup dalam tanah untuk waktu yang lama. Oleh karena itu, melakukan rotasi tanaman dapat membantu mengurangi keberadaan hama lalat buah pada tanaman jambu kristal.</p>
        </li>
      </ol>
      `,
    activeIngredient: `
      <ol>
        <li>
        ${extLink(
          "Mancozeb 80%",
          "https://www.google.com/search?q=Mancozeb%20adalah"
        )}
        </li>
        <li>
        ${extLink(
          "Profenofos",
          "https://www.google.com/search?q=Profenofos%20adalah"
        )}
        </li>
        <li>
        ${extLink(
          "Abamektin",
          "https://www.google.com/search?q=Abamektin%20adalah"
        )}
        </li>
      </ol>
      `,
  },
  {
    code: 2,
    name: "Hama Kutu Putih",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
    solution: `
      <ol>
        <li>
          <p>Mengurangi kepadatan tajuk tanaman</p>
          <p>Karena hama ini menyukai kelembaban, maka dianjurkan untuk mengurangi kepadatan tajuk tanaman dan buah, serta menjaga kebersihan lingkungan di sekitar tanaman.</p>
        </li>
        <li>
          <p>Membersihkan bagian tanaman yang terinfeksi</p>
          <p>Menjaga kebersihan tanaman dengan cara membuang daun atau bagian tanaman yang telah mati atau terinfeksi kutu putih.</p>
        </li>
        <li>
          <p>Memangkas cabang yang terinfeksi</p>
          <p>Memangkas cabang yang terinfeksi kutu putih untuk mengurangi populasi kutu putih dan mencegah penyebaran ke bagian tanaman lain.</p>
        </li>
      </ol>
      `,
    activeIngredient: `
      <ol>
        <li>
        ${extLink(
          "Deltametrin 20gr/ltr",
          "https://www.google.com/search?q=Deltametrin%20adalah"
        )}
        </li>
      </ol>
      `,
  },
  {
    code: 3,
    name: "Hama Ulat Kantong",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
    solution: `
      <ol>
        <li>
          <p><strong>Manual Pemindahan Kantung</strong></p>
          <p>Jika hanya ada sedikit kantung ulat kantong pada tanaman anda, anda bisa mencoba untuk memindahkan kantung-kantung tersebut menggunakan tangan ke daun atau tanaman lain yang tidak terlalu penting. Hal ini dilakukan agar ulat kantong tidak meluas ke tanaman lain.</p>
        </li>
        <li>
          <p><strong>Penggunaan Insektisida</strong></p>
          <p>Jika serangan ulat kantong sudah sangat parah, Anda bisa menggunakan insektisida yang direkomendasikan oleh sistem. Pastikan Anda membaca instruksi dan dosis penggunaannya dengan benar, dan mengenakan perlengkapan keselamatan saat menggunakan insektisida.</p>
        </li>
      </ol>
      `,
    activeIngredient: `
      <ol>
        <li>
        ${extLink(
          "Deltametrin 20gr/ltr",
          "https://www.google.com/search?q=Deltametrin%20adalah"
        )}
        </li>
      </ol>
      `,
  },
  {
    code: 4,
    name: "Hama Belalang",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
    solution: `
      <ol>
        <li>
          <p>Belum ada data</p>
        </li>
      </ol>
      `,
    activeIngredient: `
      <ol>
        <li>Belum ada data</li>
      </ol>
      `,
  },
  {
    code: 5,
    name: "Penyakit Karat Daun",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
    solution: `
      <ol>
        <li>
          <p>Belum ada data</p>
        </li>
      </ol>
      `,
    activeIngredient: `
      <ol>
        <li>Belum ada data</li>
      </ol>
      `,
  },
  {
    code: 6,
    name: "Penyakit Embun Jelaga",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
    solution: `
      <ol>
        <li>
          <p>Belum ada data</p>
        </li>
      </ol>
      `,
    activeIngredient: `
      <ol>
        <li>Belum ada data</li>
      </ol>
      `,
  },
  {
    code: 7,
    name: "Penyakit Busuk Buah",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
    solution: `
      <ol>
        <li>
          <p>Belum ada data</p>
        </li>
      </ol>
      `,
    activeIngredient: `
      <ol>
        <li>Belum ada data</li>
      </ol>
      `,
  },
  {
    code: 8,
    name: "Penyakit Busuk Akar",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1680159231/guava_xysrju.jpg",
    solution: `
      <ol>
        <li>
          <p>Belum ada data</p>
        </li>
      </ol>
      `,
    activeIngredient: `
      <ol>
        <li>Belum ada data</li>
      </ol>
      `,
  },
];

export const uncertaintyValueRawData = [
  { label: "Sangat Yakin", value: 1 },
  { label: "Yakin", value: 0.8 },
  { label: "Cukup Yakin", value: 0.6 },
  { label: "Sedikit Yakin", value: 0.4 },
  { label: "Tidak Yakin", value: 0.2 },
  { label: "Sangat Tidak Yakin", value: 0 },
];

export const pestsAndDeseasesHasSymptomsRawData = [
  { pestAndDeseaseCode: 1, symptomCode: 1, expertCF: 1 },
  { pestAndDeseaseCode: 1, symptomCode: 2, expertCF: 1 },
  { pestAndDeseaseCode: 1, symptomCode: 3, expertCF: 0.4 },
  { pestAndDeseaseCode: 1, symptomCode: 4, expertCF: 1 },
  { pestAndDeseaseCode: 1, symptomCode: 5, expertCF: 1 },
  { pestAndDeseaseCode: 2, symptomCode: 6, expertCF: 1 },
  { pestAndDeseaseCode: 2, symptomCode: 7, expertCF: 0.6 },
  { pestAndDeseaseCode: 2, symptomCode: 8, expertCF: 0.6 },
  { pestAndDeseaseCode: 2, symptomCode: 9, expertCF: 0.6 },
  { pestAndDeseaseCode: 3, symptomCode: 10, expertCF: 1 },
  { pestAndDeseaseCode: 3, symptomCode: 11, expertCF: 1 },
  { pestAndDeseaseCode: 3, symptomCode: 12, expertCF: 0.4 },
  { pestAndDeseaseCode: 3, symptomCode: 13, expertCF: 0.4 },
  { pestAndDeseaseCode: 3, symptomCode: 14, expertCF: 1 },
  { pestAndDeseaseCode: 3, symptomCode: 15, expertCF: 0.4 },
  { pestAndDeseaseCode: 4, symptomCode: 21, expertCF: 0.4 },
  { pestAndDeseaseCode: 4, symptomCode: 22, expertCF: 0.4 },
  { pestAndDeseaseCode: 5, symptomCode: 4, expertCF: 1 },
  { pestAndDeseaseCode: 5, symptomCode: 14, expertCF: 0.4 },
  { pestAndDeseaseCode: 5, symptomCode: 16, expertCF: 0.4 },
  { pestAndDeseaseCode: 5, symptomCode: 17, expertCF: 1 },
  { pestAndDeseaseCode: 5, symptomCode: 18, expertCF: 0.6 },
  { pestAndDeseaseCode: 5, symptomCode: 13, expertCF: 1 },
  { pestAndDeseaseCode: 6, symptomCode: 19, expertCF: 1 },
  { pestAndDeseaseCode: 6, symptomCode: 20, expertCF: 1 },
  { pestAndDeseaseCode: 6, symptomCode: 13, expertCF: 0.8 },
  { pestAndDeseaseCode: 7, symptomCode: 13, expertCF: 0.4 },
  { pestAndDeseaseCode: 7, symptomCode: 23, expertCF: 1 },
  { pestAndDeseaseCode: 7, symptomCode: 24, expertCF: 0.6 },
  { pestAndDeseaseCode: 7, symptomCode: 29, expertCF: 1 },
  { pestAndDeseaseCode: 8, symptomCode: 13, expertCF: 1 },
  { pestAndDeseaseCode: 8, symptomCode: 25, expertCF: 1 },
  { pestAndDeseaseCode: 8, symptomCode: 26, expertCF: 1 },
  { pestAndDeseaseCode: 8, symptomCode: 27, expertCF: 1 },
  { pestAndDeseaseCode: 8, symptomCode: 28, expertCF: 1 },
];

export const userDemoAccount = {
  fullname: "SIPBUK Demo Account",
  email: "demo@sipbuk.com",
  password: "demo123", // must be AES encrypted while seeding
  isVerified: true,
  verifyToken: "vt-573d4ffb-a0e6-4b02-be9e-44d487dd090f",
  authToken: null,
  passwordResetToken: null,
};
