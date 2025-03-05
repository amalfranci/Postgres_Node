//
const db = require("../db/db.js");

async function createUserTable() {
  const createTableQuery = `
   CREATE TABLE IF NOT EXISTS users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(40) UNIQUE NOT NULL, 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
    `;

  try {
    await db(createTableQuery);

    console.log("User table created Successfully");
  } catch (error) {
    console.error("Erro white Createing User", error);
  }
}

async function insertUserData(username, email) {
    const insertDataQuery = `
        INSERT INTO users (username, email)
        VALUES ($1, $2)
        RETURNING *
    `;

    try {
        const result = await db(insertDataQuery, [username, email]);
        console.log("User inserted successfully:", result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error("Error occurred while inserting user:", error);
        throw error; // Re-throw to handle in calling function
    }
}

async function getAllUsersData() {
    const getAllDataQuery = `
        SELECT 
              *
        FROM users;
    `;

    try {
        const result = await db(getAllDataQuery);
        console.log("All users fetched successfully",result.rows);
        return result.rows; // Correct property is 'rows' not 'row'
    } catch(error) {
        console.error("Error while retrieving user information:", error);
        throw error; // Re-throw to allow handling by caller
    }
}

async function updateUserEmail(userId, newEmail) {
    const updateQuery = `
        UPDATE users
        SET email = $1
        WHERE id = $2
        RETURNING *
    `;

    try {
        const result = await db(updateQuery, [newEmail, userId]);
        
        if (result.rowCount === 0) {
            throw new Error(`No user found with ID: ${userId}`);
        }
        
        console.log(`User ${userId} email updated successfully`);
        return result.rows[0];
    } catch(error) {
        console.error("Error updating user email:", error);
        throw error;
    }
}
async function deleteUserById(userId) {
    const deleteQuery = `
        DELETE FROM users
        WHERE id = $1
        RETURNING *
    `;

    try {
        const result = await db(deleteQuery, [userId]);
        
        if (result.rowCount === 0) {
            throw new Error(`No user found with ID: ${userId}`);
        }
        
        console.log(`User ${userId} deleted successfully`);
        return result.rows[0];
    } catch(error) {
        console.error("Error deleting user:", error);
        throw error;
    }
}
module.exports = {createUserTable,insertUserData,getAllUsersData,updateUserEmail,deleteUserById}
