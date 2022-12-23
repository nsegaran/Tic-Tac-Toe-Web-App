import React from "react";

const Square = ({value, onClick}) => {
  return (
   <button className= 'squares' onClick= {onClick}>
    <div className='xo_class'>
      {value}
    </div>
   </button>
  );
};

export default Square;
