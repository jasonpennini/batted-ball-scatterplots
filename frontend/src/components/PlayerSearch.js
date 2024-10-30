import React, { useState, useEffect } from 'react'; 
import ScatterPlot from './ScatterPlot/Scatterplot';
import Dropdown from './Dropdown'; 
import CustomLegend from './ScatterPlot/CustomLegend'

const PlayerSearch = ({ data }) => {
    const [batterData, setBatterData] = useState([]);
    const [error, setError] = useState('');
    const [value, setValue] = useState(''); // Search term input by user
    const [batterNames, setBatterNames] = useState([]);
    const [filteredBatters, setFilteredBatters] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedBatter, setSelectedBatter] = useState(''); // State for selected batter


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
            setSelectedBatter(''); // Clear selected batter
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
                setSelectedBatter(formattedName); // Set the selected batter's name
            } else {
                setError(`No data found for ${item}`);
                setBatterData([]);
                setSelectedBatter(''); // Clear selected batter if no data found
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Search</h2>
            <div className="search-container">
                <Dropdown
                    items={filteredBatters}
                    onChange={handleBatterSelect} 
                    value={value} 
                    onInputChange={onChange} 
                    hoveredIndex={hoveredIndex}
                    onMouseEnter={setHoveredIndex}
                    onMouseLeave={() => setHoveredIndex(null)}
                />
            </div>
            <br />
            {batterData.length >0 && <h2>Exit Velo vs Launch Angle Scatterplot for {selectedBatter}</h2>}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
            {batterData.length > 0 && <ScatterPlot batterData={batterData} />}
            {batterData.length > 0 && <CustomLegend />}

        </div>
    );
};

export default PlayerSearch;
