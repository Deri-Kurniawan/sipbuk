/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable import/no-anonymous-default-export */

import Link from "next/link";
import { useRouter } from "next/router";
import { useConfig } from "nextra-theme-docs";

export default {
  faviconGlyph: "🌿",
  logo: <span>Dokumentasi SIPBUK</span>,
  logoLink: "/docs",
  docsRepositoryBase: `https://github.com/deri-kurniawan/sipbuk/tree/development`,
  project: {
    link: "https://github.com/deri-kurniawan/sipbuk",
  },
  search: {
    placeholder: "Cari Dokumentasi...",
    emptyResult: () => (
      <span class="nx-block nx-select-none nx-p-8 nx-text-center nx-text-sm nx-text-gray-400">
        Tidak ada hasil yang ditemukan
      </span>
    ),
  },
  banner: {
    text: () => {
      return (
        <span>
          🌿 Situs Resmi{" "}
          <Link href="/" className="text-blue-400">
            sipbuk.deri.my.id
          </Link>{" "}
          🌿
        </span>
      );
    },
    key: "official-website",
    dismissible: true,
  },
  editLink: {
    text: "Edit halaman ini",
  },
  themeSwitch: {
    useOptions() {
      return {
        light: "Terang",
        dark: "Gelap",
        system: "Sistem",
      };
    },
  },
  feedback: {
    labels: "documentation",
    content: "Saran dan masukan",
  },
  head: () => {
    const { asPath, defaultLocale, locale } = useRouter();
    const { frontMatter } = useConfig();
    const url =
      process.env.APP_URL +
      (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

    return (
      <>
        <meta property="og:url" content={url} />
        <meta property="og:title" content={frontMatter.title || "SIPBUK"} />
        <meta
          property="og:description"
          content={frontMatter.description || "Sistem pakar jambu kristal"}
        />
      </>
    );
  },
  navigation: {
    prev: true,
    next: true,
  },
  footer: {
    text: (
      <p>
        ©{new Date().getFullYear()}{" "}
        <Link href="/" className="text-blue-400">
          SIPBUK
        </Link>
        . All right reserved.
      </p>
    ),
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== "/") {
      return {
        titleTemplate: "%s - SIPBUK",
      };
    }
  },
};
