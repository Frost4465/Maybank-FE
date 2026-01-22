import { useEffect, useRef } from "react";
import { loadGoogleMaps } from "../utils/mapsLoader";
import { useAppSelector } from "../app/hook.js";

export default function MapView() {
  const selected = useAppSelector((s) => s.places.selected);

  const mapDivRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const { mapsLib, markerLib } = await loadGoogleMaps();
      if (!isMounted) return;

      const start = { lat: 3.139, lng: 101.6869 }; // KL default

      mapRef.current = new mapsLib.Map(mapDivRef.current, {
        center: start,
        zoom: 12,
        mapId: "DEMO_MAP_ID", // optional
      });

      markerRef.current = new markerLib.AdvancedMarkerElement({
        map: mapRef.current,
        position: start,
      });
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!selected || !mapRef.current || !markerRef.current) return;
    const pos = { lat: selected.lat, lng: selected.lng };
    mapRef.current.setCenter(pos);
    mapRef.current.setZoom(15);
    markerRef.current.position = pos;
  }, [selected]);

  return <div ref={mapDivRef} className="w-full h-[420px] rounded-2xl border" />;
}
