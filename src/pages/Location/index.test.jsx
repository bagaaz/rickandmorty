// Defina os mocks antes de qualquer importação que dependa deles.
import { vi } from 'vitest';

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedUsedNavigate,
    };
});

vi.mock('../../services/LocationService.js', () => ({
    locationService: {
        getById: vi.fn(),
    },
}));

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import LocationPage from './index.jsx';
import { locationService } from '../../services/LocationService.js';

describe('LocationPage', () => {
    const mockLocation = {
        name: 'Earth',
        type: 'Planet',
        dimension: 'Dimension C-137',
        residents: [
            'https://rickandmortyapi.com/api/character/1',
            'https://rickandmortyapi.com/api/character/2',
        ],
    };

    beforeEach(() => {
        locationService.getById.mockReset();
        mockedUsedNavigate.mockReset();
    });

    test('deve renderizar os dados da localização e os residentes corretamente', async () => {
        locationService.getById.mockResolvedValue({
            status: 200,
            data: mockLocation,
        });

        render(
            <MemoryRouter initialEntries={['/location/1']}>
                <Routes>
                    <Route path="/location/:id" element={<LocationPage />} />
                </Routes>
            </MemoryRouter>
        );

        const locationHeading = await screen.findByRole('heading', { level: 1, name: /Earth/i });
        expect(locationHeading).toBeInTheDocument();

        expect(screen.getByText(/Planet/i)).toBeInTheDocument();
        expect(screen.getByText(/Dimension C-137/i)).toBeInTheDocument();

        expect(screen.getByText(/Residents \(2\)/i)).toBeInTheDocument();
        expect(screen.getByAltText('Resident 1')).toBeInTheDocument();
        expect(screen.getByAltText('Resident 2')).toBeInTheDocument();

        const backButton = screen.getByRole('button', { name: /Back/i });
        fireEvent.click(backButton);
        expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);
    });

    test('deve redirecionar para "/404" se ocorrer um erro na requisição', async () => {
        locationService.getById.mockRejectedValue(new Error('Not Found'));

        render(
            <MemoryRouter initialEntries={['/location/1']}>
                <Routes>
                    <Route path="/location/:id" element={<LocationPage />} />
                    <Route path="/404" element={<div>404 Not Found</div>} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(mockedUsedNavigate).toHaveBeenCalledWith('/404');
        });
    });
});
