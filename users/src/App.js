import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: "",
    bio: ""
  });

  useEffect(() => {
    axios
    .get("http://localhost:5001/api/users")
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => console.error(err.message));
  }, []);

  useEffect(() => {}, [users]);

  const addUser = () => {
    axios
    .post("http://localhost:5001/api/users", user)
    .then((res) => {
      console.log(res);
      setUsers(res.data);
      setUser({
        name: "",
        bio: "",
      });
    })
    .catch((err) => console.log(err.message));
  };

  const deleteUser = (id) => {
    axios
    .delete(`http://localhost:5001/api/users/${id}`)
    .then((res) => {
      setUsers(res.data);
    })
    .catch((err) => console.log(err.message));
  };

const handleAdd = (e) => {
  e.preventDefault();
  addUser();
}

const handleChange = (e) => {
  setUser({
    ...user,
    [e.target.name]: e.target.value,
  });
};

  return (
    <div className="App" >
      <h1>CURRENT USERS</h1>
      <div style={{display: "flex", justifyContent:"space-evenly"}}>
      {users.map((user) => (
        <div key={user.id} style={{width: "100px"}}>
          <h1 key={user.name}>{user.name}</h1>
          <p key={user.bio}>{user.bio}</p>
          <div style={{border:"1px solid red", color: "red"}} onClick={() => deleteUser(user.id)}>DELETE</div>
        </div>
      ))}
      </div>
      <br/>
      <h1>ADD A USER</h1>
      <form onSubmit={handleAdd} style={{display: "flex", justifyContent:"center"}}>
        <div>
          <label style={{marginLeft:"1%", fontSize:"1.3rem"}}>Name:</label>
          <input
            id= "name"
            value={user.name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div>
          <label style={{marginLeft:"1%", fontSize:"1.3rem"}}>Bio:</label>
          <input
            id= "bio"
            value={user.bio}
            name="bio"
            onChange={handleChange}
          />
        </div>
        <button type="submit">ADD USER</button>
      </form>
    </div>
  );
}

export default App;
