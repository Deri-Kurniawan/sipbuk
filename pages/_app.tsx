import { AppProps } from "next/app";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={inter.className}>
      <Component className={inter.className} {...pageProps} />
    </div>
  );
}
