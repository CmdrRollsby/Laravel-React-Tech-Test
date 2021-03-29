import React, { useState, useEffect } from 'react';

export function APISearch() {
    const [generation, setGeneration] = useState('1');
    const [generationPokemon, setGenerationPokemon] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setSearchTerm('')
        updateResults()
    }, [generation])

    useEffect(() => {
        setResults(searchTerm ? generationPokemon.filter(pkm => pkm.name.startsWith(searchTerm)) : generationPokemon);
    }, [searchTerm])

    const updateResults = () => {
        fetch (`https://pokeapi.co/api/v2/generation/${generation}/`)
            .then(res => res.json())
            .then(pokemon => {
                const species = pokemon.pokemon_species;
                setGenerationPokemon(species)
                setResults(species)
                setLoading(false);
            })
            .catch(() => setResults([]))
    }

    const handleSearchChange = (event) => {
        const val = event.target.value;
        setSearchTerm(val)
    }

    const handleGenChange = (event) => {
        const gen = event.target.value;
        setGeneration(gen);
    }

    return (
        <div className="container my-3">
            <h1>Pokemon Lookup</h1>
            <p className="lead">
                Hopefully this is what you guys are looking for! I decided to build all the logic into a React component
                as I don't think this case really needs a lot of backend code- it can all be handled in-view 
                asynchronously. All in all, this took me about two hours.
            </p>

            <div className="api-search">
                <div className="form-group">
                    <div className="d-flex justify-content-stretch">
                        <input type="number" title="Generation" 
                            className="form-control-lg mr-1" 
                            min="1" max="7" 
                            value={generation} 
                            onChange={handleGenChange} />

                        <input type="text" title="Search for a Pokemon" 
                            className="form-control-lg w-100"
                            value={searchTerm} 
                            placeholder="Pokemon name"
                            onKeyUp={handleSearchChange} 
                            onChange={handleSearchChange} />
                    </div>
                </div>    
            </div>

            <div className="d-flex justify-content-start flex-wrap w-100 mt-2">
                {
                    results.map((x, k) =>
                        <div className="pokemon m-1" key={k}>
                            <div className="card">
                                <div className="card-body">{ x.name }</div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default APISearch;
