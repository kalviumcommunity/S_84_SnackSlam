import { useEffect, useState } from 'react';
import axios from 'axios';
import './SnackList.css';
import { Link } from 'react-router-dom';

const SnackList = () => {
    const [snacks, setSnacks] = useState([]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this snack?")) return;

        try {
            await axios.delete(`https://s-84-snackslam.onrender.com/api/snacks/${id}`);
            setSnacks(snacks.filter(snack => snack._id !== id)); // Updates list without reload
        } catch (error) {
            console.error("Error deleting snack:", error);
        }
    };

    useEffect(() => {
        const fetchSnacks = async () => {
            try {
                const response = await axios.get('https://s-84-snackslam.onrender.com/api/snacks');
                setSnacks(response.data);
            } catch (error) {
                console.error('Error fetching snacks:', error);
            }
        };

        fetchSnacks();
    }, []);

    return (
        <div className="snack-list-container">
            <h1 className="snack-list-title">Snack List</h1>
            <div className="snack-grid-wrapper">
                {snacks.map(snack => (
                    <div className="snack-card" key={snack._id}>
                        <div className="snack-content">
                            <h3 className="snack-name">{snack.name}</h3>
                            <p className="snack-country">{snack.country}</p>
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
