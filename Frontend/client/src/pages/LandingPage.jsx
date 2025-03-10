import React, { useState, useEffect } from "react";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    document.title = "SnackSlam - Discover Overrated Snacks";
  }, []);

  const handleLogin = () => {
    if (username) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
  };

  return (
    <div className="landing-container">
      {!isLoggedIn ? (
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
            disabled={!username}
          >
            🚀 Start Exploring
          </button>
        </div>
      ) : (
        <div className="dashboard">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
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
          </section>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
