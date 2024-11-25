import type { Metadata } from "next";
 

import NextUi from "@/components/Providers/NextUi";
import { notFound } from "next/navigation";
import "./globals.css";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export const metadata: Metadata = {
  title: "TODO",
  description: "   Todo List ",
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: any;
}) {
  // Language Switcher Client Provider
 
  return (
    <html>
      <body>
        <NextUi>
          <div className="bg-white mb-4 pb-8 ">{children}</div>
        </NextUi>
      </body>
    </html>
  );
}
