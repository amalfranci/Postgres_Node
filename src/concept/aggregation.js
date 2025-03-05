const db = require("../db/db.js");


async function getUserRegistrationStats() {
    const aggregationQuery = `
        SELECT
            DATE_TRUNC('day', created_at) AS registration_date,
            COUNT(id) AS total_users,
            MIN(username) AS first_username,
            MAX(username) AS last_username,
            ARRAY_AGG(email) AS all_emails
        FROM users
        GROUP BY registration_date
        ORDER BY registration_date DESC
    `;

    try {
        const result = await db(aggregationQuery);
        
        if (!result?.rows) {
            throw new Error("No aggregation results returned");
        }
        
        console.log(`Found ${result.rowCount} registration dates`);
        return result.rows;
    } catch(error) {
        console.error("Error calculating registration stats:", error);
        throw error;
    }
}

module.exports = {getUserRegistrationStats}