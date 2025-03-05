const {
  createUserTable,
  insertUserData,
  getAllUsersData,
  updateUserEmail,
  deleteUserById,
} = require("./concept/basic-queries");
const {
  createNewPostsTable,
  insertPostsData,
} = require("./concept/realtionShips");
const {getUserRegistrationStats}  = require("./concept/aggregation")
const {getUsersWithPost }  = require('./concept/joins')
async function textBasicQuery() {
  try {
    // await createUserTable();
    // await insertUserData("rahul","rahul744@gmail.com")
    // await insertUserData("sachin","sachin@gmail.com")
    // await insertUserData("sarath","sarath@gmail.com")
    // await insertUserData("vipin","vipin@gmail.com")

    // await createNewPostsTable()
    // await deleteUserById(5)
    // await getAllUsersData()
    // await updateUserEmail(5,"amalfrancis61@gmail.com")
    // await insertPostsData(
    //   "Malayalam story",
    //   "it is a very danger situation in the kerala , becuase many young people are adit pg drungd",
    //   9
    // );
    // await insertPostsData(
    //   "Environmental Issues",
    //   "Kerala is facing severe climate changes, leading to unexpected floods and landslides.",
    //   7
    // );

    // await insertPostsData(
    //   "Technology Trends",
    //   "AI and machine learning are transforming the IT industry, creating new job opportunities.",
    //   8
    // );

    // await insertPostsData(
    //   "Travel Diaries",
    //   "Exploring the hidden gems of Kerala, from misty Munnar to the serene backwaters of Alleppey.",
    //   9
    // );

    // await insertPostsData(
    //   "Health Awareness",
    //   "The importance of mental health is growing, and people are adopting meditation for stress relief.",
    //   10
    // );

    // await insertPostsData(
    //   "Sports Update",
    //   "The Kerala Blasters secured a thrilling victory in the Indian Super League, exciting their fans.",
    //   7
    // );
    const data = await getUsersWithPost()
    const aggregate=  await getUserRegistrationStats()
    console.log("data",data)
    console.log("new aggreagtion Data",aggregate);
    
  } catch (error) {
    console.error("error white create", error);
  }
}

async function testAllQuery() {
  await textBasicQuery();
}

testAllQuery();
