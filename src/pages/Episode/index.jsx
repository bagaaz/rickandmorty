import {useNavigate, useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {episodeService} from "../../services/EpisodeService.js";
import ArrowLeftIcon from "../../assets/icons/left_arrow_icon.svg";
import CharactersIcon from "../../assets/icons/characters_icon.svg";
import CalendarIcon from "../../assets/icons/calendar_icon.svg";
import HashtagIcon from "../../assets/icons/hashtag_icon.svg";

function EpisodePage() {
    const [data, setData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchEpisode = async () => {
        try {
            const response = await episodeService.getById(id);

            if (response.status === 200) {
                setData(response.data)
            }

        } catch (error) {
            console.error(error.message);
            navigate("/404");
        }
    }

    useEffect(() => {
        (async () => {
            await fetchEpisode()
        })()
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl">
            {/* Botão de voltar */}
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
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
                        <div className="border-l-4 border-purple-500 pl-4 mb-6">
                            <h1 className="text-3xl font-bold text-gray-800 mb-1">{data.name}</h1>
                            <div className="text-lg text-purple-600 font-medium">{data.episode}</div>
                        </div>

                        <div className="flex items-center mb-2">
                            <div className="bg-purple-100 p-2 rounded-full mr-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-purple-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <span className="text-gray-700">
                                <span className="font-medium">Air Date:</span> {data.air_date}
                            </span>
                        </div>

                        <div className="flex items-center">
                            <div className="bg-purple-100 p-2 rounded-full mr-3">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-purple-500"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                                    />
                                </svg>
                            </div>
                            <span className="text-gray-700">
                                <span className="font-medium">Episode code:</span> {data.episode}
                            </span>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-6 flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-purple-500 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            Characters ({data.characters.length})
                        </h2>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {data.characters.map((character, i) => {
                                const characterId = character.split("/").slice(-1)[0]
                                return (
                                    <Link
                                        key={i}
                                        to={`/character/${characterId}`}
                                        className="bg-gray-50 hover:bg-purple-50 transition-colors rounded-lg p-4 flex flex-col items-center"
                                    >
                                        <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                                            <img
                                                src={`https://rickandmortyapi.com/api/character/avatar/${characterId}.jpeg`}
                                                alt={`Character ${characterId}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <span className="text-sm text-center text-gray-700">
                                          Character {characterId}
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default EpisodePage;