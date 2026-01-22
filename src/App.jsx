import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { placeSelected, clearHistory } from "./features/places/placesSlice";
import { loadGoogleMaps } from "./utils/mapsLoader"; 

export default function App() {
  const dispatch = useDispatch();
  const { searches, selected } = useSelector((s) => s.places);

  const mapDivRef = useRef(null);
  const acHostRef = useRef(null);

  useEffect(() => {
    let alive = true;

    (async () => {
      const { mapsLib } = await loadGoogleMaps();
      if (!alive) return;

      const map = new mapsLib.Map(mapDivRef.current, {
        center: { lat: 3.139, lng: 101.6869 },
        zoom: 12,
      });

      const marker = new google.maps.Marker({
        map,
        position: { lat: 3.139, lng: 101.6869 },
      });

      const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement({});
      acHostRef.current.replaceChildren(placeAutocomplete);

      placeAutocomplete.addEventListener("gmp-select", async ({ placePrediction }) => {
        const place = placePrediction.toPlace();

        await place.fetchFields({
          fields: ["displayName", "formattedAddress", "location", "id"],
        });

        if (!place.location) return;

        const lat = place.location.lat();
        const lng = place.location.lng();


        map.setCenter({ lat, lng });
        map.setZoom(17);
        marker.setPosition({ lat, lng });
        dispatch(
          placeSelected({
            placeId: place.id, 
            name: place.displayName || "",
            address: place.formattedAddress || "",
            lat,
            lng,
            searchedAt: new Date().toISOString(),
          })
        );
      });
    })();

    return () => {
      alive = false;
    };
  }, [dispatch]);

return (
  <div className="min-h-screen flex justify-center p-4">
    <div style={{ padding: 16, width: "min(900px, 100%)" }}>
      <h2>Place Finder</h2>
      <div ref={acHostRef} style={{ marginBottom: 12 }} />
      <div
        ref={mapDivRef}
        style={{
          width: "100%",
          height: 420,
          border: "1px solid #ddd",
          borderRadius: 12,
        }}
      />
      <div style={{ marginTop: 12 }}>
        <h3>Selected</h3>
        {selected ? (
          <div>
            <div><b>{selected.name}</b></div>
            <div>{selected.address}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {selected.lat}, {selected.lng}
            </div>
          </div>
        ) : (
          <div style={{ opacity: 0.6 }}>No place selected yet</div>
        )}
      </div>
      <div style={{ marginTop: 12 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <h3 style={{ margin: 0 }}>Search history</h3>
          <button onClick={() => dispatch(clearHistory())}>Clear</button>
        </div>

        <ul>
          {searches.map((p) => (
            <li key={p.placeId}>
              <b>{p.name}</b> — {p.address}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

}
