import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CharacterCard from "./components/CharacterCard";
import Pagination from "./components/Pagination";
import { charactersService } from "./services/CharactersService.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { filterCharactersSchema } from "./schemas/FilterCharactersSchema.js";

function App() {

    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);

    const filterForm = useForm({
        resolver: yupResolver(filterCharactersSchema),
        defaultValues: {name: "", status: ""},
    });

    const fetchCharacters = filterForm.handleSubmit(async (data) => {
        const response = await charactersService.list(page, data.name, data.status);
        console.log(response);

        if (response.status === 200) {
            setData(response.data)
        }
    })


    const handleNextPage = () => {
        if (page < data?.info.pages) {
            setPage((prev) => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage((prev) => prev - 1);
        }
    };

    useEffect(() => {
        (async () => {
            await fetchCharacters()
        })()
    }, [page]);

    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">Rick and Morty</h1>

            <form
                className="mb-6 flex flex-col md:flex-row items-end gap-3"
                onSubmit={(event) => {
                    setPage(1)
                    fetchCharacters(event)
                }}
            >
                <div className="flex-1">
                    <input
                        id="name"
                        type="text"
                        placeholder="Character name..."
                        {...filterForm.register("name")}
                        className="w-full px-3 py-2 border-b-2 border-purple-500 focus:border-purple-700 outline-none transition-colors bg-transparent"
                    />
                </div>

                <div className="flex-1">
                    <select
                        id="status"
                        {...filterForm.register("status")}
                        className="w-full px-3 py-2 border-b-2 border-purple-500 focus:border-purple-700 outline-none transition-colors bg-transparent appearance-none"
                    >
                        <option value="">All status</option>
                        <option value="alive">Alive</option>
                        <option value="dead">Dead</option>
                        <option value="unknown">Unknown</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="px-5 py-2 bg-transparent text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                >
                    Search
                </button>
            </form>

            {data && (
                <div className="mb-2 p-2 bg-purple-100 rounded-lg">
                    <h3 className="text-sm font-medium text-purple-800">
                        Total characters found: <span className="font-bold">{data.info.count}</span>
                    </h3>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
                {data?.results.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                ))}
            </div>

            {data && (
                <Pagination page={page} totalPages={data.info.pages} onPrevPage={handlePrevPage} onNextPage={handleNextPage} />
            )}
        </div>
    );
}

export default App;
