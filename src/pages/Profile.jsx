import { useAuth } from "../auth/AuthContext";
import { User, Mail } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-2xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">Profile</h1>
        <p className="text-sm text-slate-500 mt-1">
          Manage your personal information
        </p>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 flex gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="h-20 w-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 text-2xl font-semibold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-sm text-slate-500">Name</label>
            <div className="flex items-center gap-2 mt-1 text-slate-800 font-medium">
              <User size={16} className="text-slate-400" />
              {user?.name}
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-500">Email</label>
            <div className="flex items-center gap-2 mt-1 text-slate-800 font-medium">
              <Mail size={16} className="text-slate-400" />
              {user?.email}
            </div>
          </div>
        </div>
      </div>

      {/* Action (future ready) */}
      <div className="flex gap-3">
        <button
          disabled
          className="px-4 py-2 rounded-lg border border-slate-300 text-slate-500 cursor-not-allowed"
        >
          Edit Profile
        </button>

        <span className="text-xs text-slate-400 self-center">
          (Coming soon)
        </span>
      </div>
    </div>
  );
};

export default Profile;
