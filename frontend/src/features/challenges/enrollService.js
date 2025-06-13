import axios from 'axios';

// Get students not enrolled in a challenge
export const getNotEnrolledStudents = async (challengeId, token) => {
  const res = await axios.get(`/api/challenges/${challengeId}/not-enrolled-students`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Bulk enroll students to a challenge
export const enrollStudents = async (challengeId, studentIds, token) => {
  const res = await axios.post(`/api/challenges/${challengeId}/enroll`, { studentIds }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
