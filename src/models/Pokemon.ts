import { PokemonStats } from "./PokemonStats";
import { PokemonTypes } from "./PokemonTypes";
export class PokemonItem {
  constructor(
    public id: number,
    public name: string,
    public height: number,
    public weight: number,
    public types: PokemonTypes[],
    public stats: PokemonStats[]	
  ) {}
}
export class PokemonApiResponse {
  constructor(
    public id: number,
    public name: string, 
    public height: number,
    public weight: number,
    public types: {
      type: {
        name: string,
      }
    }[],
    public stats: {
      base_stat: number;
      stat: {
        name: string;
      }
    }[]
  ) {}
}

export interface PokemonResumo {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    }[];
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    }[];
  }[];
}