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
        const allData = await db.find({ selector: {} });
        const batters = [...new Set(allData.docs.map(doc => doc.batter))];
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
