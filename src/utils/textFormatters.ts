import { PokemonItem } from "../models/Pokemon";

export function msgSucess(text: string) : string {
  return `[OK] ${text}`; 
}

export function msgError(text: string) : string {
  return `[ERRO] ${text}`; 
}

export function msgWarning(text: string) : string {
  return `[AVISO] ${text}`; 
}

export function formatPokemon(pokemon: PokemonItem): string {
  const types = pokemon.types.map((type) => type.type.name).join(","); 

  return `#${pokemon.id} - ${formatPokeName(pokemon.name)} | Tipos: ${types} | Altura: ${pokemon.height} | Peso: ${pokemon.weight}` ;
}

export function formatPokeName(name: string) : string {
  return `${name.toUpperCase()}`;
}