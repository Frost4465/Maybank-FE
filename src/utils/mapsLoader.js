import { setOptions } from "@googlemaps/js-api-loader";

let configured = false;

export async function loadGoogleMaps() {
  if (!configured) {
    setOptions({
      key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      v: "weekly",
    });
    configured = true;
  }

  const mapsLib = await google.maps.importLibrary("maps");
  const placesLib = await google.maps.importLibrary("places");

  return { mapsLib, placesLib };
}
