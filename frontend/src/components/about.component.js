import React, { useState, useEffect } from "react";

function About() {
  useEffect(() => {
    fetchItems();
  }, []);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = [
      {
        id: 1,
        nom: "Nil"
      },
      {
        id: 2,
        nom: "Pol"
      },
      {
        id: 3,
        nom: "Maria"
      }
    ];
    console.log(data);
    setItems(data);
  };

  return (
    <div>
      {items.map(item => {
        return <h1 key={item.id}>{item.nom}</h1>;
      })}
    </div>
  );
}

export default About;
