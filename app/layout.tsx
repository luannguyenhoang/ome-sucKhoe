import dynamic from "next/dynamic";
import "../styles/globals.css";
import Navbar from "./components/organisms/Navbar";
import { Providers } from "./providers";

const Footer = dynamic(() =>
  import("./components/molecules/Footer").then((mod) => mod.Footer)
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
