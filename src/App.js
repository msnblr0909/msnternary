import React, { useEffect, useState } from "react";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [party, setParty] = useState("");
  const [userid, setUserId] = useState(null);
  useEffect(() => {
    getUser();
  }, []);
  function getUser() {
    fetch("http://localhost:4000/users").then((result) => {
      result.json().then((resp) => {
        console.warn(resp);
        setData(resp);
        setName(resp[0].name);
        setParty(resp[0].party);
        setUserId(resp[0].id);
      });
    });
  }

  function selectUsers(id) {
    console.log(data[id - 1]);
    let item = data[id - 0];
    setName(item.name);
    setParty(item.party);
    setUserId(item.id);
  }
  function deleteUser(id) {
    // console.log(id);
    fetch(`http://localhost:4000/users/${id}`, {
      method: "DELETE",
    }).then((result1) => {
      result1.json().then((resp1) => {
        console.log(resp1);
        getUser();
      });
    });
  }
  return (
    <>
      <h1 className="txt-style">MSN TABLE CHART</h1>
      <div className="reg-form">
        <div className="tbl-msn">
          <table className="table-style" border="2">
            <tr>
              <td className="table-data">ID</td>
              <td className="table-data">NAME</td>
              <td className="table-data">PARTY</td>
              <td>Operation</td>
              <td>Update</td>
            </tr>
            {data &&
              data.map((item, i) => (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.party}</td>
                  <td>
                    <button style={{backgroundColor:"red",color:"white"}}
                      onClick={() => deleteUser(item.id)}
                      className="btn-style"
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button style={{backgroundColor:"green",color:"white"}}
                      onClick={() => selectUsers(item.id)}
                      className="btn-style"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
          </table>
        </div>
        {/* table ended */}
        <div className="form-style">
          <input type="name" value={name} />
          <br />
          <br />
          <input type="party" value={party} />
          <br />
          <br />
          <button>Update</button>
        </div>
      </div>
    </>
  );
}

export default App;
