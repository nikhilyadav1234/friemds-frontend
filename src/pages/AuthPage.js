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






























import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Shield } from 'lucide-react';
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
  const [name, setName] = useState('');
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
        name: mode === "signup" ? name : undefined,
        interests: interests
          ? interests.split(',').map(i => i.trim())
          : undefined
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4 text-white">

      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur text-sm">
            <Shield className="w-4 h-4 text-pink-400" />
            Verified Campus Network
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Find your circle,
            <br />
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              effortlessly
            </span>
          </h1>

          <p className="text-zinc-400 text-lg">
            A place where real connections bloom — no noise, no fakes.
          </p>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
        >

          {/* SWITCH */}
          <div className="flex bg-white/10 p-1 rounded-full mb-6">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2 rounded-full transition ${
                mode === "login"
                  ? "bg-gradient-to-r from-pink-500 to-purple-500"
                  : "text-zinc-400"
              }`}
            >
              Login
            </button>

            <button
              onClick={() => setMode("signup")}
              className={`flex-1 py-2 rounded-full transition ${
                mode === "signup"
                  ? "bg-gradient-to-r from-pink-500 to-purple-500"
                  : "text-zinc-400"
              }`}
            >
              Signup
            </button>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold">FRIEMDS</h2>
            <p className="text-zinc-400 text-sm">
              {step === 'email' ? "Enter your email" : "Enter OTP"}
            </p>
          </div>

          {/* EMAIL */}
          {step === 'email' && (
            <form onSubmit={handleSendOTP} className="space-y-4">

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"/>
                <Input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 rounded-xl bg-white/10 border-white/10 text-white placeholder:text-zinc-400 focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {mode === "signup" && (
                <>
                  <Input
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 rounded-xl bg-white/10 border-white/10"
                  />

                  <Input
                    placeholder="Interests"
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    className="h-12 rounded-xl bg-white/10 border-white/10"
                  />
                </>
              )}

              <Button className="w-full h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90">
                {loading ? "Sending..." : "Continue"}
                <ArrowRight className="ml-2 w-5 h-5"/>
              </Button>

            </form>
          )}

          {/* OTP */}
          {step === 'otp' && (
            <div className="space-y-6">

              <div className="flex justify-center">
                <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                  <InputOTPGroup>
                    {[0,1,2,3,4,5].map(i => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              </div>

              <Button
                onClick={handleVerifyOTP}
                className="w-full h-12 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
              >
                {loading ? "Verifying..." : "Verify"}
              </Button>

              <button
                onClick={() => setStep('email')}
                className="text-center w-full text-sm text-zinc-400"
              >
                ← Back
              </button>

            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}






