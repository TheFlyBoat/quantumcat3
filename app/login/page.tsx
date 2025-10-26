
'use client';

import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Mail, KeyRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import { useSound } from '@/context/sound-context';
import { cn } from '@/lib/utils';
import { playSound } from '@/lib/audio';
import { Input } from '@/components/ui/input';
import { GlitchCatIcon } from '@/components/cats/glitch-cat-icon';

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.223,0-9.651-3.358-11.303-8H6.306C9.663,35.663,16.318,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C39.901,35.637,44,29.69,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);


export default function LoginPage() {
  const { signInWithGoogle, continueAsGuest, signInWithEmail, signUpWithEmail } = useAuth();
  const { reduceMotion } = useSound();
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    playSound('click-1');
    setAuthError(null);
    try {
      await signInWithGoogle();
      router.push('/home');
    } catch (error: any) {
      console.error("Error during Google sign-in:", error);
      setAuthError('An unexpected error occurred during sign-in. Please try again.');
    }
  };
  
  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    playSound('click-1');
    setAuthError(null);
    setIsLoading(true);

    try {
      // First, try to sign in
      await signInWithEmail(email, password);
      router.push('/home');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
        // If user doesn't exist or wrong password, try to sign them up
        try {
            await signUpWithEmail(email, password);
            router.push('/home');
        } catch (signupError: any) {
            if (signupError.code === 'auth/email-already-in-use') {
                 setAuthError('Incorrect password. Please try again.');
            } else if (signupError.code === 'auth/weak-password') {
                 setAuthError('Password should be at least 6 characters.');
            } else {
                 setAuthError('An error occurred. Please try again.');
            }
            console.error("Error during sign-up:", signupError);
        }
      } else {
        setAuthError('An error occurred. Please try again.');
        console.error("Error during sign-in:", error);
      }
    } finally {
        setIsLoading(false);
    }
  }


  const handleGuest = () => {
    playSound('click-1');
    continueAsGuest();
    router.push('/home');
  };


  return (
    <div className={cn("relative flex min-h-svh w-full flex-col items-center justify-center p-4 bg-background overflow-hidden")}>
        <div className="relative z-10 flex flex-col items-center justify-center text-center mb-6">
            <GlitchCatIcon className="h-16 w-16" />
            <h1 className="font-headline text-6xl font-bold tracking-tight mt-4 text-foreground">
                <span className="inline-block">The</span>
                <span className="inline-block mx-2">Quantum</span>
                <span className="inline-block">Cat</span>
            </h1>
            <p className={cn("mt-2 text-lg text-muted-foreground", !reduceMotion && "animate-spin-reveal [animation-delay:0.6s]")}>
                SUPERPOSITION
            </p>
        </div>

        <Card className={cn("relative z-10 w-full max-w-sm rounded-2xl shadow-2xl bg-card/80 backdrop-blur-sm border-border/50", !reduceMotion && "animate-fade-in-up [animation-delay:1s]")}>
            <CardContent className="space-y-4 pt-6">
                {authError && (
                    <Alert variant="destructive">
                        <Terminal className="h-4 w-4" />
                        <AlertTitle>Authentication Error</AlertTitle>
                        <AlertDescription className="break-all">
                            {authError}
                        </AlertDescription>
                    </Alert>
                )}
                 <form onSubmit={handleEmailAuth} className="space-y-2">
                    <div className="relative">
                         <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                         <Input 
                            type="email" 
                            placeholder="Enter your email..." 
                            className="pl-10 h-12" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                         />
                    </div>
                    <div className="relative">
                         <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                         <Input 
                            type="password"
                            placeholder="Enter your password..." 
                            className="pl-10 h-12" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                         />
                    </div>
                     <Button type="submit" className="w-full h-12 text-base font-bold" disabled={isLoading}>
                        {isLoading ? 'Continuing...' : 'Continue with Email'}
                    </Button>
                </form>
                
                <div className="relative">
                    <Separator className="my-1" />
                    <span className="absolute left-1/2 -translate-x-1/2 -top-2.5 bg-card/80 px-2 text-xs text-muted-foreground">OR</span>
                </div>
                
                <div className="space-y-2">
                    <Button onClick={handleGoogleSignIn} className="w-full h-12 text-base font-bold bg-white text-black hover:bg-neutral-200">
                        <GoogleIcon className="mr-2 h-6 w-6" />
                        Sign in with Google
                    </Button>
                </div>
                
                <div className="relative">
                    <Separator className="my-1" />
                </div>

                <Button onClick={handleGuest} className="w-full h-12 text-base" variant="secondary">
                    Continue as Guest
                </Button>
            </CardContent>
        </Card>

        <p className={cn("relative z-10 text-center text-3xl font-semibold text-primary mt-8", !reduceMotion && "animate-fade-in-up [animation-delay:1.2s]")}>
            What state will the cat be in today?
        </p>
    </div>
  );
}
