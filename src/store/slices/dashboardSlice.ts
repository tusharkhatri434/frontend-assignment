import { createSlice, createSelector } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Category, Widget } from '../../types/widget';
import { initialDashboard } from '../../data/initialDashboard';
import type { RootState } from '../store';

interface DashboardState {
  categories: Category[];
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  categories: initialDashboard,
  searchQuery: '',
  isLoading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    // Widget Management Actions
    addWidget: (
      state,
      action: PayloadAction<{ categoryId: string; widget: Widget }>
    ) => {
      const { categoryId, widget } = action.payload;
      const categoryIndex = state.categories.findIndex(
        (category) => category.id === categoryId
      );
      
      if (categoryIndex !== -1) {
        state.categories[categoryIndex].widgets.push(widget);
      }
    },

    removeWidget: (
      state,
      action: PayloadAction<{ categoryId: string; widgetId: string }>
    ) => {
      const { categoryId, widgetId } = action.payload;
      const categoryIndex = state.categories.findIndex(
        (category) => category.id === categoryId
      );
      
      if (categoryIndex !== -1) {
        state.categories[categoryIndex].widgets = state.categories[
          categoryIndex
        ].widgets.filter((widget) => widget.id !== widgetId);
      }
    },

    toggleWidgetInCategory: (
      state,
      action: PayloadAction<{ categoryId: string; widget: Widget }>
    ) => {
      const { categoryId, widget } = action.payload;
      const categoryIndex = state.categories.findIndex(
        (category) => category.id === categoryId
      );
      
      if (categoryIndex !== -1) {
        const category = state.categories[categoryIndex];
        const widgetIndex = category.widgets.findIndex((w) => w.id === widget.id);
        
        if (widgetIndex !== -1) {
          // Widget exists, remove it
          category.widgets.splice(widgetIndex, 1);
        } else {
          // Widget doesn't exist, add it
          category.widgets.push(widget);
        }
      }
    },

    updateWidget: (
      state,
      action: PayloadAction<{
        categoryId: string;
        widgetId: string;
        updates: Partial<Widget>;
      }>
    ) => {
      const { categoryId, widgetId, updates } = action.payload;
      const categoryIndex = state.categories.findIndex(
        (category) => category.id === categoryId
      );
      
      if (categoryIndex !== -1) {
        const widgetIndex = state.categories[categoryIndex].widgets.findIndex(
          (widget) => widget.id === widgetId
        );
        
        if (widgetIndex !== -1) {
          state.categories[categoryIndex].widgets[widgetIndex] = {
            ...state.categories[categoryIndex].widgets[widgetIndex],
            ...updates,
          };
        }
      }
    },

    // Category Management Actions
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },

    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },

    updateCategory: (
      state,
      action: PayloadAction<{ categoryId: string; updates: Partial<Category> }>
    ) => {
      const { categoryId, updates } = action.payload;
      const categoryIndex = state.categories.findIndex(
        (category) => category.id === categoryId
      );
      
      if (categoryIndex !== -1) {
        state.categories[categoryIndex] = {
          ...state.categories[categoryIndex],
          ...updates,
        };
      }
    },

    // Search Actions
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },

    clearSearchQuery: (state) => {
      state.searchQuery = '';
    },

    // Loading and Error Actions
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    // Bulk Actions
    resetDashboard: (state) => {
      state.categories = initialDashboard;
      state.searchQuery = '';
      state.error = null;
    },

    bulkAddWidgets: (
      state,
      action: PayloadAction<{ categoryId: string; widgets: Widget[] }>
    ) => {
      const { categoryId, widgets } = action.payload;
      const categoryIndex = state.categories.findIndex(
        (category) => category.id === categoryId
      );
      
      if (categoryIndex !== -1) {
        state.categories[categoryIndex].widgets.push(...widgets);
      }
    },
  },
});

// Export actions
export const {
  addWidget,
  removeWidget,
  toggleWidgetInCategory,
  updateWidget,
  addCategory,
  removeCategory,
  updateCategory,
  setSearchQuery,
  clearSearchQuery,
  setLoading,
  setError,
  clearError,
  resetDashboard,
  bulkAddWidgets,
} = dashboardSlice.actions;

// Basic selectors
export const selectDashboard = (state: RootState) => state.dashboard;
export const selectCategories = (state: RootState) => state.dashboard.categories;
export const selectSearchQuery = (state: RootState) => state.dashboard.searchQuery;
export const selectIsLoading = (state: RootState) => state.dashboard.isLoading;
export const selectError = (state: RootState) => state.dashboard.error;

// Memoized selectors using createSelector
export const selectFilteredCategories = createSelector(
  [selectCategories, selectSearchQuery],
  (categories, searchQuery) => {
    if (!searchQuery.trim()) {
      return categories;
    }

    return categories.map((category) => ({
      ...category,
      widgets: category.widgets.filter((widget) =>
        widget.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }));
  }
);

export const selectTotalWidgets = createSelector([selectCategories], (categories) =>
  categories.reduce((total, category) => total + category.widgets.length, 0)
);

// Export reducer
export default dashboardSlice.reducer;
