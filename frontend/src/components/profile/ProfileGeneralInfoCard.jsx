"use client";

import useProfileData from "../../hooks/useProfileData";

export default function ProfileGeneralInfoCard() {
  const { profileData, loading, openEdit } = useProfileData();

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-2xl bg-white border border-gray-200 p-8 shadow-sm">
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
    <div className="w-full max-w-3xl mx-auto rounded-2xl bg-white border border-gray-200 p-8 shadow-sm">
      {/* Avatar + Joined */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-full bg-gray-900 text-white flex items-center justify-center text-lg font-semibold">
          {firstLetter}
        </div>

        <div>
          <p className="text-sm text-gray-500">Member since</p>
          <p className="text-sm font-medium text-gray-900 mt-1">{joinedDate}</p>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        General Information
      </h3>

      <div className="grid sm:grid-cols-2 gap-6 text-sm text-gray-700">
        <div>
          <p className="text-gray-500">Full Name</p>
          <p className="font-medium mt-1">{profileData.name || "-"}</p>
        </div>

        <div>
          <p className="text-gray-500">Email</p>
          <p className="font-medium mt-1">{profileData.email || "-"}</p>
        </div>

        <div>
          <p className="text-gray-500">Country</p>
          <p className="font-medium mt-1">{profileData.country || "-"}</p>
        </div>

        <div>
          <p className="text-gray-500">Currency</p>
          <p className="font-medium mt-1">{profileData.currency || "-"}</p>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={openEdit}
          className="rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-black"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
}
