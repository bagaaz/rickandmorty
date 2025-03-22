import requestService from "./RequestService.js";

export class CharactersService {
    constructor(service) {
        this.service = service;
    }

    async list(page, name, status) {
        return await this.service.get("character", {
            params: {
                page,
                name,
                status
            }
        });
    }

    async getById(id) {
        return await this.service.get(`character/${id}`);
    }
}

export const charactersService = new CharactersService(requestService);