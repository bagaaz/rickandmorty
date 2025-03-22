import { useNavigate, useParams, Link } from "react-router-dom";
import { charactersService } from "../../services/CharactersService.js";
import { useEffect, useState } from "react";
import ArrowLeftIcon from "../../assets/icons/left_arrow_icon.svg";

function CharacterPage() {
    const [data, setData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchCaracter = async () => {
        try {
            const response = await charactersService.getById(id);

            if (response.status === 200) {
                setData(response.data);
            }
        } catch (error) {
            console.error(error.message);
            navigate("/404");
        }
    };

    useEffect(() => {
        (async () => {
            await fetchCaracter();
        })();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back
                </button>
            </div>

            {data && (
                <>
                    <div className="flex flex-col md:flex-row gap-8 mb-10">
                        <div className="md:w-1/3">
                            <img
                                src={`https://rickandmortyapi.com/api/character/avatar/${id}.jpeg`}
                                alt={data.name}
                                className="w-full rounded-lg shadow-md"
                            />
                        </div>

                        <div className="md:w-2/3">
                            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                                <h1 className="text-3xl font-bold text-gray-700 mb-4">{data.name}</h1>

                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="flex items-center">
                                        <span className="text-gray-500 mr-2">Status:</span>
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.status)}`}>
                                            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
                                        </span>
                                    </div>

                                    <div>
                                        <span className="text-gray-500 mr-2">Specie:</span>
                                        <span className="font-medium">{data.species}</span>
                                    </div>

                                    {data.type && (
                                        <div>
                                            <span className="text-gray-500 mr-2">Type:</span>
                                            <span className="font-medium">{data.type}</span>
                                        </div>
                                    )}

                                    <div>
                                        <span className="text-gray-500 mr-2">Gender:</span>
                                        <span className="font-medium">{data.gender}</span>
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Origin</h2>
                                    {data.origin.url ? (
                                        <Link
                                            to={`/location/${data.origin.url.split("/").slice(-1)}`}
                                            className="text-purple-600 hover:underline"
                                        >
                                            {data.origin.name}
                                        </Link>
                                    ) : (
                                        <span>{data.origin.name.charAt(0).toUpperCase() + data.origin.name.slice(1)}</span>
                                    )}
                                </div>

                                <div>
                                    <h2 className="text-xl font-semibold text-gray-700 mb-2">Location</h2>
                                    {data.location.url ? (
                                        <Link
                                            to={`/location/${data.location.url.split("/").slice(-1)}`}
                                            className="text-purple-600 hover:underline"
                                        >
                                            {data.location.name.charAt(0).toUpperCase() + data.location.name.slice(1)}
                                        </Link>
                                    ) : (
                                        <span>{data.location.name}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Episodes</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                            {data.episode.map((episode, i) => {
                                const episodeNumber = episode.split("/").slice(-1)[0];
                                return (
                                    <Link
                                        key={i}
                                        to={`/episode/${episodeNumber}`}
                                        className="px-3 py-2 rounded-md text-center border border-purple-200 hover:text-purple-600 transition-colors"
                                    >
                                        Episode {episodeNumber}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

function getStatusColor(status) {
    switch (status?.toLowerCase()) {
        case "alive":
            return "bg-green-100 text-green-700";
        case "dead":
            return "bg-red-100 text-red-700";
        default:
            return "bg-green-50 text-green-600"; // Para status "unknown" ou outros
    }
}

export default CharacterPage;