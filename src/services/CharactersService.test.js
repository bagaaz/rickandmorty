import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CharactersService } from './CharactersService.js';

describe('CharactersService', () => {
    const mockService = {
        get: vi.fn(),
    };

    const charactersService = new CharactersService(mockService);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve chamar o método get com os parâmetros corretos no list', async () => {
        const mockResponse = { data: 'mockData' };
        mockService.get.mockResolvedValue(mockResponse);

        const page = 1;
        const name = 'Rick';
        const status = 'alive';

        const result = await charactersService.list(page, name, status);

        expect(mockService.get).toHaveBeenCalledTimes(1);
        expect(mockService.get).toHaveBeenCalledWith('character', {
            params: { page, name, status },
        });
        expect(result).toBe(mockResponse);
    });

    it('deve chamar o método get com a URL correta no getById', async () => {
        const mockResponse = { data: 'mockCharacter' };
        mockService.get.mockResolvedValue(mockResponse);

        const id = 1;

        const result = await charactersService.getById(id);

        expect(mockService.get).toHaveBeenCalledTimes(1);
        expect(mockService.get).toHaveBeenCalledWith(`character/${id}`);
        expect(result).toBe(mockResponse);
    });
});
