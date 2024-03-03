import { TipsFetchQueryInterface } from '../../interfaces/tips.interface';

export interface TipsFetchRequestInterface extends TipsFetchQueryInterface {
  endpoint?: string;
  params?: any;
  token?: string;
  headers?: any;
}
