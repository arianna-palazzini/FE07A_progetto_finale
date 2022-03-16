import { Cliente } from './cliente';
export interface Fattura {
  id: number;
  data: string;
  numero: number;
  anno: number;
  importo: number;
  stato: {
    id: number;
    nome: string;
  };
  // stato: string;
  cliente: Cliente;
}
