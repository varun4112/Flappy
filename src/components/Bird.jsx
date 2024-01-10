import React from "react";
 
const Bird = ({ birdPosition }) => {
 
    return (
        <img
            src={"https://assets.stickpng.com/images/584c69746e7d5809d2fa6364.png"}
            alt="bird"
            className="bird"
            style={{
                left: birdPosition.x,
                top: birdPosition.y,
            }}
            draggable={true}
        />
    );
};
 
export default Bird;