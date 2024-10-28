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
        if (result.rows.length === 0) { // Checks if PouchDB is empty
          const docs = initialData.map((item, index) => ({
            ...item,
            _id: `row_${index}`, // Generate a unique ID based on the index
          }));
          await db.bulkDocs(docs);
          console.log('Initial data loaded into PouchDB');
        }
      } catch (error) {
        console.error('Error loading initial data:', error);
      }
    };

    // Fetch data from PouchDB to display in the app
    const fetchData = async () => {
      const result = await db.allDocs({ include_docs: true });
      const fetchedData = result.rows.map((row) => row.doc);
      setData(fetchedData);
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
