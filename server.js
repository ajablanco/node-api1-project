console.log('Console logging this');

const express = require("express");
const shortid = require("shortid");
const cors = require("cors");
const server = express();
const PORT = 5001;
server.listen(PORT, () => 
    console.log(`\n** API running on http://localhost:${PORT} **\n`)
);

let users = [
    {
        id: "1",
        name: "Aja",
        bio: "Web28"
    },
    {
        id: "2",
        name: "Frances",
        bio: "Web28"
    },
];

server.use(express.json());
server.use(cors());

// test server
server.get('/', (req, res) => {
    res.status(200).json({ Hello: "testing"});
});


//add user
server.post('/api/users', (req, res) => {
    const userInfo = req.body;

    userInfo.id = shortid.generate();

    const pushOut = () => users.push({id: userInfo.id, name: userInfo.name, bio: userInfo.bio});
        if (userInfo.name === "" || userInfo.bio === "") {
            res.status(400).json({success:false, message: "Please provide name and bio for the user"})
        }
        else {
            pushOut();
            res.status(201).json({success: true, message: 'user created'});
        }
});

//get users
server.get('/api/users', (req, res) => {
        res.status(200).json(users)
});


// get by user id
server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const userIsFound = users.find((user) => id === user.id);
    try {
      if (userIsFound) {
        res.status(201).json(userIsFound);
      } else {
        res
          .status(404)
          .json({ message: "This ID does not exist." });
      }
    } catch (error) {
      res.status(500).json({
        message: "ERROR",
      });
    }
  });


  // delete user by id
  server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const found = users.find((user) => id === user.id);

    if (!found) {
      res
        .status(404)
        .json({ message: "This ID does not exist." });
    } else {
      const newUsers = users.filter((user) => user.id !== id);
      users = newUsers;
      res.status(201).json(users);
    }
  });