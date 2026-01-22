import { createAsyncThunk } from "@reduxjs/toolkit";

export const saveFavourite = createAsyncThunk(
  "places/saveFavourite",
  async (place, { rejectWithValue }) => {
    try {
      const base = import.meta.env.VITE_FAV_API_BASE;
      const res = await fetch(`${base}/api/favourites`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(place),
      });

      if (!res.ok) {
        const text = await res.text();
        return rejectWithValue(text || "Request failed");
      }

      return await res.json();
    } catch (e) {
      return rejectWithValue(e?.message || "Network error");
    }
  }
);
