import { Wifi, WifiOff, RefreshCw, User, LogOut } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRealtimeStatus } from "@/hooks/useCyberData";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const statusConfig = {
  connected: { icon: Wifi, label: "CONNECTED", className: "text-cyber-green" },
  reconnecting: { icon: RefreshCw, label: "RECONNECTING", className: "text-cyber-amber animate-spin" },
  offline: { icon: WifiOff, label: "OFFLINE", className: "text-cyber-red" },
};

export function AppHeader() {
  const status = useRealtimeStatus();
  const cfg = statusConfig[status];
  const StatusIcon = cfg.icon;
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch {
      toast.error("Failed to sign out");
    }
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-border px-4 glass-card">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
        <div className="h-5 w-px bg-border" />
        <div className="flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${status === "connected" ? "bg-cyber-green animate-pulse-glow" : status === "reconnecting" ? "bg-cyber-amber" : "bg-cyber-red"}`} />
          <span className="text-[10px] font-mono tracking-wider text-muted-foreground">SYSTEM HEALTH: NOMINAL</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5">
          <StatusIcon className={`h-3.5 w-3.5 ${cfg.className}`} />
          <span className={`text-[10px] font-mono tracking-wider ${cfg.className}`}>{cfg.label}</span>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5">
          <User className="h-3.5 w-3.5 text-muted-foreground" />
          <span className="text-[10px] font-mono tracking-wider text-muted-foreground truncate max-w-[120px]">
            {user?.email || "ADMIN"}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-1.5 text-destructive transition-colors hover:bg-destructive/20"
        >
          <LogOut className="h-3.5 w-3.5" />
          <span className="text-[10px] font-mono tracking-wider">SIGN OUT</span>
        </button>
      </div>
    </header>
  );
}
