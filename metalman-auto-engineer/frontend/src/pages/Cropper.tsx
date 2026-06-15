import { Bell, LayoutDashboard, History, Settings, Crop } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import PdfCropper from "@/components/PdfCropper";

const Cropper = () => {
  return (
    <div className="flex h-screen flex-col bg-secondary/30">
      <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Logo className="h-8" />
            <div className="hidden h-8 w-px bg-border md:block" />
            <nav className="hidden items-center gap-6 md:flex">
              <a href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                <LayoutDashboard className="h-4 w-4" /> Dashboard
              </a>
              <a href="/cropper" className="flex items-center gap-2 text-sm font-medium text-primary">
                <Crop className="h-4 w-4" /> Cropper
              </a>
              <a href="#" className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                <History className="h-4 w-4" /> History
              </a>
              <a href="#" className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                <Settings className="h-4 w-4" /> Settings
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
            </Button>
            <Avatar className="h-9 w-9 border border-border shadow-sm">
              <AvatarFallback className="bg-primary/5 text-xs font-bold">ME</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      <main className="flex-1 overflow-hidden">
        <PdfCropper />
      </main>
    </div>
  );
};

export default Cropper;
