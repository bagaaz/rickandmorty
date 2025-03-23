import { vi } from 'vitest';

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedUsedNavigate,
    };
});

vi.mock('../../services/EpisodeService.js', () => ({
    episodeService: {
        getById: vi.fn(),
    },
}));

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import EpisodePage from './index.jsx';
import { episodeService } from '../../services/EpisodeService.js';

describe('EpisodePage', () => {
    const mockEpisode = {
        name: 'Pilot',
        episode: 'S01E01',
        air_date: 'December 2, 2013',
        characters: [
            'https://rickandmortyapi.com/api/character/1',
            'https://rickandmortyapi.com/api/character/2',
        ],
    };

    beforeEach(() => {
        episodeService.getById.mockReset();
        mockedUsedNavigate.mockReset();
    });

    test('deve renderizar os dados do episódio e os personagens corretamente', async () => {
        episodeService.getById.mockResolvedValue({
            status: 200,
            data: mockEpisode,
        });

        render(
            <MemoryRouter initialEntries={['/episode/1']}>
                <Routes>
                    <Route path="/episode/:id" element={<EpisodePage />} />
                </Routes>
            </MemoryRouter>
        );

        const title = await screen.findByRole('heading', { level: 1, name: /Pilot/i });
        expect(title).toBeInTheDocument();

        expect(screen.getByText(/Air Date:/i)).toBeInTheDocument();
        expect(screen.getByText(/December 2, 2013/i)).toBeInTheDocument();

        const episodeCodeElement = screen.getByText((content, node) => {
            const hasText = (node) =>
                node.textContent === `Episode code: ${mockEpisode.episode}`;
            return hasText(node) && node.tagName.toLowerCase() === 'span';
        });
        expect(episodeCodeElement).toBeInTheDocument();

        expect(screen.getByText(/Characters \(2\)/i)).toBeInTheDocument();
        expect(screen.getByAltText('Character 1')).toBeInTheDocument();
        expect(screen.getByAltText('Character 2')).toBeInTheDocument();

        const backButton = screen.getByRole('button', { name: /Back/i });
        fireEvent.click(backButton);
        expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);
    });

    test('deve redirecionar para "/404" se ocorrer um erro na requisição', async () => {
        episodeService.getById.mockRejectedValue(new Error('Not Found'));

        render(
            <MemoryRouter initialEntries={['/episode/1']}>
                <Routes>
                    <Route path="/episode/:id" element={<EpisodePage />} />
                    <Route path="/404" element={<div>404 Not Found</div>} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(mockedUsedNavigate).toHaveBeenCalledWith('/404');
        });
    });
});
