// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { toast } from "sonner";

// const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

// export default function UserProfile() {
//   const { id } = useParams();
//   const [user, setUser] = useState(null);
//   const [requested, setRequested] = useState(false);
//   const [requestedId, setRequestedId] = useState(null);

//   const cancelRequest = async () => {
//   try {
//     await axios.delete(`${API}/friends/cancel/${requestedId}`, { // 🔥 CHANGE HERE
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     toast.success("Request cancelled ❌");
//     setRequested(false);
//     setRequestedId(null);

//   } catch (err) {
//     console.log(err.response?.data);
//     toast.error(err.response?.data?.msg || "Error cancelling request");
//   }
// };

//  const sendFriendRequest = async () => {
//   try {
//     await axios.post(`${API}/friends/request`,
//       { recipient_id: id },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     toast.success("Friend request sent ❤️");
//     setRequested(true);
//     setRequestedId(id); // 🔥 ADD THIS

//   } catch (err) {
//     setRequested(true);
//     setRequestedId(id); // 🔥 ADD THIS
//     toast.error(err.response?.data?.msg || "Error");
//   }
// };

//   const token = sessionStorage.getItem("friemds_token");

//   useEffect(() => {

//   const fetchUser = async () => {
//     const res = await axios.get(`${API}/users/${id}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setUser(res.data);
//   };



//   const checkRequest = async () => {
//     const res = await axios.get(`${API}/friends/sent`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     // 🔥 yahi magic hai
//     const alreadySent = res.data.find(r => r.recipient_id === id);

//     if (alreadySent) {
//       setRequested(true);
//       setRequestedId(id);
//     }
//   };

//   fetchUser();
//   checkRequest();

// }, [id]);

//   if (!user) return <p>Loading...</p>;

//   return (
//   <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">

//     {/* HEADER */}
//     <div className="p-4 border-b border-white/10">
//       <h1 className="text-xl font-bold">User Profile</h1>
//     </div>

//     {/* MAIN */}
//     <div className="max-w-md mx-auto px-4 py-6">

//       {/* CARD */}
//       <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center space-y-4">

//         {/* AVATAR */}
//         <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-white/10">
//           {user.avatar ? (
//             <img src={user.avatar} className="w-full h-full object-cover"/>
//           ) : (
//             <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-500 to-purple-500 text-2xl">
//               {user.name?.[0]}
//             </div>
//           )}
//         </div>

//         {/* NAME */}
//         <h2 className="text-xl font-semibold">{user.name}</h2>

//         {requested ? (
//   <button
//     onClick={cancelRequest}
//     className="mt-3 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-full text-sm"
//   >
//     Cancel ❌
//   </button>
// ) : (
//   <button
//     onClick={sendFriendRequest}
//     className="mt-3 px-4 py-2 bg-pink-500 hover:bg-pink-600 rounded-full text-sm"
//   >
//     Add Friend ❤️
//   </button>
// )}

//         {/* EMAIL */}
//         <p className="text-sm text-zinc-400">{user.email}</p>
//       </div>

//       {/* DETAILS */}
//       <div className="mt-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-4 text-sm">

//         {user.bio && (
//           <div>
//             <p className="text-zinc-400">About</p>
//             <p>{user.bio}</p>
//           </div>
//         )}

//         {user.age && (
//           <div>
//             <p className="text-zinc-400">Age</p>
//             <p>{user.age}</p>
//           </div>
//         )}

//         {user.gender && (
//           <div>
//             <p className="text-zinc-400">Gender</p>
//             <p>{user.gender}</p>
//           </div>
//         )}

//         {user.phone && (
//           <div>
//             <p className="text-zinc-400">Phone</p>
//             <p>{user.phone}</p>
//           </div>
//         )}

//         {user.major && (
//           <div>
//             <p className="text-zinc-400">Major</p>
//             <p>{user.major}</p>
//           </div>
//         )}

//         {user.year && (
//           <div>
//             <p className="text-zinc-400">Year</p>
//             <p>{user.year}</p>
//           </div>
//         )}

//         {user.interests?.length > 0 && (
//           <div>
//             <p className="text-zinc-400 mb-1">Interests</p>
//             <div className="flex flex-wrap gap-2">
//               {user.interests.map((i, idx) => (
//                 <span key={idx} className="text-xs bg-white/20 px-2 py-1 rounded-full">
//                   {i}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//       </div>

//     </div>
//   </div>
// );
// }












import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'sonner';
import {
  Heart,
  Search,
  Users,
  MessageCircle,
  LogOut,
  Sparkles,
  ArrowLeft,
  Mail,
  User,
  Calendar,
  Phone,
  BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Navigation from '@/components/Navigation';

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function UserProfile({ currentUser, onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState(null);
  const [requested, setRequested] = useState(false);
  const [requestedId, setRequestedId] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem('friemds_token');

  const getInitials = (name = '') =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const cancelRequest = async () => {
    try {
      await axios.delete(`${API}/friends/cancel/${requestedId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success('Request cancelled ❌');
      setRequested(false);
      setRequestedId(null);
    } catch (err) {
      console.log(err.response?.data);
      toast.error(err.response?.data?.msg || 'Error cancelling request');
    }
  };

  const sendFriendRequest = async () => {
    try {
      await axios.post(
        `${API}/friends/request`,
        { recipient_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success('Friend request sent ❤️');
      setRequested(true);
      setRequestedId(id);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Error');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [userRes, requestRes] = await Promise.all([
          axios.get(`${API}/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API}/friends/sent`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setProfileUser(userRes.data);

        const alreadySent = requestRes.data.find(
          (r) => String(r.recipient_id) === String(id)
        );

        if (alreadySent) {
          setRequested(true);
          setRequestedId(id);
        } else {
          setRequested(false);
          setRequestedId(null);
        }
      } catch (err) {
        toast.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (id && token) {
      fetchData();
    }
  }, [id, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        User not found
      </div>
    );
  }

  return (
    <>
      <style>{`
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .glass-strong {
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
          border: 1px solid rgba(255, 255, 255, 0.10);
        }

        .premium-shadow {
          box-shadow:
            0 20px 60px rgba(0,0,0,0.45),
            0 0 0 1px rgba(255,255,255,0.04),
            0 0 60px rgba(168,85,247,0.08);
        }

        .gradient-border {
          position: relative;
        }

        .gradient-border::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(236,72,153,0.55),
            rgba(168,85,247,0.5),
            rgba(255,255,255,0.08)
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>

      <div className="min-h-screen bg-black text-white pb-24 md:pb-0 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-[-70px] w-72 h-72 bg-pink-500/12 blur-3xl rounded-full" />
          <div className="absolute top-[30%] right-[-90px] w-80 h-80 bg-purple-500/10 blur-3xl rounded-full" />
          <div className="absolute bottom-[-100px] left-[30%] w-72 h-72 bg-fuchsia-500/10 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 flex min-h-screen">
          <aside className="hidden md:flex w-[290px] border-r border-white/10 bg-white/[0.03] backdrop-blur-2xl flex-col justify-between p-6">
            <div>
              <div className="mb-10">
                <img
                  src="/logo.png"
                  alt="Friemds Logo"
                  className="h-14 w-auto object-contain"
                />
                <p className="text-sm text-zinc-500 mt-3">Manage your vibe.</p>
              </div>

              <div
                onClick={() => navigate('/profile')}
                className="glass-strong rounded-3xl p-4 premium-shadow mb-6 cursor-pointer hover:bg-white/[0.09] transition-all duration-300"
              >
                <div className="text-xs text-zinc-400 mb-3">Your profile</div>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border border-white/10">
                    {currentUser?.avatar ? (
                      <img
                        src={currentUser.avatar}
                        className="w-full h-full object-cover rounded-full"
                        alt="avatar"
                      />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white font-semibold">
                        {getInitials(currentUser?.name || 'U')}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="min-w-0">
                    <p className="font-semibold truncate">{currentUser?.name}</p>
                    <p className="text-xs text-zinc-400 truncate">{currentUser?.email}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/')}
                  className="w-full justify-start rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white h-12"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Discover
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => navigate('/search')}
                  className="w-full justify-start rounded-2xl bg-white/15 border border-pink-400/30 text-white h-12"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => navigate('/friends')}
                  className="w-full justify-start rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white h-12"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Friends
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => navigate('/chat')}
                  className="w-full justify-start rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white h-12"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chats
                </Button>
              </div>

              <div className="glass rounded-2xl p-4 mt-6">
                <div className="flex items-center gap-2 mb-2 text-zinc-300">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <p className="font-medium">Profile tip</p>
                </div>
                <p className="text-sm text-zinc-400">
                  A thoughtful profile helps people understand personality and connect better.
                </p>
              </div>
            </div>

            <Button
              onClick={onLogout}
              className="rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/10 w-full"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </aside>

          <main className="flex-1">
            <header className="md:hidden sticky top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur-xl">
              <div className="px-4 py-4 flex items-center gap-3">
                <button
                  onClick={() => navigate(-1)}
                  className="rounded-full border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
                >
                  <ArrowLeft size={18} />
                </button>

                <div>
                  <h1 className="text-xl font-bold tracking-tight">User Profile</h1>
                  <p className="text-xs text-zinc-400">View and connect</p>
                </div>
              </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <div className="flex items-center gap-3 mb-4">
                  <button
                    onClick={() => navigate(-1)}
                    className="hidden md:flex rounded-full border border-white/10 bg-white/5 p-2 transition hover:bg-white/10"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <div>
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                      User Profile
                    </h1>
                    <p className="text-zinc-400 mt-2">
                      Get to know more about this person and connect with them.
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45 }}
                  className="glass-strong gradient-border rounded-[32px] p-6 premium-shadow h-fit"
                >
                  <div className="text-center">
                    <Avatar className="w-32 h-32 md:w-36 md:h-36 border-4 border-white/10 shadow-2xl mx-auto">
                      {profileUser?.avatar ? (
                        <img
                          src={profileUser.avatar}
                          className="w-full h-full object-cover rounded-full"
                          alt={profileUser.name}
                        />
                      ) : (
                        <AvatarFallback className="text-3xl bg-gradient-to-br from-pink-500 to-purple-600 text-white">
                          {getInitials(profileUser?.name)}
                        </AvatarFallback>
                      )}
                    </Avatar>

                    <h2 className="text-2xl font-bold mt-5">{profileUser?.name}</h2>

                    <p className="text-sm text-zinc-400 flex justify-center items-center gap-2 mt-2">
                      <Mail size={14} /> {profileUser?.email}
                    </p>

                    <div className="mt-5">
                      {requested ? (
                        <Button
                          onClick={cancelRequest}
                          className="rounded-full px-6 bg-red-500 hover:bg-red-600 text-white"
                        >
                          Cancel ❌
                        </Button>
                      ) : (
                        <Button
                          onClick={sendFriendRequest}
                          className="rounded-full px-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
                        >
                          Add Friend ❤️
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="glass rounded-2xl p-4 text-center">
                      <p className="text-xs text-zinc-400">Major</p>
                      <p className="text-sm font-medium mt-1">{profileUser?.major || '—'}</p>
                    </div>
                    <div className="glass rounded-2xl p-4 text-center">
                      <p className="text-xs text-zinc-400">Year</p>
                      <p className="text-sm font-medium mt-1">{profileUser?.year || '—'}</p>
                    </div>
                    <div className="glass rounded-2xl p-4 text-center">
                      <p className="text-xs text-zinc-400">Age</p>
                      <p className="text-sm font-medium mt-1">{profileUser?.age || '—'}</p>
                    </div>
                    <div className="glass rounded-2xl p-4 text-center">
                      <p className="text-xs text-zinc-400">Gender</p>
                      <p className="text-sm font-medium mt-1">{profileUser?.gender || '—'}</p>
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-4 mt-4">
                    <div className="flex items-center gap-2 mb-2 text-zinc-300">
                      <Sparkles className="w-4 h-4 text-pink-400" />
                      <p className="font-medium">Vibe preview</p>
                    </div>
                    <p className="text-sm text-zinc-400">
                      Shared interests and a complete profile make it easier to start a great conversation.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45 }}
                  className="glass-strong gradient-border rounded-[32px] p-6 md:p-7 premium-shadow"
                >
                  <div className="space-y-6">
                    {profileUser?.bio && (
                      <div className="glass rounded-3xl p-5">
                        <p className="text-zinc-400 flex items-center gap-2 mb-3">
                          <User size={16} /> About
                        </p>
                        <p className="text-white leading-7">{profileUser.bio}</p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {profileUser?.major && (
                        <div className="glass rounded-3xl p-5">
                          <p className="text-zinc-400 flex items-center gap-2 mb-2">
                            <BookOpen size={16} /> Major
                          </p>
                          <p>{profileUser.major}</p>
                        </div>
                      )}

                      {profileUser?.year && (
                        <div className="glass rounded-3xl p-5">
                          <p className="text-zinc-400 flex items-center gap-2 mb-2">
                            <Calendar size={16} /> Year
                          </p>
                          <p>{profileUser.year}</p>
                        </div>
                      )}

                      {profileUser?.age && (
                        <div className="glass rounded-3xl p-5">
                          <p className="text-zinc-400 flex items-center gap-2 mb-2">
                            <Calendar size={16} /> Age
                          </p>
                          <p>{profileUser.age}</p>
                        </div>
                      )}

                      {profileUser?.gender && (
                        <div className="glass rounded-3xl p-5">
                          <p className="text-zinc-400 flex items-center gap-2 mb-2">
                            <Users size={16} /> Gender
                          </p>
                          <p>{profileUser.gender}</p>
                        </div>
                      )}

                      {profileUser?.phone && (
                        <div className="glass rounded-3xl p-5 md:col-span-2">
                          <p className="text-zinc-400 flex items-center gap-2 mb-2">
                            <Phone size={16} /> Phone
                          </p>
                          <p>{profileUser.phone}</p>
                        </div>
                      )}
                    </div>

                    {profileUser?.interests?.length > 0 && (
                      <div className="glass rounded-3xl p-5">
                        <p className="text-zinc-400 mb-4 flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-pink-400" />
                          Interests
                        </p>
                        <div className="flex flex-wrap gap-3">
                          {profileUser.interests.map((i, idx) => (
                            <span
                              key={idx}
                              className="text-sm bg-gradient-to-r from-pink-500/15 to-purple-500/15 border border-white/10 px-4 py-2 rounded-full text-white"
                            >
                              {i}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {!profileUser?.bio &&
                      !profileUser?.major &&
                      !profileUser?.year &&
                      !profileUser?.interests?.length &&
                      !profileUser?.age &&
                      !profileUser?.gender &&
                      !profileUser?.phone && (
                        <div className="glass rounded-3xl p-10 text-center">
                          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4">
                            <Sparkles className="w-6 h-6 text-pink-400" />
                          </div>
                          <p className="text-lg font-semibold">This profile is pretty empty</p>
                          <p className="text-sm text-zinc-400 mt-2">
                            There are not many details here yet, but you can still connect and say hi.
                          </p>
                        </div>
                      )}
                  </div>
                </motion.div>
              </div>
            </div>
          </main>
        </div>

        <div className="md:hidden">
          <Navigation currentPage="search" />
        </div>
      </div>
    </>
  );
}