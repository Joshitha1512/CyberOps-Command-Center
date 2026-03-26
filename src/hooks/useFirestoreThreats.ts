import { useEffect, useRef, useState } from "react";
import { subscribeToThreats, startThreatSimulation, stopThreatSimulation, type FirestoreThreat } from "@/services/threatService";
import { toast } from "sonner";

export function useFirestoreThreats() {
  const [threats, setThreats] = useState<FirestoreThreat[]>([]);
  const [loading, setLoading] = useState(true);
  const prevIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    startThreatSimulation(7000);

    const unsub = subscribeToThreats((data) => {
      setThreats(data);
      setLoading(false);

      // Check for new critical/high threats
      const prevIds = prevIdsRef.current;
      if (prevIds.size > 0) {
        data.forEach((t) => {
          if (!prevIds.has(t.id) && (t.severity === "Critical" || t.severity === "High")) {
            toast.error(`${t.severity} Threat Detected`, {
              description: `${t.threat_type} from ${t.ip_address} (${t.country})`,
              duration: 5000,
            });
          }
        });
      }
      prevIdsRef.current = new Set(data.map((t) => t.id));
    });

    return () => {
      unsub();
      stopThreatSimulation();
    };
  }, []);

  const totalThreats = threats.length;
  const criticalCount = threats.filter((t) => t.severity === "Critical").length;
  const highCount = threats.filter((t) => t.severity === "High").length;

  return { threats, loading, totalThreats, criticalCount, highCount };
}
