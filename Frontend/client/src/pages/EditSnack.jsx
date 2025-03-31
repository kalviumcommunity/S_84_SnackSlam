import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditSnack.css"; // Import the CSS file

const EditSnack = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [snack, setSnack] = useState({ name: "", country: "", description: "" });

  useEffect(() => {
    const fetchSnack = async () => {
      try {
        const response = await axios.get(`https://s-84-snackslam.onrender.com/api/snacks/${id}`);
        setSnack(response.data);
      } catch (error) {
        console.error("Error fetching snack:", error);
      }
    };

    fetchSnack();
  }, [id]);

  const handleChange = (e) => {
    setSnack({ ...snack, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://s-84-snackslam.onrender.com/api/snacks/${id}`, snack);
      navigate("/snack-list"); // Redirect to SnackList after successful update
    } catch (error) {
      console.error("Error updating snack:", error);
    }
  };

  return (
    <div className="edit-snack-container">
      <h2 className="edit-snack-title">Edit Snack</h2>
      <form className="edit-snack-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={snack.name}
          onChange={handleChange}
          placeholder="Enter snack name"
          required
          className="edit-snack-input"
        />
        <input
          type="text"
          name="country"
          value={snack.country}
          onChange={handleChange}
          placeholder="Enter country of origin"
          required
          className="edit-snack-input"
        />
        <input
          type="text"
          name="description"
          value={snack.description}
          onChange={handleChange}
          placeholder="Enter description"
          className="edit-snack-input"
        />
        <button type="submit" className="edit-snack-button">Update Snack</button>
      </form>
    </div>
  );
};

export default EditSnack;
