import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import './styles/Items.scss'
import { API_URL } from "../config";

const ItemsRadom = ({ items }) => {
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    // axios
    //   .get(`${API_URL}/items/random`)
    //   .then((response) => {
    //     setRandomItems(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    const randomNum = (max, min) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    let newRandomItems = [];
    for (let i = 0; i < 3; i++) {
      newRandomItems.push(items[randomNum(items.length - 1, 0)]);
    }
    setRandomItems(newRandomItems);
  }, []);

  return (
      <Carousel
        showArrows={true}
        showStatus={false}
        showThumbs={false}
        thumbWidth={false}
        infiniteLoop
        autoPlay
        
      >
        {randomItems.map((item) => {
          return (
            <div>
              <Link to={`item/${item._id}`} key={item._id}>
                <div>
                  <img
                    src={item.image}
                    alt="random__item"
                    className="random__image"
                  />
                </div>
                <p className="legend" id="random__text">
                  {item.name}
                </p>
              </Link>
            </div>
          );
        })}
      </Carousel>
  );
};

export default ItemsRadom;
