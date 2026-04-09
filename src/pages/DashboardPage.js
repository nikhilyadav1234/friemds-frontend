// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Users, UserPlus, Heart } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import axios from 'axios';
// // import api from "@/lib/api";
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';
// import Navigation from '@/components/Navigation';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

// export default function DashboardPage({ user, onLogout }) {
//   const [students, setStudents] = useState([]);
//   const [friendRequests, setFriendRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const token = localStorage.getItem('friemds_token');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const [studentsRes, requestsRes] = await Promise.all([
//         axios.get(`${API}/users`, {
//           headers: { Authorization: `Bearer ${token}` }
//         }),
//         axios.get(`${API}/friends/requests`, {
//           headers: { Authorization: `Bearer ${token}` }
//         })
//       ]);
//       setStudents(studentsRes.data);
//       setFriendRequests(requestsRes.data);
//     } catch (error) {
//       toast.error('Failed to load data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const sendFriendRequest = async (recipientId) => {
//     try {
//       await axios.post(
//         `${API}/friends/request`,
//         { recipient_id: recipientId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success('Friend request sent!');
//     } catch (error) {
//       toast.error(error.response?.data?.msg || 'Failed to send request');
//     }
//   };



// const handleSwipe = async (direction, student) => {
//   if (direction === "right") {
//     await sendFriendRequest(student.user_id);
//   }

//   // 🔥 swipe ke baad card remove
//   setStudents(prev =>
//     prev.filter(s => s.user_id !== student.user_id)
//   );
// };








//   const acceptFriendRequest = async (requestId) => {
//     try {
//       await axios.post(
//         `${API}/friends/accept`,
//         { request_id: requestId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success('Friend request accepted!');
//       fetchData();
//     } catch (error) {
//       toast.error('Failed to accept request');
//     }
//   };

//   const rejectFriendRequest = async (requestId) => {
//     try {
//       await axios.post(
//         `${API}/friends/reject`,
//         { request_id: requestId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success('Request rejected');
//       fetchData();
//     } catch (error) {
//       toast.error('Failed to reject request');
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
//           <p className="mt-4 text-muted-foreground">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background pb-20">
//       {/* Header */}
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center justify-between px-4">
//           <h1 className="text-2xl font-bold">Friemds</h1>
//           <div className="flex items-center gap-2">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => navigate('/search')}
//               data-testid="search-button"
//             >
//               Search
//             </Button>
//           </div>
//         </div>
//       </header>

//       <main className="container max-w-4xl mx-auto px-4 py-8 space-y-8" data-testid="dashboard-main">
//         {/* Welcome Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="space-y-2"
//         >
//           <h2 className="text-3xl md:text-4xl font-semibold">
//             Welcome back, {user?.name?.split(' ')[0]}! 👋
//           </h2>
//           <p className="text-lg text-muted-foreground">
//             {friendRequests.length > 0 ? `You have ${friendRequests.length} pending friend request${friendRequests.length > 1 ? 's' : ''}` : 'Discover new friends on campus'}
//           </p>
//         </motion.div>

//         {/* Friend Requests */}
//         {friendRequests.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="space-y-4"
//           >
//             <div className="flex items-center gap-2">
//               <Heart className="w-5 h-5 text-accent" />
//               <h3 className="text-xl font-semibold">Friend Requests</h3>
//             </div>
//             <div className="grid gap-4" data-testid="friend-requests-list">
//               {friendRequests.map((request) => (
//                 <Card key={request.request_id} className="hover:border-primary/50 transition-colors">
//                   <CardContent className="p-4">
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-3">
//                         <Avatar className="h-12 w-12 border-2 border-primary/20">
//                           {request.sender_avatar ? (
//                             <img
//                               src={request.sender_avatar}
//                               className="h-full w-full object-cover rounded-full"
//                             />
//                           ) : (
//                             <AvatarFallback className="bg-primary/10 text-primary font-semibold">
//                               {getInitials(request.sender_name)}
//                             </AvatarFallback>
//                           )}
//                         </Avatar>
//                         <div>
//                           <p className="font-semibold">{request.sender_name}</p>
//                           <p className="text-sm text-muted-foreground">wants to connect</p>
//                         </div>
//                       </div>
//                       <div className="flex gap-2">
//                         <Button
//                           size="sm"
//                           onClick={() => acceptFriendRequest(request.request_id)}
//                           className="rounded-full"
//                           data-testid={`accept-request-${request.request_id}`}
//                         >
//                           Accept
//                         </Button>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => rejectFriendRequest(request.request_id)}
//                           className="rounded-full"
//                           data-testid={`reject-request-${request.request_id}`}
//                         >
//                           Decline
//                         </Button>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </motion.div>
//         )}




// {/* 🔥 SWIPE CARD */}
// {students.length > 0 ? (
//   <div className="flex justify-center mb-8">
//     {students.slice(0, 1).map((student) => (
//       <div
//         key={student.user_id}
//         className="bg-card shadow-xl rounded-2xl p-6 w-[320px] h-[450px] flex flex-col items-center justify-center border"
//       >

//         <Avatar className="h-28 w-28 border-4 border-primary/20">
//           {student.avatar ? (
//             <img
//               src={student.avatar}
//               className="h-full w-full object-cover rounded-full"
//             />
//           ) : (
//             <AvatarFallback className="text-2xl">
//               {getInitials(student.name)}
//             </AvatarFallback>
//           )}
//         </Avatar>

//         <h2 className="text-xl font-semibold mt-4">
//           {student.name}
//         </h2>

//         <p className="text-sm text-muted-foreground mt-2 text-center">
//           {student.bio || "No bio yet"}
//         </p>

//         <div className="flex flex-wrap gap-1 mt-3 justify-center">
//           {student.interests?.slice(0, 3).map((i, idx) => (
//             <Badge key={idx} variant="secondary">
//               {i}
//             </Badge>
//           ))}
//         </div>

//         <div className="flex gap-4 mt-6">
//           <button
//             onClick={() =>
//               setStudents(prev =>
//                 prev.filter(s => s.user_id !== student.user_id)
//               )
//             }
//             className="bg-red-500 text-white px-4 py-2 rounded-full"
//           >
//             ❌ Skip
//           </button>

//           <button
//             onClick={async () => {
//               await sendFriendRequest(student.user_id);
//               setStudents(prev =>
//                 prev.filter(s => s.user_id !== student.user_id)
//               );
//             }}
//             className="bg-green-500 text-white px-4 py-2 rounded-full"
//           >
//             ❤️ Add
//           </button>
//         </div>

//       </div>
//     ))}
//   </div>
// ) : (
//   <div className="text-center text-muted-foreground">
//     No more users to show
//   </div>
// )}








//         {/* All Students */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//           className="space-y-4"
//         >
//           <div className="flex items-center gap-2">
//             <Users className="w-5 h-5 text-primary" />
//             <h3 className="text-xl font-semibold">Discover Students</h3>
//             <Badge variant="secondary" className="ml-auto">{students.length}</Badge>
//           </div>
//           <div className="grid gap-4" data-testid="students-list">
//             {students.length === 0 ? (
//               <Card>
//                 <CardContent className="p-8 text-center text-muted-foreground">
//                   No other students yet. Be the first to invite your friends!
//                 </CardContent>
//               </Card>
//             ) : (
//               students.map((student) => (
//                 <Card key={student.user_id} className="hover:border-primary/50 transition-colors">
//                   <CardContent className="p-4">
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-start gap-3">
//                         <Avatar className="h-14 w-14 border-2 border-primary/20">
//                           {student.avatar ? (
//                             <img
//                               src={student.avatar}
//                               className="h-full w-full object-cover rounded-full"
//                             />
//                           ) : (
//                             <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
//                               {getInitials(student.name)}
//                             </AvatarFallback>
//                           )}
//                         </Avatar>
//                         <div className="space-y-1">
//                           <p className="font-semibold text-lg">{student.name}</p>
//                           <p className="text-sm text-muted-foreground">{student.email}</p>
//                           {student.major && (
//                             <p className="text-sm font-medium text-primary">{student.major}</p>
//                           )}
//                           {student.interests.length > 0 && (
//                             <div className="flex flex-wrap gap-1 mt-2">
//                               {student.interests.slice(0, 3).map((interest, idx) => (
//                                 <Badge key={idx} variant="secondary" className="text-xs">
//                                   {interest}
//                                 </Badge>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                       <Button
//                         size="sm"
//                         onClick={() => sendFriendRequest(student.user_id)}
//                         className="rounded-full"
//                         data-testid={`send-request-${student.user_id}`}
//                       >
//                         <UserPlus className="w-4 h-4 mr-1" />
//                         Add
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))
//             )}
//           </div>
//         </motion.div>
//       </main>

//       <Navigation currentPage="home" />
//     </div>
//   );
// }































// import { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// // import { Users, UserPlus, Heart } from 'lucide-react';
// import {  Heart } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { useNavigate } from 'react-router-dom';
// import Navigation from '@/components/Navigation';


// const shuffleArray = (array) => {
//   return [...array].sort(() => Math.random() - 0.5);
// };

// const getId = (u) => u.user_id || u._id;

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

// export default function DashboardPage({ user }) {
//   const [students, setStudents] = useState([]);
//   const [friendRequests, setFriendRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [friends, setFriends] = useState([]);
//   const [sortedFriends, setSortedFriends] = useState([]);
//   const navigate = useNavigate();
// const token = sessionStorage.getItem('friemds_token');


//   const fetchData = async () => {
//     try {
//       const [studentsRes, requestsRes, friendsRes, msgRes] = await Promise.all([
//   axios.get(`${API}/users`, { headers: { Authorization: `Bearer ${token}` } }),
//   axios.get(`${API}/friends/requests`, { headers: { Authorization: `Bearer ${token}` } }),
//   axios.get(`${API}/friends`, { headers: { Authorization: `Bearer ${token}` } }),
//   axios.get(`${API}/messages/last`, { headers: { Authorization: `Bearer ${token}` } })
// ]);

// const usersData = studentsRes.data.users || studentsRes.data;
// setStudents(shuffleArray(usersData));
// setFriendRequests(requestsRes.data);
// setFriends(friendsRes.data); // 🔥 ADD
// const messages = msgRes.data.map(m => m.lastMessage);

// // map: friendId → latest message time
// const lastMap = {};

// messages.forEach(m => {
//   const other =
//     m.sender_id === user.user_id ? m.recipient_id : m.sender_id;

//   if (!lastMap[other]) {
//     lastMap[other] = m.created_at;
//   }
// });

// // sort friends
// const sorted = friendsRes.data.sort((a, b) => {
//   const t1 = lastMap[a.user_id] || 0;
//   const t2 = lastMap[b.user_id] || 0;

//   return new Date(t2) - new Date(t1);
// });

// setSortedFriends(sorted);
//       setStudents(studentsRes.data.users || studentsRes.data);
//       setFriendRequests(requestsRes.data);
//     } catch {
//       toast.error('Failed to load data');
//     } finally {
//       setLoading(false);  
//     }
//   };
// //   useEffect(() => {
// //   fetchData();

// //  useEffect(() => {
// //   fetchData();
// // }, []);

// //   return () => clearInterval(interval);
// // }, []);

// useEffect(() => {
//   fetchData();
// }, []);

//   const sendFriendRequest = async (id) => {
//     try {
//       await axios.post(`${API}/friends/request`,
//         { recipient_id: id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success('Request sent ❤️');
//     } catch {
//       toast.error('Already sent');
//     }
//   };

//   const handleSwipe = async (dir, student) => {
//     if (dir === "right") {
//       await sendFriendRequest(getId(student))
//     }
//     const id = getId(student);
//       setStudents(prev => prev.filter(s => getId(s) !== id));
//   };

//   const acceptFriendRequest = async (id) => {
//     await axios.post(`${API}/friends/accept`,
//       { request_id: id },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     fetchData();
//   };

//   const rejectFriendRequest = async (id) => {
//     await axios.post(`${API}/friends/reject`,
//       { request_id: id },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );
//     fetchData();
//   };

//   const getInitials = (name) =>
//     name.split(' ').map(n => n[0]).join('').toUpperCase();

//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center bg-black">
//         <div className="animate-spin w-10 h-10 border-2 border-white border-t-transparent rounded-full" />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">

//       {/* HEADER */}
//       <header className="flex justify-between items-center p-4 border-b border-white/10">
//         <h1 className="text-xl font-bold tracking-wide">FRIEMDS</h1>
//         <Button variant="ghost" onClick={() => navigate('/search')}>
//           Search
//         </Button>
//       </header>

//       {/* MAIN */}
//       <div className="max-w-md mx-auto px-4 pt-6">

//         <h2 className="text-2xl font-semibold mb-4">
//           Hey {user?.name?.split(" ")[0]} 👋
//         </h2>

//         {/* REQUESTS */}
//         {friendRequests.length > 0 && (
//           <div className="mb-6">
//             <h3 className="mb-3 flex items-center gap-2">
//               <Heart size={18}/> Requests
//             </h3>

//             {friendRequests.map(r => (
//               <Card key={r.request_id} className="mb-3 bg-white/5 border-white/10">
//                 <CardContent className="flex justify-between items-center p-3">
//                   <div className="flex gap-3 items-center">
//                     <Avatar>
//                       <AvatarFallback>
//                         {getInitials(r.sender_name)}
//                       </AvatarFallback>
//                     </Avatar>
//                     <p>{r.sender_name}</p>
//                   </div>

//                   <div className="flex gap-2">
//                     <Button size="sm" onClick={() => acceptFriendRequest(r.request_id)}>✔</Button>
//                     <Button size="sm" variant="outline" onClick={() => rejectFriendRequest(r.request_id)}>✖</Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))}
//           </div>
//         )}

//         {/* 🔥 SWIPE SECTION (FIXED ALIGNMENT) */}
//         <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] pb-24 relative">

//   {students.length > 0 ? (
//     <>
//       <motion.div
//         key={getId(students[0])}
//         drag="x"
//         whileDrag={{ rotate: 8 }}
//         dragConstraints={{ left: 0, right: 0 }}
//         onDragEnd={(e, info) => {
//           if (info.offset.x > 120) handleSwipe("right", students[0]);
//           if (info.offset.x < -120) handleSwipe("left", students[0]);
//         }}
//         className="w-[320px] h-[480px] rounded-3xl overflow-hidden shadow-2xl relative"
//       >

//         {students[0].avatar ? (
//           <img src={students[0].avatar} className="w-full h-full object-cover" alt="user"/>
//         ) : (
//           <div className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-5xl">
//             {getInitials(students[0].name)}
//           </div>
//         )}

//         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/>

//         <div className="absolute bottom-0 p-4">
//           <h2 
//             onClick={() => navigate(`/user/${students[0].user_id}`)}
//             className="text-xl font-bold cursor-pointer hover:underline"
//           >
//             {students[0].name}
//           </h2>
//           <p className="text-sm opacity-70">
//             {students[0].bio || "No bio yet"}
//           </p>
//         </div>
//       </motion.div>

//       <div className="flex gap-10 mt-8">
//         <button
//           onClick={() => handleSwipe("left", students[0])}
//           className="w-14 h-14 bg-white text-red-500 rounded-full text-2xl shadow-lg"
//         >
//           ❌
//         </button>

//         <button
//           onClick={() => handleSwipe("right", students[0])}
//           className="w-14 h-14 bg-white text-green-500 rounded-full text-2xl shadow-lg"
//         >
//           ❤️
//         </button>
//       </div>
//     </>
//   ) : (
//     <p>No more users</p>
//   )}
// </div>
//         {/* STUDENT LIST */}
//         {/* <div className="mt-16">
//           <h3 className="flex items-center gap-2 mb-4">
//             <Users size={18}/> All Students
//           </h3>

//           {students.map(s => (
//             <Card key={s.user_id} className="mb-3 bg-white/5 border-white/10">
//               <CardContent className="flex justify-between items-center p-3">
//                 <div className="flex gap-3 items-center">
//                   <Avatar>
//                     { s.avatar ? (
//                         <img src={s.avatar} className="w-full h-full object-cover rounded-full"/>
//                       ) : (
//                         <AvatarFallback>{getInitials(s.name)}</AvatarFallback>
//                       )}
//                   </Avatar>
//                   <p>{s.name}</p>
//                 </div>

//                 <Button size="sm" onClick={() => sendFriendRequest(s.user_id)}>
//                   <UserPlus size={16}/>
//                 </Button>
//               </CardContent>
//             </Card>
//           ))}
//         </div> */}

//       </div>



      
// {/* {friends.length > 0 && (
//   <div className="mt-10">
//     <h3>Your Friends</h3>

//    {sortedFriends.map(f => (
//       <div key={f.user_id} style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
//         <span 
//           onClick={() => navigate(`/user/${f.user_id}`)}
//           className="cursor-pointer hover:underline"
//         >
//           {f.name}
//         </span>
//         <button onClick={() => navigate(`/chat/${f.user_id}`)}>
//           Chat
//         </button>
//       </div>
//     ))}
//   </div>
// )} */}

//       <Navigation currentPage="home"/>
//     </div>
//   );
// }















import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import {
  Heart,
  Search,
  X,
  Sparkles,
  UserRound,
  ArrowRight,
  Zap,
  MessageCircle,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const getId = (u) => u.user_id || u._id;

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function DashboardPage({ user }) {
  const [students, setStudents] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [friends, setFriends] = useState([]);
  const [sortedFriends, setSortedFriends] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem('friemds_token');

  const fetchData = async () => {
    try {
      const [studentsRes, requestsRes, friendsRes, msgRes] = await Promise.all([
        axios.get(`${API}/users`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API}/friends/requests`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API}/friends`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API}/messages/last`, { headers: { Authorization: `Bearer ${token}` } })
      ]);

      const usersData = studentsRes.data.users || studentsRes.data;
      setStudents(shuffleArray(usersData));
      setFriendRequests(requestsRes.data);
      setFriends(friendsRes.data);
      const messages = msgRes.data.map(m => m.lastMessage);

      const lastMap = {};

      messages.forEach(m => {
        const other =
          m.sender_id === user.user_id ? m.recipient_id : m.sender_id;

        if (!lastMap[other]) {
          lastMap[other] = m.created_at;
        }
      });

      const sorted = friendsRes.data.sort((a, b) => {
        const t1 = lastMap[a.user_id] || 0;
        const t2 = lastMap[b.user_id] || 0;

        return new Date(t2) - new Date(t1);
      });

      setSortedFriends(sorted);
      setStudents(studentsRes.data.users || studentsRes.data);
      setFriendRequests(requestsRes.data);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const sendFriendRequest = async (id) => {
    try {
      await axios.post(
        `${API}/friends/request`,
        { recipient_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Request sent ❤️');
    } catch {
      toast.error('Already sent');
    }
  };

  const handleSwipe = async (dir, student) => {
    if (dir === "right") {
      await sendFriendRequest(getId(student));
    }
    const id = getId(student);
    setStudents(prev => prev.filter(s => getId(s) !== id));
  };

  const acceptFriendRequest = async (id) => {
    await axios.post(
      `${API}/friends/accept`,
      { request_id: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchData();
  };

  const rejectFriendRequest = async (id) => {
    await axios.post(
      `${API}/friends/reject`,
      { request_id: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchData();
  };

  const getInitials = (name) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase();

  const currentStudent = students[0];
  const nextStudent = students[1];
  const thirdStudent = students[2];

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-220, 0, 220], [-10, 0, 10]);
  const likeOpacity = useTransform(x, [0, 70, 150], [0, 0.6, 1]);
  const nopeOpacity = useTransform(x, [-150, -70, 0], [1, 0.6, 0]);
  const likeScale = useTransform(x, [0, 70, 150], [0.8, 1, 1.08]);
  const nopeScale = useTransform(x, [-150, -70, 0], [1.08, 1, 0.8]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="relative flex items-center justify-center">
          <div className="animate-spin w-14 h-14 border-2 border-white/15 border-t-pink-500 rounded-full" />
          <div className="absolute w-20 h-20 bg-pink-500/10 blur-2xl rounded-full" />
        </div>
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

        .soft-shadow {
          box-shadow:
            0 10px 30px rgba(0,0,0,0.35),
            0 0 0 1px rgba(255,255,255,0.04);
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

        .scrollbar-hide::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-hide::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
        }

        @keyframes floaty {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        .floaty {
          animation: floaty 5s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-[-100px] w-[26rem] h-[26rem] bg-pink-500/12 blur-3xl rounded-full" />
          <div className="absolute top-[25%] right-[-120px] w-[30rem] h-[30rem] bg-purple-500/12 blur-3xl rounded-full" />
          <div className="absolute bottom-[-120px] left-[25%] w-[28rem] h-[28rem] bg-fuchsia-500/10 blur-3xl rounded-full" />
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
                  Swipe. Connect. Belong.
                </p>
              </div>

              <div
                onClick={() => navigate('/profile')}
                className="glass-strong rounded-3xl p-4 premium-shadow mb-6 cursor-pointer hover:bg-white/[0.09] transition-all duration-300"
              >
                <div className="text-xs text-zinc-400 mb-3">Your profile</div>
                <div className="flex items-center gap-3">
                  <Avatar className="w-12 h-12 border border-white/10">
                    <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white font-semibold">
                      {getInitials(user?.name || "U")}
                    </AvatarFallback>
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

              <div className="mt-6 glass rounded-3xl p-4 soft-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-pink-400" />
                  <p className="font-medium">How it works</p>
                </div>

                <div className="space-y-3 text-sm text-zinc-300">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-red-500/15 border border-red-400/20 flex items-center justify-center">
                      <X className="w-4 h-4 text-red-400" />
                    </div>
                    <p>Swipe left to skip profile</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-pink-500/15 border border-pink-400/20 flex items-center justify-center">
                      <Heart className="w-4 h-4 text-pink-400 fill-current" />
                    </div>
                    <p>Swipe right to connect</p>
                  </div>
                </div>
              </div>

              {friendRequests.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-pink-500/15 flex items-center justify-center border border-pink-500/20">
                      <Heart className="w-4 h-4 text-pink-400" />
                    </div>
                    <h3 className="font-semibold">Requests</h3>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 scrollbar-hide">
                    {friendRequests.map(r => (
                      <motion.div
                        key={r.request_id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass rounded-2xl p-3 soft-shadow"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="w-10 h-10 border border-white/10">
                            <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white text-sm">
                              {getInitials(r.sender_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="text-sm font-medium truncate">{r.sender_name}</p>
                            <p className="text-xs text-zinc-400">Wants to connect</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => acceptFriendRequest(r.request_id)}
                            className="flex-1 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
                          >
                            ✔
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => rejectFriendRequest(r.request_id)}
                            className="flex-1 rounded-xl border-white/10 bg-white/5 text-white hover:bg-white/10"
                          >
                            ✖
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {sortedFriends.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    <h3 className="font-semibold">Recent friends</h3>
                  </div>

                  <div className="space-y-2">
                    {sortedFriends.slice(0, 4).map((f) => (
                      <div
                        key={f.user_id}
                        onClick={() => navigate(`/user/${f.user_id}`)}
                        className="glass rounded-2xl px-3 py-3 flex items-center gap-3 cursor-pointer hover:bg-white/[0.08] transition"
                      >
                        <Avatar className="w-9 h-9 border border-white/10">
                          <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white text-xs">
                            {getInitials(f.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <p className="text-sm truncate">{f.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="glass rounded-2xl p-4 text-sm text-zinc-400">
              Make meaningful friendships with people who match your vibe.
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1">
            <header className="md:hidden sticky top-0 z-20 border-b border-white/10 bg-black/60 backdrop-blur-xl">
              <div className="px-4 py-4 flex items-center justify-between">
                <img
                  src="/logo.png"
                  alt="Friemds Logo"
                  className="h-10 w-auto object-contain"
                />

                <Button
                  variant="ghost"
                  onClick={() => navigate('/search')}
                  className="rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10 pb-28 md:pb-10">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8 md:mb-10"
              >
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                      Hey {user?.name?.split(" ")[0]} 👋
                    </h2>
                    <p className="text-zinc-400 mt-2 text-sm md:text-base">
                      Swipe left to pass, swipe right to connect.
                    </p>
                  </div>

                  <div className="hidden md:flex items-center gap-3">
                    {/* <div className="glass rounded-2xl px-4 py-3 text-sm text-zinc-300">
                      {students.length} profiles available
                    </div> */}
                    <div className="glass rounded-2xl px-4 py-3 text-sm text-zinc-300">
                      {friendRequests.length} requests pending
                    </div>
                  </div>
                </div>
              </motion.div>

              {friendRequests.length > 0 && (
                <div className="md:hidden mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Heart size={18} className="text-pink-400" />
                    <h3 className="font-semibold">Requests</h3>
                  </div>

                  <div className="space-y-3">
                    {friendRequests.map(r => (
                      <Card key={r.request_id} className="glass border-white/10 rounded-2xl">
                        <CardContent className="flex justify-between items-center p-4">
                          <div className="flex gap-3 items-center">
                            <Avatar className="border border-white/10">
                              <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white">
                                {getInitials(r.sender_name)}
                              </AvatarFallback>
                            </Avatar>
                            <p>{r.sender_name}</p>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => acceptFriendRequest(r.request_id)}>✔</Button>
                            <Button size="sm" variant="outline" onClick={() => rejectFriendRequest(r.request_id)}>✖</Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Desktop */}
              <div className="hidden md:block">
                {currentStudent ? (
                  <div className="relative min-h-[650px]">
                    {thirdStudent && (
                      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                        <div className="w-[92%] h-[590px] rounded-[34px] bg-white/[0.025] border border-white/5 scale-[0.93] translate-y-8 opacity-30 premium-shadow" />
                      </div>
                    )}

                    {nextStudent && (
                      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                        <div className="w-[95%] h-[610px] rounded-[34px] bg-white/[0.035] border border-white/5 scale-[0.965] translate-y-4 opacity-45 premium-shadow" />
                      </div>
                    )}

                    <motion.div
                      key={getId(currentStudent)}
                      drag="x"
                      style={{ x, rotate }}
                      whileDrag={{ scale: 1.01 }}
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(e, info) => {
                        if (info.offset.x > 120) handleSwipe("right", currentStudent);
                        if (info.offset.x < -120) handleSwipe("left", currentStudent);
                      }}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="relative z-10 grid grid-cols-[470px_1fr] gap-8 glass-strong gradient-border rounded-[36px] p-5 lg:p-6 premium-shadow min-h-[620px] overflow-hidden"
                    >
                      {/* Image */}
                      <div className="relative rounded-[30px] overflow-hidden min-h-[580px] group">
                        {currentStudent.avatar ? (
                          <img
                            src={currentStudent.avatar}
                            alt="user"
                            className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-6xl font-bold">
                            {getInitials(currentStudent.name)}
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                        <motion.div
                          style={{ opacity: likeOpacity, scale: likeScale }}
                          className="absolute top-6 left-6 px-5 py-2 rounded-2xl bg-green-500/20 backdrop-blur-md border border-green-400/30 text-green-300 text-xl font-bold rotate-[-12deg]"
                        >
                          LIKE
                        </motion.div>

                        <motion.div
                          style={{ opacity: nopeOpacity, scale: nopeScale }}
                          className="absolute top-6 right-6 px-5 py-2 rounded-2xl bg-red-500/20 backdrop-blur-md border border-red-400/30 text-red-300 text-xl font-bold rotate-[12deg]"
                        >
                          NOPE
                        </motion.div>

                        <div className="absolute bottom-5 left-5 right-5">
                          <div className="glass rounded-2xl px-4 py-3 text-sm text-zinc-200">
                            ← Swipe left to skip &nbsp;&nbsp; • &nbsp;&nbsp; Swipe right to connect →
                          </div>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3 mb-5">
                            <h3
                              onClick={() => navigate(`/user/${currentStudent.user_id}`)}
                              className="text-5xl font-bold cursor-pointer hover:underline tracking-tight"
                            >
                              {currentStudent.name}
                            </h3>
                            <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-300">
                              Campus student
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4 mb-5">
                            <motion.div
                              whileHover={{ y: -4 }}
                              className="glass rounded-3xl p-5"
                            >
                              <div className="flex items-center gap-2 text-zinc-400 mb-3">
                                <UserRound className="w-4 h-4" />
                                <span className="text-sm">About</span>
                              </div>
                              <p className="text-white text-sm leading-7">
                                {currentStudent.bio || "No bio yet"}
                              </p>
                            </motion.div>

                            <motion.div
                              whileHover={{ y: -4 }}
                              className="glass rounded-3xl p-5"
                            >
                              <div className="flex items-center gap-2 text-zinc-400 mb-3">
                                <Sparkles className="w-4 h-4 text-pink-400" />
                                <span className="text-sm">How to interact</span>
                              </div>
                              <p className="text-white text-sm leading-7">
                                Drag this profile card left to skip or drag right to send a friend request.
                              </p>
                            </motion.div>
                          </div>

                          <motion.div
                            whileHover={{ y: -4 }}
                            className="glass rounded-3xl p-5 mb-5"
                          >
                            <div className="flex items-center gap-2 mb-4">
                              <Heart className="w-4 h-4 text-pink-400" />
                              <h4 className="font-semibold text-lg">Hobbies & interests</h4>
                            </div>

                            <div className="flex flex-wrap gap-3">
                              {(currentStudent.interests && currentStudent.interests.length > 0) ? (
                                currentStudent.interests.map((interest, idx) => (
                                  <span
                                    key={idx}
                                    className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/15 to-purple-500/15 border border-white/10 text-sm text-white hover:scale-105 transition"
                                  >
                                    {interest}
                                  </span>
                                ))
                              ) : (
                                <span className="text-zinc-400 text-sm">No interests added yet</span>
                              )}
                            </div>
                          </motion.div>

                          <div className="grid grid-cols-3 gap-4">
                            <motion.div whileHover={{ y: -4 }} className="glass rounded-3xl p-5">
                              <p className="text-xs text-zinc-400 mb-2">Connect</p>
                              <p className="text-sm text-white leading-6">
                                Swipe right if the vibe matches.
                              </p>
                            </motion.div>

                            <motion.div whileHover={{ y: -4 }} className="glass rounded-3xl p-5">
                              <p className="text-xs text-zinc-400 mb-2">Skip</p>
                              <p className="text-sm text-white leading-6">
                                Swipe left to see the next student.
                              </p>
                            </motion.div>

                            <motion.div whileHover={{ y: -4 }} className="glass rounded-3xl p-5">
                              <p className="text-xs text-zinc-400 mb-2">Profile</p>
                              <p className="text-sm text-white leading-6">
                                Click the name to open their full profile.
                              </p>
                            </motion.div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 mt-8">
                          <div className="text-sm text-zinc-400 flex items-center gap-2">
                            <ArrowRight className="w-4 h-4" />
                            Drag card left or right
                          </div>

                          <div className="flex items-center gap-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSwipe("left", currentStudent)}
                              className="group w-16 h-16 rounded-full bg-white text-red-500 flex items-center justify-center shadow-xl transition-all duration-300"
                            >
                              <X className="w-7 h-7 group-hover:scale-110 transition" />
                            </motion.button>

                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleSwipe("right", currentStudent)}
                              className="group w-16 h-16 rounded-full bg-white text-pink-500 flex items-center justify-center shadow-xl transition-all duration-300"
                            >
                              <Heart className="w-7 h-7 fill-current group-hover:scale-110 transition" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="glass-strong rounded-[36px] p-16 text-center premium-shadow">
                    <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-6 floaty">
                      <Heart className="w-10 h-10 text-pink-400" />
                    </div>
                    <h3 className="text-3xl font-bold mb-3">No more users</h3>
                    <p className="text-zinc-400 text-lg">
                      Check back later for more people to connect with.
                    </p>
                  </div>
                )}
              </div>

              {/* Mobile */}
              <div className="md:hidden flex flex-col items-center justify-center min-h-[calc(100vh-220px)] pb-24 relative">
                <div className="w-full mb-4">
                  <div className="glass rounded-2xl p-3 text-center text-sm text-zinc-300">
                    Swipe left to skip • Swipe right to connect
                  </div>
                </div>

                {students.length > 0 ? (
                  <>
                    <motion.div
                      key={getId(students[0])}
                      drag="x"
                      style={{ x, rotate }}
                      whileDrag={{ scale: 1.02 }}
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(e, info) => {
                        if (info.offset.x > 120) handleSwipe("right", students[0]);
                        if (info.offset.x < -120) handleSwipe("left", students[0]);
                      }}
                      className="w-[320px] h-[540px] rounded-[32px] overflow-hidden shadow-2xl relative border border-white/10 bg-zinc-900"
                    >
                      {students[0].avatar ? (
                        <img
                          src={students[0].avatar}
                          className="w-full h-full object-cover"
                          alt="user"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-5xl">
                          {getInitials(students[0].name)}
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                      <motion.div
                        style={{ opacity: likeOpacity, scale: likeScale }}
                        className="absolute top-5 left-5 px-4 py-2 rounded-2xl bg-green-500/20 border border-green-400/30 text-green-300 text-lg font-bold rotate-[-12deg]"
                      >
                        LIKE
                      </motion.div>

                      <motion.div
                        style={{ opacity: nopeOpacity, scale: nopeScale }}
                        className="absolute top-5 right-5 px-4 py-2 rounded-2xl bg-red-500/20 border border-red-400/30 text-red-300 text-lg font-bold rotate-[12deg]"
                      >
                        NOPE
                      </motion.div>

                      <div className="absolute bottom-0 p-4 w-full">
                        <div className="glass rounded-3xl p-4">
                          <h2
                            onClick={() => navigate(`/user/${students[0].user_id}`)}
                            className="text-2xl font-bold cursor-pointer hover:underline"
                          >
                            {students[0].name}
                          </h2>

                          <p className="text-sm text-zinc-300 mt-1">
                            {students[0].bio || "No bio yet"}
                          </p>

                          {students[0].interests?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {students[0].interests.slice(0, 3).map((interest, idx) => (
                                <span
                                  key={idx}
                                  className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/10 text-zinc-200"
                                >
                                  {interest}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>

                    <div className="flex gap-10 mt-8">
                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSwipe("left", students[0])}
                        className="w-14 h-14 bg-white text-red-500 rounded-full text-2xl shadow-lg flex items-center justify-center"
                      >
                        <X className="w-6 h-6" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSwipe("right", students[0])}
                        className="w-14 h-14 bg-white text-pink-500 rounded-full text-2xl shadow-lg flex items-center justify-center"
                      >
                        <Heart className="w-6 h-6 fill-current" />
                      </motion.button>
                    </div>
                  </>
                ) : (
                  <div className="w-full mt-10">
                    <div className="glass rounded-3xl p-8 text-center">
                      <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center mb-4">
                        <Heart className="w-7 h-7 text-pink-400" />
                      </div>
                      <p className="text-lg font-semibold text-white">No more users</p>
                      <p className="text-sm text-zinc-400 mt-2">
                        Check back later for new people to connect with.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>

        {/* Mobile bottom nav only */}
        <div className="md:hidden">
          <Navigation currentPage="home" />
        </div>
      </div>
    </>
  );
}