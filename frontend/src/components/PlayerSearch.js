import React, { useState, useEffect } from 'react';
import ScatterPlot from './ScatterPlot/Scatterplot';

const PlayerSearch = ({ data }) => {
    console.log('data at beginning of player search', data)
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
            setBatterNames(batterName)
        }        
        if (batterName) {
            uniqueBattersSet.add(batterName); // Add to set if not empty
        }
    });

    const uniqueBatters = [...uniqueBattersSet];
    console.log("Unique batters found:", uniqueBatters); // Log unique batters
    return uniqueBatters;
};

    useEffect(() => {
        if (data && data.length > 0) {
            const uniqueBatters = getUniqueBatters(data); // Use the new function to get unique batters
            setBatterNames(uniqueBatters);
            setFilteredBatters(uniqueBatters); // Initialize filtered batters
        } else {
            // Reset states if no data is provided
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

    const handleBatterClick = async (item) => {
        console.log("Batter clicked:", item); // Log the clicked batter name
        console.log(data, "data");
    
        // Format the name from the dropdown
        const formattedName = item.trim(); // Assuming item is in "FirstName LastName" format
    
        try {
            // Find all matching batter data using the BATTER property
            const matchingBatterData = data.filter(batter => {
                // Remove the comma and trim spaces
                const batterName = batter.BATTER.replace(',', '').trim(); 
                return batterName === formattedName;
            });
    
            if (matchingBatterData.length > 0) {
                console.log("Fetched batter data:", matchingBatterData); // Log fetched batter data
                setBatterData(matchingBatterData); // Update the state with fetched data
                setError(''); 
                setValue(''); 
            } else {
                console.error("No data found for batter:", item);
                setError(`No data found for ${item}`);
                setBatterData([]); // Clear previous batter data if none found
            }
        } catch (error) {
            console.error("Error fetching batter data:", error);
            setError(error.message); 
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
