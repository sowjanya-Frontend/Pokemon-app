import React from 'react';
import ReactDOM from 'react-dom';
import { getByTestId, render, screen, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import LoadPokemonCmp from './LoadPokemon';

const mockedSetTodo = jest.fn();

describe("LoadPokemonCmp", () => {

    it('should render LoadPokemonCmp element', () => {
        render(
            <LoadPokemonCmp
                todos={[]}
                setTodos={mockedSetTodo}
            />
        );
        const inputElement = screen.getByPlaceholderText(/Add a new task here.../i);
        expect(inputElement).toBeInTheDocument();
    });


    test("Should render loadPokemon", () => {
        render(<loadPokemonCmp></loadPokemonCmp>);
        const pokemonElem = screen.getByTestId('pokemon-1');
        expert(pokemonElem).toBeInTheDocument();
        expert(pokemonElem).toHaveTextContent("Hi I am Pokemon");
    })

    //to check axios usage
    expect(axios.get).toHaveBeenCalledTimes(1)

    test('test', () => {
        expect(true).toBe(true);
    })
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<LoadPokemonCmp></LoadPokemonCmp>, div);
    })
    //To test the render heading div text
    it("renders pokemon-heading correctly", () => {
        expect(getByTestId("pokemon-heading")).toHaveTextContent("Pokemon Layout");
    })
    //To test teh sort by text
    it("renders pokemon-heading correctly", () => {
        expect(getByTestId("sortby")).toHaveTextContent("Sort by");
    })

})


