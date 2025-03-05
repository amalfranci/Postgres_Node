const db = require("../db/db")

async function getUsersWithPost() {

    const getUserWithPostQuery =`
    SELECT users.id, users.username, posts.title
    FROM users
    INNER JOIN posts ON users.id = posts.user_id
    `;

    try {
        const result = await db(getUserWithPostQuery);
        return result.rows;
    } catch (err) {
        console.error('Error executing query', err.stack);
        throw err;
    }
    
}

module.exports = { getUsersWithPost}