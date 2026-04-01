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










import { useState, useEffect, useCallback  } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import axios from 'axios';
import { toast } from 'sonner';
import Navigation from '@/components/Navigation';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [interests, setInterests] = useState('');
  const [major, setMajor] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

const token = sessionStorage.getItem('friemds_token');
const navigate = useNavigate();
const handleSearch = useCallback(async () => {
  setLoading(true);

  try {
    const params = new URLSearchParams();
    if (query) params.append('q', query);

    const res = await axios.get(`${API}/users/search?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log("RESULT:", res.data);
    setResults(res.data);

  } catch {
    toast.error('Search failed');
  } finally {
    setLoading(false);
  }
}, [query, token]);

useEffect(() => {
  if (query.length > 2) {
    handleSearch();
  }
}, [query, handleSearch]);


useEffect(() => {
  const fetchAll = async () => {
    try {
      const res = await axios.get(`${API}/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllUsers(res.data);
    } catch {
      toast.error("Failed to load users");
    }
  };

  fetchAll();
}, []);


  const sendFriendRequest = async (id) => {
    try {
      await axios.post(`${API}/friends/request`,
        { recipient_id: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Request sent ❤️');
    } catch {
      toast.error('Error');
    }
  };

  const getInitials = (name = "") =>
    name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black text-white pb-20">

      {/* HEADER */}
      <header className="flex items-center p-4 border-b border-white/10">
        <h1 className="text-xl font-bold">Search</h1>
      </header>

      <div className="max-w-md mx-auto px-4 pt-6 space-y-6">

        {/* SEARCH BAR */}
        <motion.form
         onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"/>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search people..."
                className="pl-10 h-12 rounded-xl bg-white/10 border-white/10 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="h-12 w-12 rounded-xl bg-white/10 flex items-center justify-center"
            >
              <Filter size={18}/>
            </button>

            <Button className="h-12 px-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500">
              {loading ? "..." : "Go"}
            </Button>
          </div>

          {/* FILTERS */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3"
            >
              <Input
                placeholder="Interests"
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="bg-white/10 border-white/10"
              />

              <Input
                placeholder="Major"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="bg-white/10 border-white/10"
              />

              <Input
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-white/10 border-white/10"
              />
            </motion.div>
          )}
        </motion.form>

        {/* RESULTS */}
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Results</h2>
              <Badge className="bg-white/10">{results.length}</Badge>
            </div>

            {results.map((s) => (
              <Card key={s.user_id} className="bg-white/5 border-white/10 backdrop-blur-lg">
                <CardContent className="flex justify-between items-center p-4">

                  <div className="flex gap-3 items-center">
                    <Avatar>
                      { s.avatar ? (
                          <img src={s.avatar} className="w-full h-full object-cover rounded-full" alt="user"/>
                        ) : (
                          <AvatarFallback>{getInitials(s.name)}</AvatarFallback>
                        )}
                    </Avatar>

                    <div>
                      <p 
                        onClick={() => navigate(`/user/${s.user_id || s._id}`)}
                        className="font-semibold cursor-pointer hover:underline"
                      >
                        {s.name}
                      </p>
                      <p className="text-xs text-zinc-400">{s.email}</p>

                      <div className="flex gap-1 mt-1 flex-wrap">
                        {s.interests?.slice(0,2).map((i, idx) => (
                          <span key={idx} className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">
                            {i}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => sendFriendRequest(s.user_id || s._id)}
                    className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
                  >
                    Add
                  </Button>

                </CardContent>
              </Card>
            ))}

          </motion.div>
        )}

        {results.length === 0 && allUsers.length > 0 && (
  <div className="space-y-4">
    <h2 className="text-lg font-semibold">All Students</h2>

    {allUsers.map((s) => (
      <Card key={s.user_id} className="bg-white/5 border-white/10">
        <CardContent className="flex justify-between items-center p-4">

          <div className="flex gap-3 items-center">
            <Avatar>
              {s.avatar ? (
                <img src={s.avatar} className="w-full h-full object-cover rounded-full"/>
              ) : (
                <AvatarFallback>
                  {s.name?.[0]}
                </AvatarFallback>
              )}
            </Avatar>

            <p 
              onClick={() => navigate(`/user/${s.user_id}`)}
              className="cursor-pointer hover:underline"
            >
              {s.name}
            </p>
          </div>

          <Button
            size="sm"
            onClick={() => sendFriendRequest(s.user_id)}
            className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
          >
            Add
          </Button>

        </CardContent>
      </Card>
    ))}
  </div>
)}

      </div>

      <Navigation currentPage="search"/>
    </div>
  );
}