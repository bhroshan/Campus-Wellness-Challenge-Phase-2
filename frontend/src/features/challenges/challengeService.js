import axios from 'axios';

const API_URL = '/api/challenges/';

// Create new challenge
const createChallenge = async (challengeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    };

    const response = await axios.post(API_URL, challengeData, config);
    return response.data;
};

// Get user challenges
const getChallenges = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL, config);
    return response.data;
};

// Update challenge
const updateChallenge = async (challengeId, challengeData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    };

    const response = await axios.put(API_URL + challengeId, challengeData, config);
    return response.data;
};

const getChallengeById = async (challengeId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL + challengeId, config);
    return response.data;
};

// Join challenge
const joinChallenge = async (challengeId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.post(API_URL + challengeId + '/join', {}, config);
    return response.data;
};

// Leave challenge
const leaveChallenge = async (challengeId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.delete(API_URL + challengeId + '/join', config);
    return response.data;
};

// Check join status
const checkJoinStatus = async (challengeId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL + challengeId + '/joined', config);
    return response.data;
};

// Delete challenge
const deleteChallenge = async (challengeId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.delete(API_URL + challengeId, config);
    return response.data;
};

// Get joined challenges
const getJoinedChallenges = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    const response = await axios.get(API_URL + 'joined', config);
    return response.data;
};

const challengeService = {
    createChallenge,
    getChallenges,
    updateChallenge,
    getChallengeById,
    joinChallenge,
    leaveChallenge,
    checkJoinStatus,
    deleteChallenge,
    getJoinedChallenges
};

export default challengeService; 