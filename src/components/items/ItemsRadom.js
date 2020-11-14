import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "../styles/Items.scss";

const ItemsRadom = ({ items, loggedInUser }) => {
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {
    const randomNum = (arr) => Math.floor(Math.random() * arr.length);

    if (!items.length) {
      setRandomItems(null);
    } else {
      let filtered = items.filter((item) => {
        return item.user._id != loggedInUser._id;
      });
      if (filtered.length < 3 && !filtered.length) {
        setRandomItems(filtered);
      } else if (filtered.length > 3) {
        let newRandomItems = [];
        for (let i = 0; i < 3; i++) {
          newRandomItems.push(filtered[randomNum(filtered)]);
        }
        setRandomItems(newRandomItems);
      }
    }
  }, []);

  return (
    <>
      {randomItems == null ? null : (
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
                <Link to={`/item/${item._id}`}>
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
