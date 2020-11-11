import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "../styles/Items.scss";

const ItemsRadom = ({ items }) => {
  const [randomItems, setRandomItems] = useState([]);

  useEffect(() => {

    const randomNum = (max, min) =>
      Math.floor(Math.random() * (max - min + 1) + min);

    let newRandomItems = [];
    for (let i = 0; i < 3; i++) {
      newRandomItems.push(items[randomNum(items.length - 1, 0)]);
    }
    setRandomItems(newRandomItems);
  }, []);

  console.log(items);


  return (
    <>
      {!items.length || !randomItems.length ? (
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
              <div >
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
      )}
    </>
  );
};

export default ItemsRadom;
