import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CharacterCard from "./CharacterCard";

describe("CharacterCard", () => {
    const characterMock = {
        id: 1,
        image: "https://example.com/rick.png",
        name: "Rick Sanchez",
        status: "alive",
        episode: ["episode1", "episode2"],
        location: { name: "Earth" },
    };

    test("deve renderizar corretamente os elementos do card", () => {
        render(
            <MemoryRouter>
                <CharacterCard character={characterMock} />
            </MemoryRouter>
        );

        const linkElement = screen.getByRole("link");
        expect(linkElement).toHaveAttribute("href", `/character/${characterMock.id}`);

        const imgElement = screen.getByRole("img");
        expect(imgElement).toHaveAttribute("src", characterMock.image);
        expect(imgElement).toHaveAttribute("alt", characterMock.name);

        const nameElement = screen.getByRole("heading", { level: 2 });
        expect(nameElement).toHaveTextContent(characterMock.name);

        const statusElement = screen.getByText(/Alive/i);
        expect(statusElement).toBeInTheDocument();
        expect(statusElement).toHaveClass("bg-green-100");
        expect(statusElement).toHaveClass("text-green-700");

        const episodesElement = screen.getByText(/2 episodes/i);
        expect(episodesElement).toBeInTheDocument();

        const locationElement = screen.getByText(characterMock.location.name);
        expect(locationElement).toBeInTheDocument();
    });
});
