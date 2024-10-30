import React, { useState, useEffect } from 'react'; 
import ScatterPlot from './ScatterPlot/Scatterplot';
import Dropdown from './Dropdown'; 

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
        data.forEach((item) => {
            let batterName = item.BATTER.trim();
            if (batterName.endsWith(',')) {
                batterName = batterName.slice(0, -1).trim(); 
            }
            if (batterName) {
                uniqueBattersSet.add(batterName);
            }
        });
        const uniqueBatters = [...uniqueBattersSet].sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        return uniqueBatters;
    };

    useEffect(() => {
        if (data && data.length > 0) {
            const uniqueBatters = getUniqueBatters(data); 
            setBatterNames(uniqueBatters);
            setFilteredBatters(uniqueBatters); 
        } else {
            setBatterNames([]);
            setFilteredBatters([]);
        }
    }, [data]); 

    const onChange = (input) => {
        setValue(input);

        const filtered = batterNames.filter((name) =>
            name.toLowerCase().startsWith(input.toLowerCase())
        );
        setFilteredBatters(filtered);
    };

    const handleBatterSelect = async (item) => {
        if (!item) {
            // If the item is empty or null, clear batter data and error
            setBatterData([]);
            setError('');
            setValue('');
            return; // Exit early
        }

        const formattedName = item.trim(); 
        try {
            const matchingBatterData = data.filter(batter => {
                const batterName = batter.BATTER.replace(',', '').trim(); 
                return batterName === formattedName;
            });

            if (matchingBatterData.length > 0) {
                setBatterData(matchingBatterData); 
                setError('');
                setValue('');
            } else {
                setError(`No data found for ${item}`);
                setBatterData([]);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Search</h1>
            <h6>Filter by first name</h6>

            <div className="search-container">
                <Dropdown
                    items={filteredBatters}
                    onChange={handleBatterSelect} // Updated to use the ComboBox change event
                    value={value} // Pass the current input value
                    onInputChange={onChange} // Handle input changes
                    hoveredIndex={hoveredIndex}
                    onMouseEnter={setHoveredIndex}
                    onMouseLeave={() => setHoveredIndex(null)}
                />
            </div>

            <br />
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
            {batterData.length > 0 && <ScatterPlot batterData={batterData} />}
        </div>
    );
};

export default PlayerSearch;
