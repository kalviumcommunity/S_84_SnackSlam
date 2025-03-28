import '../styles/AddSnack.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const AddSnack = () => {
    const [snackData, setSnackData] = useState({
        name: '',
        country: '',
        reason: '',
        alternative: ''
    });

    const navigate = useNavigate(); // For redirection

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSnackData({ ...snackData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://s-84-snackslam.onrender.com/api/snacks', {
                name: snackData.name,
                description: snackData.reason,
                country: snackData.country,
                alternative: snackData.alternative
            });

            if (response.status === 201) {
                alert('Snack added successfully! 🎯');
                navigate('/snack-list');
            }
        } catch (error) {
            console.error('Error adding snack:', error);
            alert('Failed to add snack. Please try again.');
        }
    };

    return (
        <div className="add-snack-container">
            <h1>Add a New Snack</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Snack Name"
                    value={snackData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country of Origin"
                    value={snackData.country}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="reason"
                    placeholder="Why Overrated?"
                    value={snackData.reason}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="alternative"
                    placeholder="Alternative Snack Suggestion"
                    value={snackData.alternative}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Snack</button>
            </form>
        </div>
    );
};

export default AddSnack;
