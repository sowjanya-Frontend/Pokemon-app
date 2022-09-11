import React, { useEffect, useRef, useState } from "react";
import { appSetting } from '../../Config/Config';
import PokemonCardLayout from "./PokemonCardLayout";
import './Pokemon.css';

/**
 * @description: To process the load pokemon 
 * @return: load pokemon functionality
 * @param void
 * @author: Sowjanya Kandra
 * @required: LoadPokemon.js
*/

function LoadPokemon() {

    //React hook to handle allpokemon data to hold the current state with allPokemons and setAllPokemons funation to update the state 
    const [allPokemons, setAllPokemons] = useState([]);

    //loadPoke data to hold the current state to get the first 20 records from service with setLoadPoke funation to update the state 
    const [loadPoke, setLoadPoke] = useState(
        appSetting.pokemonServiceUrl + '?limit=20&offset=0'
    );

    //useRef used to does not cause a re-render when updated
    const shouldCall = useRef(true);

    //Used to get all the pokemons
    const getAllPokemons = async () => {
        const res = await fetch(loadPoke);
        const data = await res.json();
        setLoadPoke(data.next);
        function createPokemonObject(result) {
            result.forEach(async (pokemon) => {
                //To fetch the details of the pokemon by the name
                const res = await fetch(
                    appSetting.pokemonServiceUrl + `/${pokemon.name}`
                );
                const data = await res.json();
                //Upated here the state with data from the service response
                setAllPokemons((currentList) => [...currentList, data]);
            });
        }
        createPokemonObject(data.results);
    };

    //The useEffect Hook allows to perform get all pokemons list.
    useEffect(() => {
        if (shouldCall.current) {
            shouldCall.current = false;
            getAllPokemons();
        }
    }, []);
    return (
        <div className="app-container">
            <h1>Pokemon Layout</h1>
            <div className="pokemon-container">
                <div className="all-container">
                    {allPokemons.map((pokemon, index) => (
                        //pokemon card layout component
                        <PokemonCardLayout
                            id={pokemon.id}
                            name={pokemon.name}
                            image=
                            {pokemon.sprites.other.dream_world.front_default}
                            type={pokemon.types[0].type.name}
                            key={index}
                            height={pokemon.height}
                            weight={pokemon.weight}
                        />
                    ))}
                </div>
                <button className="load-more cursor-pointer"
                    onClick={() => getAllPokemons()}>
                    More Pokemons
                </button>
            </div>
        </div>
    );
}
export default LoadPokemon;
