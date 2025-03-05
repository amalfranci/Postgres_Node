const db = require("../db/db.js");

async function createNewPostsTable() {
  const createQuery = `
      CREATE TABLE IF NOT EXISTS posts(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)
    `;

  try {
    await db(createQuery);
    console.log("post created successfull");
  } catch (error) {
    console.log("Error", error);
  }
}


async function insertPostsData(title,content,user_id) {

    const insertQuery = `
     INSERT INTO posts (title, content,user_id)
        VALUES ($1, $2,$3)
        RETURNING *
     
    `
    try {
        const result = await db(insertQuery, [title, content,user_id]);
        console.log("User posts  created successfully:", result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error("Error occurred while inserting user posts:", error);
        throw error; // Re-throw to handle in calling function
    }
}

module.exports = {createNewPostsTable,insertPostsData};
