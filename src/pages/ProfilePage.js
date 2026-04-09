// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { User, Mail, BookOpen, Award, Edit, Save } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Textarea } from '@/components/ui/textarea';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import axios from 'axios';
// import { toast } from 'sonner';
// import Navigation from '@/components/Navigation';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

// export default function ProfilePage({ user, setUser, onLogout }) {
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     name: user?.name || '',
//     bio: user?.bio || '',
//     interests: user?.interests?.join(', ') || '',
//     year: user?.year || '',
//     major: user?.major || ''
//   });
//   const [loading, setLoading] = useState(false);

//   const token = localStorage.getItem('friemds_token');

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.put(
//         `${API}/users/me`,
//         {
//           name: formData.name,
//           bio: formData.bio,
//           interests: formData.interests.split(',').map(i => i.trim()).filter(Boolean),
//           year: formData.year,
//           major: formData.major
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setUser(response.data.user);
//       localStorage.setItem('friemds_user', JSON.stringify(response.data.user));
//       toast.success('Profile updated successfully!');
//       setEditing(false);
//     } catch (error) {
//       toast.error('Failed to update profile');
//     } finally {
//       setLoading(false);
//     }
//   };


// const handleFile = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const formData = new FormData();
//   formData.append("avatar", file);

//   try {
//     const res = await axios.post(
//       `${API}/users/upload-avatar`,
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     toast.success("Profile photo updated!");

//     setUser(res.data.user);
//     localStorage.setItem("friemds_user", JSON.stringify(res.data.user));

//   } catch (error) {
//     toast.error("Upload failed");
//   }
// };


//   const getInitials = (name) => {
//     return name
//       .split(' ')
//       .map(n => n[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   return (
//     <div className="min-h-screen bg-background pb-20">
//       {/* Header */}
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center justify-between px-4">
//           <h1 className="text-2xl font-bold">Profile</h1>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={onLogout}
//             data-testid="logout-button"
//           >
//             Logout
//           </Button>
//         </div>
//       </header>

//       <main className="container max-w-2xl mx-auto px-4 py-8" data-testid="profile-page">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="space-y-6"
//         >
//           {/* Profile Header */}
//           <Card>
//             <CardContent className="p-8">
//               <div className="flex flex-col items-center space-y-4">
//                 <Avatar className="h-24 w-24 border-4 border-primary/20">
//                   {user?.avatar ? (
//                   <img
//                      src={user.avatar}
//                      className="h-full w-full object-cover rounded-full"/>
//                   ) : (
//                     <AvatarFallback className="bg-primary/10 text-primary font-bold text-3xl">
//                       {getInitials(user?.name || 'U')}
//                     </AvatarFallback>
//                   )}
//                 </Avatar>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFile}
//                   className="mt-2"
//                 />
//                 <div className="text-center space-y-1">
//                   <h2 className="text-2xl font-semibold">{user?.name}</h2>
//                   <p className="text-muted-foreground flex items-center justify-center gap-2">
//                     <Mail className="w-4 h-4" />
//                     {user?.email}
//                   </p>
//                 </div>
//                 <Button
//                   onClick={() => setEditing(!editing)}
//                   variant={editing ? 'outline' : 'default'}
//                   className="rounded-full"
//                   data-testid="edit-profile-button"
//                 >
//                   {editing ? (
//                     <>
//                       Cancel
//                     </>
//                   ) : (
//                     <>
//                       <Edit className="w-4 h-4 mr-2" />
//                       Edit Profile
//                     </>
//                   )}
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Profile Details */}
//           <Card>
//             <CardContent className="p-6 space-y-6">
//               {editing ? (
//                 <div className="space-y-4">
//                   <div className="space-y-2">
//                     <Label htmlFor="name">Name</Label>
//                     <Input
//                       id="name"
//                       value={formData.name}
//                       onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                       className="h-12 rounded-xl"
//                       data-testid="name-edit-input"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="bio">Bio</Label>
//                     <Textarea
//                       id="bio"
//                       value={formData.bio}
//                       onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
//                       className="rounded-xl min-h-24"
//                       placeholder="Tell us about yourself..."
//                       data-testid="bio-edit-input"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="year">Year</Label>
//                     <Input
//                       id="year"
//                       value={formData.year}
//                       onChange={(e) => setFormData({ ...formData, year: e.target.value })}
//                       className="h-12 rounded-xl"
//                       placeholder="e.g., Sophomore, 2nd Year"
//                       data-testid="year-edit-input"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="major">Major</Label>
//                     <Input
//                       id="major"
//                       value={formData.major}
//                       onChange={(e) => setFormData({ ...formData, major: e.target.value })}
//                       className="h-12 rounded-xl"
//                       placeholder="e.g., Computer Science"
//                       data-testid="major-edit-input"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label htmlFor="interests">Interests (comma separated)</Label>
//                     <Input
//                       id="interests"
//                       value={formData.interests}
//                       onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
//                       className="h-12 rounded-xl"
//                       placeholder="Music, Sports, Coding"
//                       data-testid="interests-edit-input"
//                     />
//                   </div>
//                   <Button
//                     onClick={handleSave}
//                     disabled={loading}
//                     className="w-full h-12 rounded-full"
//                     data-testid="save-profile-button"
//                   >
//                     <Save className="w-4 h-4 mr-2" />
//                     {loading ? 'Saving...' : 'Save Changes'}
//                   </Button>
//                 </div>
//               ) : (
//                 <div className="space-y-6">
//                   {user?.bio && (
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
//                         <User className="w-4 h-4" />
//                         About
//                       </div>
//                       <p className="text-base leading-relaxed">{user.bio}</p>
//                     </div>
//                   )}
//                   {user?.major && (
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
//                         <BookOpen className="w-4 h-4" />
//                         Major
//                       </div>
//                       <p className="text-base">{user.major}</p>
//                     </div>
//                   )}
//                   {user?.year && (
//                     <div className="space-y-2">
//                       <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
//                         <Award className="w-4 h-4" />
//                         Year
//                       </div>
//                       <p className="text-base">{user.year}</p>
//                     </div>
//                   )}
//                   {user?.interests && user.interests.length > 0 && (
//                     <div className="space-y-2">
//                       <p className="text-sm font-medium text-muted-foreground">Interests</p>
//                       <div className="flex flex-wrap gap-2">
//                         {user.interests.map((interest, idx) => (
//                           <Badge key={idx} variant="secondary" className="px-3 py-1">
//                             {interest}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </CardContent>
//           </Card>
//         </motion.div>
//       </main>

//       <Navigation currentPage="profile" />
//     </div>
//   );
// }












// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { User, Mail, BookOpen, Award } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import axios from 'axios';
// import { toast } from 'sonner';
// import Navigation from '@/components/Navigation';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

// export default function ProfilePage({ user, setUser, onLogout }) {
//   const [editing, setEditing] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//   name: user?.name || '',
//   bio: user?.bio || '',
//   interests: user?.interests?.join(', ') || '',
//   year: user?.year || '',
//   major: user?.major || '',
//   age: user?.age || '',
//   gender: user?.gender || '',
//   phone: user?.phone || ''
// });

// const token = sessionStorage.getItem('friemds_token');
//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const res = await axios.put(`${API}/users/me`, {
//         ...formData,
//         interests: formData.interests.split(',').map(i => i.trim())
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setUser(res.data.user);
//       localStorage.setItem('friemds_user', JSON.stringify(res.data.user));
//       toast.success('Updated!');
//       setEditing(false);
//     } catch {
//       toast.error('Error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFile = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const fd = new FormData();
//     fd.append("avatar", file);

//     try {
//       const res = await axios.post(`${API}/users/upload-avatar`, fd, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setUser(res.data.user);
//       localStorage.setItem("friemds_user", JSON.stringify(res.data.user));
//       toast.success("Photo updated!");
//     } catch {
//       toast.error("Upload failed");
//     }
//   };

//   const getInitials = (name) =>
//     name?.split(' ').map(n => n[0]).join('').toUpperCase();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white pb-20">

//       {/* HEADER */}
//       <header className="flex justify-between items-center p-4 border-b border-white/10">
//         <h1 className="text-xl font-bold">Profile</h1>
//         <Button
//           onClick={onLogout}
//           className="rounded-full bg-white/10 hover:bg-white/20"
//         >
//           Logout
//         </Button>
//       </header>

//       <div className="max-w-md mx-auto px-4 py-6 space-y-6">

//         {/* PROFILE CARD */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center space-y-4"
//         >

//           {/* 🔥 AVATAR + EDIT ICON */}
//           <div className="relative w-fit mx-auto">
//             <Avatar className="w-24 h-24 border-4 border-white/10">
//               {user?.avatar ? (
//                 <img
//                   src={user.avatar}
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               ) : (
//                 <AvatarFallback className="text-2xl">
//                   {getInitials(user?.name)}
//                 </AvatarFallback>
//               )}
//             </Avatar>

//             {editing && (
//               <label className="absolute bottom-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 p-2 rounded-full cursor-pointer shadow-lg hover:scale-110 transition">
//                 📷
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleFile}
//                   className="hidden"
//                 />
//               </label>
//             )}
//           </div>

//           <h2 className="text-xl font-semibold">{user?.name}</h2>

//           <p className="text-sm text-zinc-400 flex justify-center items-center gap-1">
//             <Mail size={14}/> {user?.email}
//           </p>

//           <Button
//             onClick={() => setEditing(!editing)}
//             className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
//           >
//             {editing ? "Cancel" : "Edit Profile"}
//           </Button>

//         </motion.div>

//         {/* DETAILS */}
//         <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 space-y-4">

//           {editing ? (
//             <>
//               <Input
//                 value={formData.name}
//                 onChange={(e) => setFormData({...formData, name: e.target.value})}
//                 placeholder="Name"
//                 className="bg-white/10 border-white/10"
//               />

//               <Textarea
//                 value={formData.bio}
//                 onChange={(e) => setFormData({...formData, bio: e.target.value})}
//                 placeholder="Bio"
//                 className="bg-white/10 border-white/10"
//               />

//               <Input
//                 value={formData.major}
//                 onChange={(e) => setFormData({...formData, major: e.target.value})}
//                 placeholder="Major"
//                 className="bg-white/10 border-white/10"
//               />

//               <Input
//                 value={formData.year}
//                 onChange={(e) => setFormData({...formData, year: e.target.value})}
//                 placeholder="Year"
//                 className="bg-white/10 border-white/10"
//               />

//               <Input
//                 value={formData.interests}
//                 onChange={(e) => setFormData({...formData, interests: e.target.value})}
//                 placeholder="Interests"
//                 className="bg-white/10 border-white/10"
//               />

//               <Input
//                 value={formData.age}
//                 onChange={(e) => setFormData({...formData, age: e.target.value})}
//                 placeholder="Age"
//                 className="bg-white/10 border-white/10"
//               />

//               <Input
//                 value={formData.gender}
//                 onChange={(e) => setFormData({...formData, gender: e.target.value})}
//                 placeholder="Gender"
//                 className="bg-white/10 border-white/10"
//               />

//               <Input
//                 value={formData.phone}
//                 onChange={(e) => setFormData({...formData, phone: e.target.value})}
//                 placeholder="Phone"
//                 className="bg-white/10 border-white/10"
//               />

//               <Button
//                 onClick={handleSave}
//                 className="w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
//               >
//                 {loading ? "Saving..." : "Save"}
//               </Button>
//             </>
//           ) : (
//             <div className="space-y-4 text-sm">

//               {user?.bio && (
//                 <div>
//                   <p className="text-zinc-400 flex items-center gap-1">
//                     <User size={14}/> About
//                   </p>
//                   <p>{user.bio}</p>
//                 </div>
//               )}

//               {user?.major && (
//                 <div>
//                   <p className="text-zinc-400 flex items-center gap-1">
//                     <BookOpen size={14}/> Major
//                   </p>
//                   <p>{user.major}</p>
//                 </div>
//               )}

//               {user?.year && (
//                 <div>
//                   <p className="text-zinc-400 flex items-center gap-1">
//                     <Award size={14}/> Year
//                   </p>
//                   <p>{user.year}</p>
//                 </div>
//               )}

//               {user?.interests?.length > 0 && (
//                 <div>
//                   <p className="text-zinc-400 mb-1">Interests</p>
//                   <div className="flex flex-wrap gap-2">
//                     {user.interests.map((i, idx) => (
//                       <span key={idx} className="text-xs bg-white/20 px-2 py-1 rounded-full">
//                         {i}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               )}
//               {user?.age && (
//                   <div>
//                     <p className="text-zinc-400">Age</p>
//                     <p>{user.age}</p>
//                   </div>
//                 )}

//                 {user?.gender && (
//                   <div>
//                     <p className="text-zinc-400">Gender</p>
//                     <p>{user.gender}</p>
//                   </div>
//                 )}

//                 {user?.phone && (
//                   <div>
//                     <p className="text-zinc-400">Phone</p>
//                     <p>{user.phone}</p>
//                   </div>
//                 )}

//             </div>
//           )}

//         </div>

//       </div>

//       <Navigation currentPage="profile"/>
//     </div>
//   );
// }















import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  BookOpen,
  Award,
  Phone,
  Users,
  Calendar,
  Camera,
  Pencil,
  LogOut,
  Sparkles,
  Heart,
  Search,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function ProfilePage({ user, setUser, onLogout }) {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    interests: user?.interests?.join(', ') || '',
    year: user?.year || '',
    major: user?.major || '',
    age: user?.age || '',
    gender: user?.gender || '',
    phone: user?.phone || ''
  });

  const token = sessionStorage.getItem('friemds_token');

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`${API}/users/me`, {
        ...formData,
        interests: formData.interests.split(',').map(i => i.trim())
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setUser(res.data.user);
      localStorage.setItem('friemds_user', JSON.stringify(res.data.user));
      toast.success('Updated!');
      setEditing(false);
    } catch {
      toast.error('Error');
    } finally {
      setLoading(false);
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("avatar", file);

    try {
      const res = await axios.post(`${API}/users/upload-avatar`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setUser(res.data.user);
      localStorage.setItem("friemds_user", JSON.stringify(res.data.user));
      toast.success("Photo updated!");
    } catch {
      toast.error("Upload failed");
    }
  };

  const getInitials = (name) =>
    name?.split(' ').map(n => n[0]).join('').toUpperCase();

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
        {/* Background blobs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-[-70px] w-72 h-72 bg-pink-500/12 blur-3xl rounded-full" />
          <div className="absolute top-[30%] right-[-90px] w-80 h-80 bg-purple-500/10 blur-3xl rounded-full" />
          <div className="absolute bottom-[-100px] left-[30%] w-72 h-72 bg-fuchsia-500/10 blur-3xl rounded-full" />
        </div>

        <div className="relative z-10 flex min-h-screen">
          {/* Desktop Sidebar */}
          <aside className="hidden md:flex w-[290px] border-r border-white/10 bg-white/[0.03] backdrop-blur-2xl flex-col justify-between p-6">
            <div>
              <div className="mb-10">
                <img
                  src="/logo.png"
                  alt="Friemds Logo"
                  className="h-14 w-auto object-contain"
                />
                <p className="text-sm text-zinc-500 mt-3">
                  Manage your vibe.
                </p>
              </div>

              <div
                onClick={() => navigate('/profile')}
                className="glass-strong rounded-3xl p-4 premium-shadow mb-6 cursor-pointer hover:bg-white/[0.09] transition-all duration-300"
              >
                <div className="text-xs text-zinc-400 mb-3">Your profile</div>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border border-white/10">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        className="w-full h-full object-cover rounded-full"
                        alt="avatar"
                      />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white font-semibold">
                        {getInitials(user?.name || "U")}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="min-w-0">
                    <p className="font-semibold truncate">{user?.name}</p>
                    <p className="text-xs text-zinc-400 truncate">{user?.email}</p>
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
                  className="w-full justify-start rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white h-12"
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

                {/* <Button
                  variant="ghost"
                  onClick={() => navigate('/chat')}
                  className="w-full justify-start rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white h-12"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chats
                </Button> */}
              </div>

              <div className="glass rounded-2xl p-4 mt-6">
                <div className="flex items-center gap-2 mb-2 text-zinc-300">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <p className="font-medium">Profile tip</p>
                </div>
                <p className="text-sm text-zinc-400">
                  A complete profile helps others know your personality and connect faster.
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

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Header */}
            <header className="md:hidden sticky top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur-xl">
              <div className="px-4 py-4 flex justify-between items-center">
                <img
                  src="/logo.png"
                  alt="Friemds Logo"
                  className="h-10 w-auto object-contain"
                />

                <Button
                  onClick={onLogout}
                  className="rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/10"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
              >
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Your Profile</h1>
                <p className="text-zinc-400 mt-2">
                  Manage your profile, personalize your vibe, and let people know who you are.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-6">
                {/* LEFT PROFILE CARD */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45 }}
                  className="glass-strong gradient-border rounded-[32px] p-6 premium-shadow h-fit"
                >
                  <div className="text-center">
                    <div className="relative w-fit mx-auto">
                      <Avatar className="w-32 h-32 md:w-36 md:h-36 border-4 border-white/10 shadow-2xl">
                        {user?.avatar ? (
                          <img
                            src={user.avatar}
                            className="w-full h-full object-cover rounded-full"
                            alt="avatar"
                          />
                        ) : (
                          <AvatarFallback className="text-3xl bg-gradient-to-br from-pink-500 to-purple-600 text-white">
                            {getInitials(user?.name)}
                          </AvatarFallback>
                        )}
                      </Avatar>

                      {editing && (
                        <label className="absolute bottom-1 right-1 bg-gradient-to-r from-pink-500 to-purple-500 p-3 rounded-full cursor-pointer shadow-lg hover:scale-110 transition">
                          <Camera className="w-4 h-4 text-white" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFile}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold mt-5">{user?.name}</h2>

                    <p className="text-sm text-zinc-400 flex justify-center items-center gap-2 mt-2">
                      <Mail size={14} /> {user?.email}
                    </p>

                    <div className="mt-5">
                      <Button
                        onClick={() => setEditing(!editing)}
                        className="rounded-full px-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
                      >
                        <Pencil className="w-4 h-4 mr-2" />
                        {editing ? "Cancel" : "Edit Profile"}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className="glass rounded-2xl p-4 text-center">
                      <p className="text-xs text-zinc-400">Major</p>
                      <p className="text-sm font-medium mt-1">{user?.major || "—"}</p>
                    </div>
                    <div className="glass rounded-2xl p-4 text-center">
                      <p className="text-xs text-zinc-400">Year</p>
                      <p className="text-sm font-medium mt-1">{user?.year || "—"}</p>
                    </div>
                    <div className="glass rounded-2xl p-4 text-center">
                      <p className="text-xs text-zinc-400">Age</p>
                      <p className="text-sm font-medium mt-1">{user?.age || "—"}</p>
                    </div>
                    <div className="glass rounded-2xl p-4 text-center">
                      <p className="text-xs text-zinc-400">Gender</p>
                      <p className="text-sm font-medium mt-1">{user?.gender || "—"}</p>
                    </div>
                  </div>

                  <div className="glass rounded-2xl p-4 mt-4">
                    <div className="flex items-center gap-2 mb-2 text-zinc-300">
                      <Sparkles className="w-4 h-4 text-pink-400" />
                      <p className="font-medium">Profile tip</p>
                    </div>
                    <p className="text-sm text-zinc-400">
                      Add a strong bio and a few interests so people can connect with your vibe faster.
                    </p>
                  </div>
                </motion.div>

                {/* RIGHT DETAILS / FORM */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45 }}
                  className="glass-strong gradient-border rounded-[32px] p-6 md:p-7 premium-shadow"
                >
                  {editing ? (
                    <div className="space-y-5">
                      <div>
                        <p className="text-sm text-zinc-400 mb-2">Name</p>
                        <Input
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Name"
                          className="bg-white/10 border-white/10 rounded-2xl h-12 text-white"
                        />
                      </div>

                      <div>
                        <p className="text-sm text-zinc-400 mb-2">Bio</p>
                        <Textarea
                          value={formData.bio}
                          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                          placeholder="Bio"
                          className="bg-white/10 border-white/10 rounded-2xl min-h-[120px] text-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-zinc-400 mb-2">Major</p>
                          <Input
                            value={formData.major}
                            onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                            placeholder="Major"
                            className="bg-white/10 border-white/10 rounded-2xl h-12 text-white"
                          />
                        </div>

                        <div>
                          <p className="text-sm text-zinc-400 mb-2">Year</p>
                          <Input
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            placeholder="Year"
                            className="bg-white/10 border-white/10 rounded-2xl h-12 text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <p className="text-sm text-zinc-400 mb-2">Interests</p>
                        <Input
                          value={formData.interests}
                          onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                          placeholder="Interests"
                          className="bg-white/10 border-white/10 rounded-2xl h-12 text-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-zinc-400 mb-2">Age</p>
                          <Input
                            value={formData.age}
                            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                            placeholder="Age"
                            className="bg-white/10 border-white/10 rounded-2xl h-12 text-white"
                          />
                        </div>

                        <div>
                          <p className="text-sm text-zinc-400 mb-2">Gender</p>
                          <Input
                            value={formData.gender}
                            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                            placeholder="Gender"
                            className="bg-white/10 border-white/10 rounded-2xl h-12 text-white"
                          />
                        </div>

                        <div>
                          <p className="text-sm text-zinc-400 mb-2">Phone</p>
                          <Input
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="Phone"
                            className="bg-white/10 border-white/10 rounded-2xl h-12 text-white"
                          />
                        </div>
                      </div>

                      <Button
                        onClick={handleSave}
                        className="w-full md:w-auto px-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
                      >
                        {loading ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {user?.bio && (
                        <div className="glass rounded-3xl p-5">
                          <p className="text-zinc-400 flex items-center gap-2 mb-3">
                            <User size={16} /> About
                          </p>
                          <p className="text-white leading-7">{user.bio}</p>
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {user?.major && (
                          <div className="glass rounded-3xl p-5">
                            <p className="text-zinc-400 flex items-center gap-2 mb-2">
                              <BookOpen size={16} /> Major
                            </p>
                            <p>{user.major}</p>
                          </div>
                        )}

                        {user?.year && (
                          <div className="glass rounded-3xl p-5">
                            <p className="text-zinc-400 flex items-center gap-2 mb-2">
                              <Award size={16} /> Year
                            </p>
                            <p>{user.year}</p>
                          </div>
                        )}

                        {user?.age && (
                          <div className="glass rounded-3xl p-5">
                            <p className="text-zinc-400 flex items-center gap-2 mb-2">
                              <Calendar size={16} /> Age
                            </p>
                            <p>{user.age}</p>
                          </div>
                        )}

                        {user?.gender && (
                          <div className="glass rounded-3xl p-5">
                            <p className="text-zinc-400 flex items-center gap-2 mb-2">
                              <Users size={16} /> Gender
                            </p>
                            <p>{user.gender}</p>
                          </div>
                        )}

                        {user?.phone && (
                          <div className="glass rounded-3xl p-5 md:col-span-2">
                            <p className="text-zinc-400 flex items-center gap-2 mb-2">
                              <Phone size={16} /> Phone
                            </p>
                            <p>{user.phone}</p>
                          </div>
                        )}
                      </div>

                      {user?.interests?.length > 0 && (
                        <div className="glass rounded-3xl p-5">
                          <p className="text-zinc-400 mb-4 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-pink-400" />
                            Interests
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {user.interests.map((i, idx) => (
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

                      {!user?.bio &&
                        !user?.major &&
                        !user?.year &&
                        !user?.interests?.length &&
                        !user?.age &&
                        !user?.gender &&
                        !user?.phone && (
                          <div className="glass rounded-3xl p-10 text-center">
                            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4">
                              <Sparkles className="w-6 h-6 text-pink-400" />
                            </div>
                            <p className="text-lg font-semibold">Your profile is looking empty</p>
                            <p className="text-sm text-zinc-400 mt-2">
                              Add your bio, interests, and details to make better connections.
                            </p>
                          </div>
                        )}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </main>
        </div>

        {/* Mobile bottom nav only */}
        <div className="md:hidden">
          <Navigation currentPage="profile" />
        </div>
      </div>
    </>
  );
}