import React from "react";
import {Link} from "react-router-dom";

function CharacterCard({ character }) {
    return (
        <Link
            to={`/character/${character.id}`}
            className="block bg-whitef border border-gray-300 rounded-lg pb-4 text-center hover:shadow-md transition-shadow overflow-hidden"
        >
            <img src={character.image || "/placeholder.svg"} alt={character.name} className="w-full rounded-t-lg mb-3" />
            <h2 className="text-xl font-semibold mb-3 px-3">{character.name}</h2>

            <div className="flex flex-wrap gap-2 justify-center px-2 mb-2">
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(character.status)}`}>
                  {character.status.charAt(0).toUpperCase() + character.status.slice(1)}
                </span>

                <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
                  {character.episode.length} episodes
                </span>

                <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                  {character.location.name}
                </span>
            </div>
        </Link>
    );
}

function getStatusColor(status) {
    switch (status?.toLowerCase()) {
        case "alive":
            return "bg-green-100 text-green-700"
        case "dead":
            return "bg-red-100 text-red-700"
        default:
            return "bg-blue-100 text-blue-700"
    }
}

export default CharacterCard;
