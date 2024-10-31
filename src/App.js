import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/home';
import Navbar from './components/Navbar';

const App = () => {
  const [data, setData] = useState([]);

  const loadInitialData = async () => {
    try {
      // fetching the data from the output.json file located in public/data
      const response = await fetch('/data/output.json'); 
      const jsonData = await response.json();

       // reformatting name which is in "LastName, First Name" to "FirstName LastName"
      const formattedData = jsonData.map(item => {
        const batterName = item.BATTER ? item.BATTER.trim() : '';
        const nameParts = batterName.split(' ').filter(part => part);
        const formattedName = nameParts.length > 1 ? `${nameParts[1]} ${nameParts[0]}` : batterName;

        // updates the object with newly formatted names with spread operator
        return {
          ...item,
          BATTER: formattedName,
        };
      });

      // update state variable "data" with our reformatted output.json data
      setData(formattedData); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // if there is no data load it
  useEffect(() => {
    if (data.length === 0) {
      loadInitialData(); 
    }
  // Dependency on data to avoid infinite looP
  }, [data]); 

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
             {/* passing data to home component as a prop */}
            <Route path="/" element={<Home data={data} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;