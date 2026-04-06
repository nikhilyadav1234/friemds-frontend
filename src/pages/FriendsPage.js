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













import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function FriendsPage() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastMessages, setLastMessages] = useState([]);

  const navigate = useNavigate();
const token = sessionStorage.getItem('friemds_token');
 

  const fetchFriends = async () => {
    try {
      const res = await axios.get(`${API}/friends`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFriends(res.data);
    } catch {
      toast.error('Failed to load friends');
    } finally {
      setLoading(false);
    }
  };
   useEffect(() => {
    fetchFriends();
    fetchLastMessages();
  }, [fetchFriends]);




const fetchLastMessages = async () => {
  try {
    const res = await axios.get(`${API}/messages/last`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setLastMessages(res.data);
  } catch {
    console.log("Last message fetch error");
  }
};


  const getInitials = (name) =>
    name.split(' ').map(n => n[0]).join('').toUpperCase();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-2 border-white border-t-transparent rounded-full" />
      </div>
    );
  }





  const sortedFriends = [...friends]
  .map(f => {
    const chat = lastMessages.find(m => m._id === f.user_id);

    return {
      ...f,
      lastMessage: chat?.lastMessage?.content || "",
      lastTime: chat?.lastMessage?.created_at || ""
    };
  })
  .sort((a, b) => new Date(b.lastTime) - new Date(a.lastTime));

console.log("friends:", friends);
console.log("lastMessages:", lastMessages);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white pb-20">

      {/* HEADER */}
      <header className="flex items-center p-4 border-b border-white/10">
        <h1 className="text-xl font-bold">Friends</h1>
        <span className="ml-auto text-sm bg-white/10 px-3 py-1 rounded-full">
          {friends.length}
        </span>
      </header>

      <div className="max-w-md mx-auto px-4 py-6">

        {friends.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-20 space-y-4"
          >
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="text-zinc-400"/>
            </div>

            <h2 className="text-xl font-semibold">No friends yet</h2>
            <p className="text-zinc-400 text-sm">
              Start swiping and build your circle
            </p>
          </motion.div>
        ) : (
          <div className="space-y-3">

            {sortedFriends.map((f, index) => (
              <motion.div
                key={f.user_id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >

                <Card
                  onClick={() => navigate(`/chat/${f.user_id}`)}
                  className="bg-white/5 border-white/10 backdrop-blur-xl rounded-2xl hover:scale-[1.02] transition cursor-pointer"
                >
                  <CardContent className="flex items-center justify-between p-4">

                    <div className="flex items-center gap-3">
                      <Avatar>
                        { f.avatar ? (
                            <img src={f.avatar} className="w-full h-full object-cover rounded-full" alt="friend"/>
                          ) : (
                            <AvatarFallback>{getInitials(f.name)}</AvatarFallback>
                          )}
                      </Avatar>

                      <div>
                        <p className="font-semibold">{f.name}</p>
                        <p className="text-xs text-zinc-400">
                          {f.lastMessage || f.email}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-pink-400">
                      <MessageCircle size={20}/>
                    </div>

                  </CardContent>
                </Card>

              </motion.div>
            ))}

          </div>
        )}
      </div>

      <Navigation currentPage="friends"/>
    </div>
  );
}