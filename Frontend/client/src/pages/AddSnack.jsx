import '../styles/AddSnack.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const AddSnack = () => {
    const [snackData, setSnackData] = useState({
        name: '',
        country: '',
        description: '', // Updated field name
        alternative: '',
        created_by: '' // Ensure this field is updated properly
    });

    const navigate = useNavigate(); // For redirection

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSnackData({ ...snackData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Submitting Data:", snackData); // 👀 Debugging
    
            const response = await axios.post('https://s-84-snackslam.onrender.com/api/snacks', {
                name: snackData.name,
                country: snackData.country,
                description: snackData.description,  // Updated field name
                alternative: snackData.alternative,
                created_by: snackData.created_by  // ✅ Ensure this is sent
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
                    name="description"
                    placeholder="Description"
                    value={snackData.description}
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
                <input
                    type="text"
                    name="created_by"
                    placeholder="Your Name (Creator)"
                    value={snackData.created_by}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Add Snack</button>
            </form>
        </div>
    );
};

export default AddSnack;
