import { PokemonResumo } from "../models/Pokemon";

export function msgSucess(text: string) : string {
  return `[OK] ${text}`; 
}

export function msgError(text: string) : string {
  return `[ERRO] ${text}`; 
}

export function msgWarning(text: string) : string {
  return `[AVISO] ${text}`; 
}

export function formatPokemon(pokemon: PokemonResumo): string {
  return `#${pokemon.id} - ${formatPokeName(pokemon.name)} | Altura: ${pokemon.height} | Peso: ${pokemon.weight}` ;
  // return `#${pokemon.id} - ${formatPokeName(pokemon.name)} | Tipos: ${pokemon.types.join(", ")} | Altura: ${pokemon.height} | Peso: ${pokemon.weight}` ;
}

export function formatPokeName(name: string) : string {
  return `${name.toUpperCase()}`;
}