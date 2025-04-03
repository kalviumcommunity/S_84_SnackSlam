import React, { useState, useEffect } from "react";
import "../styles/LandingPage.css";
import SnackCard from "../components/Snackcard";
import AddSnack from "../pages/AddSnack";
import SnackList from "../components/SnackList";
import { getSnacks } from "../services/api";
import { Link } from 'react-router-dom';
import axios from "axios";
const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [showSnackCard, setShowSnackCard] = useState(false);
  const [snacks, setSnacks] = useState([]); // Store fetched snacks
  const [showAddSnack, setShowAddSnack] = useState(false);
  const [showSnackList, setShowSnackList] = useState(false);
  const [refresh, setRefresh] = useState(false);

const handleSnackAdded = () => {
     setRefresh(!refresh); // Trigger refresh
};

useEffect(() => {
  document.title = "SnackSlam - Discover Overrated Snacks";
  const checkAuth = async () => {
  try {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage

    if (!token) {
      console.error("No token found, user is not logged in.");
      return;
    }

    const response = await axios.get("http://localhost:3000/api/auth/check-auth", {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true, // Ensure cookies are sent if needed
    });

    console.log("User is authenticated:", response.data);
  } catch (error) {
    console.error("Auth check failed", error);
  }
};


  checkAuth();
}, []);


const handleLogin = async () => {
  try {
      const response = await axios.post(
          "http://localhost:3000/api/auth/login",
          { username },
          { withCredentials: true }
      );
      setIsLoggedIn(true);
      setUsername(response.data.username);
  } catch (error) {
      alert("Login failed. Try again.");
  }
};


const handleLogout = async () => {
  try {
      await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      setUsername("");
  } catch (error) {
      alert("Logout failed. Try again.");
  }
};


  const handleGetSnackCard = () => {
    setShowSnackCard(true);
  };

  const handleGetSnackData = async () => {
    try {
      const snackData = await getSnacks();
      setSnacks(snackData);
    } catch (error) {
      console.error('Error fetching snacks:', error);
      alert("Failed to fetch snack data. Check backend or network.");
    }
  };
  const handleToggleAddSnack = () => setShowAddSnack(!showAddSnack);
  const handleToggleSnackList = () => setShowSnackList(!showSnackList);


  const sampleSnacks = [
    {
      name: "Spicy Chips",
      rating: 7.5,
      image:
        "https://jolochip.com/cdn/shop/files/desktop_before_after.png?v=1707472821&width=2000",
    },
    {
      name: "Fiery Noodles",
      rating: 8.2,
      image:
        "https://m.media-amazon.com/images/I/91rKII+NZRL.jpg",
    },
    {
      name: "Salted Caramel Popcorn",
      rating: 6.8,
      image:
        "https://b.zmtcdn.com/data/dish_photos/8fd/5106469565c4f4962af0c3710b4bf8fd.jpeg",
    },
    {
      name: "Choco Lava Cake Bites",
      rating: 9.1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4feKWQRz2gvOZjSopoxJTtzQsXWAhkiJgeg&s",
    }
  ];
  

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h1 className="landing-title">Welcome to SnackSlam 🍔</h1>
        <p className="landing-description">
          Exploring the most overrated snacks worldwide! Vote, discuss, and
          discover snacks that live up to the hype—or don't.
        </p>

        <input
          type="text"
          placeholder="Enter Your Name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input-field"
        />
        <button
          className="landing-button"
          onClick={handleLogin}
          disabled={!username.trim()}
        >
          🚀 Start Exploring
        </button>
      </div>
    );
  }

  return (
    <div className="main-content">
      <button className="logout-btn" onClick={handleLogout}>
        🚪 Logout
      </button>

      <h2>Welcome, {username}! 🎉</h2>
      <p>Discover the snacks that have sparked debates worldwide!</p>

      {/* Features Section */}
      <section className="features">
        <h2>🔥 Why SnackSlam?</h2>
        <div className="feature-box">
          <div className="feature">
            <h3>🌍 Global Reviews</h3>
            <p>See what food lovers worldwide think about trending snacks.</p>
          </div>
          <div className="feature">
            <h3>📊 Snack Polls</h3>
            <p>Vote on whether a snack is truly worth the hype or overrated.</p>
          </div>
          <div className="feature">
            <h3>🏆 Leaderboard</h3>
            <p>Track the most overrated snacks based on user votes.</p>
          </div>
          <div className="feature">
            <h3>🤖 AI Snack Suggestions</h3>
            <p>Get personalized snack recommendations powered by AI.</p>
          </div>
        </div>
      </section>




      {/* Trending Snacks Section */}
      <section className="trending-snacks">
        <h2>🔥 Trending Snacks</h2>
        <div className="snack-list">
          <div className="snack-card">
            <img
              src="https://m.media-amazon.com/images/I/71pS-cOBxDL._AC_UF894,1000_QL80_.jpg"
              alt="Spicy Takis"
            />
            <h3>Spicy Takis</h3>
            <p>Overhyped or the best spicy snack?</p>
          </div>
          <div className="snack-card">
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1"
              alt="Gold-Leaf Burgers"
            />
            <h3>Gold-Leaf Burgers</h3>
            <p>Luxury or unnecessary?</p>
          </div>
          <div className="snack-card">
            <img
              src="https://images.unsplash.com/photo-1505253758473-96b7015fcd40"
              alt="Matcha KitKats"
            />
            <h3>Matcha KitKats</h3>
            <p>Do they deserve the craze?</p>
          </div>
          <div className="snack-card">
            <img
              src="https://www.sidechef.com/recipe/3883dffb-5fa2-4ee9-8054-d8de1409899f.jpg?d=1408x1120"
              alt="Pani Puri"
            />
            <h3>Pani Puri (Golgappa)</h3>
            <p>Spicy, tangy, or just messy? What do you think?</p>
          </div>
        </div>

        {/* New "Get a Snack Card" Button */}
        <button className="get-snack-button" onClick={handleGetSnackCard}>
          🍿 Get a Snack Card
        </button>

        {/* Show SnackCard only when button is clicked */}
{showSnackCard && (
  <div className="snack-card-section">
    <div className="snack-card-grid">
      {sampleSnacks.map((snack, index) => (
        <SnackCard key={index} {...snack} />
      ))}
    </div>
  </div>
  
)}

<section className="snack-actions">
  <h2>🍽️ Manage Your Snacks</h2>
  <div className="action-buttons">
    <Link to="/add-snack" className="add-snack-btn" aria-label="Add a new snack">
      ➕ Add Snack
    </Link>

    <Link to="/snack-list" className="view-snack-list-btn" aria-label="View snack list">
      📋 View Snack List
    </Link>
    {showAddSnack && <AddSnack onSnackAdded={handleSnackAdded} />}
    {showSnackList && <SnackList />}
  </div>
</section>


 {/* Backend Snack Data Section */}
<section className="backend-snacks">
  <h2>🍪 Snacks from Our Database</h2>
  <p>Discover unique snacks with descriptions and origins from around the world!</p>

  {/* "Get Snack Data" Button */}
  <button className="get-snack-data-button" onClick={handleGetSnackData}>
    🍽️ Load Snacks 
  </button>

  {/* Display Backend Snack Data */}
  {snacks.length > 0 && (
    <div className="snack-card-section">
      <div className="snack-card-grid">
        {snacks.map((snack, index) => (
          <div key={index} className="snack-card">
            <h3>{snack.name}</h3>
            <p><strong>Description:</strong> {snack.description}</p>
            <p><strong>Country of Origin:</strong> {snack.country}</p>
          </div>
        ))}
      </div>
    </div>
  )}
</section>
      </section>
    </div>
  );
};

export default LandingPage;
