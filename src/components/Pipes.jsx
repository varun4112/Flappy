import React from "react";
import bamboo from './bamboo.png';
 
const Pipes = ({ pipePosition }) => {
    return (
        <img
            src={"https://media.geeksforgeeks.org/wp-content/uploads/20231211115753/6d2a698f31595a1.png"}
            alt="pipe"
            className="pipe"
            style={{
                left: pipePosition.x,
                top: pipePosition.y,
            }}
            draggable={true}
        />
    );
};
 
export default Pipes;