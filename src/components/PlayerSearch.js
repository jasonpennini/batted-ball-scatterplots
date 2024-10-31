import React, { useState, useEffect } from 'react'; 
import ScatterPlot from './ScatterPlot/ScatterPlot';
import Dropdown from './Dropdown'; 

const PlayerSearch = ({ data }) => {
    const [batterData, setBatterData] = useState([]);
    const [error, setError] = useState('');
    const [value, setValue] = useState(''); 
    const [batterNames, setBatterNames] = useState([]);
    const [filteredBatters, setFilteredBatters] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedBatter, setSelectedBatter] = useState(''); 

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
        <div className="text-center">
            <div className="search-container d-flex justify-content-center">
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
            {batterData.length > 0 && <h2>Exit Velo vs Launch Angle Scatterplot for {selectedBatter}</h2>}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
            {batterData.length > 0 && <ScatterPlot batterData={batterData} />}
        </div>
    );
};

export default PlayerSearch;
