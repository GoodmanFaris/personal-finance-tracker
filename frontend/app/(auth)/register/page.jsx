import RegisterCard from "../../../src/components/auth/RegisterCard";
import ProtectedRoute from "../../../src/components/auth/ProtectedRoute";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
          <video
            className="absolute inset-0 -z-20 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/background.mp4" type="video/mp4" />
          </video>
    
          <div className="absolute inset-0 -z-10 bg-black/40" />
    
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div
              className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-25"
              style={{ background: "rgb(var(--color-accent))" }}
            />
            <div className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-white/15 blur-3xl opacity-30" />
          </div>
          <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
            <RegisterCard />
          </div>
        </main>
  );
}
