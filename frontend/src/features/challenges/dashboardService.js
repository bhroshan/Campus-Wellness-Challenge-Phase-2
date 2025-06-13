import axios from 'axios';

const API_URL = '/api/dashboard/';

// Get dashboard stats for student
export const getStudentDashboardStats = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.get(API_URL + 'student', config);
    return response.data;
};

// Get dashboard stats for coordinator
export const getCoordinatorDashboardStats = async (token) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.get(API_URL + 'coordinator', config);
    return response.data;
};
