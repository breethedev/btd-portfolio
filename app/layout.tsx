import { Cascadia_Code, Anton_SC } from "next/font/google";
import { SideNav, Banner } from "@/app/components";
import { SECTIONS } from "@/app/constants";

import "./globals.css";

const cascadiaCode = Cascadia_Code({
  variable: "--btd-font-main",
  subsets: ["latin"],
});

const antonSC = Anton_SC({
  variable: "--btd-font-mono",
  subsets: ["latin"],
  weight: "400",
});

const sectionNames = Object.values(SECTIONS).map((section) => section.title);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cascadiaCode.variable} ${antonSC.variable}`}>
        <div className="layout">
          <SideNav items={sectionNames} />
          <Banner />
          {children}
        </div>
      </body>
    </html>
  );
}
