"use client";

import useProfileData from "../../hooks/useProfileData";
import EditProfileModal from "../profile/EditProfileModal";

export default function ProfileGeneralInfoCard() {
  const {
    profileData,
    loading,
    openEdit,
    isEditOpen,
    editValues,
    setEditField,
    saveEdit,
    closeEdit,
    updating,
    error,
  } = useProfileData();

  if (loading) {
    return (
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl border border-black/10 bg-white p-8 shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </div>
    );
  }

  if (!profileData) return null;

  const firstLetter = profileData.name?.charAt(0)?.toUpperCase() || "?";

  const joinedDate = profileData.created_at
    ? new Date(profileData.created_at).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-3xl border border-black/10 bg-white shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      {/* subtle glow */}
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{ background: "rgb(var(--color-secondary))" }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/[0.02] via-transparent to-transparent" />

      <div className="relative p-7 sm:p-8">
        {/* Avatar + Joined */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-extrabold border border-black/10 shadow-sm"
            style={{
              background: "rgba(0,0,0,0.04)",
              color: "rgb(var(--color-text-dark))",
            }}
          >
            {firstLetter}
          </div>

          <div>
            <p className="text-xs font-semibold text-black/45 uppercase tracking-wider">
              Member since
            </p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {joinedDate}
            </p>
          </div>
        </div>

        {/* Title */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: "rgb(var(--color-secondary))" }}
              />
              <h3 className="text-lg font-extrabold tracking-tight text-gray-900">
                General Information
              </h3>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Your basic account details and preferences.
            </p>
          </div>

          {/* small badge */}
          <div className="hidden sm:inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold text-black/60">
            <span
              className="h-2 w-2 rounded-full"
              style={{ background: "rgb(var(--color-primary))" }}
            />
            Profile
          </div>
        </div>

        {/* Info grid */}
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div className="rounded-2xl border border-black/10 bg-white/70 p-4">
            <p className="text-xs font-semibold text-black/45 uppercase tracking-wider">
              Full Name
            </p>
            <p className="mt-2 text-sm font-extrabold text-gray-900">
              {profileData.name || "-"}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/70 p-4">
            <p className="text-xs font-semibold text-black/45 uppercase tracking-wider">
              Email
            </p>
            <p className="mt-2 text-sm font-extrabold text-gray-900 break-all">
              {profileData.email || "-"}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/70 p-4">
            <p className="text-xs font-semibold text-black/45 uppercase tracking-wider">
              Country
            </p>
            <p className="mt-2 text-sm font-extrabold text-gray-900">
              {profileData.country || "-"}
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 bg-white/70 p-4">
            <p className="text-xs font-semibold text-black/45 uppercase tracking-wider">
              Currency
            </p>
            <p className="mt-2 text-sm font-extrabold text-gray-900">
              {profileData.currency || "-"}
            </p>
          </div>
        </div>

        {/* Action */}
        <div className="mt-8 flex items-center justify-end">
          <button
            onClick={openEdit}
            className="rounded-2xl px-5 py-2.5 text-sm font-extrabold text-white shadow-md transition disabled:opacity-60"
            style={{
              background:
                "rgb(var(--color-secondary))",
              boxShadow: "0 18px 45px rgba(0,0,0,0.14)",
            }}
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>

      <EditProfileModal
        open={isEditOpen}
        onClose={closeEdit}
        values={editValues}
        onChange={setEditField}
        onSave={saveEdit}
        saving={updating}
        error={error}
      />
    </div>
  );
}
