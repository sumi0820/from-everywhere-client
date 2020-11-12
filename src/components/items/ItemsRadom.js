import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "../styles/Items.scss";

const ItemsRadom = ({ items, loggedInUser }) => {
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    const randomNum = (max, min) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    let filtered = items.filter((item) => {
      return item.user._id != loggedInUser._id;
    });

    let newRandomItems = [];
    if (filtered.length >= 3) {
      for (let i = 0; i < 3; i++) {
        newRandomItems.push(filtered[randomNum(items.length - 1, 0)]);
      }
      setRandomItems(newRandomItems);
    } else {
      setRandomItems(filtered);
    }

    console.log(newRandomItems);
  }, []);

  return (
    <>
      {!randomItems.length ? (
        <p>There's no item uploaded yet</p>
      ) : (
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
                <Link to={`/item/${item._id}`} >
                  <div key={item._id}>
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
      )}
    </>
  );
};

export default ItemsRadom;
