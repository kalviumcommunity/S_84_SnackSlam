import { useEffect, useState } from "react";
import axios from "axios";
import "./SnackList.css";
import { Link } from "react-router-dom";

const SnackList = () => {
    const [snacks, setSnacks] = useState([]);
    const [filteredSnacks, setFilteredSnacks] = useState([]);
    const [creators, setCreators] = useState([]); // MongoDB creators
    const [users, setUsers] = useState([]); // MySQL users
    const [selectedCreator, setSelectedCreator] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch snacks (MongoDB)
                const snackResponse = await axios.get("https://s-84-snackslam.onrender.com/api/snacks");
                setSnacks(snackResponse.data);
                setFilteredSnacks(snackResponse.data);

                // Extract unique creators (MongoDB)
                const uniqueCreators = [...new Set(snackResponse.data.map(snack => snack.created_by).filter(Boolean))];
                setCreators(uniqueCreators);

                // Fetch users from MySQL
                const userResponse = await axios.get("https://s-84-snackslam.onrender.com/api/sql/users");
                setUsers(userResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Filter snacks based on selected creator (MongoDB)
    useEffect(() => {
        if (selectedCreator) {
            setFilteredSnacks(snacks.filter(snack => snack.created_by === selectedCreator));
        } else {
            setFilteredSnacks(snacks);
        }
    }, [selectedCreator, snacks]);

    // Fetch snacks created by MySQL user
    useEffect(() => {
        if (selectedUser) {
            axios
                .get(`https://s-84-snackslam.onrender.com/api/sql/by-user/${selectedUser}`)
                .then((response) => {
                    setFilteredSnacks(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching MySQL user snacks:", error);
                    setError("Failed to load user-specific snacks.");
                });
        } else {
            setFilteredSnacks(snacks);
        }
    }, [selectedUser, snacks]);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this snack?")) return;

        try {
            await axios.delete(`https://s-84-snackslam.onrender.com/api/snacks/${id}`);
            const updatedSnacks = snacks.filter(snack => snack._id !== id);
            setSnacks(updatedSnacks);
            setFilteredSnacks(updatedSnacks);
        } catch (error) {
            console.error("Error deleting snack:", error);
            alert("Failed to delete snack. Please try again.");
        }
    };

    return (
        <div className="snack-list-container">
            <h1 className="snack-list-title">Snack List</h1>

            {loading ? (
                <p>Loading data...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <>
                    {/* Dropdown to select MongoDB creator */}
                    <label htmlFor="creator-select">Filter by Creator (MongoDB):</label>
                    <select id="creator-select" value={selectedCreator} onChange={(e) => setSelectedCreator(e.target.value)}>
                        <option value="">-- Show All --</option>
                        {creators.map(creator => (
                            <option key={creator} value={creator}>{creator}</option>
                        ))}
                    </select>

                    {/* Dropdown to select MySQL users */}
                    <label htmlFor="user-select">Filter by User (MySQL):</label>
                    <select id="user-select" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                        <option value="">-- Show All --</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>

                    {/* Snack Grid */}
                    <div className="snack-grid-wrapper">
                        {filteredSnacks.length > 0 ? (
                            filteredSnacks.map(snack => (
                                <div className="snack-card" key={snack._id || snack.id}>
                                    <div className="snack-content">
                                        <h3 className="snack-name">{snack.name}</h3>
                                        <p className="snack-country">{snack.country || "N/A"}</p>
                                        <p className="snack-creator">Created by: {snack.created_by || snack.User?.name || "Unknown"}</p>
                                        <div className="snack-buttons">
                                            <Link to={`/edit/${snack._id || snack.id}`}>
                                                <button className="edit-button">Edit</button>
                                            </Link>
                                            <button className="delete-button" onClick={() => handleDelete(snack._id || snack.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No snacks found.</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default SnackList;
