import PlacesSearchBox from "../components/PlacesSearchBox";
import MapView from "../components/MapView";
import SearchHistory from "../components/SearchHistory";

export default function PlacesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <header>
          <h1 className="text-2xl font-bold">Place Finder</h1>
          <p className="text-sm text-gray-600">
            Autocomplete + map + Redux search history (+ favourites API optional).
          </p>
        </header>

        <PlacesSearchBox />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MapView />
          </div>
          <div>
            <SearchHistory />
          </div>
        </div>
      </div>
    </div>
  );
}
