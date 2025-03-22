import requestService from "./RequestService.js";

export class LocationService {
    constructor(service) {
        this.service = service;
    }

    async getById(id) {
        return await this.service.get(`location/${id}`);
    }
}

export const locationService = new LocationService(requestService);