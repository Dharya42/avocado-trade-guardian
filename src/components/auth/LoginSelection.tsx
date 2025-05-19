import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Building2, Users } from "lucide-react";
import { AlertTriangle, Sparkles } from "lucide-react"
export const LoginSelection = () => {
  const navigate = useNavigate();

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gray-50">
  //     <div className="max-w-4xl w-full px-4">
  //       <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
  //         Avocado Trade Guardian
  //       </h1>
  //       <div className="grid md:grid-cols-2 gap-6">
  //         {/* TFC Card */}
  //         <Card 
  //           className="cursor-pointer hover:shadow-lg transition-shadow"
  //           onClick={() => navigate('/tfc')}
  //         >
  //           <CardHeader>
  //             <CardTitle className="flex items-center justify-center space-x-2">
  //               <Building2 className="h-6 w-6" />
  //               <span>Login as TFC</span>
  //             </CardTitle>
  //           </CardHeader>
  //           <CardContent>
  //             <p className="text-center text-muted-foreground">
  //               Access the Trade Facilitation Center dashboard
  //             </p>
  //           </CardContent>
  //         </Card>

  //         {/* Supplier Card */}
  //         <Card 
  //           className="cursor-pointer hover:shadow-lg transition-shadow"
  //           onClick={() => navigate('/supplier')}
  //         >
  //           <CardHeader>
  //             <CardTitle className="flex items-center justify-center space-x-2">
  //               <Users className="h-6 w-6" />
  //               <span>Login as Supplier</span>
  //             </CardTitle>
  //           </CardHeader>
  //           <CardContent>
  //             <p className="text-center text-muted-foreground">
  //               Access the Supplier dashboard
  //             </p>
  //           </CardContent>
  //         </Card>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-700 p-4">
      <div className="relative max-w-md overflow-hidden rounded-2xl border border-white/20 bg-black/80 p-8 shadow-xl backdrop-blur-sm">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-yellow-300 opacity-60 blur-2xl" />
        <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-pink-500 opacity-60 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="mb-4 flex items-center justify-center gap-2 rounded-full bg-red-500/20 px-4 py-2 text-red-300">
            <AlertTriangle className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Site Unavailable</span>
          </div>

          <h1 className="mb-2 text-4xl font-black tracking-tight text-white">
            <span className="inline-block animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
              Oops!
            </span>{" "}
            Site Down
          </h1>

          <p className="mb-6 text-lg text-white/80">The site is currently down. We're working on it!</p>

          <div className="mb-8 w-full rounded-lg border border-white/10 bg-white/5 p-4">
            <p className="text-sm text-white/70">Please contact:</p>
            <div className="mt-2 flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                Dharya Jasuja
              </span>
              <Sparkles className="h-4 w-4 text-yellow-300" />
            </div>
          </div>

          <button className="group relative overflow-hidden rounded-full bg-white/10 px-6 py-2 font-medium text-white transition-all hover:bg-white/20">
            <span className="relative z-10">Try Again Later</span>
            <span className="absolute inset-0 -z-10 translate-y-full bg-gradient-to-t from-teal-400 to-cyan-300 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-20"></span>
          </button>
        </div>
      </div>
    </div>
  )
}; 