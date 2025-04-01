import { useEffect, useState } from 'react';
import axios from 'axios';
import './SnackList.css'

const SnackList = () => {
    const [snacks, setSnacks] = useState([]);

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
            <h1>Snack List</h1>
            <div className="snack-grid-wrapper">
                {snacks.map(snack => (
                    <div className="snack-card" key={snack._id}>
                        <div className="snack-content">
                            <h3>{snack.name}</h3>
                            <p>{snack.country}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SnackList;
