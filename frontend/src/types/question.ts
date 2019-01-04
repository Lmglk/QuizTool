import { IOption } from './option';

export interface IQuestion {
    id: number;
    title: string;
    accept?: boolean;
    options: IOption[];
}
