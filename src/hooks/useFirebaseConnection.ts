import { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import app from "@/lib/firebase";

export function useFirebaseConnection() {
  const [status, setStatus] = useState<"connected" | "reconnecting" | "offline">("reconnecting");

  useEffect(() => {
    try {
      const rtdb = getDatabase(app);
      const connectedRef = ref(rtdb, ".info/connected");

      const unsub = onValue(connectedRef, (snap) => {
        setStatus(snap.val() === true ? "connected" : "offline");
      });

      return () => unsub();
    } catch {
      // If Realtime Database is not enabled, fall back to online/offline detection
      const handleOnline = () => setStatus("connected");
      const handleOffline = () => setStatus("offline");

      window.addEventListener("online", handleOnline);
      window.addEventListener("offline", handleOffline);
      setStatus(navigator.onLine ? "connected" : "offline");

      return () => {
        window.removeEventListener("online", handleOnline);
        window.removeEventListener("offline", handleOffline);
      };
    }
  }, []);

  return status;
}
