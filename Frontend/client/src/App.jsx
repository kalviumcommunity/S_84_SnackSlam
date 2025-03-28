import './App.css'; 
import LandingPage from "./pages/LandingPage";
import { useEffect, useState } from 'react';
import { getSnacks } from './services/api';      // Import API function
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddSnack from './pages/AddSnack';
import SnackList from './components/SnackList';

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

  const handleSnackAdded = async () => {
    const updatedSnacks = await getSnacks(); // Refresh the snack list
    setSnacks(updatedSnacks);
};


  return (
    <div className="landing-container">
      <Router>
      <Routes>
                <Route path="/" element={<LandingPage snacks={snacks}/>} />
                <Route path="/add-snack" element={<AddSnack onSnackAdded={handleSnackAdded} />} />
                <Route path="/snack-list" element={<SnackList />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
