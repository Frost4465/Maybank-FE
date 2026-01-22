import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../utils/mapsLoader";
import { useAppDispatch } from "../app/hook.js";
import { placeSelected } from "../features/places/placesSlice";

export default function PlacesSearchBox() {
  const dispatch = useAppDispatch();
  const inputRef = useRef(null);
  const autoRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      await loadGoogleMaps();
      if (!isMounted) return;

      autoRef.current = new google.maps.places.Autocomplete(inputRef.current, {
        fields: ["place_id", "name", "formatted_address", "geometry"],
      });

      autoRef.current.addListener("place_changed", () => {
        const p = autoRef.current.getPlace();
        if (!p?.geometry?.location) return;

        const place = {
          placeId: p.place_id,
          name: p.name || "",
          address: p.formatted_address || "",
          lat: p.geometry.location.lat(),
          lng: p.geometry.location.lng(),
          createdAt: new Date().toISOString(),
        };

        dispatch(placeSelected(place));
      });

      setReady(true);
    })();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-2">Search a place</label>
      <input
        ref={inputRef}
        disabled={!ready}
        placeholder={ready ? "Type an address or place..." : "Loading Google Maps..."}
        className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring"
      />
      <p className="mt-2 text-xs text-gray-500">
        Tip: pick a suggestion to trigger selection (typing alone won’t store history).
      </p>
    </div>
  );
}
