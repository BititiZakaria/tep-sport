import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { DataProvider } from "@/context/DataContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SocialButtons from "@/components/ui/SocialButtons";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Tep Sport - Salle de Sport & Centre de Performance | Montlouis-sur-Loire",
  description: "Salle de sport à Montlouis-sur-Loire. Centre de préparation physique, coaching personnalisé, récupération (sauna, bains chaud/froid) et terrain de padel.",
  keywords: "salle de sport, padel, coaching sportif, préparation physique, Montlouis-sur-Loire",
  authors: [{ name: "Tep Sport" }],
  openGraph: {
    title: "Tep Sport - Salle de Sport & Centre de Performance",
    description: "Salle de sport à Montlouis-sur-Loire. Coaching personnalisé, récupération et padel.",
    url: "https://www.tep-sport.com",
    siteName: "Tep Sport",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <DataProvider>
            <div className="bg-pattern" />
            <div className="bg-overlay" />
            <Navbar />
            {children}
            <Footer />
            <SocialButtons />
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
