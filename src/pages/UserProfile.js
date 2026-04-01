import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  const token = sessionStorage.getItem("friemds_token");

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${API}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
    };
    fetchUser();
  }, [id]);

  if (!user) return <p>Loading...</p>;

  return (
  <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">

    {/* HEADER */}
    <div className="p-4 border-b border-white/10">
      <h1 className="text-xl font-bold">User Profile</h1>
    </div>

    {/* MAIN */}
    <div className="max-w-md mx-auto px-4 py-6">

      {/* CARD */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center space-y-4">

        {/* AVATAR */}
        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/10">
          {user.avatar ? (
            <img src={user.avatar} className="w-full h-full object-cover"/>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-500 text-2xl">
              {user.name?.[0]}
            </div>
          )}
        </div>

        {/* NAME */}
        <h2 className="text-xl font-semibold">{user.name}</h2>

        {/* EMAIL */}
        <p className="text-sm text-zinc-400">{user.email}</p>
      </div>

      {/* DETAILS */}
      <div className="mt-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-4 text-sm">

        {user.bio && (
          <div>
            <p className="text-zinc-400">About</p>
            <p>{user.bio}</p>
          </div>
        )}

        {user.age && (
          <div>
            <p className="text-zinc-400">Age</p>
            <p>{user.age}</p>
          </div>
        )}

        {user.gender && (
          <div>
            <p className="text-zinc-400">Gender</p>
            <p>{user.gender}</p>
          </div>
        )}

        {user.phone && (
          <div>
            <p className="text-zinc-400">Phone</p>
            <p>{user.phone}</p>
          </div>
        )}

        {user.major && (
          <div>
            <p className="text-zinc-400">Major</p>
            <p>{user.major}</p>
          </div>
        )}

        {user.year && (
          <div>
            <p className="text-zinc-400">Year</p>
            <p>{user.year}</p>
          </div>
        )}

        {user.interests?.length > 0 && (
          <div>
            <p className="text-zinc-400 mb-1">Interests</p>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((i, idx) => (
                <span key={idx} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {i}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  </div>
);
}