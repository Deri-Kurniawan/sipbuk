import { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import NextNProgressbar from "nextjs-progressbar";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgressbar
        color="#00D87F"
        height={5}
        showOnShallow={true}
        options={{ easing: "ease", speed: 500 }}
      />

      <Toaster
        position="bottom-left"
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      <div className={inter.className}>
        <Component className={inter.className} {...pageProps} />
      </div>
    </>
  );
}
