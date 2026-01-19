import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/layout";
import { AuthProvider } from "@/contexts";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "eTaxMentor - Expert Tax Solutions | ITR Filing, GST & CFO Services",
    template: "%s | eTaxMentor",
  },
  description: "All-in-one platform trusted by 10,000+ for seamless ITR filing, GST compliance, TDS, CFO services, and business structuring. File your taxes with expert CAs.",
  keywords: ["ITR filing", "GST filing", "tax consultant", "CA services", "income tax", "tax returns", "Hyderabad", "India"],
  authors: [{ name: "eTaxMentor" }],
  openGraph: {
    title: "eTaxMentor - Expert Tax Solutions",
    description: "All-in-one platform trusted by 10,000+ for seamless ITR filing, GST compliance, and CFO services.",
    url: "https://www.etaxmentor.com",
    siteName: "eTaxMentor",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "eTaxMentor - Expert Tax Solutions",
    description: "File your taxes with expert CAs. Trusted by 10,000+ clients.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <AuthProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
