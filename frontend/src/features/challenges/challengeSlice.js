import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import challengeService from './challengeService';
import axios from 'axios';

const initialState = {
    challenges: [],
    challenge: null,
    joinedChallenges: [],
    myJoinedChallenges: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Create new challenge
export const createChallenge = createAsyncThunk(
    'challenges/create',
    async (challengeData, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;
            return await challengeService.createChallenge(challengeData, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) 
                || error.message 
                || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Join challenge
export const joinChallenge = createAsyncThunk(
    'challenges/join',
    async (id, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;
            const response = await challengeService.joinChallenge(id, token);
            return id; // Return challenge ID
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) 
                || error.message 
                || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Leave challenge
export const leaveChallenge = createAsyncThunk(
    'challenges/leave',
    async (id, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;
            await challengeService.leaveChallenge(id, token);
            return id; // Return challenge ID
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) 
                || error.message 
                || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get user challenges
export const getChallenges = createAsyncThunk(
    'challenges/getAll',
    async (_, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;
            return await challengeService.getChallenges(token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) 
                || error.message 
                || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update challenge
export const updateChallenge = createAsyncThunk(
    'challenges/update',
    async ({ id, challengeData }, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;
            return await challengeService.updateChallenge(id, challengeData, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) 
                || error.message 
                || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get challenge by id
export const getChallengeById = createAsyncThunk(
    'challenges/getById',
    async (id, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;
            return await challengeService.getChallengeById(id, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) 
                || error.message 
                || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Delete challenge
export const deleteChallenge = createAsyncThunk(
    'challenges/delete',
    async (id, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;
            await challengeService.deleteChallenge(id, token);
            return id;
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) 
                || error.message 
                || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Get joined challenges
export const getJoinedChallenges = createAsyncThunk(
    'challenges/getJoined',
    async (_, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;
            return await challengeService.getJoinedChallenges(token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) 
                || error.message 
                || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const markChallengeCompleted = createAsyncThunk(
    'challenges/markCompleted',
    async (id, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.put(`/api/challenges/${id}/complete`, {}, config);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const revertChallengeCompletion = createAsyncThunk(
    'challenges/revertCompletion',
    async (id, thunkAPI) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.put(`/api/challenges/${id}/revert`, {}, config);
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const challengeSlice = createSlice({
    name: 'challenge',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createChallenge.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createChallenge.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.challenges.push(action.payload);
            })
            .addCase(createChallenge.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getChallenges.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getChallenges.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.challenges = action.payload;
            })
            .addCase(getChallenges.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(updateChallenge.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateChallenge.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.challenges = state.challenges.map(challenge => 
                    challenge._id === action.payload._id ? action.payload : challenge
                );
            })
            .addCase(updateChallenge.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getChallengeById.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getChallengeById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.challenge = action.payload;
            })
            .addCase(getChallengeById.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteChallenge.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteChallenge.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.challenges = state.challenges.filter(
                    (challenge) => challenge._id !== action.payload
                );
            })
            .addCase(deleteChallenge.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(joinChallenge.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(joinChallenge.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (!state.joinedChallenges.includes(action.payload)) {
                    state.joinedChallenges.push(action.payload);
                }
            })
            .addCase(joinChallenge.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(leaveChallenge.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(leaveChallenge.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.joinedChallenges = state.joinedChallenges.filter(id => id !== action.payload);
            })
            .addCase(leaveChallenge.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getJoinedChallenges.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getJoinedChallenges.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.myJoinedChallenges = action.payload;
                // Update the joinedChallenges array with the IDs
                state.joinedChallenges = action.payload.map(challenge => challenge._id);
            })
            .addCase(getJoinedChallenges.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(markChallengeCompleted.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(markChallengeCompleted.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (state.challenge) {
                    state.challenge.completed = true;
                }
            })
            .addCase(markChallengeCompleted.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(revertChallengeCompletion.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(revertChallengeCompletion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                if (state.challenge) {
                    state.challenge.completed = false;
                }
            })
            .addCase(revertChallengeCompletion.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            });
    }
});

export const { reset } = challengeSlice.actions;
export default challengeSlice.reducer; 