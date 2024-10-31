import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/home';
import Navbar from './components/Navbar';

const App = () => {
  const [data, setData] = useState([]);

  // Define the function to load and format data
  const loadInitialData = async () => {
    try {
      const response = await fetch('/data/output.json'); // Fetch from the public folder
      const jsonData = await response.json();

      // Log the entire data file, but limit output if it's large
      console.log('Fetched data:', jsonData); // This will log the whole file; consider logging a sample if too large

      // Format the data
      const formattedData = jsonData.map(item => {
        const batterName = item.BATTER ? item.BATTER.trim() : '';
        const nameParts = batterName.split(' ').filter(part => part);
        const formattedName = nameParts.length > 1 ? `${nameParts[1]} ${nameParts[0]}` : batterName;

        return {
          ...item,
          BATTER: formattedName,
        };
      });

      setData(formattedData); // Set the formatted data in state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    // Only fetch data if it's not already loaded
    if (data.length === 0) {
      loadInitialData(); // Call the function to load data on component mount
    }
  }, [data]); // Dependency on data to avoid infinite loop

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home data={data} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
