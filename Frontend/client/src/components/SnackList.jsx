import { useEffect, useState } from 'react';
import axios from 'axios';
import './SnackList.css';
import { Link } from 'react-router-dom';

const SnackList = () => {
    const [snacks, setSnacks] = useState([]);
    const [filteredSnacks, setFilteredSnacks] = useState([]);
    const [creators, setCreators] = useState([]);
    const [selectedCreator, setSelectedCreator] = useState('');

    useEffect(() => {
        const fetchSnacks = async () => {
            try {
                const response = await axios.get('https://s-84-snackslam.onrender.com/api/snacks');
                setSnacks(response.data);
                setFilteredSnacks(response.data); // Initialize filtered list

                // Extract unique creator names (removing undefined values)
                const uniqueCreators = [...new Set(response.data.map(snack => snack.created_by).filter(Boolean))];
                setCreators(uniqueCreators);
            } catch (error) {
                console.error('Error fetching snacks:', error);
            }
        };

        fetchSnacks();
    }, []);

    // Filter snacks based on selected creator
    useEffect(() => {
        if (selectedCreator) {
            setFilteredSnacks(snacks.filter(snack => snack.created_by === selectedCreator));
        } else {
            setFilteredSnacks(snacks); // Reset to all snacks if no creator is selected
        }
    }, [selectedCreator, snacks]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this snack?")) return;

        try {
            await axios.delete(`https://s-84-snackslam.onrender.com/api/snacks/${id}`);
            const updatedSnacks = snacks.filter(snack => snack._id !== id);
            setSnacks(updatedSnacks);
            setFilteredSnacks(updatedSnacks);
        } catch (error) {
            console.error("Error deleting snack:", error);
        }
    };

    return (
        <div className="snack-list-container">
            <h1 className="snack-list-title">Snack List</h1>

            {/* Dropdown to select creator */}
            <label htmlFor="creator-select">Filter by Creator:</label>
            <select 
                id="creator-select" 
                value={selectedCreator} 
                onChange={(e) => setSelectedCreator(e.target.value)}
            >
                <option value="">-- Select a Creator --</option>
                {creators.map(creator => (
                    <option key={creator} value={creator}>{creator}</option>
                ))}
            </select>

            <div className="snack-grid-wrapper">
                {filteredSnacks.map(snack => (
                    <div className="snack-card" key={snack._id}>
                        <div className="snack-content">
                            <h3 className="snack-name">{snack.name}</h3>
                            <p className="snack-country">{snack.country}</p>
                            <p className="snack-creator">Created by: {snack.created_by}</p>
                            <div className="snack-buttons">
                                <Link to={`/edit/${snack._id}`}>
                                    <button className="edit-button">Edit</button>
                                </Link>
                                <button className="delete-button" onClick={() => handleDelete(snack._id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SnackList;
