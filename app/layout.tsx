import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ClientProviders from "@/components/ClientProviders";

export const metadata: Metadata = {
  title: "Proof of Care — On-Chain Attestations for Care Work",
  description: "Make care work visible, verifiable, and valued. On-chain attestations for mentorship, mutual aid, emotional support, and community service on Base.",
  metadataBase: new URL("https://proofofcare.spirittree.dev"),
  openGraph: {
    title: "Proof of Care ❤️‍🔥",
    description: "Care work is invisible to the economy. We're changing that. On-chain attestations on Base using EAS.",
    url: "https://proofofcare.spirittree.dev",
    siteName: "Proof of Care",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Proof of Care — On-Chain Attestations for Care Work",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Proof of Care ❤️‍🔥",
    description: "Make care work visible, verifiable, and valued.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <Nav />
          <main>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
