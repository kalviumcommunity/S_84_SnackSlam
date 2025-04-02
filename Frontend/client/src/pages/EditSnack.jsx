import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/EditSnack.css"; // Import the CSS file

const EditSnack = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [snack, setSnack] = useState({
    name: "",
    country: "",
    description: "",
    alternative: "",
    created_by: "", // Include creator field
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSnack = async () => {
      try {
        const response = await axios.get(`https://s-84-snackslam.onrender.com/api/snacks/${id}`);
        setSnack(response.data);
      } catch (error) {
        console.error("Error fetching snack:", error);
        setError("Failed to load snack details.");
      }
    };

    fetchSnack();
  }, [id]);

  const handleChange = (e) => {
    setSnack({ ...snack, [e.target.name]: e.target.value.trimStart() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before submitting

    try {
      await axios.put(`https://s-84-snackslam.onrender.com/api/snacks/${id}`, snack);
      navigate("/snack-list"); // Redirect to SnackList after successful update
    } catch (error) {
      console.error("Error updating snack:", error);
      setError("Failed to update snack. Please try again.");
    }
  };

  return (
    <div className="edit-snack-container">
      <h2 className="edit-snack-title">Edit Snack</h2>

      {error && <p className="error-message">{error}</p>} {/* Display error if exists */}

      <form className="edit-snack-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={snack.name}
          onChange={handleChange}
          placeholder="Enter snack name"
          required
          className="edit-snack-input"
          aria-label="Snack Name"
        />
        <input
          type="text"
          name="country"
          value={snack.country}
          onChange={handleChange}
          placeholder="Enter country of origin"
          required
          className="edit-snack-input"
          aria-label="Country of Origin"
        />
        <textarea
          name="description"
          value={snack.description}
          onChange={handleChange}
          placeholder="Enter description"
          className="edit-snack-input"
          aria-label="Description"
        />
        <input
          type="text"
          name="alternative"
          value={snack.alternative}
          onChange={handleChange}
          placeholder="Enter alternative snack"
          className="edit-snack-input"
          aria-label="Alternative Snack"
        />
        <input
          type="text"
          name="created_by"
          value={snack.created_by}
          onChange={handleChange}
          placeholder="Enter creator's name"
          required
          className="edit-snack-input"
          aria-label="Creator Name"
        />
        <button type="submit" className="edit-snack-button">Update Snack</button>
      </form>
    </div>
  );
};

export default EditSnack;
