import type { Metadata } from "next";

import NextUi from "@/components/Providers/NextUi";
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
}: {
  children: React.ReactNode;
  params: any;
}) {
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
