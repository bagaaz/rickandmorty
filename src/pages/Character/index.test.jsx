import { vi } from 'vitest';

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedUsedNavigate,
    };
});

vi.mock('../../services/CharactersService.js', () => ({
    charactersService: {
        getById: vi.fn(),
    },
}));

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CharacterPage from './index.jsx';
import { charactersService } from '../../services/CharactersService.js';

describe('CharacterPage', () => {
    const mockCharacter = {
        name: 'Rick Sanchez',
        status: 'alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
            name: 'Earth',
            url: 'https://rickandmortyapi.com/api/location/1'
        },
        location: {
            name: 'Citadel of Ricks',
            url: 'https://rickandmortyapi.com/api/location/3'
        },
        episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2'
        ],
    };

    beforeEach(() => {
        charactersService.getById.mockReset();
        mockedUsedNavigate.mockReset();
    });

    test('deve renderizar os dados do personagem e os episódios corretamente', async () => {
        charactersService.getById.mockResolvedValue({
            status: 200,
            data: mockCharacter,
        });

        render(
            <MemoryRouter initialEntries={['/character/1']}>
                <Routes>
                    <Route path="/character/:id" element={<CharacterPage />} />
                </Routes>
            </MemoryRouter>
        );

        const nameHeading = await screen.findByRole('heading', { level: 1, name: /Rick Sanchez/i });
        expect(nameHeading).toBeInTheDocument();

        const image = screen.getByRole('img', { name: /Rick Sanchez/i });
        expect(image).toHaveAttribute('src', 'https://rickandmortyapi.com/api/character/avatar/1.jpeg');

        expect(screen.getByText(/Alive/i)).toBeInTheDocument();

        expect(screen.getByText(/Specie:/i)).toBeInTheDocument();
        expect(screen.getByText(/Human/i)).toBeInTheDocument();
        expect(screen.getByText(/Gender:/i)).toBeInTheDocument();
        expect(screen.getByText(/Male/i)).toBeInTheDocument();

        const originLink = screen.getByRole('link', { name: /Earth/i });
        expect(originLink).toHaveAttribute('href', '/location/1');

        const locationLink = screen.getByRole('link', { name: /Citadel of Ricks/i });
        expect(locationLink).toHaveAttribute('href', '/location/3');

        expect(screen.getByText(/Episode 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Episode 2/i)).toBeInTheDocument();

        const backButton = screen.getByRole('button', { name: /Back/i });
        fireEvent.click(backButton);
        expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);
    });

    test('deve redirecionar para "/404" se ocorrer um erro na requisição', async () => {
        charactersService.getById.mockRejectedValue(new Error('Not Found'));

        render(
            <MemoryRouter initialEntries={['/character/1']}>
                <Routes>
                    <Route path="/character/:id" element={<CharacterPage />} />
                    <Route path="/404" element={<div>404 Not Found</div>} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(mockedUsedNavigate).toHaveBeenCalledWith('/404');
        });
    });
});