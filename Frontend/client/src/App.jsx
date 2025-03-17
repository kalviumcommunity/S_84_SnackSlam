import './App.css'; 
import LandingPage from "./pages/LandingPage";
import { useEffect, useState } from 'react';
import { getSnacks } from './services/api'; // Import API function

function App() {
  const [snacks, setSnacks] = useState([]);

  // Fetch snacks data from the backend on load
  useEffect(() => {
    const fetchSnacks = async () => {
      const snackData = await getSnacks();
      setSnacks(snackData); // Store the data in state
    };

    fetchSnacks();
  }, []);

  return (
    <div className="landing-container">
      <LandingPage snacks={snacks} /> {/* Pass fetched snacks as props */}
    </div>
  );
}

export default App;
