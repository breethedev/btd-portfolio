import { Cascadia_Code } from "next/font/google";
import { SideNav } from "@/app/components";
import { SECTIONS } from "@/app/constants";
import "./globals.css";

const cascadiaCode = Cascadia_Code({
  variable: "--btd-font-main",
  subsets: ["latin"],
});

const sectionNames = Object.values(SECTIONS).map((section) => section.title);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cascadiaCode.variable}`}>
        <div className="layout">
          <SideNav items={sectionNames} />
          {children}
        </div>
      </body>
    </html>
  );
}
