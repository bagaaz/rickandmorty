import {object, string} from "yup";

export const filterCharactersSchema = object({
    name: string().optional(),
    status: string().optional(),
})