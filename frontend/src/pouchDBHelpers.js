// src/pouchDBHelpers.js
import db from './pouchDBConfig';
import PouchDB from 'pouchdb';
import PouchDBFind from 'pouchdb-find';
PouchDB.plugin(PouchDBFind);


// Get all batted ball data
export const getAllBattedBallData = async () => {
    try {
        const allData = await db.allDocs({ include_docs: true });
        return allData.rows.map(row => row.doc);
    } catch (error) {
        console.error("Error fetching all batted ball data:", error);
        throw error;
    }
};

// Get unique batters
export const getUniqueBatters = async () => {
  try {
    let allDocs = [];
    let skip = 0;
    const batchSize = 500; // Adjust this value based on performance needs

    // Loop until no more results
    while (true) {
        const result = await db.find({ 
            selector: {}, 
            limit: batchSize, 
            skip: skip 
        });
        
        allDocs = allDocs.concat(result.docs);
        if (result.docs.length < batchSize) break; // Exit if last batch is smaller than requested size
        
        skip += batchSize;
    }

    // Get unique batters
    const batters = [
      ...new Set(
          allDocs
              .map(doc => doc.BATTER)
              .filter(Boolean)
              .map(name => {
                  // Format "LASTNAME, FIRSTNAME" to "FirstName LastName"
                  const [lastName, firstName] = name.split(', ').map(part => part.trim());
                  return firstName && lastName ? `${firstName} ${lastName}` : name;
              })
      )
  ];
    console.log(batters, "batters inside unique batters");
    console.log("Unique batters count:", batters.length);
    // Sort batters alphabetically
    batters.sort((a, b) => a.localeCompare(b));
    return batters;
} catch (error) {
    console.error("Error fetching unique batters:", error);
    throw error;
}
};

// Get data for a specific batter
export const getBatterData = async (hitterName) => {
    console.log('getbatterdata invoked')
    try {
        const result = await db.find({
            selector: { BATTER: hitterName }
        });

        console.log('Find result:', result); // Log the result
        console.log('result.docs', result.docs)
       
        if (result.docs.length === 0) {
            throw new Error('Hitter not found');
        }
        return result.docs;
    } catch (error) {
        console.error("Error fetching batter data:", error);
        throw error;
    }
};
