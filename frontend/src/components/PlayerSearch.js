import React, { useState, useEffect } from 'react';
import { getBatterData, getUniqueBatters } from '../pouchDBHelpers';
import ScatterPlot from './Scatterplot';

const PlayerSearch = () => {
    const [batterName, setBatterName] = useState('');
    const [batterData, setBatterData] = useState([]);
    const [error, setError] = useState('');
    const [value, setValue] = useState(''); // Search term input by user
    const [batterNames, setBatterNames] = useState([]);
    const [filteredBatters, setFilteredBatters] = useState([]); 
    const [hoveredIndex, setHoveredIndex] = useState(null); 

    useEffect(() => {
        const fetchUniqueBatters = async () => {
            try {
                const batters = await getUniqueBatters(); 
                setBatterNames(batters);
                setFilteredBatters(batters); 
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
        setFilteredBatters(filtered); 
    };

    const handleInputChange = (event) => {
        setBatterName(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); 

        try {

            // Reformat the batter name from "First Last" to "Last, First"
            const nameParts = batterName.split(' ');
            const formattedName = nameParts.length > 1 ? `${nameParts[1]}, ${nameParts[0]}` : batterName;             
            const data = await getBatterData(formattedName); 
            setBatterData(data);
        } catch (err) {
            console.error("Error fetching batter data:", err);
            setError(err.message); 
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
                const formattedName = nameParts.length > 1 ? `${nameParts[1]}, ${nameParts[0]}` : selectedBatter;

                const data = await getBatterData(formattedName); 
                setBatterData(data);
                setError(''); 
            } catch (err) {
                console.error("Error fetching batter data:", err);
                setError(err.message); 
            }
        } else {
            setError('Batter not found.');
        }
    };

    const handleBatterClick = async (batter) => {
        // When a batter name is clicked, format the name and fetch data
        const nameParts = batter.split(' ');
        const formattedName = nameParts.length > 1 
            ? `${nameParts[1]}, ${nameParts[0]}`
            : batter;

        try {
            const data = await getBatterData(formattedName);
            setBatterData(data);
            setError(''); 
            setValue(''); 
            setFilteredBatters(batterNames); 
            setFilteredBatters([]); 
        } catch (err) {
            console.error("Error fetching batter data:", err);
            setError(err.message); 
        }
    };

    const handleInputFocus = () => {
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
