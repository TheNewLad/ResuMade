import "./globals.css";
import { Nunito_Sans } from "next/font/google";

const nunitoSans = Nunito_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "ResuMade",
  description: "Your resume made from JSON",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.className} bg-gray-950 text-white`}>
        {children}
      </body>
    </html>
  );
}
