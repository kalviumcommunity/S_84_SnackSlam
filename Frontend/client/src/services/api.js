import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Fetch all snacks from the backend
export const getSnacks = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/snacks`);
        return response.data;  // Return the fetched data
    } catch (error) {
        console.error('Error fetching snacks:', error.message);
        return [];
    }
};

// Add a new snack to the database
export const addSnack = async (newSnack) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/snacks`, newSnack);
        return response.data;
    } catch (error) {
        console.error('Error adding snack:', error.message);
        return null;
    }
};

// Delete a snack from the database
export const deleteSnack = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/snacks/${id}`);
        console.log(`Snack with ID ${id} deleted successfully.`);
    } catch (error) {
        console.error('Error deleting snack:', error.message);
    }
};
