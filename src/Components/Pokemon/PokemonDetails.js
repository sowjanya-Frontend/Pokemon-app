import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { appSetting } from '../../Config/Config';

/**
 * @description: To display the pokemon details page
 * @return: Pokemon details page
 * @param void
 * @author: Sowjanya Kandra
 * @required: PokemonDetails.js
*/
function PokemonDetails() {
    const navigate = useNavigate();

    //React hook to handle allpokemon data to hold the current state with allPokemons and setAllPokemons funation to update the state
    const [pokemonDetail, setPokemonDetails] = useState([]);

    //React useLocation hook returns the location object that represents the current URL
    const { search } = useLocation();
    const match = search.match(/pokemonName=(.*)/);
    const pokeName = match?.[1];

    const getPokemonDetails = async (pokeName) => {
        //To fetch the details of the pokemon by the name
        const resp = await fetch(
            appSetting.pokemonServiceUrl + `/${pokeName}`
        );
        const pokemonDetailsData = await resp.json();

        setPokemonDetails(pokemonDetailsData);
    };

    useEffect(() => {
        getPokemonDetails(pokeName);
    }, []);

    return (
        (pokemonDetail !== null && pokemonDetail.id !== undefined) ?
            <div className="desc">
                <div className="pokemon-img-container card-container`${pokemonDetail?.types.type.name}`">
                    <div id={pokemonDetail.id}>
                        <img src={pokemonDetail?.sprites?.other?.dream_world?.front_default} alt={pokemonDetail.name} />
                    </div>
                </div>
                <div className="pokemon-desc-container">
                    <div className="pokemonName_Details">
                        {pokemonDetail?.name}
                    </div>
                    <div className="desc-main-div">
                        <div className="characteristics">
                            <h3>Characteristics</h3>
                            {
                                pokemonDetail.stats?.map((item, index) => (
                                    <div>
                                        <span>{item.stat?.name}</span> : <span>{item.base_stat}</span>
                                    </div>

                                ))
                            }
                        </div>
                        <div className="abilities">
                            <h3>Abilities</h3>
                            {
                                pokemonDetail.abilities?.map((item, index) => (
                                    <div>
                                        <span>{item.ability?.name}</span>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <button className="load-more cursor-pointer" onClick={() => navigate("/")}>
                        Go Back
                    </button>
                </div>

            </div>
            :
            <div>
                Loading...
            </div>
    )
};
export default PokemonDetails;