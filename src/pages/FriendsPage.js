// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { MessageCircle } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { Badge } from '@/components/ui/badge';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';
// import Navigation from '@/components/Navigation';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

// export default function FriendsPage({ user, onLogout }) {
//   const [friends, setFriends] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const token = localStorage.getItem('friemds_token');

//   useEffect(() => {
//     fetchFriends();
//   }, []);

//   const fetchFriends = async () => {
//     try {
//       const response = await axios.get(`${API}/friends`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setFriends(response.data);
//     } catch (error) {
//       toast.error('Failed to load friends');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getInitials = (name) => {
//     return name
//       .split(' ')
//       .map(n => n[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-background flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//           <p className="mt-4 text-muted-foreground">Loading friends...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background pb-20">
//       {/* Header */}
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center px-4">
//           <h1 className="text-2xl font-bold">My Friends</h1>
//           <Badge variant="secondary" className="ml-auto">{friends.length}</Badge>
//         </div>
//       </header>

//       <main className="container max-w-4xl mx-auto px-4 py-8" data-testid="friends-page">
//         {friends.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center py-16 space-y-4"
//           >
//             <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
//               <MessageCircle className="w-12 h-12 text-muted-foreground" />
//             </div>
//             <h2 className="text-2xl font-semibold">No friends yet</h2>
//             <p className="text-muted-foreground">Start connecting with students on the Discover page!</p>
//           </motion.div>
//         ) : (
//           <div className="grid gap-4" data-testid="friends-list">
//             {friends.map((friend, index) => (
//               <motion.div
//                 key={friend.user_id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//               >
//                 <Card className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => navigate(`/chat/${friend.user_id}`)}>
//                   <CardContent className="p-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-14 w-14 border-2 border-primary/20">
//                           <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
//                             {getInitials(friend.name)}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div>
//                           <p className="font-semibold text-lg">{friend.name}</p>
//                           <p className="text-sm text-muted-foreground">{friend.email}</p>
//                           {friend.interests.length > 0 && (
//                             <div className="flex flex-wrap gap-1 mt-2">
//                               {friend.interests.slice(0, 3).map((interest, idx) => (
//                                 <Badge key={idx} variant="secondary" className="text-xs">
//                                   {interest}
//                                 </Badge>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       <MessageCircle className="w-5 h-5 text-primary" />
//                     </div>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </main>

//       <Navigation currentPage="friends" />
//     </div>
//   );
// }













// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { MessageCircle } from 'lucide-react';
// import { Card, CardContent } from '@/components/ui/card';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';
// import Navigation from '@/components/Navigation';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

// export default function FriendsPage() {
//   const [friends, setFriends] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [lastMessages, setLastMessages] = useState([]);

//   const navigate = useNavigate();
// const token = sessionStorage.getItem('friemds_token');
 

//   const fetchFriends = async () => {
//     try {
//       const res = await axios.get(`${API}/friends`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setFriends(res.data);
//     } catch {
//       toast.error('Failed to load friends');
//     } finally {
//       setLoading(false);
//     }
//   };
//    useEffect(() => {
//     fetchFriends();
//     fetchLastMessages();
//   }, [fetchFriends]);




// const fetchLastMessages = async () => {
//   try {
//     const res = await axios.get(`${API}/messages/last`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setLastMessages(res.data);
//   } catch {
//     console.log("Last message fetch error");
//   }
// };


//   const getInitials = (name) =>
//     name.split(' ').map(n => n[0]).join('').toUpperCase();

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="animate-spin w-10 h-10 border-2 border-white border-t-transparent rounded-full" />
//       </div>
//     );
//   }





//   const sortedFriends = [...friends]
//   .map(f => {
//     const chat = lastMessages.find(m => m._id === f.user_id);

//     return {
//       ...f,
//       lastMessage: chat?.lastMessage?.content || "",
//       lastTime: chat?.lastMessage?.created_at || ""
//     };
//   })
//   .sort((a, b) => new Date(b.lastTime) - new Date(a.lastTime));



//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white pb-20">

//       {/* HEADER */}
//       <header className="flex items-center p-4 border-b border-white/10">
//         <h1 className="text-xl font-bold">Friends</h1>
//         <span className="ml-auto text-sm bg-white/10 px-3 py-1 rounded-full">
//           {friends.length}
//         </span>
//       </header>

//       <div className="max-w-md mx-auto px-4 py-6">

//         {friends.length === 0 ? (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="text-center mt-20 space-y-4"
//           >
//             <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto">
//               <MessageCircle className="text-zinc-400"/>
//             </div>

//             <h2 className="text-xl font-semibold">No friends yet</h2>
//             <p className="text-zinc-400 text-sm">
//               Start swiping and build your circle
//             </p>
//           </motion.div>
//         ) : (
//           <div className="space-y-3">

//             {sortedFriends.map((f, index) => (
//               <motion.div
//                 key={f.user_id}
//                 initial={{ opacity: 0, y: 15 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.05 }}
//               >

//                 <Card
//                   onClick={() => navigate(`/chat/${f.user_id}`)}
//                   className="bg-white/5 border-white/10 backdrop-blur-xl rounded-2xl hover:scale-[1.02] transition cursor-pointer"
//                 >
//                   <CardContent className="flex items-center justify-between p-4">

//                     <div className="flex items-center gap-3">
//                       <Avatar>
//                         { f.avatar ? (
//                             <img src={f.avatar} className="w-full h-full object-cover rounded-full" alt="friend"/>
//                           ) : (
//                             <AvatarFallback>{getInitials(f.name)}</AvatarFallback>
//                           )}
//                       </Avatar>

//                       <div>
//                         <p className="font-semibold">{f.name}</p>
//                         <p className="text-xs text-zinc-400">
//                           {f.lastMessage || f.email}
//                         </p>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2 text-pink-400">
//                       <MessageCircle size={20}/>
//                     </div>

//                   </CardContent>
//                 </Card>

//               </motion.div>
//             ))}

//           </div>
//         )}
//       </div>

//       <Navigation currentPage="friends"/>
//     </div>
//   );
// }















// import { useState, useEffect, useMemo, useCallback } from 'react';
// import { motion } from 'framer-motion';
// import {
//   MessageCircle,
//   Sparkles,
//   Heart,
//   Search,
//   Users,
//   LogOut
// } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';
// import Navigation from '@/components/Navigation';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

// export default function FriendsPage({ user, onLogout }) {
//   const [friends, setFriends] = useState([]);
//   const [lastMessages, setLastMessages] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const navigate = useNavigate();
//   const token = sessionStorage.getItem('friemds_token');

//   const getInitials = (name = '') =>
//     name
//       .split(' ')
//       .map((n) => n[0])
//       .join('')
//       .toUpperCase();

//   const fetchFriends = useCallback(async () => {
//     const res = await axios.get(`${API}/friends`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     return res.data || [];
//   }, [token]);

//   const fetchLastMessages = useCallback(async () => {
//     try {
//       const res = await axios.get(`${API}/messages/last`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       return res.data || [];
//     } catch {
//       console.log('Last message fetch error');
//       return [];
//     }
//   }, [token]);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         setLoading(true);

//         const [friendsData, lastMessagesData] = await Promise.all([
//           fetchFriends(),
//           fetchLastMessages(),
//         ]);

//         setFriends(friendsData);
//         setLastMessages(lastMessagesData);
//       } catch {
//         toast.error('Failed to load friends');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, [fetchFriends, fetchLastMessages]);

//   const sortedFriends = useMemo(() => {
//     return [...friends]
//       .map((f) => {
//         const chat = lastMessages.find((m) => String(m._id) === String(f.user_id));

//         return {
//           ...f,
//           lastMessage: chat?.lastMessage?.content || '',
//           lastTime: chat?.lastMessage?.created_at || '',
//         };
//       })
//       .sort((a, b) => {
//         if (!a.lastTime) return 1;
//         if (!b.lastTime) return -1;
//         return new Date(b.lastTime) - new Date(a.lastTime);
//       });
//   }, [friends, lastMessages]);

//   const formatTime = (time) => {
//     if (!time) return '';
//     const date = new Date(time);

//     return date.toLocaleDateString([], {
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="h-10 w-10 animate-spin rounded-full border-2 border-white border-t-transparent" />
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         .glass {
//           background: rgba(255, 255, 255, 0.05);
//           backdrop-filter: blur(18px);
//           -webkit-backdrop-filter: blur(18px);
//           border: 1px solid rgba(255, 255, 255, 0.08);
//         }

//         .glass-strong {
//           background: rgba(255, 255, 255, 0.07);
//           backdrop-filter: blur(22px);
//           -webkit-backdrop-filter: blur(22px);
//           border: 1px solid rgba(255, 255, 255, 0.10);
//         }

//         .premium-shadow {
//           box-shadow:
//             0 20px 60px rgba(0,0,0,0.45),
//             0 0 0 1px rgba(255,255,255,0.04),
//             0 0 60px rgba(168,85,247,0.08);
//         }

//         .gradient-border {
//           position: relative;
//         }

//         .gradient-border::before {
//           content: "";
//           position: absolute;
//           inset: 0;
//           border-radius: inherit;
//           padding: 1px;
//           background: linear-gradient(
//             135deg,
//             rgba(236,72,153,0.55),
//             rgba(168,85,247,0.5),
//             rgba(255,255,255,0.08)
//           );
//           -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
//           -webkit-mask-composite: xor;
//           mask-composite: exclude;
//           pointer-events: none;
//         }
//       `}</style>

//       <div className="min-h-screen bg-black text-white pb-24 md:pb-0 relative overflow-hidden">
//         {/* Background blobs */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="absolute -top-20 left-[-70px] w-72 h-72 bg-pink-500/12 blur-3xl rounded-full" />
//           <div className="absolute top-[30%] right-[-90px] w-80 h-80 bg-purple-500/10 blur-3xl rounded-full" />
//           <div className="absolute bottom-[-100px] left-[30%] w-72 h-72 bg-fuchsia-500/10 blur-3xl rounded-full" />
//         </div>

//         <div className="relative z-10 flex min-h-screen">
//           {/* Desktop Sidebar */}
//           <aside className="hidden md:flex w-[290px] border-r border-white/10 bg-white/[0.03] backdrop-blur-2xl flex-col justify-between p-6">
//             <div>
//               <div className="mb-10">
//                 <img
//                   src="/logo.png"
//                   alt="Friemds Logo"
//                   className="h-14 w-auto object-contain"
//                 />
//                 <p className="text-sm text-zinc-500 mt-3">Manage your vibe.</p>
//               </div>

//               <div
//                 onClick={() => navigate('/profile')}
//                 className="glass-strong rounded-3xl p-4 premium-shadow mb-6 cursor-pointer hover:bg-white/[0.09] transition-all duration-300"
//               >
//                 <div className="text-xs text-zinc-400 mb-3">Your profile</div>
//                 <div className="flex items-center gap-3">
//                   <Avatar className="w-12 h-12 border border-white/10">
//                     {user?.avatar ? (
//                       <img
//                         src={user.avatar}
//                         className="w-full h-full object-cover rounded-full"
//                         alt="avatar"
//                       />
//                     ) : (
//                       <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white font-semibold">
//                         {getInitials(user?.name || 'U')}
//                       </AvatarFallback>
//                     )}
//                   </Avatar>

//                   <div className="min-w-0">
//                     <p className="font-semibold truncate">{user?.name}</p>
//                     <p className="text-xs text-zinc-400 truncate">{user?.email}</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-3">
//                 <Button
//                   variant="ghost"
//                   onClick={() => navigate('/')}
//                   className="w-full justify-start rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white h-12"
//                 >
//                   <Heart className="w-4 h-4 mr-2" />
//                   Discover
//                 </Button>

//                 <Button
//                   variant="ghost"
//                   onClick={() => navigate('/search')}
//                   className="w-full justify-start rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white h-12"
//                 >
//                   <Search className="w-4 h-4 mr-2" />
//                   Search
//                 </Button>

//                 <Button
//                   variant="ghost"
//                   onClick={() => navigate('/friends')}
//                   className="w-full justify-start rounded-2xl bg-white/15 border border-pink-400/30 text-white h-12"
//                 >
//                   <Users className="w-4 h-4 mr-2" />
//                   Friends
//                 </Button>

//                 <Button
//                   variant="ghost"
//                   onClick={() => navigate('/chat')}
//                   className="w-full justify-start rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white h-12"
//                 >
//                   <MessageCircle className="w-4 h-4 mr-2" />
//                   Chats
//                 </Button>
//               </div>

//               <div className="glass rounded-2xl p-4 mt-6">
//                 <div className="flex items-center gap-2 mb-2 text-zinc-300">
//                   <Sparkles className="w-4 h-4 text-pink-400" />
//                   <p className="font-medium">Friends tip</p>
//                 </div>
//                 <p className="text-sm text-zinc-400">
//                   Keep chatting with your connections to build stronger vibes.
//                 </p>
//               </div>
//             </div>

//             <Button
//               onClick={onLogout}
//               className="rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/10 w-full"
//             >
//               <LogOut className="w-4 h-4 mr-2" />
//               Logout
//             </Button>
//           </aside>

//           {/* Main Content */}
//           <main className="flex-1">
//             {/* Mobile Header */}
//             <header className="md:hidden sticky top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur-xl">
//               <div className="px-4 py-4 flex justify-between items-center">
//                 <div>
//                   <h1 className="text-xl font-bold tracking-tight">Friends</h1>
//                   <p className="text-xs text-zinc-400">Your circle, chats, and connections</p>
//                 </div>

//                 <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white">
//                   {friends.length}
//                 </div>
//               </div>
//             </header>

//             <div className="max-w-6xl mx-auto px-4 md:px-8 py-6 md:py-10">
//               <motion.div
//                 initial={{ opacity: 0, y: 18 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.4 }}
//                 className="mb-8"
//               >
//                 <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Friends</h1>
//                 <p className="text-zinc-400 mt-2">
//                   Your circle, recent conversations, and meaningful connections.
//                 </p>
//               </motion.div>

//               <motion.div
//                 initial={{ opacity: 0, y: 16 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.45 }}
//                 className="glass-strong gradient-border rounded-[32px] p-5 md:p-6 premium-shadow"
//               >
//                 <div className="flex items-center justify-between mb-6">
//                   <div>
//                     <p className="text-lg md:text-xl font-semibold">Your Connections</p>
//                     <p className="text-sm text-zinc-400 mt-1">
//                       {friends.length > 0
//                         ? `${friends.length} friend${friends.length > 1 ? 's' : ''} in your circle`
//                         : 'No connections yet'}
//                     </p>
//                   </div>

//                   <div className="hidden md:flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white">
//                     {friends.length}
//                   </div>
//                 </div>

//                 {friends.length === 0 ? (
//                   <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     className="glass rounded-3xl px-6 py-14 text-center"
//                   >
//                     <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 border border-white/10">
//                       <MessageCircle className="text-zinc-400" size={30} />
//                     </div>

//                     <h2 className="text-xl font-semibold">No friends yet</h2>
//                     <p className="mt-2 text-sm text-zinc-400">
//                       Start swiping and build your circle.
//                     </p>

//                     <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-sm text-pink-200">
//                       <Sparkles size={15} />
//                       Your future besties are waiting
//                     </div>
//                   </motion.div>
//                 ) : (
//                   <div className="space-y-3">
//                     {sortedFriends.map((f, index) => (
//                       <motion.div
//                         key={f.user_id}
//                         initial={{ opacity: 0, y: 14 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.03 }}
//                       >
//                         <div
//                           onClick={() => navigate(`/chat/${f.user_id}`)}
//                           className="glass rounded-3xl p-4 md:p-5 cursor-pointer transition duration-200 hover:bg-white/[0.08] hover:border-pink-500/20"
//                         >
//                           <div className="flex items-center justify-between">
//                             <div className="flex min-w-0 items-center gap-3">
//                               <Avatar className="h-12 w-12 ring-2 ring-white/10">
//                                 {f.avatar ? (
//                                   <img
//                                     src={f.avatar}
//                                     className="h-full w-full rounded-full object-cover"
//                                     alt={f.name}
//                                   />
//                                 ) : (
//                                   <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
//                                     {getInitials(f.name)}
//                                   </AvatarFallback>
//                                 )}
//                               </Avatar>

//                               <div className="min-w-0">
//                                 <p className="truncate font-semibold">{f.name}</p>
//                                 <p className="truncate text-xs text-zinc-400 mt-1">
//                                   {f.lastMessage || f.email}
//                                 </p>
//                               </div>
//                             </div>

//                             <div className="ml-3 flex flex-col items-end gap-2">
//                               {f.lastTime && (
//                                 <span className="text-[11px] text-zinc-500">
//                                   {formatTime(f.lastTime)}
//                                 </span>
//                               )}

//                               <div className="rounded-full bg-pink-500/10 p-2 text-pink-400 transition hover:bg-pink-500/20">
//                                 <MessageCircle size={18} />
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 )}
//               </motion.div>
//             </div>
//           </main>
//         </div>

//         {/* Mobile bottom nav only */}
//         <div className="md:hidden">
//           <Navigation currentPage="friends" />
//         </div>
//       </div>
//     </>
//   );
// }























import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  MessageCircle,
  Sparkles,
  Heart,
  Search,
  Users,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function FriendsPage({ user, onLogout }) {
  const [friends, setFriends] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = sessionStorage.getItem('friemds_token');

  const getInitials = (name = '') =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const fetchFriends = useCallback(async () => {
    const res = await axios.get(`${API}/friends`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data || [];
  }, [token]);

  const fetchLastMessages = useCallback(async () => {
    try {
      const res = await axios.get(`${API}/messages/last`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data || [];
    } catch {
      console.log('Last message fetch error');
      return [];
    }
  }, [token]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [friendsData, lastMessagesData] = await Promise.all([
          fetchFriends(),
          fetchLastMessages(),
        ]);

        setFriends(friendsData);
        setLastMessages(lastMessagesData);
      } catch {
        toast.error('Failed to load friends');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [fetchFriends, fetchLastMessages]);

  const sortedFriends = useMemo(() => {
    return [...friends]
      .map((f) => {
        const chat = lastMessages.find((m) => String(m._id) === String(f.user_id));

        return {
          ...f,
          lastMessage: chat?.lastMessage?.content || '',
          lastTime: chat?.lastMessage?.created_at || '',
        };
      })
      .sort((a, b) => {
        if (!a.lastTime) return 1;
        if (!b.lastTime) return -1;
        return new Date(b.lastTime) - new Date(a.lastTime);
      });
  }, [friends, lastMessages]);

  const formatTime = (time) => {
    if (!time) return '';
    const date = new Date(time);

    return date.toLocaleDateString([], {
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white border-t-transparent" />
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
                <p className="text-sm text-zinc-500 mt-3">Manage your vibe.</p>
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
                        {getInitials(user?.name || 'U')}
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
                  className="w-full justify-start rounded-2xl bg-white/15 border border-pink-400/30 text-white h-12"
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
                  <p className="font-medium">Friends tip</p>
                </div>
                <p className="text-sm text-zinc-400">
                  Keep chatting with your connections to build stronger vibes.
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
                <div>
                  <h1 className="text-xl font-bold tracking-tight">Friends</h1>
                  <p className="text-xs text-zinc-400">Your circle, chats, and connections</p>
                </div>

                <div className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-white">
                  {friends.length}
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
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Friends</h1>
                <p className="text-zinc-400 mt-2">
                  Your circle, recent conversations, and meaningful connections.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="glass-strong gradient-border rounded-[32px] p-5 md:p-6 premium-shadow"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-lg md:text-xl font-semibold">Your Connections</p>
                    <p className="text-sm text-zinc-400 mt-1">
                      {friends.length > 0
                        ? `${friends.length} friend${friends.length > 1 ? 's' : ''} in your circle`
                        : 'No connections yet'}
                    </p>
                  </div>

                  <div className="hidden md:flex items-center justify-center rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white">
                    {friends.length}
                  </div>
                </div>

                {friends.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="glass rounded-3xl px-6 py-14 text-center"
                  >
                    <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 border border-white/10">
                      <MessageCircle className="text-zinc-400" size={30} />
                    </div>

                    <h2 className="text-xl font-semibold">No friends yet</h2>
                    <p className="mt-2 text-sm text-zinc-400">
                      Start swiping and build your circle.
                    </p>

                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-sm text-pink-200">
                      <Sparkles size={15} />
                      Your future besties are waiting
                    </div>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {sortedFriends.map((f, index) => (
                      <motion.div
                        key={f.user_id}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <div
                          onClick={() => navigate(`/chat/${f.user_id}`)}
                          className="glass rounded-3xl p-4 md:p-5 cursor-pointer transition duration-200 hover:bg-white/[0.08] hover:border-pink-500/20"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex min-w-0 items-center gap-3">
                              <Avatar className="h-12 w-12 ring-2 ring-white/10">
                                {f.avatar ? (
                                  <img
                                    src={f.avatar}
                                    className="h-full w-full rounded-full object-cover"
                                    alt={f.name}
                                  />
                                ) : (
                                  <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                                    {getInitials(f.name)}
                                  </AvatarFallback>
                                )}
                              </Avatar>

                              <div className="min-w-0">
                                <p className="truncate font-semibold">{f.name}</p>
                                <p className="truncate text-xs text-zinc-400 mt-1">
                                  {f.lastMessage || f.email}
                                </p>
                              </div>
                            </div>

                            <div className="ml-3 flex flex-col items-end gap-2">
                              {f.lastTime && (
                                <span className="text-[11px] text-zinc-500">
                                  {formatTime(f.lastTime)}
                                </span>
                              )}

                              <div className="rounded-full bg-pink-500/10 p-2 text-pink-400 transition hover:bg-pink-500/20">
                                <MessageCircle size={18} />
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
          </main>
        </div>

        {/* Mobile bottom nav only */}
        <div className="md:hidden">
          <Navigation currentPage="friends" />
        </div>
      </div>
    </>
  );
}