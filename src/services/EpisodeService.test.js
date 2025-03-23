import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EpisodeService } from './EpisodeService.js';

describe('EpisodeService', () => {
    const mockService = {
        get: vi.fn(),
    };

    const episodeService = new EpisodeService(mockService);

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('deve chamar o método get com a URL correta no getById', async () => {
        const mockResponse = { data: 'mockEpisode' };
        mockService.get.mockResolvedValue(mockResponse);

        const id = 1;

        const result = await episodeService.getById(id);

        expect(mockService.get).toHaveBeenCalledTimes(1);
        expect(mockService.get).toHaveBeenCalledWith(`episode/${id}`);

        expect(result).toEqual(mockResponse);
    });
});
