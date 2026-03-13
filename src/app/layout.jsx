import { Inter, Lexend, Urbanist } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ui/ScrollToTop";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("http://localhost:4100"),

  title: {
    default: "Pilot – Learn Car Driving with Expert Instructors",
    template: "%s · Pilot Driving",
  },

  description:
    "Pilot helps you learn car driving the smart way. Book certified driving instructors, schedule lessons instantly, and track your driving progress with our modern learning platform.",

  keywords: [
    "learn car driving",
    "driving lessons",
    "driving school",
    "driving instructor",
    "car driving training",
    "book driving lessons",
    "online driving school",
    "Pilot driving app"
  ],

  applicationName: "Pilot",

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/images/meta_logo.png",
    shortcut: "/images/meta_logo.png",
    apple: "/images/meta_logo.png",
  },

  openGraph: {
    type: "website",
    url: "http://localhost:4100",
    title: "Pilot – Learn Car Driving with Expert Instructors",
    description:
      "Book professional driving lessons and become a confident driver with Pilot’s modern driving learning platform.",
    siteName: "Pilot Driving",
    images: [
      {
        url: "http://localhost:4100/images/meta_logo.png",
        width: 1200,
        height: 630,
        alt: "Pilot Driving App – Learn Car Driving",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Pilot – Learn Car Driving",
    description:
      "Learn car driving with certified instructors using Pilot.",
    images: ["http://localhost:4100/images/meta_logo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${lexend.variable} ${urbanist.variable} antialiased`}
      >
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}