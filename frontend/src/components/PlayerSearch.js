import React, { useState, useEffect } from 'react';
import { getBatterData, getUniqueBatters } from '../pouchDBHelpers';
import ScatterPlot from './Scatterplot';

const PlayerSearch = () => {
    const [batterName, setBatterName] = useState('');
    const [batterData, setBatterData] = useState([]);
    const [error, setError] = useState('');
    const [value, setValue] = useState(''); // Search term input by user
    const [batterNames, setBatterNames] = useState([]);
    const [filteredBatters, setFilteredBatters] = useState([]); // Filtered batters

    useEffect(() => {
        const fetchUniqueBatters = async () => {
            try {
                const batters = await getUniqueBatters(); // Fetch unique batters
                console.log(batters, "batters");
                setBatterNames(batters);
                setFilteredBatters(batters); // Initialize with full list of batters
            } catch (error) {
                console.error("Error fetching unique batters:", error);
                setError(error.message);
            }
        };
        
        fetchUniqueBatters();
    }, []);

    const onChange = (event) => {
        const input = event.target.value;
        setValue(input);

        // Filter batterNames based on the input
        const filtered = batterNames.filter((name) =>
            name.toLowerCase().startsWith(input.toLowerCase())
        );
        setFilteredBatters(filtered); // Update the filtered batters
    };

    const handleInputChange = (event) => {
        setBatterName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
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
            console.log('batterData', data);
        } catch (err) {
            console.error("Error fetching batter data:", err);
            setError(err.message); // Display the error message
        }
    };

    const onSearch = async () => {
        // This function is now implemented to search through batterNames and fetch data
        if (value.trim() === '') {
            setError('Please enter a batter name to search.');
            return;
        }

        const selectedBatter = filteredBatters.find((name) => 
            name.toLowerCase().startsWith(value.toLowerCase())
        );

        if (selectedBatter) {
            try {
                // Reformat the batter name for getBatterData
                const nameParts = selectedBatter.split(' ');
                const formattedName = nameParts.length > 1 
                    ? `${nameParts[1]}, ${nameParts[0]}`
                    : selectedBatter;

                const data = await getBatterData(formattedName); // Call getBatterData with selected batter name
                setBatterData(data);
                setError(''); // Clear any previous error messages
            } catch (err) {
                console.error("Error fetching batter data:", err);
                setError(err.message); // Display the error message
            }
        } else {
            setError('Batter not found.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={batterName} onChange={handleInputChange} placeholder="Enter Batter Name" required />
                <button type="submit">Search</button>
            </form>
            <br />

            <h1>Search</h1>
            <div className="search-container">
                <div className="search-inner">
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder="Search by name"
                    />
                    <button onClick={onSearch}>Search</button>
                </div>
                <div className="dropdown">
                    {filteredBatters.map((item, index) => (
                        <div key={index} className="dropdown-row">{item}</div>
                    ))}
                </div>
            </div>

            <br />
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
            
            {batterData.length > 0 && <ScatterPlot batterData={batterData} />}
        </div>
    );
};

export default PlayerSearch;
