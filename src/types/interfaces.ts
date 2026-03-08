export interface Distancia {
  a_pe: number;
  taxi: number;
  onibus: number;
}

export interface Lugar {
  nome: string;
  endereco: string;
  distancia: Distancia;
  custo_medio: string;
  classificacao_tripadvisor: number;
  descricao: string;
  fotos: string[];
  id?: string;
}

export interface LugaresData {
  [key: string]: Lugar[];
}
