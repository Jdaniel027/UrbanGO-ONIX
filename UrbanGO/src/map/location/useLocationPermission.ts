import { useEffect, useState } from "react";
import * as Location from "expo-location";

export function useLocationPermission() {
  const [granted, setGranted] = useState(false);
  const [canAskAgain, setCanAskAgain] = useState(true);

  useEffect(() => {
    (async () => {
      const perm = await Location.getForegroundPermissionsAsync();
      setGranted(perm.status === "granted");
      setCanAskAgain(perm.canAskAgain);

      if (perm.status !== "granted" && perm.canAskAgain) {
        const req = await Location.requestForegroundPermissionsAsync();
        setGranted(req.status === "granted");
        setCanAskAgain(req.canAskAgain);
      }
    })();
  }, []);

  return { granted, canAskAgain };
}
