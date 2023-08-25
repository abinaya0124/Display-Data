import React from "react";
import axios from "axios";
import "./card.scss";
import { useState } from "react";
import { useEffect } from "react";

const Card = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const cardData = async () => {
    try {
      const response = await axios.get("https://api.punkapi.com/v2/beers");
      setData(response.data);
    } catch (err) {
      console.log("Error in fetching", err);
    }
  };
  useEffect(() => {
    cardData();
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="container-box">
        {data
          .filter((item) =>
            item.name.toLowerCase().includes(search.toLocaleLowerCase())
          )
          .map((item, idx) => (
            <div key={idx} className="card-boxes">
              <img
                src={item.image_url}
                alt={item.name}
                className="image-cards"
              />
              <h1>{item.name}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Card;
