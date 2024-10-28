import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {useState, useEffect} from 'react'
import Home from './pages/home'
import Navbar from './components/Navbar'
import db from './pouchDBConfig'; 
import initialData from './data/output'; 


  
  const App = () => {
    const [data, setData] = useState([]);
    console.log(initialData)
    // Load initial data into PouchDB only if the database is empty
    const loadInitialData = async () => {
      try {
        const result = await db.allDocs({ include_docs: true });
        const fetchedData = result.rows.map((row) => {
          const batterName = row.doc.BATTER.trim(); // Trim any extra whitespace
          const nameParts = batterName.split(' ').filter(part => part); // Split and remove empty parts
          const formattedName = nameParts.length > 1 ? `${nameParts[1]} ${nameParts[0]}` : batterName;
          console.log(formattedName, "formattedName");
    
          return {
            ...row.doc,
            BATTER: formattedName,
          };
        });
        setData(fetchedData); // Update state with transformed data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch data from PouchDB to display in the app
    const fetchData = async () => {
      try {
        const result = await db.allDocs({ include_docs: true });
        const fetchedData = result.rows.map((row) => {
          const batterName = row.doc.BATTER;
          // Reformat the batter name from "First Last" to "Last, First"
          const nameParts = batterName.split(' ');
          const formattedName = nameParts.length > 1 ? `${nameParts[1]}, ${nameParts[0]}` : batterName; // Handle case where only a single name is provided
          console.log(formattedName, "formattedName"); // Log the formatted name
    
          return {
            ...row.doc,
            BATTER: formattedName
          };
        });
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    useEffect(() => {
      loadInitialData();
      fetchData();
    }, []);


  return (
    <div className="App">
     <BrowserRouter>
     <Navbar />
      <div className='pages'>
        <Routes>
          <Route
            path="/"
            element={<Home data={data} />}
          />
        </Routes>
      </div>
     </BrowserRouter>
    </div>
  );
}

export default App;
