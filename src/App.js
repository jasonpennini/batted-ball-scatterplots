import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/home';
import Navbar from './components/Navbar';

const App = () => {
  const [data, setData] = useState([]);

  const loadInitialData = async () => {
    try {
      const response = await fetch('/data/output.json'); 
      const jsonData = await response.json();

      const formattedData = jsonData.map(item => {
        const batterName = item.BATTER ? item.BATTER.trim() : '';
        const nameParts = batterName.split(' ').filter(part => part);
        const formattedName = nameParts.length > 1 ? `${nameParts[1]} ${nameParts[0]}` : batterName;

        return {
          ...item,
          BATTER: formattedName,
        };
      });

      setData(formattedData); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (data.length === 0) {
      loadInitialData(); 
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
