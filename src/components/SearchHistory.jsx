import { useAppDispatch, useAppSelector } from "../app/hook.js";
import { placeSelected } from "../features/places/placesSlice";
import { saveFavourite } from "../features/places/thunks";

export default function SearchHistory() {
  const dispatch = useAppDispatch();
  const { searches, selected, savingFav, error } = useAppSelector((s) => s.places);

  return (
    <div className="rounded-2xl border p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold">Search history</h2>

        <button
          className="rounded-xl border px-3 py-2 text-sm disabled:opacity-50"
          disabled={!selected || savingFav === "pending"}
          onClick={() => dispatch(saveFavourite(selected))}
        >
          {savingFav === "pending" ? "Saving..." : "Favourite selected"}
        </button>
      </div>

      {error ? <div className="text-sm text-red-600 mb-2">{String(error)}</div> : null}

      <ul className="space-y-2">
        {searches.map((p) => (
          <li
            key={p.placeId}
            className="cursor-pointer rounded-xl border px-3 py-2 hover:bg-gray-50"
            onClick={() => dispatch(placeSelected(p))}
          >
            <div className="font-medium">{p.name}</div>
            <div className="text-xs text-gray-600">{p.address}</div>
          </li>
        ))}
      </ul>

      {searches.length === 0 ? (
        <p className="text-sm text-gray-500">No searches yet. Pick a suggestion above.</p>
      ) : null}
    </div>
  );
}
