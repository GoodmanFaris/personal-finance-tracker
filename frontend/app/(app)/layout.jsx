import "../globals.css";
import Navbar from "../../src/components/shared/Navbar";
import Providers from "../(app)/providers";
import Footer from "../../src/components/shared/Footer";

export const metadata = {
  title: "Personal Finance Tracker",
  description: "MVP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen overflow-x-hidden text-gray-900">
        {/* ✅ Background image (covers full screen) */}
        <div
          className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/background_light.jpg')" }}
        />

        {/* ✅ Soft overlay (so content stays readable) */}
        <div className="fixed inset-0 -z-10 bg-white/55 backdrop-blur-[2px]" />

        {/* Optional subtle glow blobs */}

        <Providers>
          <Navbar />
          <main className="relative z-10">{children}</main>
          <div className = "h-24" /> {/* Spacer to prevent footer overlap on small screens */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
