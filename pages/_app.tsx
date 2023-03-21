import { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Toaster
        position="bottom-left"
        reverseOrder={false}
        gutter={8}
      />
      <div className={inter.className}>
        <Component className={inter.className} {...pageProps} />
      </div>
    </>
  );
}
