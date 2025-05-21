import dynamic from "next/dynamic";
import "../styles/globals.css";
import Cta from "./components/organisms/Cta";
import Navbar from "./components/organisms/Navbar";

const Footer = dynamic(() =>
  import("./components/molecules/Footer").then((mod) => mod.Footer)
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <Cta />
      </body>
    </html>
  );
}
