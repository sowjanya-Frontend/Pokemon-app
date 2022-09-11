import React from "react";

/**
 * @description: To display pokemon card layout
 * @return: pokemon card layout
 * @param void
 * @author: Sowjanya Kandra
 * @required: PokemonCardLayout.js
*/

const PokemonCardLayout = ({
  id,
  name,
  image,
  type
}) => {
  //Here card-container ${type} style was used to written the css dynamically for each type of pokemon
  const style = `card-container ${type}`;
  return (
    <div className={style} id={id}>
      <img src={image} alt={name} />
      <div className="pokemon-wrapper">
        <h3>{name.toUpperCase()}</h3>
        <small>Type : {type}</small>
      </div>
    </div>
  );
};

export default PokemonCardLayout;
