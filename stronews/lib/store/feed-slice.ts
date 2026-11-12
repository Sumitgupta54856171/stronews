import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CategoryFilter, FeedView } from "@/lib/news/types";

type FeedState = {
  activeView: FeedView;
  category: CategoryFilter;
  searchQuery: string;
  selectedArticleId: string;
};

const initialState: FeedState = {
  activeView: "feed",
  category: "All Pulse",
  searchQuery: "",
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
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      if (action.payload) state.activeView = "feed";
    },
    openArticle(state, action: PayloadAction<string>) {
      state.selectedArticleId = action.payload;
    },
    resetFilters(state) {
      state.category = "All Pulse";
      state.searchQuery = "";
    },
  },
});

export const { setActiveView, setCategory, setSearchQuery, openArticle, resetFilters } = feedSlice.actions;
export default feedSlice.reducer;
