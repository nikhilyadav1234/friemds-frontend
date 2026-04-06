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































import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import { Users, UserPlus, Heart } from 'lucide-react';
import {  Heart } from 'lucide-react';
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
setFriends(friendsRes.data); // 🔥 ADD
const messages = msgRes.data.map(m => m.lastMessage);

// map: friendId → latest message time
const lastMap = {};

messages.forEach(m => {
  const other =
    m.sender_id === user.user_id ? m.recipient_id : m.sender_id;

  if (!lastMap[other]) {
    lastMap[other] = m.created_at;
  }
});

// sort friends
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
//   useEffect(() => {
//   fetchData();

//  useEffect(() => {
//   fetchData();
// }, []);

//   return () => clearInterval(interval);
// }, []);

useEffect(() => {
  fetchData();
}, []);

  const sendFriendRequest = async (id) => {
    try {
      await axios.post(`${API}/friends/request`,
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
      await sendFriendRequest(getId(student))
    }
    const id = getId(student);
      setStudents(prev => prev.filter(s => getId(s) !== id));
  };

  const acceptFriendRequest = async (id) => {
    await axios.post(`${API}/friends/accept`,
      { request_id: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchData();
  };

  const rejectFriendRequest = async (id) => {
    await axios.post(`${API}/friends/reject`,
      { request_id: id },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchData();
  };

  const getInitials = (name) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black">
        <div className="animate-spin w-10 h-10 border-2 border-white border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white">

      {/* HEADER */}
      <header className="flex justify-between items-center p-4 border-b border-white/10">
        <h1 className="text-xl font-bold tracking-wide">FRIEMDS</h1>
        <Button variant="ghost" onClick={() => navigate('/search')}>
          Search
        </Button>
      </header>

      {/* MAIN */}
      <div className="max-w-md mx-auto px-4 pt-6">

        <h2 className="text-2xl font-semibold mb-4">
          Hey {user?.name?.split(" ")[0]} 👋
        </h2>

        {/* REQUESTS */}
        {friendRequests.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-3 flex items-center gap-2">
              <Heart size={18}/> Requests
            </h3>

            {friendRequests.map(r => (
              <Card key={r.request_id} className="mb-3 bg-white/5 border-white/10">
                <CardContent className="flex justify-between items-center p-3">
                  <div className="flex gap-3 items-center">
                    <Avatar>
                      <AvatarFallback>
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
        )}

        {/* 🔥 SWIPE SECTION (FIXED ALIGNMENT) */}
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] pb-24 relative">

  {students.length > 0 ? (
    <>
      <motion.div
        key={getId(students[0])}
        drag="x"
        whileDrag={{ rotate: 8 }}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(e, info) => {
          if (info.offset.x > 120) handleSwipe("right", students[0]);
          if (info.offset.x < -120) handleSwipe("left", students[0]);
        }}
        className="w-[320px] h-[480px] rounded-3xl overflow-hidden shadow-2xl relative"
      >

        {students[0].avatar ? (
          <img src={students[0].avatar} className="w-full h-full object-cover" alt="user"/>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-5xl">
            {getInitials(students[0].name)}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/>

        <div className="absolute bottom-0 p-4">
          <h2 
            onClick={() => navigate(`/user/${students[0].user_id}`)}
            className="text-xl font-bold cursor-pointer hover:underline"
          >
            {students[0].name}
          </h2>
          <p className="text-sm opacity-70">
            {students[0].bio || "No bio yet"}
          </p>
        </div>
      </motion.div>

      <div className="flex gap-10 mt-8">
        <button
          onClick={() => handleSwipe("left", students[0])}
          className="w-14 h-14 bg-white text-red-500 rounded-full text-2xl shadow-lg"
        >
          ❌
        </button>

        <button
          onClick={() => handleSwipe("right", students[0])}
          className="w-14 h-14 bg-white text-green-500 rounded-full text-2xl shadow-lg"
        >
          ❤️
        </button>
      </div>
    </>
  ) : (
    <p>No more users</p>
  )}
</div>
        {/* STUDENT LIST */}
        {/* <div className="mt-16">
          <h3 className="flex items-center gap-2 mb-4">
            <Users size={18}/> All Students
          </h3>

          {students.map(s => (
            <Card key={s.user_id} className="mb-3 bg-white/5 border-white/10">
              <CardContent className="flex justify-between items-center p-3">
                <div className="flex gap-3 items-center">
                  <Avatar>
                    { s.avatar ? (
                        <img src={s.avatar} className="w-full h-full object-cover rounded-full"/>
                      ) : (
                        <AvatarFallback>{getInitials(s.name)}</AvatarFallback>
                      )}
                  </Avatar>
                  <p>{s.name}</p>
                </div>

                <Button size="sm" onClick={() => sendFriendRequest(s.user_id)}>
                  <UserPlus size={16}/>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div> */}

      </div>



      
{/* {friends.length > 0 && (
  <div className="mt-10">
    <h3>Your Friends</h3>

   {sortedFriends.map(f => (
      <div key={f.user_id} style={{display:"flex", justifyContent:"space-between", marginBottom:"10px"}}>
        <span 
          onClick={() => navigate(`/user/${f.user_id}`)}
          className="cursor-pointer hover:underline"
        >
          {f.name}
        </span>
        <button onClick={() => navigate(`/chat/${f.user_id}`)}>
          Chat
        </button>
      </div>
    ))}
  </div>
)} */}

      <Navigation currentPage="home"/>
    </div>
  );
}