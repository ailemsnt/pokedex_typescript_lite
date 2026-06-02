interface PokeType {
  name: string;
}

interface PokemonTypes { 
  type: PokeType;
}

interface PokeStat {
  name: string;
}

interface PokemonStats {
  base_stat: number;
  stat : PokeStat;
}

export interface PokemonResumo {
	id: number;
	name: string;
  height: number;
	weight: number;
	types: PokemonTypes[];
  stats: PokemonStats[];	
};

export interface PokemonApiResponse {
  id: number;
  name: string; 
  height: number;
  weight: number;
  types: {
    type: {
      name: string;
    }
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    }
  }[];
}