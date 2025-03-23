import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { charactersService } from './services/CharactersService.js';

vi.mock('./services/CharactersService.js', () => ({
    charactersService: {
        list: vi.fn(),
    },
}));

describe('App Component', () => {
    const mockData = {
        info: { count: 2, pages: 1 },
        results: [
            {
                id: 1,
                name: 'Rick Sanchez',
                status: 'alive',
                image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
                episode: ['episode1', 'episode2'],
                location: { name: 'Earth' },
            },
            {
                id: 2,
                name: 'Morty Smith',
                status: 'alive',
                image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
                episode: ['episode1', 'episode2'],
                location: { name: 'Earth' },
            },
        ],
    };

    beforeEach(() => {
        charactersService.list.mockReset();
    });

    test('deve renderizar os personagens e informações corretamente após a requisição', async () => {
        charactersService.list.mockResolvedValue({
            status: 200,
            data: mockData,
        });

        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        const totalText = await screen.findByRole("heading", {
            level: 3,
            name: /Total characters found:/i,
        });
        expect(totalText).toBeInTheDocument();
        expect(totalText).toHaveTextContent(String(mockData.info.count));

        expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
        expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();

        const paginationElement = screen.getByText((content, node) => {
            const text = node.textContent.replace(/\s+/g, ' ').trim();
            return text === "1 de 1" && node.tagName.toLowerCase() === "span" && node.classList.contains("font-medium");
        });
        expect(paginationElement).toBeInTheDocument();

        expect(charactersService.list).toHaveBeenCalledWith(1, "", "");
    });

    test('ao submeter o formulário, deve resetar a página para 1 e chamar a busca com os filtros', async () => {
        charactersService.list.mockResolvedValue({
            status: 200,
            data: mockData,
        });

        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(charactersService.list).toHaveBeenCalled();
        });

        const nameInput = screen.getByPlaceholderText(/character name\.\.\./i);
        fireEvent.change(nameInput, { target: { value: "Morty" } });

        const submitButton = screen.getByRole("button", { name: /Search/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/Morty Smith/i)).toBeInTheDocument();
        });

        expect(charactersService.list).toHaveBeenCalledWith(1, "Morty", "");
    });
});
