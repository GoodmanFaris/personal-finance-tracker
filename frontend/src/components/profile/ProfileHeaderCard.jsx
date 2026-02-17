"use client";

import useProfileData from "../../hooks/useProfileData";

export default function ProfileHeaderCard() {
  const { profileData, loading } = useProfileData();

  if (loading) {
    return (
      <div className="w-full max-w-3xl mx-auto rounded-2xl bg-blue-600 text-white p-8 shadow-sm">
        <p className="text-blue-100 text-sm">Loading profile...</p>
      </div>
    );
  }

  if(!profileData) return null;
  
  return (
    <div className="w-full max-w-3xl mx-auto rounded-2xl bg-blue-600 text-white p-8 shadow-sm">
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center text-blue-600 text-2xl font-bold">
          {profileData?.name?.charAt(0)?.toUpperCase() || "JD"}
        </div>

        <div>
          <h2 className="text-2xl font-semibold">{profileData?.name || "John Doe"}</h2>
          <p className="text-blue-100 mt-1">Joined {profileData?.created_at ? new Date(profileData.created_at).toLocaleDateString("en-GB", { month: "long", year: "numeric" }) : "March 2024"}</p>
        </div>
      </div>
    </div>
  );
}
