
import ProtectedRoute from "../../src/components/auth/ProtectedRoute";
import ContactForm from "../../src/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <ContactForm />
    </div>
    </ProtectedRoute>
  );
}
