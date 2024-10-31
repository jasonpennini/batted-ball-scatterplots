import React, { useState, useEffect } from 'react'; 
import ScatterPlot from './ScatterPlot/ScatterPlot';
import Dropdown from './Dropdown'; 

const PlayerSearch = ({ data }) => {
    const [batterData, setBatterData] = useState([]); // stores current batter data
    const [error, setError] = useState('');
    const [value, setValue] = useState(''); // stores current input from dropdown
    const [batterNames, setBatterNames] = useState([]);
    const [filteredBatters, setFilteredBatters] = useState([]); //holds list of all batters
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedBatter, setSelectedBatter] = useState(''); // holds name of selected batter from dropdown

    const getUniqueBatters = (data) => {
        // creating a list of unique batters to be used in our dropdown component, data type will be a set of strings
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
        //setting filtered batters to an array of strings, which list all unique batter names
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

    // on change handles the filtering logic so as a user types in a name in the Find Player By First Name 
    const onChange = (input) => {
        setValue(input);

        const filtered = batterNames.filter((name) =>
            name.toLowerCase().startsWith(input.toLowerCase())
        );
        // search box we update state variable with their input instantly
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
            // attempts to match user selected batter from UI with a batter from the data
            const matchingBatterData = data.filter(batter => {
                const batterName = batter.BATTER.replace(',', '').trim(); 
                // will return a true or false depending on whether they are strictly equal
                return batterName === formattedName;
            });

            // if a matchingBatterData has a length > 0, updated batterData state variable with the matching data
            if (matchingBatterData.length > 0) {
                setBatterData(matchingBatterData); 
                setError('');
                setValue('');
                // also update the selectedBatter, which will be passed as a prop and used in the children
                setSelectedBatter(formattedName); 
            } else {
                setError(`No data found for ${item}`);
                setBatterData([]);
                setSelectedBatter('');
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
            {/* if the batterData array has length, render the H2 and and the Scatterplot Component */}
            {batterData.length > 0 && <h2>Exit Velo vs Launch Angle Scatterplot for {selectedBatter}</h2>}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
            {batterData.length > 0 && <ScatterPlot batterData={batterData} />}
        </div>
    );
};

export default PlayerSearch;
