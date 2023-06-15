const extLink = (label: string, url: string) =>
  `<a href="${url}" target="_blank">${label}</a>`;

export const symptomsRawData = [
  {
    code: 1,
    info: "Bintik-bintik coklat bekas tusukan pada buah",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 2,
    info: "Buah membusuk",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1684642183/buah_membusuk_il6vmw.jpg",
  },
  {
    code: 3,
    info: "Pada biji buah muda terdapat bintik-bintik berwarna kehitaman",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 4,
    info: "Bercak coklat pada buah",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 5,
    info: "Buah mengalami kerontokan",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 6,
    info: "Pada batang, daun dan buah terlihat ada serbuk putih",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684643321/Pada_batang_daun_dan_buah_terlihat_ada_serbuk_putih_xoa5mz.png",
  },
  {
    code: 7,
    info: "Tanaman di hinggapi banyak semut",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684711280/Tanaman_di_hinggapi_banyak_semut_kwkm7k.jpg",
  },
  {
    code: 8,
    info: "Mengalami kerontokan pada saat muncul bunga",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 9,
    info: "Bakal buah mengalami kerontokan",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1684694938/Bakal_buah_mengalami_kerontokan_bopr41.png",
  },
  {
    code: 10,
    info: "Terdapat lubang-lubang kecil pada daun",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 11,
    info: "Pucuk daun mengulung",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 12,
    info: "Daun mengkerut dan keriting",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 13,
    info: "Kerontokan pada daun",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 14,
    info: "Daun menjadi kering",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 15,
    info: "Terdapat lubang kecil bekas gigitan di buah",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 16,
    info: "Daun memiliki bercak berwarna merah bata",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684695414/Daun_memiliki_bercak_berwarna_merah_bata_vpt4cr.png",
  },
  {
    code: 17,
    info: "Bercak kering berwarna putih berbentuk oval di daun",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 18,
    info: "Warna daun berubah menjadi kuning",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 19,
    info: "Daun jambu dilapisi lapisan berwarna hitam seperti arang",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 20,
    info: "Di daun terlihat banyak bercak hitam",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 21,
    info: "Daun menjadi sobek",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 22,
    info: "Daun berlubang besar",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684695412/Daun_berlubang_besar_jtztxz.jpg",
  },
  {
    code: 23,
    info: "Terdapat bintik bintik memar pada kulit buah",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 24,
    info: "Bintik-bintik hitam pada daun, tangkai, atau kulit buah",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 25,
    info: "Daun menguning",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 26,
    info: "Pertumbuhan tanaman terasa lambat",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 27,
    info: "Akar berubah warna menjadi warna hitam atau coklat",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 28,
    info: "Beberapa bagian tanaman menjadi layu",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
  {
    code: 29,
    info: "Bercak kecil sebesar ukuran jarum",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
  },
];

export const pestsAndDeseasesRawData = [
  {
    code: 1,
    name: "Hama Lalat buah",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
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
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
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
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
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
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
    solution: `
      <ol>
        <li>
          <p>Tanam tumbuhan pengusir belalang, seperti tanaman lavender atau serai, di sekitar area pertanian atau kebun Anda. Belalang akan menghindari daerah yang memiliki bau-bauan dari tanaman-tanaman ini.</p>
        </li>
        <li>
          <p>Pasang perangkap belalang di area pertanian atau kebun Anda. Perangkap belalang dapat dibuat dengan menggunakan botol plastik bekas yang diberi cairan manis atau minuman beralkohol sebagai umpannya.</p>
        </li>
        <li>
          <p>Gunakan insektisida pengusir belalang yang mengandung bahan aktif seperti lambda-cyhalothrin atau deltamethrin. Insektisida ini biasanya tersedia dalam bentuk cairan atau serbuk yang dapat dicampur dengan air.</p>
          <p>Sebelum menggunakan insektisida, pastikan Anda membaca instruksi dan dosis penggunaannya dengan benar, serta mengenakan perlengkapan keselamatan seperti masker dan sarung tangan.</p>
        </li>
      </ol>
      `,
    activeIngredient: `
      <ol>
        <li>
          ${extLink(
            "Deltamethrin 2.5gr/ltr",
            "https://www.google.com/search?q=Deltamethrin%20adalah"
          )}
        </li>
        <li>
          ${extLink(
            "Sihalotrin 5gr/ltr",
            "https://www.google.com/search?q=Sihalotrin%20adalah"
          )}
        </li>
      </ol>
    `,
  },
  {
    code: 5,
    name: "Penyakit Karat Daun",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
    solution: `
    <ol>
      <li>
        <p>Menjaga kebersihan lingkungan sekitar tanaman</p>
        <p>Karat daun seringkali menyerang tanaman yang tumbuh di lingkungan yang lembab dan kotor. Oleh karena itu, pastikan lingkungan sekitar tanaman tetap bersih dan kering.</p>
      </li>
      <li>
        <p>Membuang daun-daun yang terinfeksi</p>
        <p>Jika sudah ada daun yang terinfeksi karat daun, sebaiknya segera dipotong dan dibuang jauh dari tanaman. Hal ini bertujuan agar spora penyebab penyakit tidak menyebar ke daun-daun lain.</p>
      </li>
      <li>
        <p>Penggunaan fungisida</p>
        <p>Jika serangan penyakit sudah parah, Anda bisa menggunakan fungisida yang direkomendasikan oleh sistem. Pastikan Anda membaca instruksi dan dosis penggunaannya dengan benar, dan mengenakan perlengkapan keselamatan saat menggunakan fungisida.</p>
      </li>
    </ol>`,
    activeIngredient: `
    <ol>
      <li> ${extLink(
        "Propineb 70%",
        "https://www.google.com/search?q=Propineb%20adalah"
      )}</li>
      <li> ${extLink(
        "Tebuconazole 25 gr/ltr",
        "https://www.google.com/search?q=Tebuconazole%20adalah"
      )}</li>
      <li>${extLink(
        "Triadimenol 25 gr/ltr",
        "https://www.google.com/search?q=Triadimenol%20adalah"
      )}</li>
    </ol>
    `,
  },
  {
    code: 6,
    name: "Penyakit Embun Jelaga",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
    solution: `
      <ol>
        <li>
          <p>Menjaga sirkulasi udara di sekitar tanaman</p>
          <p>
            Embun jelaga seringkali menyerang tanaman yang tumbuh di daerah yang lembab dan memiliki sirkulasi udara yang buruk. Oleh karena itu, pastikan sirkulasi udara di sekitar tanaman tetap baik dengan melakukan pemangkasan daun-daun yang terlalu rapat dan menjaga jarak tanam yang cukup antara satu tanaman dengan tanaman lainnya.
          </p>
        </li>
        <li>
          <p>Mengurangi kelembaban di sekitar tanaman</p>
          <p>
            Embun jelaga dapat muncul pada daun yang basah atau lembab. Oleh karena itu, pastikan tanaman tidak terlalu sering disiram dan menghindari penyiraman pada malam hari. Jika terlalu lembab, dapat mempertimbangkan penggunaan pengering udara atau dehumidifier di sekitar tanaman.
          </p>
        </li>
        <li>
          <p>Penggunaan fungisida</p>
          <p>
            Jika serangan penyakit sudah parah, Anda bisa menggunakan fungisida yang direkomendasikan oleh sistem. Pastikan Anda membaca instruksi dan dosis penggunaannya dengan benar, dan mengenakan perlengkapan keselamatan saat menggunakan fungisida.
          </p>
        </li>
      </ol>
    `,
    activeIngredient: `
      <ol>
        <li> ${extLink(
          "Propineb 70%",
          "https://www.google.com/search?q=Propineb%20adalah"
        )}
        </li>
        <li>
          ${extLink(
            "Triforine 50 gr/ltr",
            "https://www.google.com/search?q=Triforine%20adalah"
          )}
        </li>
        <li>
          ${extLink(
            "Tebuconazole 25 gr/ltr",
            "https://www.google.com/search?q=Tebuconazole%20adalah"
          )}
        </li>
      </ol>
    `,
  },
  {
    code: 7,
    name: "Penyakit Busuk Buah",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
    solution: `
      <ol>
        <li>
          <p>Memetik buah yang sudah matang</p>
          <p>Pada saat panen, pastikan Anda memetik buah yang sudah matang sepenuhnya. Buah yang masih setengah matang atau belum matang dapat membusuk lebih cepat, sehingga menjadi mudah terserang penyakit busuk buah.</p>
        </li>
        <li>
          <p>Menjaga kebersihan lingkungan</p>
          <p>Pastikan lingkungan sekitar kebun tetap bersih dan terjaga. Buang daun atau sisa-sisa tanaman yang sudah mati, sehingga tidak menimbulkan kelembaban yang berlebihan dan mempercepat perkembangan jamur.</p>
        </li>
        <li>
          <p>Memisahkan buah yang terinfeksi</p>
          <p>Jika ada buah yang sudah terinfeksi penyakit busuk buah, segera pisahkan dari buah yang sehat. Hal ini dapat membantu mengurangi penyebaran penyakit ke buah-buah yang masih sehat.</p>
        </li>
        <li>
          <p>Penggunaan fungisida</p>
          <p>Jika serangan penyakit sudah parah, Anda bisa menggunakan fungisida yang direkomendasikan oleh sistem. Pastikan Anda membaca instruksi dan dosis penggunaannya dengan benar, dan mengenakan perlengkapan keselamatan saat menggunakan fungisida.</p>
        </li>
      </ol>
    `,
    activeIngredient: `
      <ol>
        <li>
          ${extLink(
            "Mancozeb 50 gr/ltr",
            "https://www.google.com/search?q=Mancozeb%20adalah"
          )}
        </li>
        <li>
          ${extLink(
            "Mancozeb 80wp",
            "https://www.google.com/search?q=Mancozeb%20adalah"
          )}
        </li>
      </ol>
    `,
  },
  {
    code: 8,
    name: "Penyakit Busuk Akar",
    imageUrl:
      "https://res.cloudinary.com/dgwvwgnvu/image/upload/v1684697221/placeholder_bvwz3t.png",
    solution: `
      <ol>
        <li>
          <p><strong>Pengaturan Drainase</strong></p>
          <p>Penyakit busuk akar disebabkan oleh lingkungan yang lembab dan tanah yang tergenang air. Pastikan area tanaman memiliki drainase yang cukup agar air tidak tergenang di sekitar akar tanaman.</p>
        </li>
        <li>
          <p><strong>Perbaikan Tanah</strong></p>
          <p>Jika tanah di sekitar tanaman terlalu padat atau kurang subur, cobalah untuk menambahkan kompos atau pupuk organik ke dalam tanah agar tanah menjadi lebih gembur dan subur. Hal ini akan membantu memperbaiki sistem perakaran tanaman dan meningkatkan daya tahan terhadap penyakit.</p>
        </li>
        <li>
          <p><strong>Penggunaan Fungisida</strong></p>
          <p>Jika penyakit sudah sangat parah, Anda bisa menggunakan fungisida yang direkomendasikan oleh sistem. Pastikan Anda membaca instruksi dan dosis penggunaannya dengan benar, dan mengenakan perlengkapan keselamatan saat menggunakan fungisida.</p>
        </li>
      </ol>
      `,
    activeIngredient: `
      <ol>
        <li>
          ${extLink(
            "Pupuk Hayati",
            "https://www.google.com/search?q=Pupuk%20Hayati%20adalah"
          )}
        </li>
        <li>
          ${extLink(
            "Trikonazol 20%",
            "https://www.google.com/search?q=Trikonazol%20adalah"
          )}
        </li>
        <li>
          ${extLink(
            "Mankozeb 64%",
            "https://www.google.com/search?q=Mankozeb%20adalah"
          )}
        </li>
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

export const userInputSimulation = [
  {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0.4,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0.6,
    20: 0.8,
    21: 0,
    22: 0,
    23: 0,
    24: 0,
    25: 0,
    26: 0,
    27: 0,
    28: 0,
    29: 0,
  },
];
