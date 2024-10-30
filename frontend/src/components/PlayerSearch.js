import React, { useState, useEffect } from 'react';
import { getBatterData } from '../pouchDBHelpers';
import ScatterPlot from './ScatterPlot/Scatterplot';

const PlayerSearch = ({ data }) => {
    const [batterData, setBatterData] = useState([]);
    const [error, setError] = useState('');
    const [value, setValue] = useState(''); // Search term input by user
    const [batterNames, setBatterNames] = useState([]); 
    const [filteredBatters, setFilteredBatters] = useState([]); 
    const [hoveredIndex, setHoveredIndex] = useState(null); 

   // Function to extract unique batter names
const getUniqueBatters = (data) => {
    const uniqueBattersSet = new Set();

    data.forEach((item, index) => {
        let batterName = item.BATTER.trim();
        // Trim any trailing commas
        if (batterName.endsWith(',')) {
            batterName = batterName.slice(0, -1).trim(); // Remove the comma and trim spaces
        }
        
        console.log(`Processing item ${index}:`, batterName); // Log each batter name being processed
        
        if (batterName) {
            uniqueBattersSet.add(batterName); // Add to set if not empty
        }
    });

    const uniqueBatters = [...uniqueBattersSet];
    console.log("Unique batters found:", uniqueBatters); // Log unique batters
    return uniqueBatters;
};

    useEffect(() => {
        console.log("Data received:", data); // Log the incoming data
        if (data && data.length > 0) {
            const uniqueBatters = getUniqueBatters(data); // Use the new function to get unique batters
            setBatterNames(uniqueBatters);
            setFilteredBatters(uniqueBatters); // Initialize filtered batters
        } else {
            // Reset states if no data is provided
            console.log("No data provided, resetting states."); // Log when no data is provided
            setBatterNames([]);
            setFilteredBatters([]);
        }
    }, [data]); // Dependency on data to update when it changes

    const onChange = (event) => {
        const input = event.target.value;
        setValue(input);

        console.log("Search input:", input); // Log the search input

        // Filter batterNames based on the input
        const filtered = batterNames.filter((name) =>
            name.toLowerCase().startsWith(input.toLowerCase())
        );
        console.log("Filtered batters:", filtered); // Log the filtered batters
        setFilteredBatters(filtered); 
    };

    const handleBatterClick = async (batter) => {
        const nameParts = batter.split(' ');
        const formattedName = nameParts.length > 1 
            ? `${nameParts[1]}, ${nameParts[0]}`
            : batter;

        console.log("Batter clicked:", formattedName); // Log the selected batter

        try {
            const data = await getBatterData(formattedName);
            console.log("Fetched batter data:", data); // Log fetched batter data
            setBatterData(data);
            setError(''); 
            setValue(''); 
            // Remove this line as it resets to empty batter names after clicking
            // setFilteredBatters(batterNames); 
        } catch (err) {
            console.error("Error fetching batter data:", err);
            setError(err.message); 
        }
    };

    const handleInputFocus = () => {
        console.log("Input focused. Resetting filtered batters."); // Log when input is focused
        setFilteredBatters(batterNames); 
        setBatterData([]); 
    };

    const handleMouseEnter = (index) => {
        setHoveredIndex(index); 
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null); 
    };

    return (
        <div>
            <h1>Search</h1>
            <h6>Filter by first name</h6>

            <div className="search-container">
                <div className="search-inner">
                    <input type="text" value={value} onChange={onChange} placeholder="Find a player" onFocus={handleInputFocus}/>
                </div>
                <div className="dropdown">
                    {filteredBatters.map((item, index) => (
                        <div
                            key={index}
                            className="dropdown-row"
                            onClick={() => handleBatterClick(item)}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                backgroundColor: hoveredIndex === index ? '#e0e0e0' : 'transparent', 
                                cursor: 'pointer' 
                            }}
                        >
                            {item}
                        </div>
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
