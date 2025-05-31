
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface Product {
  productCode: string;
  colorCode: string;
  name: string | null;
  outOfStock: boolean;
  isSaleB2B: boolean;
  imageUrl: string;
}

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async ({ id, token }: { id: string; token: string }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}Collection/${id}/GetProductsForConstants`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({}),
      }
    );

    const data = await res.json();
    return data.data.data; 
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Bir hata oluştu';
      });
  },
});

export default productsSlice.reducer;
