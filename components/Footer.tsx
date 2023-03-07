import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <>
      <div className="px-[20px] lg:px-[119px]">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center h-[80px] text-base md:text-base md:gap-5">
          <p>©{new Date().getFullYear()} SIPBUK All rights reserved.</p>
          <div className="flex flex-row gap-1">
            {/* Terms modal trigger */}
            <label htmlFor="terms-modal" className="hover:cursor-pointer">
              Terms
            </label>
            <span className="hover:cursor-default"> • </span>
            {/* Policy modal trigger */}
            <label htmlFor="policy-modal" className="hover:cursor-pointer">
              Policy
            </label>
          </div>
        </div>
      </div>
      {/* modals */}

      {/* Terms modal */}
      <input type="checkbox" id="terms-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-6/12 max-w-5xl px-[108px]">
          <h3 className="text-4xl font-bold text-center">Terms</h3>
          <div className="py-4">
            <p>
              Berikut adalah <b>terms</b> atau <b>ketentuan</b> dari aplikasi
              SIPBUK:
            </p>
            <ol className="list-decimal">
              <li>
                Hama dan penyakit yang sering menyerang tanaman jambu kristal
                akan diidentifikasi oleh sistem pakar ini.
              </li>
              <li>
                Sistem pakar akan memberikan solusi yang tepat untuk mengatasi
                masalah hama dan penyakit pada tanaman jambu kristal.
              </li>
              <li>
                Data mengenai gejala dan penanganan hama dan penyakit pada
                tanaman jambu kristal akan disimpan dalam basis pengetahuan
                sistem pakar.
              </li>
              <li>
                Dengan menggunakan aplikasi sistem pakar ini, diagnosa hama dan
                penyakit pada tanaman jambu kristal dapat dilakukan secara cepat
                dan akurat.
              </li>
              <li>
                Aplikasi sistem pakar ini akan memberikan rekomendasi tindakan
                yang sesuai untuk mengatasi masalah hama dan penyakit pada
                tanaman jambu kristal berdasarkan gejala yang terjadi.
              </li>
              <li>
                Sistem pakar ini akan terus diperbarui dengan data mengenai hama
                dan penyakit pada tanaman jambu kristal untuk meningkatkan
                akurasi diagnosa dan solusi yang diberikan.
              </li>
              <li>
                Melalui aplikasi sistem pakar ini, petani atau ahli pertanian
                dapat dengan mudah mendapatkan informasi mengenai hama dan
                penyakit pada tanaman jambu kristal serta cara penanganannya.
              </li>
              <li>
                Pengguna aplikasi sistem pakar ini dapat memasukkan gejala yang
                terjadi pada tanaman jambu kristal dan sistem pakar akan
                memberikan diagnosa serta rekomendasi tindakan yang tepat.
              </li>
            </ol>
            <div className="mt-4 flex justify-center">
              <label htmlFor="terms-modal" className="btn btn-active btn-ghost">
                Saya Mengerti
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Policy modal */}
      <input type="checkbox" id="policy-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-6/12 max-w-5xl px-[108px]">
          <h3 className="text-4xl font-bold text-center">Policy</h3>
          <div className="py-4">
            <p>
              Berikut adalah <b>policy</b> atau <b>kebijakan</b> dari aplikasi
              SIPBUK:
            </p>
            <ol className="list-decimal">
              <li>
                Aplikasi sistem pakar ini hanya bertujuan untuk memberikan
                solusi dan rekomendasi penanganan terhadap masalah hama dan
                penyakit pada tanaman jambu kristal, dan tidak boleh digunakan
                untuk tujuan lain.
              </li>
              <li>
                Aplikasi ini tidak bertanggung jawab atas kerugian atau
                kerusakan yang terjadi akibat penggunaan informasi yang
                diberikan oleh sistem pakar ini.
              </li>
              <li>
                Informasi dan data yang digunakan dalam aplikasi ini bersumber
                dari sumber yang terpercaya dan diverifikasi, namun tetap harus
                disesuaikan dengan kondisi lingkungan dan tanaman di lokasi
                pengguna.
              </li>

              <li>
                Aplikasi ini dapat diakses oleh siapa saja tanpa biaya, namun
                pengguna diharapkan memberikan informasi yang benar dan lengkap
                mengenai gejala yang terjadi pada tanaman jambu kristal.
              </li>
              <li>
                Penggunaan aplikasi ini dianggap sebagai persetujuan terhadap
                syarat dan ketentuan yang berlaku.
              </li>

              <li>
                Penggunaan aplikasi sistem pakar diagnosa hama dan penyakit pada
                tanaman jambu kristal harus dilakukan dengan etika dan tanggung
                jawab.
              </li>

              <li>
                Aplikasi ini akan terus diperbarui dan dikembangkan untuk
                meningkatkan akurasi dan kualitas informasi yang diberikan.
              </li>

              <li>
                Aplikasi sistem pakar ini tidak dapat menggantikan peran dan
                tanggung jawab ahli pertanian atau petani dalam melakukan
                diagnosa dan penanganan masalah hama dan penyakit pada tanaman
                jambu kristal.
              </li>
            </ol>
            <div className="mt-4 flex justify-center">
              <label
                htmlFor="policy-modal"
                className="btn btn-active btn-ghost"
              >
                Saya Mengerti
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
