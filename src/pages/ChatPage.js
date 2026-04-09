// import { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { ArrowLeft, Send } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { useNavigate, useParams } from 'react-router-dom';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

// export default function ChatPage({ user, onLogout }) {
//   const { friendId } = useParams();
//   const [friend, setFriend] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const messagesEndRef = useRef(null);
//   const navigate = useNavigate();

//   const token = localStorage.getItem('friemds_token');

//   useEffect(() => {
//     fetchFriendAndMessages();
//     const interval = setInterval(fetchMessages, 3000);
//     return () => clearInterval(interval);
//   }, [friendId]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const fetchFriendAndMessages = async () => {
//     try {
//       const [friendsRes, messagesRes] = await Promise.all([
//         axios.get(`${API}/friends`, {
//           headers: { Authorization: `Bearer ${token}` }
//         }),
//         axios.get(`${API}/messages/${friendId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         })
//       ]);
//       const friendData = friendsRes.data.find(f => f.user_id === friendId);
//       setFriend(friendData);
//       setMessages(messagesRes.data);
//     } catch (error) {
//       toast.error('Failed to load chat');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(`${API}/messages/${friendId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setMessages(response.data);
//     } catch (error) {
//       // Silent fail for polling
//     }
//   };

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;

//     try {
//       await axios.post(
//         `${API}/messages`,
//         { recipient_id: friendId, content: newMessage },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setNewMessage('');
//       fetchMessages();
//     } catch (error) {
//       toast.error('Failed to send message');
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
//           <p className="mt-4 text-muted-foreground">Loading chat...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background flex flex-col" data-testid="chat-page">
//       {/* Header */}
//       <header className="sticky top-0 z-50 w-full border-b bg-background">
//         <div className="container flex h-16 items-center gap-4 px-4">
//           <Button
//             variant="ghost"
//             size="icon"
//             onClick={() => navigate('/friends')}
//             data-testid="back-to-friends-button"
//           >
//             <ArrowLeft className="w-5 h-5" />
//           </Button>
//           {friend && (
//             <div className="flex items-center gap-3">
//               <Avatar className="h-10 w-10 border-2 border-primary/20">
//                 <AvatarFallback className="bg-primary/10 text-primary font-semibold">
//                   {getInitials(friend.name)}
//                 </AvatarFallback>
//               </Avatar>
//               <div>
//                 <p className="font-semibold">{friend.name}</p>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Messages */}
//       <main className="flex-1 overflow-y-auto p-4 space-y-4" data-testid="messages-container">
//         {messages.length === 0 ? (
//           <div className="text-center py-16 text-muted-foreground">
//             No messages yet. Start the conversation!
//           </div>
//         ) : (
//           messages.map((msg, index) => {
//             const isSent = msg.sender_id === user.user_id;
//             return (
//               <motion.div
//                 key={msg.message_id}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.02 }}
//                 className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`max-w-[70%] px-4 py-2 rounded-2xl ${
//                     isSent
//                       ? 'bg-primary text-primary-foreground rounded-br-sm'
//                       : 'bg-muted text-foreground rounded-bl-sm'
//                   }`}
//                   data-testid={`message-${msg.message_id}`}
//                 >
//                   <p className="text-sm leading-relaxed break-words">{msg.content}</p>
//                 </div>
//               </motion.div>
//             );
//           })
//         )}
//         <div ref={messagesEndRef} />
//       </main>

//       {/* Input */}
//       <footer className="sticky bottom-0 border-t bg-background p-4">
//         <form onSubmit={sendMessage} className="flex gap-2">
//           <Input
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="h-12 rounded-full"
//             data-testid="message-input"
//           />
//           <Button
//             type="submit"
//             size="icon"
//             className="h-12 w-12 rounded-full flex-shrink-0"
//             disabled={!newMessage.trim()}
//             data-testid="send-message-button"
//           >
//             <Send className="w-5 h-5" />
//           </Button>
//         </form>
//       </footer>
//     </div>
//   );
// }


















// import { useState, useEffect, useRef } from 'react';
// import { motion } from 'framer-motion';
// import { ArrowLeft, Send } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import axios from 'axios';
// import { toast } from 'sonner';
// import { useNavigate, useParams } from 'react-router-dom';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;


// export default function ChatPage({ user }) {
//   const socketRef = useRef(null);
//   const { friendId } = useParams();
//   const [friend, setFriend] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [loading, setLoading] = useState(true);
//   const messagesEndRef = useRef(null);
//   const navigate = useNavigate();

//   // const token = localStorage.getItem('friemds_token');
//   const token = sessionStorage.getItem('friemds_token');

// useEffect(() => {
//   fetchData();

//   if (socketRef.current) return;

//   const WS_URL =
//     window.location.hostname === "localhost"
//       ? "ws://localhost:8000"
//       : "wss://friemds-backend.onrender.com";

//   socketRef.current = new WebSocket(`${WS_URL}/ws`);

//   socketRef.current.onopen = () => {
//     console.log("✅ WS Connected");

//     socketRef.current.send(JSON.stringify({
//       type: "register",
//       user_id: user.user_id
//     }));
//   };

//   socketRef.current.onmessage = (event) => {
//     const data = JSON.parse(event.data);

//     if (String(data.sender_id) === String(friendId)) {
//       setMessages(prev => [...prev, data]);
//     }
//   };

//   socketRef.current.onerror = (err) => {
//     console.log("❌ WS Error", err);
//   };

//   return () => {
//     socketRef.current?.close();
//     socketRef.current = null;
//   };

// }, [friendId]);

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const fetchData = async () => {
//     try {
//       const [friendsRes, msgRes] = await Promise.all([
//         axios.get(`${API}/friends`, {
//           headers: { Authorization: `Bearer ${token}` }
//         }),
//         axios.get(`${API}/messages/${friendId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         })
//       ]);

//       setFriend(
//         friendsRes.data.find(f => String(f.user_id) === String(friendId))
//       );
//       setMessages(msgRes.data);
//     } catch {
//       toast.error('Failed to load chat');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const fetchMessages = async () => {
//   //   try {
//   //     const res = await axios.get(`${API}/messages/${friendId}`, {
//   //       headers: { Authorization: `Bearer ${token}` }
//   //     });
//   //     setMessages(res.data);
//   //   } catch {}
//   // };

//   const sendMessage = async (e) => {
//   e.preventDefault();
//   if (!newMessage.trim()) return;

//   try {
//     // save in DB
//     await axios.post(`${API}/messages`,
//       { recipient_id: friendId, content: newMessage },
//       { headers: { Authorization: `Bearer ${token}` } }
//     );

//     // send via WS
//     if (socketRef.current?.readyState === WebSocket.OPEN) {
//   socketRef.current.send(JSON.stringify({
//     type: "message",
//     sender_id: user.user_id,
//     recipient_id: friendId,
//     content: newMessage
//   }));
// } else {
//   console.log("❌ Socket not connected");
// }

//     // UI update
//     setMessages(prev => [
//       ...prev,
//       {
//         message_id: Date.now(),
//         sender_id: user.user_id,
//         content: newMessage
//       }
//     ]);

//     setNewMessage('');

//   } catch {
//     toast.error('Failed to send');
//   }
// };

//   const getInitials = (name) =>
//     name?.split(' ').map(n => n[0]).join('').toUpperCase();

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-black flex items-center justify-center">
//         <div className="animate-spin w-10 h-10 border-2 border-white border-t-transparent rounded-full"/>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex flex-col">

//       {/* HEADER */}
//       <header className="flex items-center gap-3 p-4 border-b border-white/10 backdrop-blur-xl">
//         <button onClick={() => navigate('/friends')}>
//           <ArrowLeft />
//         </button>

//         <Avatar>
//           { friend?.avatar ? (
//               <img src={friend.avatar} className="w-full h-full object-cover rounded-full" alt="chat"/>
//             ) : (
//               <AvatarFallback>{getInitials(friend?.name)}</AvatarFallback>
//             )}
//         </Avatar>

//         <div>
//           <p className="font-semibold">{friend?.name}</p>
//           <p className="text-xs text-zinc-400">Online</p>
//         </div>
//       </header>

//       {/* MESSAGES */}
//       <main className="flex-1 overflow-y-auto px-4 py-6 space-y-3">

//         {messages.length === 0 ? (
//           <div className="text-center mt-20 text-zinc-400">
//             Start your conversation ✨
//           </div>
//         ) : (
//           messages.map((msg, index) => {
//             const isMe = msg.sender_id === user.user_id;

//             return (
//               <motion.div
//                 key={msg.message_id || index}
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.02 }}
//                 className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
//               >
//                 <div
//                   className={`px-4 py-2 max-w-[70%] rounded-2xl text-sm ${
//                     isMe
//                       ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-br-sm'
//                       : 'bg-white/10 text-white rounded-bl-sm backdrop-blur'
//                   }`}
//                 >
//                   {msg.content}
//                 </div>
//               </motion.div>
//             );
//           })
//         )}

//         <div ref={messagesEndRef}/>
//       </main>

//       {/* INPUT */}
//       <footer className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-xl">
//         <form onSubmit={sendMessage} className="flex gap-2">

//           <Input
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             placeholder="Type a message..."
//             className="h-12 rounded-full bg-white/10 border-white/10 text-white placeholder:text-zinc-400"
//           />

//           <Button
//             type="submit"
//             className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
//           >
//             <Send size={18}/>
//           </Button>

//         </form>
//       </footer>

//     </div>
//   );
// }




import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Send,
  Phone,
  Video,
  MoreVertical,
  Heart,
  Search,
  Users,
  MessageCircle,
  LogOut,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function ChatPage({ user, onLogout }) {
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();
  const { friendId } = useParams();

  const [friend, setFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  const token = sessionStorage.getItem('friemds_token');

  const getInitials = (name) =>
    name?.split(' ').map((n) => n[0]).join('').toUpperCase() || '?';

  const scrollToBottom = useCallback((behavior = 'smooth') => {
    messagesEndRef.current?.scrollIntoView({ behavior });
  }, []);

  const fetchData = useCallback(async () => {
    if (!token || !friendId) return;

    try {
      setLoading(true);

      const [friendsRes, msgRes] = await Promise.all([
        axios.get(`${API}/friends`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API}/messages/${friendId}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const currentFriend = friendsRes.data.find(
        (f) => String(f.user_id) === String(friendId)
      );

      setFriend(currentFriend || null);
      setMessages(msgRes.data || []);
    } catch (error) {
      toast.error('Failed to load chat');
    } finally {
      setLoading(false);
    }
  }, [friendId, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!user?.user_id || !friendId) return;

    const WS_URL =
      window.location.hostname === 'localhost'
        ? 'ws://localhost:8000'
        : 'wss://friemds-backend.onrender.com';

    const socket = new WebSocket(`${WS_URL}/ws`);
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: 'register',
          user_id: user.user_id,
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      const isIncomingFromCurrentFriend =
        String(data.sender_id) === String(friendId);

      if (isIncomingFromCurrentFriend) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.onerror = (err) => {
      console.log('WS Error', err);
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [friendId, user?.user_id]);

  useEffect(() => {
    scrollToBottom(messages.length > 0 ? 'smooth' : 'auto');
  }, [messages, scrollToBottom]);

  const sendMessage = async (e) => {
    e.preventDefault();

    const trimmed = newMessage.trim();
    if (!trimmed || !friendId || !user?.user_id) return;

    const optimisticMessage = {
      message_id: `temp-${Date.now()}`,
      sender_id: user.user_id,
      content: trimmed,
    };

    try {
      setMessages((prev) => [...prev, optimisticMessage]);
      setNewMessage('');

      await axios.post(
        `${API}/messages`,
        { recipient_id: friendId, content: trimmed },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(
          JSON.stringify({
            type: 'message',
            sender_id: user.user_id,
            recipient_id: friendId,
            content: trimmed,
          })
        );
      }
    } catch (error) {
      toast.error('Failed to send');
      setMessages((prev) =>
        prev.filter((msg) => msg.message_id !== optimisticMessage.message_id)
      );
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full bg-[#0a0a0a] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-pink-500" />
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-[#0a0a0a] text-white overflow-hidden">
      <div className="flex h-full w-full">
        {/* Sidebar */}
        <aside className="hidden md:flex w-[300px] shrink-0 flex-col border-r border-white/10 bg-[#0f0f10]">
          <div className="flex-1 overflow-y-auto p-5">
            <div className="mb-8">
              <img
                src="/logo.png"
                alt="Friemds Logo"
                className="h-12 w-auto object-contain"
              />
              <p className="mt-3 text-sm text-zinc-500">Manage your vibe.</p>
            </div>

            <div
              onClick={() => navigate('/profile')}
              className="mb-6 cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
            >
              <div className="mb-3 text-xs text-zinc-400">Your profile</div>
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12 border border-white/10">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt="avatar"
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-600 text-white font-semibold">
                      {getInitials(user?.name || 'U')}
                    </AvatarFallback>
                  )}
                </Avatar>

                <div className="min-w-0">
                  <p className="truncate font-semibold">{user?.name}</p>
                  <p className="truncate text-xs text-zinc-400">{user?.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="h-12 w-full justify-start rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                <Heart className="mr-2 h-4 w-4" />
                Discover
              </Button>

              <Button
                variant="ghost"
                onClick={() => navigate('/search')}
                className="h-12 w-full justify-start rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>

              <Button
                variant="ghost"
                onClick={() => navigate('/friends')}
                className="h-12 w-full justify-start rounded-xl border border-white/10 bg-white/5 text-white hover:bg-white/10"
              >
                <Users className="mr-2 h-4 w-4" />
                Friends
              </Button>

              <Button
                variant="ghost"
                onClick={() => navigate('/chat')}
                className="h-12 w-full justify-start rounded-xl border border-pink-500/30 bg-pink-500/10 text-white hover:bg-pink-500/15"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Chats
              </Button>
            </div>

            {friend && (
              <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="mb-3 flex items-center gap-2 text-zinc-300">
                  <MessageCircle className="h-4 w-4 text-pink-400" />
                  <p className="text-sm font-medium">Chatting with</p>
                </div>

                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 ring-2 ring-pink-500/30">
                    {friend.avatar ? (
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white text-sm">
                        {getInitials(friend.name)}
                      </AvatarFallback>
                    )}
                  </Avatar>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{friend.name}</p>
                    <p className="text-xs text-emerald-400">Online</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-white/10 p-5">
            <Button
              onClick={onLogout}
              className="w-full rounded-xl border border-white/10 bg-white/10 text-white hover:bg-white/20"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Main Chat */}
        <section className="flex min-w-0 flex-1 flex-col bg-[#0b0b0c]">
          {/* Header */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4 md:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() => navigate('/friends')}
                className="rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10 md:hidden"
              >
                <ArrowLeft size={18} />
              </button>

              <button
                onClick={() => navigate('/friends')}
                className="hidden rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10 md:flex"
              >
                <ArrowLeft size={18} />
              </button>

              <Avatar className="h-10 w-10 shrink-0">
                {friend?.avatar ? (
                  <img
                    src={friend.avatar}
                    alt={friend?.name || 'chat'}
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                    {getInitials(friend?.name)}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="min-w-0">
                <p className="truncate font-semibold">
                  {friend?.name || 'Unknown User'}
                </p>
                <p className="text-xs text-emerald-400">Online</p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button className="rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10">
                <Phone size={17} />
              </button>
              <button className="rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10">
                <Video size={17} />
              </button>
              <button className="rounded-full border border-white/10 bg-white/5 p-2 hover:bg-white/10">
                <MoreVertical size={17} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-3 py-4 md:px-6">
            {messages.length === 0 ? (
              <div className="flex h-full items-center justify-center">
                <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 px-6 py-10 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-white/10">
                    <Sparkles className="h-6 w-6 text-pink-400" />
                  </div>
                  <h3 className="text-lg font-semibold">No messages yet</h3>
                  <p className="mt-2 text-sm text-zinc-400">
                    Start your conversation with {friend?.name || 'your friend'} ✨
                  </p>
                </div>
              </div>
            ) : (
              <div className="mx-auto flex w-full max-w-4xl flex-col gap-3">
                {messages.map((msg, index) => {
                  const isMe = String(msg.sender_id) === String(user.user_id);

                  return (
                    <motion.div
                      key={msg.message_id || index}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18 }}
                      className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={[
                          'max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow',
                          'md:max-w-[70%]',
                          isMe
                            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-br-md'
                            : 'bg-white/8 border border-white/10 text-white rounded-bl-md'
                        ].join(' ')}
                      >
                        <p className="whitespace-pre-wrap break-words leading-relaxed">
                          {msg.content}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="shrink-0 border-t border-white/10 bg-[#0f0f10] px-3 py-3 md:px-6">
            <form onSubmit={sendMessage} className="mx-auto flex w-full max-w-4xl gap-3">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="h-12 flex-1 rounded-2xl border-white/10 bg-white/10 px-4 text-white placeholder:text-zinc-400 focus-visible:ring-1 focus-visible:ring-pink-500"
              />

              <Button
                type="submit"
                className="h-12 w-12 shrink-0 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white hover:opacity-90"
              >
                <Send size={18} />
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}