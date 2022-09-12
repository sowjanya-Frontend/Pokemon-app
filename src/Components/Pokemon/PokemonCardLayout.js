import React from "react";
import { useNavigate } from "react-router-dom";

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
  type,
  height,
  weight
}) => {

  //Here card-container ${type} style was used to written the css dynamically for each type of pokemon
  const style = `card-container ${type}`;

  const navigate = useNavigate();

  return (
    <div className={style} id={id}>
      <img src={image} alt={name} />
      <div className="pokemon-wrapper">
        <h3>{name.toUpperCase()}</h3>
        <small>Type : {type}</small>
        <small>Weight : {weight}</small>
        <small>Height : {height}</small>
      </div>
      <div className="lead">
        <button className="explore-pokemon" onClick={() => navigate(`/pokemonDetails?pokemonName=${name}`)}>
          Explore Pokemon
        </button>
      </div>
    </div>
  );
};

export default PokemonCardLayout;
