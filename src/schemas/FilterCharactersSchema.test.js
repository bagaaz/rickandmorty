import { describe, it, expect } from 'vitest';
import { filterCharactersSchema } from './FilterCharactersSchema.js';

describe('filterCharactersSchema', () => {
    it('deve validar um objeto vazio', async () => {
        const validData = {};
        await expect(filterCharactersSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('deve validar um objeto com valores válidos', async () => {
        const validData = { name: 'Rick', status: 'alive' };
        await expect(filterCharactersSchema.validate(validData)).resolves.toEqual(validData);
    });

    it('deve converter valores não-string para string', async () => {
        const inputData = { name: 123, status: true };
        const expected = { name: "123", status: "true" };
        await expect(filterCharactersSchema.validate(inputData)).resolves.toEqual(expected);
    });
});
