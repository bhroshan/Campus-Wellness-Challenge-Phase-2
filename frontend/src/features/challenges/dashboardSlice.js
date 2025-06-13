import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getStudentDashboardStats, getCoordinatorDashboardStats } from './dashboardService';

const initialState = {
    stats: null,
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: ''
};

// Fetch dashboard stats based on user role
export const fetchDashboardStats = createAsyncThunk(
    'dashboard/fetchStats',
    async (role, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;
            if (role === 'student') {
                return await getStudentDashboardStats(token);
            } else if (role === 'coordinator') {
                return await getCoordinatorDashboardStats(token);
            } else {
                throw new Error('Invalid user role');
            }
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message
                || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        resetDashboard: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.stats = action.payload;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
