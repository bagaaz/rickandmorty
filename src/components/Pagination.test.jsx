import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
    test('deve renderizar o número da página e total de páginas corretamente', () => {
        render(
            <Pagination page={3} totalPages={10} onPrevPage={() => {}} onNextPage={() => {}} />
        );

        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("10")).toBeInTheDocument();
    });

    test('o botão "Anterior" deve estar desabilitado se page for 1', () => {
        render(
            <Pagination page={1} totalPages={10} onPrevPage={() => {}} onNextPage={() => {}} />
        );

        const prevButton = screen.getByRole('button', { name: /Anterior/i });
        expect(prevButton).toBeDisabled();
    });

    test('o botão "Anterior" deve estar habilitado se page for maior que 1', () => {
        render(
            <Pagination page={2} totalPages={10} onPrevPage={() => {}} onNextPage={() => {}} />
        );

        const prevButton = screen.getByRole('button', { name: /Anterior/i });
        expect(prevButton).not.toBeDisabled();
    });

    test('o botão "Próxima" deve estar desabilitado se page for igual a totalPages', () => {
        render(
            <Pagination page={10} totalPages={10} onPrevPage={() => {}} onNextPage={() => {}} />
        );

        const nextButton = screen.getByRole('button', { name: /Próxima/i });
        expect(nextButton).toBeDisabled();
    });

    test('o botão "Próxima" deve estar desabilitado se totalPages for 0', () => {
        render(
            <Pagination page={1} totalPages={0} onPrevPage={() => {}} onNextPage={() => {}} />
        );

        const nextButton = screen.getByRole('button', { name: /Próxima/i });
        expect(nextButton).toBeDisabled();
    });

    test('ao clicar no botão "Anterior", onPrevPage deve ser chamado', () => {
        const onPrevPage = vi.fn();
        render(
            <Pagination page={2} totalPages={10} onPrevPage={onPrevPage} onNextPage={() => {}} />
        );

        const prevButton = screen.getByRole('button', { name: /Anterior/i });
        fireEvent.click(prevButton);
        expect(onPrevPage).toHaveBeenCalledTimes(1);
    });

    test('ao clicar no botão "Próxima", onNextPage deve ser chamado', () => {
        const onNextPage = vi.fn();
        render(
            <Pagination page={2} totalPages={10} onPrevPage={() => {}} onNextPage={onNextPage} />
        );

        const nextButton = screen.getByRole('button', { name: /Próxima/i });
        fireEvent.click(nextButton);
        expect(onNextPage).toHaveBeenCalledTimes(1);
    });
});
