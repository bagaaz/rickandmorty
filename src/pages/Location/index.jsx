import {useNavigate, useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {locationService} from "../../services/LocationService.js";

function LocationPage() {
    const [data, setData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const fetchLocation = async () => {
        try {
            const response = await locationService.getById(id)

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
            await fetchLocation()
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
                            <h1 className="text-3xl font-bold text-gray-800 mb-2">{data.name}</h1>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="flex items-center">
                                <div className="bg-purple-100 p-2 rounded-full mr-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-purple-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Type</p>
                                    <p className="font-medium text-gray-800">{data.type || "Desconhecido"}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <div className="bg-purple-100 p-2 rounded-full mr-3">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6 text-purple-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Dimension</p>
                                    <p className="font-medium text-gray-800">{data.dimension || "Desconhecida"}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lista de moradores */}
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
                            Residents ({data.residents.length})
                        </h2>

                        {data.residents.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {data.residents.map((resident, i) => {
                                    const residentId = resident.split("/").slice(-1)[0]
                                    return (
                                        <Link
                                            key={i}
                                            to={`/character/${residentId}`}
                                            className="bg-gray-50 hover:bg-purple-50 transition-colors rounded-lg p-4 flex flex-col items-center"
                                        >
                                            <div className="w-16 h-16 rounded-full overflow-hidden mb-2">
                                                <img
                                                    src={`https://rickandmortyapi.com/api/character/avatar/${residentId}.jpeg`}
                                                    alt={`Resident ${residentId}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <span className="text-sm text-center text-gray-700 hover:text-purple-600">
                                            Resident {residentId}
                                          </span>
                                        </Link>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="bg-gray-50 p-8 rounded-lg text-center">
                                <p className="text-gray-500">Nenhum morador encontrado nesta localização.</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}

export default LocationPage;