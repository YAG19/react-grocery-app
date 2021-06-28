import React from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';

const List = ({ items, removeItems, editItem }) => {
  return (
    <div className="list-container">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <div key={id} className="list-items">
            <p className="title"> {title}</p>
            <div className="btn-container" >
            <button 
              className="edit-btn" 
              onClick={() => editItem(id)}
              >
                <FaEdit />
            </button>
            <button
              className="delete-btn"
              type="submit"
              onClick={() => removeItems(id)}
            >
              <FaTrash />
            </button>
          </div>
          </div>
        );
      })}
    </div>
  );
};

export default List;
