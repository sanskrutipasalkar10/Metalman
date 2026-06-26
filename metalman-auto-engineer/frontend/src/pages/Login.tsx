import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/Logo";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    const formData = new FormData();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/token", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        login(data.access_token, data.user);
        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        const error = await response.json();
        toast.error(error.detail || "Authentication failed");
      }
    } catch (err) {
      toast.error("Could not connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr,1fr]">
      {/* Left — industrial visual */}
      <div className="relative hidden overflow-hidden bg-gradient-hero text-white lg:block">
        <div className="absolute inset-0 grid-bg opacity-[0.05]" />
        <div className="absolute -left-20 top-1/3 h-[400px] w-[400px] rounded-full bg-primary/30 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-accent/20 blur-[100px]" />

        {/* Geometric pattern */}
        <svg className="absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hex" width="60" height="52" patternUnits="userSpaceOnUse">
              <polygon points="30,2 56,17 56,45 30,60 4,45 4,17" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hex)" />
        </svg>

        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo variant="light" />

          <div className="max-w-md">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-success" />
              Secure Engineering Portal
            </div>
            <h2 className="text-balance font-display text-4xl font-bold leading-tight">
              From CAD assembly to shop floor — in minutes, not weeks.
            </h2>
            <p className="mt-4 text-white/70">
              The autonomous engineering pipeline trusted by Tier-1 automotive and aerospace manufacturers.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
            <div>
              <div className="font-mono text-2xl font-bold text-accent">98.7%</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/50">First-Pass Yield</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold text-accent">14×</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/50">Faster Output</div>
            </div>
            <div>
              <div className="font-mono text-2xl font-bold text-accent">40+</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-white/50">Plants Live</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex items-center justify-center bg-background px-6 py-12">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="mb-8 lg:hidden"><Logo /></div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back.</h1>
            <p className="mt-2 text-sm text-muted-foreground">Sign in to your engineering workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="email" type="email" placeholder="engineer@company.com" defaultValue="demo@metalman.io" className="h-11 pl-10" required />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs font-medium text-primary hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="password" type="password" placeholder="••••••••••" defaultValue="password123" className="h-11 pl-10" required />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <Checkbox id="remember" defaultChecked />
              <Label htmlFor="remember" className="cursor-pointer text-sm font-normal text-muted-foreground">
                Remember me on this device
              </Label>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="group h-11 w-full bg-primary text-primary-foreground shadow-steel hover:bg-primary/90"
            >
              {loading ? "Authenticating…" : (<>Sign In <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></>)}
            </Button>
          </form>

          <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            Need access? <a href="#" className="font-medium text-primary hover:underline">Request a workspace</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;