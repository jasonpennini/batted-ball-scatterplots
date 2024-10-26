import React, { useState } from 'react';

const PlayerSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [playerData, setPlayerData] = useState([]);
    const [error, setError] = useState(null);

    const fetchPlayerData = async (e) => {
        e.preventDefault(); 
        setError(null);
    
        if (!searchTerm) {
            setPlayerData([]);
            setError('Please enter a player name.');
            return;
        }
        try {
            // Split the input and reformat to "Last, First"
            const nameParts = searchTerm.split(' ');
            if (nameParts.length < 2) {
                setError('Please enter both first and last names.');
                return;
            }
            const formattedName = `${nameParts[1]}, ${nameParts[0]}`; // "Last, First"
            const encodedSearchTerm = encodeURIComponent(formattedName);
            // Fetch from the correct endpoint
            const response = await fetch(`/api/battedBallData/hitters/${encodedSearchTerm}`);
    
            if (!response.ok) {
                throw new Error('Player not found');
            }
    
            const data = await response.json();
            setPlayerData(data); 
        } catch (error) {
            setError(error.message); 
            setPlayerData([]); 
        }
    };
    
    return (
        <div>
            <form onSubmit={fetchPlayerData}>
                <input
                    type="text"
                    placeholder="Enter player name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error in red */}
            {playerData.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Player Name</th>
                            <th>Exit Velocity</th>
                            <th>Launch Angle</th>
                            <th>Hit Distance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {playerData.map((player, index) => (
                            <tr key={index}>
                                <td>{player.batter}</td> 
                                <td>{player.exitSpeed || 'N/A'}</td> 
                                <td>{player.launchAngle || 'N/A'}</td> 
                                <td>{player.hitDistance || 'N/A'}</td> 

                            </tr>
                        ))}
                    </tbody>
                </table>
               )}
        </div>
    );
};

export default PlayerSearch;
