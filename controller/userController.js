const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises
const logger = require('../loggers/logger');

exports.getUser = async (req, res) => {
  try {
    const data = await fs.readFile("users.json");
    const user = JSON.parse(data);
    logger.info(`Get req of all users`)
    res.status(201).json(user);
  } catch (error) {
    logger.error(`Get request for all users faild: ${error}`)
  }
};
  
//create new user
exports.createUser = async (req, res) => {
  try {
    // Extract the name from the request body
    const { name, password } = req.body;
    
    // Check if name and password are provided
    if (!name || !password) {
      return res.status(400).send({ msg: "Name and password are required" });
    }

    const data = await fs.readFile("users.json");
    const users = JSON.parse(data);

    // Check if a user with the given name already exists
    const userExists = users.some(user => user.name === name);
    if (userExists) {
      return res.status(400).send({ msg: "User with this name already exists" });
    }

    // Create new user
    const newUser = {
      id: uuidv4(),
      name: name,
      password: password
    };

    // push the new user to the users array
    users.push(newUser);
    await fs.writeFile("users.json", JSON.stringify(users, null, 2));
    logger.info(`New user id: ${newUser.id} created`)
    res.status(201).json(newUser);

  } catch (error) {
    // Handle errors (e.g., file read/write errors)
    res.status(500).send({ msg: "An error occurred", error: error.message });
  }
};



exports.getUserid = (req, res) => {
  // req
  var id = req.params.id
  
  res.status(200).json({ msg: `user by ${id}` });
};

exports.uppdateUser = (req, res) => {
  // req
  res.status(200).json({
    msg: "uppdate",
  });
};

exports.removeUser = async (req, res) => {
  try {
    // Read the users.json file
    const data = await fs.readFile("users.json", "utf-8");
    const users = JSON.parse(data);

    // Get the ID to be removed from the request parameters
    const removeId = req.params.id;

    // Find the index of the user with the specified ID
    const userIndex = users.findIndex(user => user.id === removeId);

    // Check if the user exists
    if (userIndex === -1) {
      return res.status(404).send({ msg: `User with id:${removeId} not found` });
    }

    // Remove the user from the array
    users.splice(userIndex, 1);

    // Write the updated users array back to the file
    await fs.writeFile("users.json", JSON.stringify(users, null, 2));

    // Send a success response
    res.send({ msg: `User with id:${removeId} REMOVED` });
  } catch (error) {
    // Handle errors (e.g., file read/write errors)
    res.status(500).send({ msg: "An error occurred", error: error.message });
  }
};