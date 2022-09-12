import React, { useEffect, useRef, useState } from "react";
import { appSetting } from '../../Config/Config';
import PokemonCardLayout from "./PokemonCardLayout";
import "antd/dist/antd.css";
import { Pagination } from 'antd';

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

    //TO handle the serach functionalty, the current state with searchInput and setSearchInput funation to update the state
    const [searchInput, setSearchInput] = useState('');

    //TO handle the filter functionalty, the current state with filterParam and setFilterParam funation to update the state
    const [filterParam, setFilterParam] = useState(["All"]);

    //TO holded the properties to be filtered
    const [searchParam] = useState(["name", "weight", "height"]);

    //Datsource for the pokemons filter dropdown
    const [filterDrpItems] = React.useState([
        { key: "All", value: "All" },
        { key: "name", value: "name" },
        { key: "weight", value: "weight" },
        { key: "height", value: "height" },
    ]);

    //FIlter functionality with serach and with search value
    function search(items) {
        return items.filter((item) => {
            if (item.hasOwnProperty(filterParam)) {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(searchInput.toLowerCase()) > -1
                    );
                });
            } else if (filterParam == "All") {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(searchInput.toLowerCase()) > -1
                    );
                });
            }
        });
    }

    //Pagination cards per page dropdown related react hooks with current value in cardsPerPage and state changing function setcardsPerPage
    const [total, setTotal] = useState("");
    const [page, setPage] = useState(1);

    //Pagination related react hooks with current value in currentPage and state changing function setCurrentPage
    const [postPerPage, setPostPerPage] = useState(5);

    //Pagination related calculations
    const lastPostIndex = page + postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    const currentPosts = allPokemons.slice(firstPostIndex, lastPostIndex);

    //useRef used to does not cause a re-render when updated
    const shouldCall = useRef(true);

    //Search functionality @input searchValue @return filltered allPokemons data
    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        allPokemons.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
        })
    }

    //Sort functionality @input sortValue @return sorted allPokemons list view
    const sortItems = (sortValue) => {
        setFilterParam(sortValue)
        if (sortValue === 'name') {
            allPokemons.sort(function (param1, param2) {
                if (param1.name < param2.name) { return -1; }
                if (param1.name > param2.name) { return 1; }
                return 0;
            })
        }
        else if (sortValue === 'weight') {
            allPokemons.sort(function (param1, param2) {
                if (param1.weight < param2.weight) { return -1; }
                if (param1.weight > param2.weight) { return 1; }
                return 0;
            })
        }
        else if (sortValue === 'height') {
            allPokemons.sort(function (param1, param2) {
                if (param1.height < param2.height) { return -1; }
                if (param1.height > param2.height) { return 1; }
                return 0;
            })
        }

    }

    //Used to get all the pokemons
    const getAllPokemons = async () => {
        const res = await fetch(loadPoke);
        const data = await res.json();
        setLoadPoke(data.next);
        setTotal((currentList) => [...currentList, data.next.length]);
        function createPokemonObject(result) {
            result.forEach(async (pokemon) => {
                //To fetch the details of the pokemon by the name
                const resp = await fetch(
                    appSetting.pokemonServiceUrl + `/${pokemon.name}`
                );
                const data = await resp.json();
                //Upated here the state with data from the service response
                setAllPokemons((currentList) => [...currentList, data]);
            });
        }
        createPokemonObject(data.results);
    };

    const onShowSizeChange = (current, pageSize) => {
        setPostPerPage(pageSize);
    }


    //The useEffect Hook allows to perform get all pokemons list.
    useEffect(() => {
        if (shouldCall.current) {
            shouldCall.current = false;
            getAllPokemons();
        }
    }, []);

    return (
        <div className="app-container">
            <h1 id="pokemon-heading">Pokemon Layout</h1>
            <div className="pokemon-container">
                <div className="pokemon-toolbar">
                    <div className="form-group pokemon-search">
                        <span className="fa fa-search form-control-feedback">
                        </span>
                        <input type="text" className="form-control"
                            onChange={(e) => searchItems(e.target.value)}
                            placeholder="Search" />
                    </div>
                    <div className="filter-pokemon">
                        <span className="sortby">Sort by</span>
                        <select
                            onChange={(e) => sortItems(e.target.value)}
                            className="custom-select"
                            aria-label="Filter Pokemons by properties">
                            {filterDrpItems.map((item, index) => (
                                <option key={index} value={item.key}>{item.value}</option>
                            ))}
                        </select>
                        <span className="focus"></span>
                    </div>
                </div>
                <div className="all-container">
                    {
                        search(currentPosts).map((pokemon, index) => (
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

                        ))
                    }
                </div>
                <Pagination
                    pageSize={postPerPage}
                    total={total}
                    current={page}
                    onChange={(value) => setPage(value)}
                    pageSizeOptions={[5, 10, 20, 50]}
                    onShowSizeChange={onShowSizeChange}
                    showSizeChanger
                    itemRender={(page, type) => {
                        if (type === "next") {
                            return <a>NEXT</a>;
                        }
                        else if (type === "prev") {
                            return <a>PREV</a>;
                        }
                        if (type === "page") {
                            return <a>{page}</a>;
                        }
                    }
                    }
                />
            </div>
        </div >
    );
}
export default LoadPokemon;