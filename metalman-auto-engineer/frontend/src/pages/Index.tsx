import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Box, FileSpreadsheet, FileOutput, ShieldCheck, Cpu, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";

const features = [
  {
    icon: Box,
    title: "NPD Geometry Slicing",
    desc: "Parse master STEP assemblies into isolated operation-wise discrete part geometries automatically for rapid prototyping.",
  },
  {
    icon: ShieldCheck,
    title: "PPAP Compliance Check",
    desc: "Validate feasibility matrices against engineering tolerances and BOM constraints for standard-compliant part approval.",
  },
  {
    icon: FileOutput,
    title: "Automated Tech Docs",
    desc: "Export shop-ready PFDs, BOMs, and Fixture Master Lists with one click — ready for the shop floor.",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Platform</a>
            <a href="#features" className="transition-colors hover:text-foreground">Solutions</a>
            <a href="#features" className="transition-colors hover:text-foreground">Documentation</a>
            <a href="#features" className="transition-colors hover:text-foreground">Enterprise</a>
          </nav>
          <Button onClick={() => navigate("/login")} variant="outline" size="sm">Sign In</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-hero text-white">
        <div className="absolute inset-0 grid-bg opacity-[0.04]" />
        <div className="absolute -right-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute -left-20 bottom-0 h-[300px] w-[300px] rounded-full bg-accent/20 blur-[100px]" />

        <div className="container relative grid gap-16 py-24 lg:grid-cols-[1.2fr,1fr] lg:py-32">
          <div className="animate-slide-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-accent" />
              Now in production at 40+ Tier-1 manufacturers
            </div>
            <h1 className="text-balance font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              NPD & PPAP
              <br />
              Engineering
              <br />
              <span className="bg-gradient-to-r from-accent to-orange-300 bg-clip-text text-transparent">Automation.</span>
            </h1>
            <p className="mt-6 max-w-xl text-balance text-lg text-white/70 md:text-xl">
              Empowering Metalman Auto Ltd with lights-out documentation. Transform CAD & Feasibility data into production-ready approvals instantly.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/login")}
                className="group h-14 bg-accent px-8 text-base font-semibold text-accent-foreground shadow-orange hover:bg-accent-hover"
              >
                Access Portal
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="ghost" className="h-14 px-6 text-white hover:bg-white/10 hover:text-white">
                Schedule a demo
              </Button>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 text-xs font-medium uppercase tracking-wider text-white/50">
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> ISO 9001 Certified</div>
              <div className="flex items-center gap-2"><Cpu className="h-4 w-4" /> SOC 2 Type II</div>
              <div className="flex items-center gap-2"><Zap className="h-4 w-4" /> 99.99% Uptime</div>
            </div>
          </div>

          {/* Visual panel */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square">
              <div className="absolute inset-0 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm" />
              <div className="absolute inset-6 rounded-xl border border-white/10 bg-slate-deep/40 p-6">
                <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-wider text-white/40">
                  <span>Job #MX-7741</span>
                  <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-success" /> Processing</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "CAD Slice", val: 100, c: "bg-success" },
                    { label: "Feasibility Parse", val: 100, c: "bg-success" },
                    { label: "BOM Generate", val: 84, c: "bg-primary-glow" },
                    { label: "PFD Export", val: 42, c: "bg-accent" },
                  ].map((row) => (
                    <div key={row.label}>
                      <div className="mb-1 flex justify-between text-[11px] text-white/60">
                        <span>{row.label}</span>
                        <span className="font-mono">{row.val}%</span>
                      </div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className={`h-full ${row.c}`} style={{ width: `${row.val}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="aspect-square rounded border border-white/10 bg-white/[0.02]" style={{ opacity: 0.3 + (i % 3) * 0.2 }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-b border-border bg-background py-24">
        <div className="container">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Operational Excellence</div>
            <h2 className="text-balance text-4xl font-bold md:text-5xl">Accelerating the PPAP lifecycle.</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Integrated engineering pipeline designed specifically for Metalman's complex manufacturing requirements.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-elevated"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/5 blur-2xl transition-all group-hover:bg-accent/10" />
                <div className="relative">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <f.icon className="h-6 w-6" />
                  </div>
                  <div className="mb-2 font-mono text-xs font-medium text-muted-foreground">0{i + 1} / 03</div>
                  <h3 className="mb-3 text-xl font-bold">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="border-b border-border bg-secondary/40 py-20">
        <div className="container flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <h3 className="text-balance text-2xl font-bold md:text-3xl">Ready to run your engineering, lights-out?</h3>
            <p className="mt-2 text-muted-foreground">Provision your portal in under 60 seconds.</p>
          </div>
          <Button
            size="lg"
            onClick={() => navigate("/login")}
            className="h-14 bg-accent px-8 text-base font-semibold text-accent-foreground shadow-orange hover:bg-accent-hover"
          >
            Access Portal <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      <footer className="bg-background py-10">
        <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <Logo />
          <div>© {new Date().getFullYear()} Metalman Industries. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
