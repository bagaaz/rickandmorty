import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import NotFoundPage from './index.jsx';

const mockedUsedNavigate = vi.fn();

vi.mock('react-router-dom', () => {
    const actual = vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockedUsedNavigate,
    };
});

describe("NotFoundPage", () => {
    beforeEach(() => {
        mockedUsedNavigate.mockClear();
    });

    test('deve renderizar a página 404 com título e mensagem de erro', () => {
        render(<NotFoundPage />);

        expect(screen.getByText(/Página Não Encontrada/i)).toBeInTheDocument();

        expect(
            screen.getByText(/Desculpe, a página que você está procurando não existe ou foi movida para outro endereço/i)
        ).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /Voltar para a página anterior/i })
        ).toBeInTheDocument();
    });

    test('ao clicar no botão, deve chamar navigate com -1', () => {
        render(<NotFoundPage />);

        const backButton = screen.getByRole("button", { name: /Voltar para a página anterior/i });

        fireEvent.click(backButton);

        expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);
    });
});
