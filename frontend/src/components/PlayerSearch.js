// PlayerSearch.js
import React, { useState } from 'react';
import { getBatterData } from '../pouchDBHelpers';
import ScatterPlot from './Scatterplot';

const PlayerSearch = () => {
    const [batterName, setBatterName] = useState('');
    const [batterData, setBatterData] = useState([]);
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        setBatterName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission
        setError(''); // Clear any previous errors

        try {
            console.log('inside try');
            console.log(batterName, "batterName");

            // Reformat the batter name from "First Last" to "Last, First"
            const nameParts = batterName.split(' ');
            const formattedName = nameParts.length > 1 
                ? `${nameParts[1]}, ${nameParts[0]}` // "Braun, Ryan"
                : batterName; // Handle case where only a single name is provided

            console.log(formattedName, "formattedName"); // Log the formatted name
            
            const data = await getBatterData(formattedName); // Use the formatted name
            setBatterData(data);
            console.log('batterData', data)
        } catch (err) {
            console.error("Error fetching batter data:", err);
            setError(err.message); // Display the error message
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={batterName} onChange={handleInputChange} placeholder="Enter Batter Name" required />
                <button type="submit">Search</button>
            </form>
            <br></br>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
            
            {batterData.length > 0 && <ScatterPlot batterData={batterData} />}

        </div>
    );
};

export default PlayerSearch;
