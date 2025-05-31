
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/axiosInstance';
import { AxiosError } from 'axios';



interface Info {
  description: string;
  id: number;
  langCode: string;
  name: string;
  url: string;
}

interface CollectionItem {
  //filters: any;
  id: number;
  info: Info;
  //products: any[];
  salesChannelId: number;
  type: string;
}

interface Meta {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}

interface CollectionsResponse {
  data: CollectionItem[];
  meta: Meta;
}

interface CollectionsState {
  collections: CollectionItem[];
  meta: Meta | null;
  loading: boolean;
  error: string | null;
}



const initialState: CollectionsState = {
  collections: [],
  meta: null,
  loading: false,
  error: null,
};

interface FetchCollectionsParams {
  page: number;
  accessToken: string;
}



export const fetchCollections = createAsyncThunk<
  CollectionsResponse,
  FetchCollectionsParams,
  { rejectValue: string }
>(
  'collections/fetchCollections',
  async ({ page, accessToken }, { rejectWithValue }) => {
    try {
      const response = await api.get<CollectionsResponse>(`/Collection/GetAll?page=${page}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(
        typeof axiosError.response?.data === 'string'
          ? axiosError.response.data
          : JSON.stringify(axiosError.response?.data) || axiosError.message || 'Bilinmeyen hata'
      );
    }
  }
);



const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCollections.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollections.fulfilled, (state, action) => {
        state.loading = false;
        state.collections = action.payload.data;
        state.meta = action.payload.meta;
      })
      .addCase(fetchCollections.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Beklenmeyen bir hata oluştu';
      }); 
  },
});

export default collectionsSlice.reducer;