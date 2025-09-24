// @ts-ignore
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { getProfile } from "../api/api";

interface User {
  name: string;
  email: string;
}

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getProfile();
        setUser(res.data);
      } catch (err) {
        alert("Error fetching profile. Please login again.");
      }
    };
    fetchProfile();
  }, []);

  if (!user) return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-4 text-secondary-600 text-lg">Loading profile...</p>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-3xl font-bold text-secondary-900 mb-6">Profile</h2>
            <div className="space-y-4">
              <div>
                <dt className="text-lg font-semibold text-secondary-600">Name</dt>
                <dd className="mt-2 text-xl text-secondary-900">{user.name}</dd>
              </div>
              <div>
                <dt className="text-lg font-semibold text-secondary-600">Email</dt>
                <dd className="mt-2 text-xl text-secondary-900">{user.email}</dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
