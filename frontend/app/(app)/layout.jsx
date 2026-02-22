import "../globals.css";
import Navbar from "../../src/components/shared/Navbar";
import Providers from "../(app)/providers";
import Footer from "../../src/components/shared/Footer";
import BackgroundLayer from "../../src/components/shared/BackgroundLayer";

export const metadata = {
  title: "Personal Finance Tracker",
  description: "MVP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen overflow-x-hidden text-gray-900">
        <Providers>
          <BackgroundLayer />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
