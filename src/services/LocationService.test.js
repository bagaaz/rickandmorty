import { describe, it, expect, vi, beforeEach } from 'vitest';
import { LocationService } from './LocationService.js';

describe('LocationService', () => {
    const mockService = {
        get: vi.fn(),
    };

    const locationService = new LocationService(mockService);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve chamar o método get com a URL correta no getById', async () => {
        const mockResponse = { data: 'mockLocation' };
        mockService.get.mockResolvedValue(mockResponse);

        const id = 1;

        const result = await locationService.getById(id);

        expect(mockService.get).toHaveBeenCalledTimes(1);
        expect(mockService.get).toHaveBeenCalledWith(`location/${id}`);

        expect(result).toEqual(mockResponse);
    });
});
