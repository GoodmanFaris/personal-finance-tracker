"use client";

import useProfileData from "../../hooks/useProfileData";

export default function ProfileHeaderCard() {
  const { profileData, loading } = useProfileData();

  if (loading) {
    return (
      <div
        className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl p-8 text-white"
        style={{ background: "rgb(var(--color-primary))" }}
      >
        <p className="text-white/80 text-sm">Loading profile...</p>
      </div>
    );
  }

  if (!profileData) return null;

  const joined =
    profileData?.created_at &&
    new Date(profileData.created_at).toLocaleDateString("en-GB", {
      month: "long",
      year: "numeric",
    });

  return (
    <div
      className="relative w-full mt-8 max-w-4xl mx-auto overflow-hidden rounded-xl p-8 text-white shadow-[0_24px_70px_rgba(0,0,0,0.25)]"
      style={{ background: "rgb(var(--color-primary))" }}
    >
      {/* Accent glow right side */}
      <div
        className="pointer-events-none absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full blur-3xl opacity-40"
        style={{ background: "rgb(var(--color-accent))" }}
      />

      {/* subtle overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/5" />

      <div className="relative flex items-center justify-between gap-8">
        {/* LEFT */}
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/15 backdrop-blur border border-white/25 text-2xl font-extrabold tracking-tight shadow-lg">
            {profileData?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              {profileData?.name || "User"}
            </h2>
            <p className="mt-1 text-white/80 text-sm">Joined {joined || "—"}</p>
          </div>
        </div>

        {/* RIGHT optional info */}
        <div className="hidden sm:flex flex-col items-end text-right">
          <p className="text-xs text-white/70 uppercase tracking-wider">
            Account Status
          </p>
          <p className="mt-1 text-sm font-semibold text-white">Active</p>
        </div>
      </div>
    </div>
  );
}
