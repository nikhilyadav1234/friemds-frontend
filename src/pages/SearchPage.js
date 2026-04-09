// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Search, Filter } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import { Label } from '@/components/ui/label';
// import axios from 'axios';
// import { toast } from 'sonner';
// import Navigation from '@/components/Navigation';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

// export default function SearchPage({ user, onLogout }) {
//   const [query, setQuery] = useState('');
//   const [interests, setInterests] = useState('');
//   const [major, setMajor] = useState('');
//   const [year, setYear] = useState('');
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);

//   const token = localStorage.getItem('friemds_token');

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const params = new URLSearchParams();
//       if (query) params.append('q', query);
//       if (interests) params.append('interests', interests);
//       if (major) params.append('major', major);
//       if (year) params.append('year', year);

//       const response = await axios.get(`${API}/users/search?${params.toString()}`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setResults(response.data);
//     } catch (error) {
//       toast.error('Search failed');
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
//       toast.error(error.response?.data?.detail || 'Failed to send request');
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

//   return (
//     <div className="min-h-screen bg-background pb-20">
//       {/* Header */}
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center px-4">
//           <h1 className="text-2xl font-bold">Search Students</h1>
//         </div>
//       </header>

//       <main className="container max-w-4xl mx-auto px-4 py-8 space-y-6" data-testid="search-page">
//         {/* Search Form */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <form onSubmit={handleSearch} className="space-y-4">
//             <div className="flex gap-2">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                 <Input
//                   value={query}
//                   onChange={(e) => setQuery(e.target.value)}
//                   placeholder="Search by name or email..."
//                   className="pl-11 h-12 rounded-xl"
//                   data-testid="search-input"
//                 />
//               </div>
//               <Button
//                 type="button"
//                 variant="outline"
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="h-12 px-4 rounded-xl"
//                 data-testid="toggle-filters-button"
//               >
//                 <Filter className="w-5 h-5" />
//               </Button>
//               <Button
//                 type="submit"
//                 className="h-12 px-6 rounded-full"
//                 disabled={loading}
//                 data-testid="search-button"
//               >
//                 {loading ? 'Searching...' : 'Search'}
//               </Button>
//             </div>

//             {/* Filters */}
//             {showFilters && (
//               <motion.div
//                 initial={{ opacity: 0, height: 0 }}
//                 animate={{ opacity: 1, height: 'auto' }}
//                 exit={{ opacity: 0, height: 0 }}
//                 className="grid md:grid-cols-3 gap-4 p-4 bg-muted/30 rounded-xl"
//               >
//                 <div className="space-y-2">
//                   <Label>Interests</Label>
//                   <Input
//                     value={interests}
//                     onChange={(e) => setInterests(e.target.value)}
//                     placeholder="e.g., Music, Sports"
//                     className="h-10 rounded-lg"
//                     data-testid="interests-filter-input"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Major</Label>
//                   <Input
//                     value={major}
//                     onChange={(e) => setMajor(e.target.value)}
//                     placeholder="e.g., Computer Science"
//                     className="h-10 rounded-lg"
//                     data-testid="major-filter-input"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label>Year</Label>
//                   <Input
//                     value={year}
//                     onChange={(e) => setYear(e.target.value)}
//                     placeholder="e.g., Sophomore"
//                     className="h-10 rounded-lg"
//                     data-testid="year-filter-input"
//                   />
//                 </div>
//               </motion.div>
//             )}
//           </form>
//         </motion.div>

//         {/* Results */}
//         {results.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="space-y-4"
//           >
//             <div className="flex items-center justify-between">
//               <h2 className="text-xl font-semibold">Results</h2>
//               <Badge variant="secondary">{results.length} found</Badge>
//             </div>
//             <div className="grid gap-4" data-testid="search-results">
//               {results.map((student) => (
//                 <Card key={student.user_id} className="hover:border-primary/50 transition-colors">
//                   <CardContent className="p-4">
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-start gap-3">
//                         <Avatar className="h-14 w-14 border-2 border-primary/20">
//                           <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
//                             {getInitials(student.name)}
//                           </AvatarFallback>
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
//                         Add
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </main>

//       <Navigation currentPage="search" />
//     </div>
//   );
// }










// import { useState, useEffect, useCallback  } from 'react';
// import { motion } from 'framer-motion';
// import { Search, Filter } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Avatar, AvatarFallback } from '@/components/ui/avatar';
// import axios from 'axios';
// import { toast } from 'sonner';
// import Navigation from '@/components/Navigation';
// import { useNavigate } from 'react-router-dom';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

// export default function SearchPage() {
//   const [query, setQuery] = useState('');
//   const [interests, setInterests] = useState('');
//   const [major, setMajor] = useState('');
//   const [year, setYear] = useState('');
//   const [results, setResults] = useState([]);
//   const [allUsers, setAllUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);

// const token = sessionStorage.getItem('friemds_token');
// const navigate = useNavigate();
// const handleSearch = useCallback(async () => {
//   setLoading(true);

//   try {
//     const params = new URLSearchParams();
//     if (query) params.append('q', query);

//     const res = await axios.get(`${API}/users/search?${params.toString()}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });

//     console.log("RESULT:", res.data);
//     setResults(res.data);

//   } catch {
//     toast.error('Search failed');
//   } finally {
//     setLoading(false);
//   }
// }, [query, token]);

// useEffect(() => {
//   if (query.length > 2) {
//     handleSearch();
//   }
// }, [query, handleSearch]);


// useEffect(() => {
//   const fetchAll = async () => {
//     try {
//       const res = await axios.get(`${API}/users`, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setAllUsers(res.data);
//     } catch {
//       toast.error("Failed to load users");
//     }
//   };

//   fetchAll();
// }, []);


//   const sendFriendRequest = async (id) => {
//     try {
//       await axios.post(`${API}/friends/request`,
//         { recipient_id: id },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success('Request sent ❤️');
//     } catch {
//       toast.error('Error');
//     }
//   };

//   const getInitials = (name = "") =>
//     name.split(' ').map(n => n[0]).join('').toUpperCase();

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white pb-20">

//       {/* HEADER */}
//       <header className="flex items-center p-4 border-b border-white/10">
//         <h1 className="text-xl font-bold">Search</h1>
//       </header>

//       <div className="max-w-md mx-auto px-4 pt-6 space-y-6">

//         {/* SEARCH BAR */}
//         <motion.form
//          onSubmit={(e) => {
//             e.preventDefault();
//             handleSearch();
//           }}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="space-y-4"
//         >

//           <div className="flex gap-2">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"/>
//               <Input
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search people..."
//                 className="pl-10 h-12 rounded-xl bg-white/10 border-white/10 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-pink-500"
//               />
//             </div>

//             <button
//               type="button"
//               onClick={() => setShowFilters(!showFilters)}
//               className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center"
//             >
//               <Filter size={18}/>
//             </button>

//             <Button className="h-12 px-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500">
//               {loading ? "..." : "Go"}
//             </Button>
//           </div>

//           {/* FILTERS */}
//           {showFilters && (
//             <motion.div
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3"
//             >
//               <Input
//                 placeholder="Interests"
//                 value={interests}
//                 onChange={(e) => setInterests(e.target.value)}
//                 className="bg-white/10 border-white/10"
//               />

//               <Input
//                 placeholder="Major"
//                 value={major}
//                 onChange={(e) => setMajor(e.target.value)}
//                 className="bg-white/10 border-white/10"
//               />

//               <Input
//                 placeholder="Year"
//                 value={year}
//                 onChange={(e) => setYear(e.target.value)}
//                 className="bg-white/10 border-white/10"
//               />
//             </motion.div>
//           )}
//         </motion.form>

//         {/* RESULTS */}
//         {results.length > 0 && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="space-y-4"
//           >

//             <div className="flex justify-between items-center">
//               <h2 className="text-lg font-semibold">Results</h2>
//               <Badge className="bg-white/10">{results.length}</Badge>
//             </div>

//             {results.map((s) => (
//               <Card key={s.user_id} className="bg-white/5 border-white/10 backdrop-blur-lg">
//                 <CardContent className="flex justify-between items-center p-4">

//                   <div className="flex gap-3 items-center">
//                     <Avatar>
//                       { s.avatar ? (
//                           <img src={s.avatar} className="w-full h-full object-cover rounded-full" alt="user"/>
//                         ) : (
//                           <AvatarFallback>{getInitials(s.name)}</AvatarFallback>
//                         )}
//                     </Avatar>

//                     <div>
//                       <p 
//                         onClick={() => navigate(`/user/${s.user_id || s._id}`)}
//                         className="font-semibold cursor-pointer hover:underline"
//                       >
//                         {s.name}
//                       </p>
//                       <p className="text-xs text-zinc-400">{s.email}</p>

//                       <div className="flex gap-1 mt-1 flex-wrap">
//                         {s.interests?.slice(0,2).map((i, idx) => (
//                           <span key={idx} className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
//                             {i}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   <Button
//                     size="sm"
//                     onClick={() => sendFriendRequest(s.user_id || s._id)}
//                     className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
//                   >
//                     Add
//                   </Button>

//                 </CardContent>
//               </Card>
//             ))}

//           </motion.div>
//         )}

//         {results.length === 0 && allUsers.length > 0 && (
//   <div className="space-y-4">
//     <h2 className="text-lg font-semibold">All Students</h2>

//     {allUsers.map((s) => (
//       <Card key={s.user_id} className="bg-white/5 border-white/10">
//         <CardContent className="flex justify-between items-center p-4">

//           <div className="flex gap-3 items-center">
//             <Avatar>
//               {s.avatar ? (
//                 <img src={s.avatar} className="w-full h-full object-cover rounded-full"/>
//               ) : (
//                 <AvatarFallback>
//                   {s.name?.[0]}
//                 </AvatarFallback>
//               )}
//             </Avatar>

//             <p 
//               onClick={() => navigate(`/user/${s.user_id}`)}
//               className="cursor-pointer hover:underline"
//             >
//               {s.name}
//             </p>
//           </div>

//           <Button
//             size="sm"
//             onClick={() => sendFriendRequest(s.user_id)}
//             className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
//           >
//             Add
//           </Button>

//         </CardContent>
//       </Card>
//     ))}
//   </div>
// )}

//       </div>

//       <Navigation currentPage="search"/>
//     </div>
//   );
// }






















import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  SlidersHorizontal,
  UserPlus,
  Heart,
  Users,
  MessageCircle,
  LogOut,
  Sparkles
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import axios from 'axios';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function SearchPage({ user, onLogout }) {
  const [query, setQuery] = useState('');
  const [interests, setInterests] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingAll, setLoadingAll] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const token = sessionStorage.getItem('friemds_token');
  const navigate = useNavigate();

  const getInitials = (name = '') =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();

  const handleSearch = useCallback(async () => {
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (query.trim()) params.append('q', query.trim());

      const res = await axios.get(`${API}/users/search?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setResults(res.data || []);
    } catch (error) {
      toast.error('Search failed');
    } finally {
      setLoading(false);
    }
  }, [query, token]);

  useEffect(() => {
    if (query.trim().length > 2) {
      handleSearch();
    } else if (query.trim().length === 0) {
      setResults([]);
    }
  }, [query, handleSearch]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoadingAll(true);
        const res = await axios.get(`${API}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAllUsers(res.data || []);
      } catch (error) {
        toast.error('Failed to load users');
      } finally {
        setLoadingAll(false);
      }
    };

    fetchAll();
  }, [token]);

  const sendFriendRequest = async (id) => {
    try {
      await axios.post(
        `${API}/friends/request`,
        { recipient_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Request sent ❤️');
    } catch (error) {
      toast.error('Error sending request');
    }
  };

  const filteredResults = useMemo(() => {
    const source = results.length > 0 ? results : allUsers;

    return source.filter((userItem) => {
      const matchesInterest = interests.trim()
        ? userItem.interests?.some((i) =>
            i.toLowerCase().includes(interests.trim().toLowerCase())
          )
        : true;

      const matchesMajor = major.trim()
        ? userItem.major?.toLowerCase().includes(major.trim().toLowerCase())
        : true;

      const matchesYear = year.trim()
        ? String(userItem.year || '')
            .toLowerCase()
            .includes(year.trim().toLowerCase())
        : true;

      return matchesInterest && matchesMajor && matchesYear;
    });
  }, [results, allUsers, interests, major, year]);

  const showingSearchResults = query.trim().length > 0;

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
                  <p className="font-medium">Search tip</p>
                </div>
                <p className="text-sm text-zinc-400">
                  Use filters like interests, year, and major to find the most relevant people faster.
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
              <div className="px-4 py-4 flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-bold tracking-tight">Search</h1>
                  <p className="text-xs text-zinc-400">
                    Find students, interests, and mutual vibes
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs text-zinc-300">
                  <SlidersHorizontal size={14} />
                  Smart
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
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Search</h1>
                <p className="text-zinc-400 mt-2">
                  Discover students, interests, and people matching your vibe.
                </p>
              </motion.div>

              {/* Search Panel */}
              <motion.form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 glass-strong gradient-border rounded-[32px] p-4 md:p-5 premium-shadow"
              >
                <div className="flex flex-col gap-3 md:flex-row">
                  <div className="relative flex-1">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                      size={18}
                    />
                    <Input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search people by name..."
                      className="h-12 rounded-2xl border-white/10 bg-white/10 pl-10 text-white placeholder:text-zinc-400 focus-visible:ring-1 focus-visible:ring-pink-500"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowFilters((prev) => !prev)}
                    className={`flex h-12 items-center justify-center gap-2 rounded-2xl border px-4 transition ${
                      showFilters
                        ? 'border-pink-500/50 bg-pink-500/10 text-pink-300'
                        : 'border-white/10 bg-white/10 text-white hover:bg-white/15'
                    }`}
                  >
                    <Filter size={16} />
                    <span className="hidden sm:inline">Filters</span>
                  </button>

                  <Button
                    type="submit"
                    className="h-12 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 px-5 font-medium shadow-lg shadow-pink-500/20 hover:scale-[1.02] transition"
                  >
                    {loading ? 'Searching...' : 'Search'}
                  </Button>
                </div>

                <AnimatePresence>
                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -8, height: 0 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="grid grid-cols-1 gap-3 glass rounded-2xl p-4 md:grid-cols-3">
                        <Input
                          placeholder="Interest"
                          value={interests}
                          onChange={(e) => setInterests(e.target.value)}
                          className="border-white/10 bg-white/10 text-white placeholder:text-zinc-400 rounded-2xl"
                        />
                        <Input
                          placeholder="Major"
                          value={major}
                          onChange={(e) => setMajor(e.target.value)}
                          className="border-white/10 bg-white/10 text-white placeholder:text-zinc-400 rounded-2xl"
                        />
                        <Input
                          placeholder="Year"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="border-white/10 bg-white/10 text-white placeholder:text-zinc-400 rounded-2xl"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.form>

              {/* Results Section */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="glass-strong gradient-border rounded-[32px] p-5 md:p-6 premium-shadow"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold tracking-tight">
                      {showingSearchResults ? 'Results' : 'All Students'}
                    </h2>
                    <p className="text-sm text-zinc-400 mt-1">
                      {showingSearchResults
                        ? 'Matching people based on your search'
                        : 'Browse and connect with everyone'}
                    </p>
                  </div>

                  <div className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-white">
                    {filteredResults.length}
                  </div>
                </div>

                {(loading || loadingAll) && (
                  <div className="grid gap-4">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="glass h-24 animate-pulse rounded-3xl"
                      />
                    ))}
                  </div>
                )}

                {!loading && !loadingAll && filteredResults.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="glass rounded-3xl px-6 py-14 text-center"
                  >
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 border border-white/10">
                      <Search size={20} className="text-zinc-300" />
                    </div>
                    <h3 className="text-lg font-semibold">No users found</h3>
                    <p className="mt-2 text-sm text-zinc-400">
                      Try another name or adjust your filters.
                    </p>
                  </motion.div>
                )}

                {!loading && !loadingAll && filteredResults.length > 0 && (
                  <div className="grid gap-4">
                    {filteredResults.map((s, index) => (
                      <motion.div
                        key={s.user_id || s._id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <div className="glass rounded-3xl p-4 md:p-5 transition hover:border-pink-500/30 hover:bg-white/[0.07]">
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3 min-w-0">
                              <Avatar className="h-12 w-12 ring-2 ring-white/10">
                                {s.avatar ? (
                                  <img
                                    src={s.avatar}
                                    className="h-full w-full rounded-full object-cover"
                                    alt={s.name}
                                  />
                                ) : (
                                  <AvatarFallback className="bg-gradient-to-br from-pink-500 to-purple-500 text-white">
                                    {getInitials(s.name)}
                                  </AvatarFallback>
                                )}
                              </Avatar>

                              <div className="min-w-0">
                                <p
                                  onClick={() => navigate(`/user/${s.user_id || s._id}`)}
                                  className="cursor-pointer font-semibold hover:text-pink-300 hover:underline truncate"
                                >
                                  {s.name}
                                </p>
                                <p className="text-xs text-zinc-400 truncate">{s.email}</p>

                                <div className="mt-2 flex flex-wrap gap-2">
                                  {s.major && (
                                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-zinc-200 border border-white/10">
                                      {s.major}
                                    </span>
                                  )}
                                  {s.year && (
                                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] text-zinc-200 border border-white/10">
                                      Year {s.year}
                                    </span>
                                  )}
                                  {s.interests?.slice(0, 2).map((i, idx) => (
                                    <span
                                      key={idx}
                                      className="rounded-full bg-pink-500/10 px-2.5 py-1 text-[11px] text-pink-200 border border-pink-500/20"
                                    >
                                      {i}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <Button
                              size="sm"
                              onClick={() => sendFriendRequest(s.user_id || s._id)}
                              className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 shadow-md shadow-pink-500/20"
                            >
                              <UserPlus size={15} className="mr-1" />
                              Add
                            </Button>
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
          <Navigation currentPage="search" />
        </div>
      </div>
    </>
  );
}