import { Cascadia_Code, Anton_SC } from "next/font/google";
import { SideNav, NowPlaying } from "@/app/components";
import { SECTIONS } from "@/app/constants";
import { MusicPlayerProvider } from "./contexts";
import { Toast } from "radix-ui";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sectionLinks = Object.entries(SECTIONS).map(([_, section]) => ({
  title: section.title,
  path: section.path,
}));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cascadiaCode.variable} ${antonSC.variable}`}>
        <MusicPlayerProvider>
          {/* Add your music player component here if needed */}
          <Toast.Provider swipeDirection="right">
            <div className="layout">
              <SideNav items={sectionLinks} />

              <div className="main">{children}</div>
              <NowPlaying />
            </div>
          </Toast.Provider>
        </MusicPlayerProvider>
      </body>
    </html>
  );
}
