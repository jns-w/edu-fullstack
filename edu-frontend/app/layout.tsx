import type {Metadata} from "next";

import {Geist, Geist_Mono} from "next/font/google";

import "./globals.scss";
import { cookies } from 'next/headers';
import {ReactNode} from "react";
import {Provider} from "jotai";

import {Topbar} from "@/components/topbar/topbar";

const geistSans = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
});

export const metadata: Metadata = {
    description: "Educational Content",
    title: "Edu",
};

export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    const cookieStore = await cookies();
    const theme = cookieStore.get("edu.c.theme")?.value || "light";

    return (
        <html lang="en" data-theme={theme} suppressHydrationWarning>
        <head>
            <script
                dangerouslySetInnerHTML={{
                    __html: `
              (function() {
                const storedTheme = localStorage.getItem('edu.theme');
                const theme = JSON.parse(storedTheme);
                document.documentElement.setAttribute("data-theme", theme);
              })();
            `,
                }}
            />
        </head>
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Provider>
            <Topbar/>
            {children}
        </Provider>
        </body>
        </html>
    );
}
