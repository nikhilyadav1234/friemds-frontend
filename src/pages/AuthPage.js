// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Mail, ArrowRight, Shield } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
// import axios from 'axios';
// import { toast } from 'sonner';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

// export default function AuthPage({ onLogin }) {
//   const [step, setStep] = useState('email');
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [name, setName] = useState('');
//   const [interests, setInterests] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [isNewUser, setIsNewUser] = useState(false);

//   const handleSendOTP = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     try {
//       await axios.post(`${API}/auth/send-otp`, { email });
//       toast.success('OTP sent to your email!');
//       setStep('otp');
//     } catch (error) {
//       toast.error(error.response?.data?.detail || 'Failed to send OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     if (otp.length !== 6) {
//       toast.error('Please enter complete OTP');
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const response = await axios.post(`${API}/auth/verify-otp`, {
//         email,
//         otp,
//         name: name || undefined,
//         interests: interests ? interests.split(',').map(i => i.trim()) : undefined
//       });
      
//       toast.success(response.data.message);
//       onLogin(response.data.token, response.data.user);
//     } catch (error) {
//       if (error.response?.status === 400 && error.response?.data?.detail?.includes('Name required')) {
//         setIsNewUser(true);
//         setStep('details');
//         toast.info('Welcome! Please complete your profile');
//       } else {
//         toast.error(error.response?.data?.detail || 'Verification failed');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCompleteSignup = async (e) => {
//     e.preventDefault();
    
//     if (!name.trim()) {
//       toast.error('Please enter your name');
//       return;
//     }

//     setLoading(true);
    
//     try {
//       const response = await axios.post(`${API}/auth/verify-otp`, {
//         email,
//         otp,
//         name,
//         interests: interests ? interests.split(',').map(i => i.trim()) : []
//       });
      
//       toast.success('Welcome to Friemds!');
//       onLogin(response.data.token, response.data.user);
//     } catch (error) {
//       toast.error(error.response?.data?.detail || 'Signup failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-4">
//       <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
//         {/* Left Side - Hero */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="hidden md:block space-y-6"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
//             <Shield className="w-4 h-4" />
//             University Verified Only
//           </div>
//           <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
//             Make genuine
//             <br />
//             <span className="text-primary">campus connections</span>
//           </h1>
//           <p className="text-lg text-muted-foreground leading-relaxed">
//             Friemds is your trusted space to build authentic friendships with verified university students.
//             No fake accounts. Just real people.
//           </p>
//           <div className="pt-4">
//             <img
//               src="https://images.unsplash.com/photo-1758270704524-596810e891b5?crop=entropy&cs=srgb&fm=jpg&q=85"
//               alt="Students connecting"
//               className="rounded-2xl shadow-2xl w-full h-64 object-cover"
//             />
//           </div>
//         </motion.div>

//         {/* Right Side - Auth Form */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-card border rounded-2xl shadow-sm p-8 md:p-12 space-y-6"
//         >
//           <div className="text-center space-y-2">
//             <h2 className="text-3xl font-semibold">Friemds</h2>
//             <p className="text-muted-foreground">
//               {step === 'email' && 'Enter your university email'}
//               {step === 'otp' && 'Check your email for OTP'}
//               {step === 'details' && 'Complete your profile'}
//             </p>
//           </div>

//           {/* Email Step */}
//           {step === 'email' && (
//             <form onSubmit={handleSendOTP} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="email">University Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="you@cuchd.in"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="pl-11 h-12 rounded-xl"
//                     required
//                     data-testid="email-input"
//                   />
//                 </div>
//               </div>
//               <Button
//                 type="submit"
//                 className="w-full h-12 rounded-full text-base font-medium"
//                 disabled={loading}
//                 data-testid="send-otp-button"
//               >
//                 {loading ? 'Sending...' : 'Continue'}
//                 <ArrowRight className="ml-2 w-5 h-5" />
//               </Button>
//             </form>
//           )}

//           {/* OTP Step */}
//           {step === 'otp' && (
//             <div className="space-y-6">
//               <div className="space-y-4">
//                 <Label className="text-center block">Enter 6-digit code</Label>
//                 <div className="flex justify-center">
//                   <InputOTP
//                     maxLength={6}
//                     value={otp}
//                     onChange={setOtp}
//                     data-testid="otp-input"
//                   >
//                     <InputOTPGroup>
//                       <InputOTPSlot index={0} />
//                       <InputOTPSlot index={1} />
//                       <InputOTPSlot index={2} />
//                       <InputOTPSlot index={3} />
//                       <InputOTPSlot index={4} />
//                       <InputOTPSlot index={5} />
//                     </InputOTPGroup>
//                   </InputOTP>
//                 </div>
//               </div>
//               <Button
//                 onClick={handleVerifyOTP}
//                 className="w-full h-12 rounded-full text-base font-medium"
//                 disabled={loading || otp.length !== 6}
//                 data-testid="verify-otp-button"
//               >
//                 {loading ? 'Verifying...' : 'Verify & Continue'}
//               </Button>
//               <button
//                 onClick={() => setStep('email')}
//                 className="text-sm text-muted-foreground hover:text-primary w-full text-center"
//                 data-testid="back-to-email-button"
//               >
//                 ← Back to email
//               </button>
//             </div>
//           )}

//           {/* Details Step (for new users) */}
//           {step === 'details' && (
//             <form onSubmit={handleCompleteSignup} className="space-y-4">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input
//                   id="name"
//                   type="text"
//                   placeholder="John Doe"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="h-12 rounded-xl"
//                   required
//                   data-testid="name-input"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="interests">Interests (comma separated)</Label>
//                 <Input
//                   id="interests"
//                   type="text"
//                   placeholder="Music, Sports, Coding"
//                   value={interests}
//                   onChange={(e) => setInterests(e.target.value)}
//                   className="h-12 rounded-xl"
//                   data-testid="interests-input"
//                 />
//               </div>
//               <Button
//                 type="submit"
//                 className="w-full h-12 rounded-full text-base font-medium"
//                 disabled={loading}
//                 data-testid="complete-signup-button"
//               >
//                 {loading ? 'Creating Account...' : 'Complete Signup'}
//               </Button>
//             </form>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }




















// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Mail, ArrowRight, Shield } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
// import axios from 'axios';
// import { toast } from 'sonner';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

// export default function AuthPage({ onLogin }) {
//   const [mode, setMode] = useState("login"); // 🔥 new
//   const [step, setStep] = useState('email');

//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [name, setName] = useState('');
//   const [interests, setInterests] = useState('');
//   const [loading, setLoading] = useState(false);

//   /* ================= SEND OTP ================= */

//   const handleSendOTP = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const url =
//         mode === "login"
//           ? `${API}/auth/login`
//           : `${API}/auth/send-otp`;

//       await axios.post(url, { email });

//       toast.success('OTP sent to your email!');
//       setStep('otp');
//     } catch (error) {
//       toast.error(error.response?.data?.msg || 'Failed to send OTP');
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= VERIFY OTP ================= */

//   const handleVerifyOTP = async () => {
//     if (otp.length !== 6) {
//       toast.error('Please enter complete OTP');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await axios.post(`${API}/auth/verify-otp`, {
//         email,
//         otp,
//         name: mode === "signup" ? name : undefined,
//         interests: interests
//           ? interests.split(',').map(i => i.trim())
//           : undefined
//       });

//       toast.success(response.data.message);

//       onLogin(response.data.token, response.data.user);

//       // 🔥 redirect
//       if (response.data.isNewUser) {
//         window.location.href = "/profile";
//       } else {
//         window.location.href = "/";
//       }

//     } catch (error) {
//       toast.error(error.response?.data?.msg || 'Verification failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background flex items-center justify-center p-4">
//       <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">

//         {/* LEFT SIDE (UNCHANGED) */}
//         <motion.div
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="hidden md:block space-y-6"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
//             <Shield className="w-4 h-4" />
//             University Verified Only
//           </div>

//           <h1 className="text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
//             Make genuine
//             <br />
//             <span className="text-primary">campus connections</span>
//           </h1>

//           <p className="text-lg text-muted-foreground leading-relaxed">
//   Friemds is your trusted space to build authentic friendships with verified university students.
//   No fake accounts. Just real people.
// </p>

// <div className="pt-4">
//   <img
//     src="https://images.unsplash.com/photo-1758270704524-596810e891b5?crop=entropy&cs=srgb&fm=jpg&q=85"
//     alt="Students connecting"
//     className="rounded-2xl shadow-2xl w-full h-64 object-cover"
//   />
// </div>
//         </motion.div>

//         {/* RIGHT SIDE */}
//         <motion.div
//           initial={{ opacity: 0, x: 20 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-card border rounded-2xl shadow-sm p-8 md:p-12 space-y-6"
//         >

//           {/* 🔥 LOGIN / SIGNUP SWITCH */}
//           <div className="flex gap-2">
//             <button
//               onClick={() => setMode("login")}
//               className={`flex-1 py-2 rounded-full ${mode === "login" ? "bg-primary text-white" : "bg-muted"}`}
//             >
//               Login
//             </button>

//             <button
//               onClick={() => setMode("signup")}
//               className={`flex-1 py-2 rounded-full ${mode === "signup" ? "bg-primary text-white" : "bg-muted"}`}
//             >
//               Signup
//             </button>
//           </div>

//           <div className="text-center space-y-2">
//             <h2 className="text-3xl font-semibold">Friemds</h2>
//             <p className="text-muted-foreground">
//               {step === 'email' && 'Enter your email'}
//               {step === 'otp' && 'Enter OTP'}
//             </p>
//           </div>

//           {/* EMAIL STEP */}
//           {step === 'email' && (
//             <form onSubmit={handleSendOTP} className="space-y-4">

//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//                 <Input
//                   type="email"
//                   placeholder="Enter email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="pl-11 h-12 rounded-xl"
//                   required
//                 />
//               </div>

//               {/* 🔥 SIGNUP ONLY */}
//               {mode === "signup" && (
//                 <>
//                   <Input
//                     placeholder="Full Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     className="h-12 rounded-xl"
//                   />

//                   <Input
//                     placeholder="Interests (optional)"
//                     value={interests}
//                     onChange={(e) => setInterests(e.target.value)}
//                     className="h-12 rounded-xl"
//                   />
//                 </>
//               )}

//               <Button type="submit" className="w-full h-12 rounded-full">
//                 {loading ? "Sending..." : "Continue"}
//                 <ArrowRight className="ml-2 w-5 h-5" />
//               </Button>

//             </form>
//           )}

//           {/* OTP STEP */}
//           {step === 'otp' && (
//             <div className="space-y-6">

//               <div className="flex justify-center">
//                 <InputOTP maxLength={6} value={otp} onChange={setOtp}>
//                   <InputOTPGroup>
//                     <InputOTPSlot index={0} />
//                     <InputOTPSlot index={1} />
//                     <InputOTPSlot index={2} />
//                     <InputOTPSlot index={3} />
//                     <InputOTPSlot index={4} />
//                     <InputOTPSlot index={5} />
//                   </InputOTPGroup>
//                 </InputOTP>
//               </div>

//               <Button onClick={handleVerifyOTP} className="w-full h-12 rounded-full">
//                 {loading ? "Verifying..." : "Verify & Continue"}
//               </Button>

//               <button
//                 onClick={() => setStep('email')}
//                 className="text-sm text-muted-foreground w-full text-center"
//               >
//                 ← Back
//               </button>

//             </div>
//           )}

//         </motion.div>
//       </div>
//     </div>
//   );
// }






























// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Mail, ArrowRight, Shield } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
// import axios from 'axios';
// import { toast } from 'sonner';

// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
// const API = `${BACKEND_URL}/api`;

// export default function AuthPage({ onLogin }) {
//   const [mode, setMode] = useState("login");
//   const [step, setStep] = useState('email');

//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [firstName, setFirstName] = useState('');
// const [lastName, setLastName] = useState('');
// const [age, setAge] = useState('');
// const [gender, setGender] = useState('');
// const [phone, setPhone] = useState('');
// const [interests, setInterests] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSendOTP = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const url =
//         mode === "login"
//           ? `${API}/auth/login`
//           : `${API}/auth/send-otp`;

//       await axios.post(url, { email });

//       toast.success('OTP sent!');
//       setStep('otp');
//     } catch (error) {
//       toast.error(error.response?.data?.msg || 'Failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     if (otp.length !== 6) return toast.error('Enter full OTP');

//     setLoading(true);

//     try {
//       const res = await axios.post(`${API}/auth/verify-otp`, {
//   email,
//   otp,
//   firstName,
//   lastName,
//   age,
//   gender,
//   phone,
//   name: `${firstName} ${lastName}`,
//   interests: interests
//     ? interests.split(',').map(i => i.trim())
//     : []
// });
//       sessionStorage.setItem("friemds_token", res.data.token);
//       onLogin(res.data.token, res.data.user);

//       window.location.href = res.data.isNewUser ? "/profile" : "/";
//     } catch (error) {
//       toast.error(error.response?.data?.msg || 'Failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4 text-white">

//       <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">

//         {/* LEFT SIDE */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="hidden md:block space-y-6"
//         >
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-sm">
//             <Shield className="w-4 h-4 text-pink-400" />
//             Verified Campus Network
//           </div>

//           <h1 className="text-5xl font-bold leading-tight">
//             Find your circle,
//             <br />
//             <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
//               effortlessly
//             </span>
//           </h1>

//           <p className="text-zinc-400 text-lg">
//             A place where real connections bloom — no noise, no fakes.
//           </p>
//         </motion.div>

//         {/* RIGHT SIDE */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
//         >

//           {/* SWITCH */}
//           <div className="flex bg-white/10 p-1 rounded-full mb-6">
//             <button
//               onClick={() => setMode("login")}
//               className={`flex-1 py-2 rounded-full transition ${
//                 mode === "login"
//                   ? "bg-gradient-to-r from-pink-500 to-purple-500"
//                   : "text-zinc-400"
//               }`}
//             >
//               Login
//             </button>

//             <button
//               onClick={() => setMode("signup")}
//               className={`flex-1 py-2 rounded-full transition ${
//                 mode === "signup"
//                   ? "bg-gradient-to-r from-pink-500 to-purple-500"
//                   : "text-zinc-400"
//               }`}
//             >
//               Signup
//             </button>
//           </div>

//           <div className="text-center mb-6">
//             <h2 className="text-3xl font-semibold">FRIEMDS</h2>
//             <p className="text-zinc-400 text-sm">
//               {step === 'email' ? "Enter your email" : "Enter OTP"}
//             </p>
//           </div>

//           {/* EMAIL */}
//           {step === 'email' && (
//             <form onSubmit={handleSendOTP} className="space-y-4">

//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"/>
//                 <Input
//                   type="email"
//                   placeholder="Email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="pl-10 h-12 rounded-xl bg-white/10 border-white/10 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-pink-500"
//                 />
//               </div>

//               {mode === "signup" && (
//   <>
//     <Input placeholder="First Name" value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
    
//     <Input placeholder="Last Name" value={lastName} onChange={(e)=>setLastName(e.target.value)} />
    
//     <Input placeholder="Age" value={age} onChange={(e)=>setAge(e.target.value)} />
    
//     <Input placeholder="Gender" value={gender} onChange={(e)=>setGender(e.target.value)} />
    
//     <Input placeholder="Phone Number" value={phone} onChange={(e)=>setPhone(e.target.value)} />
    
//     <Input placeholder="Interests" value={interests} onChange={(e)=>setInterests(e.target.value)} />
//   </>
// )}

//               <Button className="w-full h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90">
//                 {loading ? "Sending..." : "Continue"}
//                 <ArrowRight className="ml-2 w-5 h-5"/>
//               </Button>

//             </form>
//           )}

//           {/* OTP */}
//           {step === 'otp' && (
//             <div className="space-y-6">

//               <div className="flex justify-center">
//                 <InputOTP maxLength={6} value={otp} onChange={setOtp}>
//                   <InputOTPGroup>
//                     {[0,1,2,3,4,5].map(i => (
//                       <InputOTPSlot key={i} index={i} />
//                     ))}
//                   </InputOTPGroup>
//                 </InputOTP>
//               </div>

//               <Button
//                 onClick={handleVerifyOTP}
//                 className="w-full h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
//               >
//                 {loading ? "Verifying..." : "Verify"}
//               </Button>

//               <button
//                 onClick={() => setStep('email')}
//                 className="text-center w-full text-sm text-zinc-400"
//               >
//                 ← Back
//               </button>

//             </div>
//           )}

//         </motion.div>
//       </div>
//     </div>
//   );
// }














import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Shield, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function AuthPage({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [step, setStep] = useState('email');

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url =
        mode === "login"
          ? `${API}/auth/login`
          : `${API}/auth/send-otp`;

      await axios.post(url, { email });

      toast.success('OTP sent!');
      setStep('otp');
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) return toast.error('Enter full OTP');

    setLoading(true);

    try {
      const res = await axios.post(`${API}/auth/verify-otp`, {
        email,
        otp,
        firstName,
        lastName,
        age,
        gender,
        phone,
        name: `${firstName} ${lastName}`,
        interests: interests
          ? interests.split(',').map(i => i.trim())
          : []
      });

      sessionStorage.setItem("friemds_token", res.data.token);
      onLogin(res.data.token, res.data.user);

      window.location.href = res.data.isNewUser ? "/profile" : "/";
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const bubbleUsers = [
    {
      src: '/images/user1.jpg',
      alt: 'user 1',
      duration: 2.4,
      delay: 0,
      y: [0, -6, 0],
      shadow: 'shadow-pink-500/25'
    },
    {
      src: '/images/user2.jpg',
      alt: 'user 2',
      duration: 2.8,
      delay: 0.2,
      y: [0, -10, 0],
      shadow: 'shadow-purple-500/25'
    },
    {
      src: '/images/user3.jpg',
      alt: 'user 3',
      duration: 2.2,
      delay: 0.35,
      y: [0, -7, 0],
      shadow: 'shadow-fuchsia-500/25'
    }
  ];

  return (
    <>
      <style>{`
        @keyframes shine {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        @keyframes floaty {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(8px); }
          50% { transform: translateY(6px) translateX(-6px); }
          75% { transform: translateY(-8px) translateX(10px); }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.45;
            transform: scale(1);
          }
          50% {
            opacity: 0.75;
            transform: scale(1.08);
          }
        }

        @keyframes rotateSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes gridMove {
          0% { transform: translateY(0px); }
          100% { transform: translateY(40px); }
        }

        @keyframes buttonShine {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(250%); }
        }

        .shine-text {
          background: linear-gradient(
            90deg,
            #ec4899 0%,
            #ffffff 20%,
            #a855f7 40%,
            #ffffff 60%,
            #ec4899 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shine 4s linear infinite;
        }

        .auth-glow {
          position: relative;
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.06),
            0 20px 60px rgba(0,0,0,0.45),
            0 0 80px rgba(168,85,247,0.14),
            0 0 120px rgba(236,72,153,0.08);
        }

        .auth-glow::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(236,72,153,0.35),
            rgba(168,85,247,0.25),
            rgba(255,255,255,0.08),
            rgba(236,72,153,0.28)
          );
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .glass-input {
          backdrop-filter: blur(18px);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.04),
            0 0 0 rgba(236,72,153,0);
          transition: all 0.35s ease;
        }

        .glass-input:hover {
          transform: translateY(-1px);
          border-color: rgba(255,255,255,0.16);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.05),
            0 10px 30px rgba(168,85,247,0.08);
        }

        .mode-pill {
          position: relative;
          overflow: hidden;
        }

        .magic-btn {
          position: relative;
          overflow: hidden;
        }

        .magic-btn::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,0.28),
            transparent
          );
          transform: translateX(-150%);
          animation: buttonShine 3.2s linear infinite;
        }

        .otp-slot-glow {
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.04),
            0 0 0 1px rgba(255,255,255,0.04);
          transition: all 0.3s ease;
        }

        .otp-slot-glow:focus-within,
        .otp-slot-glow:hover {
          border-color: rgba(236,72,153,0.45);
          box-shadow:
            0 0 0 3px rgba(236,72,153,0.10),
            0 0 30px rgba(168,85,247,0.16);
          transform: translateY(-2px);
        }

        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(circle at center, black 35%, transparent 85%);
          animation: gridMove 6s linear infinite alternate;
          pointer-events: none;
        }

        .orb {
          position: absolute;
          border-radius: 9999px;
          filter: blur(60px);
          pointer-events: none;
        }

        .orb-1 {
          width: 280px;
          height: 280px;
          background: rgba(236,72,153,0.22);
          top: 8%;
          left: 8%;
          animation: floaty 10s ease-in-out infinite, pulseGlow 6s ease-in-out infinite;
        }

        .orb-2 {
          width: 320px;
          height: 320px;
          background: rgba(168,85,247,0.18);
          bottom: 8%;
          right: 10%;
          animation: floaty 13s ease-in-out infinite reverse, pulseGlow 7s ease-in-out infinite;
        }

        .orb-3 {
          width: 180px;
          height: 180px;
          background: rgba(59,130,246,0.12);
          top: 50%;
          left: 50%;
          animation: floaty 11s ease-in-out infinite;
        }

        .ring-spin {
          position: absolute;
          inset: -80px;
          border-radius: 9999px;
          border: 1px solid rgba(255,255,255,0.05);
          animation: rotateSlow 22s linear infinite;
        }

        .ring-spin::before,
        .ring-spin::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          border: 1px dashed rgba(236,72,153,0.10);
        }

        .ring-spin::after {
          inset: 30px;
          border-color: rgba(168,85,247,0.10);
        }
      `}</style>

      <div className="relative min-h-screen bg-black flex items-center justify-center px-4 text-white overflow-hidden">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="bg-grid" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1 }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(168,85,247,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(236,72,153,0.18),_transparent_28%),radial-gradient(circle_at_center,_rgba(255,255,255,0.04),_transparent_40%)]"
        />

        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center relative z-10">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="hidden md:block space-y-7 relative"
          >
            <div className="ring-spin opacity-70" />

            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/10 backdrop-blur-md text-sm text-zinc-200 shadow-[0_0_30px_rgba(236,72,153,0.10)]"
            >
              <Shield className="w-4 h-4 text-pink-400" />
              Verified Campus Network
              <Sparkles className="w-4 h-4 text-purple-300" />
            </motion.div>

            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
            >
              Find your circle,
              <br />
              <span className="shine-text">
                effortlessly
              </span>
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="text-zinc-400 text-lg max-w-lg leading-relaxed"
            >
              A place exclusively for University Friendship.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="flex items-center gap-4 pt-2"
            >
              <div className="flex -space-x-3">
                {bubbleUsers.map((user, index) => (
                  <motion.div
                    key={index}
                    animate={{ y: user.y }}
                    transition={{ duration: user.duration, repeat: Infinity, delay: user.delay }}
                    whileHover={{ scale: 1.08 }}
                    className={`relative w-11 h-11 rounded-full border-2 border-black overflow-hidden bg-zinc-800 shadow-lg ${user.shadow}`}
                  >
                    <img
                      src={user.src}
                      alt={user.alt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </motion.div>
                ))}
              </div>

              <span className="text-sm text-zinc-400">
                Meet students with shared interests
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -4 }}
            className="relative"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.45), 0 0 80px rgba(168,85,247,0.12)',
                  '0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.45), 0 0 110px rgba(236,72,153,0.14)',
                  '0 0 0 1px rgba(255,255,255,0.06), 0 20px 60px rgba(0,0,0,0.45), 0 0 80px rgba(168,85,247,0.12)'
                ]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="auth-glow bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
            >
              {/* SWITCH */}
              <motion.div
                layout
                className="flex bg-white/8 p-1 rounded-full mb-8 border border-white/10 backdrop-blur-md"
              >
                <button
                  onClick={() => setMode("login")}
                  className={`mode-pill flex-1 py-2.5 rounded-full transition-all duration-300 font-medium ${
                    mode === "login"
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/20"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Login
                </button>

                <button
                  onClick={() => setMode("signup")}
                  className={`mode-pill flex-1 py-2.5 rounded-full transition-all duration-300 font-medium ${
                    mode === "signup"
                      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-purple-500/20"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  Signup
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="text-center mb-8"
              >
                <motion.div
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.7, type: 'spring' }}
                  className="flex justify-center items-center mb-4"
                >
                  <motion.img
                    src="/logo.png"
                    alt="logo"
                    className="h-14 w-auto object-contain mx-auto drop-shadow-[0_0_22px_rgba(236,72,153,0.35)]"
                    animate={{
                      y: [0, -4, 0],
                      filter: [
                        'drop-shadow(0 0 10px rgba(236,72,153,0.22))',
                        'drop-shadow(0 0 18px rgba(168,85,247,0.30))',
                        'drop-shadow(0 0 10px rgba(236,72,153,0.22))'
                      ]
                    }}
                    transition={{ duration: 3.4, repeat: Infinity }}
                  />
                </motion.div>

                <p className="text-zinc-400 text-sm">
                  {step === 'email' ? "Enter your email" : "Enter OTP"}
                </p>
              </motion.div>

              {/* EMAIL */}
              {step === 'email' && (
                <motion.form
                  key={`${mode}-email`}
                  onSubmit={handleSendOTP}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="space-y-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="relative"
                  >
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="glass-input pl-10 h-12 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-pink-500 focus:border-pink-500/40 transition-all duration-300"
                    />
                  </motion.div>

                  {mode === "signup" && (
                    <>
                      {[
                        { placeholder: "First Name", value: firstName, setter: setFirstName },
                        { placeholder: "Last Name", value: lastName, setter: setLastName },
                        { placeholder: "Age", value: age, setter: setAge },
                        { placeholder: "Gender", value: gender, setter: setGender },
                        { placeholder: "Phone Number", value: phone, setter: setPhone },
                        { placeholder: "Interests", value: interests, setter: setInterests },
                      ].map((field, idx) => (
                        <motion.div
                          key={field.placeholder}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, delay: idx * 0.05 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <Input
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={(e) => field.setter(e.target.value)}
                            className="glass-input h-12 rounded-xl bg-white/10 border border-white/10 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-pink-500 focus:border-pink-500/40 transition-all duration-300"
                          />
                        </motion.div>
                      ))}
                    </>
                  )}

                  <motion.div
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                  >
                    <Button className="magic-btn w-full h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-medium shadow-lg shadow-pink-500/20 transition-all duration-300">
                      {loading ? "Sending..." : "Continue"}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </motion.div>
                </motion.form>
              )}

              {/* OTP */}
              {step === 'otp' && (
                <motion.div
                  key="otp-step"
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.45 }}
                  className="space-y-6"
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="flex justify-center"
                  >
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup className="gap-2">
                        {[0, 1, 2, 3, 4, 5].map(i => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ y: -2 }}
                          >
                            <InputOTPSlot
                              index={i}
                              className="otp-slot-glow w-12 h-14 rounded-xl border border-white/10 bg-white/10 text-white text-lg"
                            />
                          </motion.div>
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                  >
                    <Button
                      onClick={handleVerifyOTP}
                      className="magic-btn w-full h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-medium shadow-lg shadow-purple-500/20 transition-all duration-300"
                    >
                      {loading ? "Verifying..." : "Verify"}
                    </Button>
                  </motion.div>

                  <motion.button
                    onClick={() => setStep('email')}
                    whileHover={{ x: -4 }}
                    className="text-center w-full text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    ← Back
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}