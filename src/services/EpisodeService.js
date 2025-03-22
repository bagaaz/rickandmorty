import requestService from "./RequestService.js";

export class EpisodeService {
    constructor(service) {
        this.service = service;
    }

    async getById(id) {
        return await this.service.get(`episode/${id}`);
    }
}

export const episodeService = new EpisodeService(requestService);