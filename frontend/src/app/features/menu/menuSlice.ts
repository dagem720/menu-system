import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from "@/app/lib/axiosConfig";

interface MenuItem {
  id: number;
  name: string;
}

interface MenuState {
  items: MenuItem[];
  topMenuItems: MenuItem[];
  loading: boolean;
  error: string | null;
}

interface MenuItemForm{
  name: string,
  parentId: number
  topMenuId: number
}

const initialState: MenuState = {
  items: [],
  topMenuItems:[],
  loading: false,
  error: null,
};

export const fetchMenuItems = createAsyncThunk("menu/fetchMenuItems", async (menuId:number) => {
  const response = await axiosInstance.get<MenuItem[]>(`/menu/menu-id/${menuId}`);
  return response.data;
});

export const fetchTopMenuItems = createAsyncThunk("menu/menu-id:menuId", async () => {
  const response = await axiosInstance.get<MenuItem[]>("/top-menu");
  return response.data;
});

// delete menu item
export const deleteMenuItem = createAsyncThunk(
  'menu/deleteMenuItem', 
  async (menuId: number, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/menu/${menuId}`);

      return menuId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete menu item');
    }
  }
);

export const addNewMenu = createAsyncThunk(
  'menu/addNewMenu', 
  async (newItem: MenuItemForm, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/menu', newItem);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add menu item');
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMenuItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchMenuItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMenuItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An error occurred.";
    });

    builder.addCase(fetchTopMenuItems.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTopMenuItems.fulfilled, (state, action) => {
      state.topMenuItems = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTopMenuItems.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An error occurred.";
    });

    builder.addCase(addNewMenu.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addNewMenu.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addNewMenu.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An error occurred.";
    });

    builder.addCase(deleteMenuItem.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteMenuItem.fulfilled, (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.loading = false;
    });
    builder.addCase(deleteMenuItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An error occurred.";
    });
  }
});

export const {  setLoading, setError } = menuSlice.actions;
export default menuSlice.reducer;