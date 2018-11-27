import { Orden } from './orden';

export class User {
    $key: string;
    userName: string;
    email: string;
    ordenes?:Orden[];
}
