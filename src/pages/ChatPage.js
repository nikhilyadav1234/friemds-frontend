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


















import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import axios from 'axios';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;


export default function ChatPage({ user }) {
  const socketRef = useRef(null);
  const { friendId } = useParams();
  const [friend, setFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  // const token = localStorage.getItem('friemds_token');
  const token = sessionStorage.getItem('friemds_token');

useEffect(() => {
  fetchData();

  if (socketRef.current) return;

  const WS_URL =
    window.location.hostname === "localhost"
      ? "ws://localhost:8000"
      : "wss://friemds-backend.onrender.com";

  socketRef.current = new WebSocket(`${WS_URL}/ws`);

  socketRef.current.onopen = () => {
    console.log("✅ WS Connected");

    socketRef.current.send(JSON.stringify({
      type: "register",
      user_id: user.user_id
    }));
  };

  socketRef.current.onmessage = (event) => {
    const data = JSON.parse(event.data);

    if (String(data.sender_id) === String(friendId)) {
      setMessages(prev => [...prev, data]);
    }
  };

  socketRef.current.onerror = (err) => {
    console.log("❌ WS Error", err);
  };

  return () => {
    socketRef.current?.close();
    socketRef.current = null;
  };

}, [friendId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchData = async () => {
    try {
      const [friendsRes, msgRes] = await Promise.all([
        axios.get(`${API}/friends`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API}/messages/${friendId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setFriend(
        friendsRes.data.find(f => String(f.user_id) === String(friendId))
      );
      setMessages(msgRes.data);
    } catch {
      toast.error('Failed to load chat');
    } finally {
      setLoading(false);
    }
  };

  // const fetchMessages = async () => {
  //   try {
  //     const res = await axios.get(`${API}/messages/${friendId}`, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     });
  //     setMessages(res.data);
  //   } catch {}
  // };

  const sendMessage = async (e) => {
  e.preventDefault();
  if (!newMessage.trim()) return;

  try {
    // save in DB
    await axios.post(`${API}/messages`,
      { recipient_id: friendId, content: newMessage },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // send via WS
    if (socketRef.current?.readyState === WebSocket.OPEN) {
  socketRef.current.send(JSON.stringify({
    type: "message",
    sender_id: user.user_id,
    recipient_id: friendId,
    content: newMessage
  }));
} else {
  console.log("❌ Socket not connected");
}

    // UI update
    setMessages(prev => [
      ...prev,
      {
        message_id: Date.now(),
        sender_id: user.user_id,
        content: newMessage
      }
    ]);

    setNewMessage('');

  } catch {
    toast.error('Failed to send');
  }
};

  const getInitials = (name) =>
    name?.split(' ').map(n => n[0]).join('').toUpperCase();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin w-10 h-10 border-2 border-white border-t-transparent rounded-full"/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white flex flex-col">

      {/* HEADER */}
      <header className="flex items-center gap-3 p-4 border-b border-white/10 backdrop-blur-xl">
        <button onClick={() => navigate('/friends')}>
          <ArrowLeft />
        </button>

        <Avatar>
          { friend?.avatar ? (
              <img src={friend.avatar} className="w-full h-full object-cover rounded-full" alt="chat"/>
            ) : (
              <AvatarFallback>{getInitials(friend?.name)}</AvatarFallback>
            )}
        </Avatar>

        <div>
          <p className="font-semibold">{friend?.name}</p>
          <p className="text-xs text-zinc-400">Online</p>
        </div>
      </header>

      {/* MESSAGES */}
      <main className="flex-1 overflow-y-auto px-4 py-6 space-y-3">

        {messages.length === 0 ? (
          <div className="text-center mt-20 text-zinc-400">
            Start your conversation ✨
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.sender_id === user.user_id;

            return (
              <motion.div
                key={msg.message_id || index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-4 py-2 max-w-[70%] rounded-2xl text-sm ${
                    isMe
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-br-sm'
                      : 'bg-white/10 text-white rounded-bl-sm backdrop-blur'
                  }`}
                >
                  {msg.content}
                </div>
              </motion.div>
            );
          })
        )}

        <div ref={messagesEndRef}/>
      </main>

      {/* INPUT */}
      <footer className="p-4 border-t border-white/10 bg-black/40 backdrop-blur-xl">
        <form onSubmit={sendMessage} className="flex gap-2">

          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="h-12 rounded-full bg-white/10 border-white/10 text-white placeholder:text-zinc-400"
          />

          <Button
            type="submit"
            className="h-12 w-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
          >
            <Send size={18}/>
          </Button>

        </form>
      </footer>

    </div>
  );
}