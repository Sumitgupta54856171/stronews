import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CategoryFilter, FeedView } from "@/lib/news/types";

type FeedState = {
  activeView: FeedView;
  category: CategoryFilter;
  searchQuery: string;
  showSavedOnly: boolean;
  savedIds: string[];
  selectedArticleId: string;
};

const initialState: FeedState = {
  activeView: "feed",
  category: "All Pulse",
  searchQuery: "",
  showSavedOnly: false,
  savedIds: ["india-ai-compute-subsidy-startups"],
  selectedArticleId: "vande-bharat-sleeper-trial-180kmh",
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setActiveView(state, action: PayloadAction<FeedView>) {
      state.activeView = action.payload;
    },
    setCategory(state, action: PayloadAction<CategoryFilter>) {
      state.category = action.payload;
      state.showSavedOnly = false;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      if (action.payload) state.activeView = "feed";
    },
    toggleSavedOnly(state) {
      state.showSavedOnly = !state.showSavedOnly;
      state.category = "All Pulse";
      state.activeView = "feed";
    },
    toggleSaved(state, action: PayloadAction<string>) {
      state.savedIds = state.savedIds.includes(action.payload)
        ? state.savedIds.filter((id) => id !== action.payload)
        : [...state.savedIds, action.payload];
    },
    openArticle(state, action: PayloadAction<string>) {
      state.selectedArticleId = action.payload;
    },
    resetFilters(state) {
      state.category = "All Pulse";
      state.searchQuery = "";
      state.showSavedOnly = false;
    },
  },
});

export const { setActiveView, setCategory, setSearchQuery, toggleSavedOnly, toggleSaved, openArticle, resetFilters } = feedSlice.actions;
export default feedSlice.reducer;