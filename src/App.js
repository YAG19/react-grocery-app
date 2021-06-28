import React, { useEffect, useState } from "react";
import "./App.css";
import List from "./List";
import Alert from "./Alert";
import './fonts/lovelycoffe/LovelyCoffee-jEVeO.ttf';
import './fonts/Delux/DeluxesBold-8MzWg.ttf';

const getlocalstorage = () => {
  const list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  }
  return [];
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getlocalstorage());
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [isEditing, setEditing] = useState(false);
  const [EditID, setEditID] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "Please Enter Value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === EditID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName('');
      setEditID(null);
      setEditing(false);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "added to list");
      setList([...list, { id: list.length, title: name }]);
      setName('');
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  const clearList = () => {
    setList([]);
  };


  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="App">

      <form onSubmit={handleSubmit} className="form-control"  >
        {alert && <Alert {...alert} removeAlert={showAlert} list={list} />}

        <h2> Grocery's </h2>

        <input
          className="input-field"
          type="text"
          placeholder="eg. Cake"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <button type="submit" className="submit-btn">
          {isEditing ? "edit" : "Add"}
        </button>
      </form>

      {list.length > 0 && (
        <div>
          <List items={list} removeItems={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={clearList}> Clear All </button>
        </div>
      )}
    </div>
  );
}

export default App;
