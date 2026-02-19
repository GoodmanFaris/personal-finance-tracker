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
      <body className="bg-gray-100 text-gray-900">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
