import ProtectedRoute from "../../../src/components/auth/ProtectedRoute";
import ProfileHeaderCard from "../../../src/components/profile/ProfileHeaderCard";
import ProfileGeneralInfoCard from "../../../src/components/profile/ProfileGeneralInfoCard";
import ProfileStatsCard from "../../../src/components/profile/ProfileStatsCard";

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen py-12 px-6 space-y-8">
        <ProfileHeaderCard />
        <ProfileGeneralInfoCard />
        <ProfileStatsCard />
      </div>
    </ProtectedRoute>
  );
}
