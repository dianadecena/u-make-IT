import { Item } from './item';
import { Extra } from './extra';

export interface Orden {
  id?:string;
  productos:Item[];
  p_extras:Extra[];
  correo?:string;
}
