import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getNotEnrolledStudents, enrollStudents } from './enrollService';

const initialState = {
  students: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  enrollLoading: false,
};

// Fetch students not enrolled in a challenge
export const fetchNotEnrolledStudents = createAsyncThunk(
  'enroll/fetchNotEnrolledStudents',
  async (challengeId, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      return await getNotEnrolledStudents(challengeId, token);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Enroll students in a challenge
export const enrollStudentsThunk = createAsyncThunk(
  'enroll/enrollStudents',
  async ({ challengeId, studentIds }, thunkAPI) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const token = user?.token;
      return await enrollStudents(challengeId, studentIds, token);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const enrollSlice = createSlice({
  name: 'enroll',
  initialState,
  reducers: {
    resetEnroll: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotEnrolledStudents.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(fetchNotEnrolledStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.students = action.payload;
      })
      .addCase(fetchNotEnrolledStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.students = [];
      })
      .addCase(enrollStudentsThunk.pending, (state) => {
        state.enrollLoading = true;
      })
      .addCase(enrollStudentsThunk.fulfilled, (state) => {
        state.enrollLoading = false;
        state.isSuccess = true;
      })
      .addCase(enrollStudentsThunk.rejected, (state, action) => {
        state.enrollLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { resetEnroll } = enrollSlice.actions;
export default enrollSlice.reducer;
