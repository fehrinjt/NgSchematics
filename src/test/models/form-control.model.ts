import { Validation } from "./validation.model";

export interface FormControl {
    name: string;
    label: string;
    type: string;
    validation: Validation
}