import "../globals.css";
import Navbar from "../../src/components/shared/Navbar";
import Providers from "../(app)/providers";

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
        <div className="fixed inset-0 -z-10 bg-white/65 backdrop-blur-[2px]" />

        {/* Optional subtle glow blobs */}

        <Providers>
          <Navbar />
          <main className="relative z-10">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
