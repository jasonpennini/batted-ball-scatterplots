// src/pouchDBHelpers.js
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);


// Get unique batters
export const getUniqueBatters = (data) => {
    console.log('data inside getUniqueBatters', data)
    try {
      // Get unique batters
      const batters = [
        ...new Set(
            data
                .map(doc => doc.BATTER)
                .filter(Boolean)
                .map(name => {
                    // Format "LASTNAME, FIRSTNAME" to "FirstName LastName"
                    const [lastName, firstName] = name.split(', ').map(part => part.trim());
                    return firstName && lastName ? `${firstName} ${lastName}` : name;
                })
        )
      ];

   // Sort batters alphabetically
    batters.sort((a, b) => a.localeCompare(b));
    return batters;
  } catch (error) {
    console.error("Error fetching unique batters:", error);
    throw error;
  }
};

// Get data for a specific batter
export const getBatterData = (data, hitterName) => {
    try {
        const result = data.filter(doc => doc.BATTER === hitterName);
        
        if (result.length === 0) {
            throw new Error('Hitter not found');
        }
        
        return result;
    } catch (error) {
        console.error("Error fetching batter data:", error);
        throw error;
    }
};