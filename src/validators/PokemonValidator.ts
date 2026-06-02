import { PokemonResumo } from '../models/Pokemon';
import { msgError } from '../utils/textFormatters';

export class PokemonValidator {
  static validate(value: unknown): PokemonResumo {
    if (!this.isObject(value)) {
      throw new Error(msgError("Retorno inválido."));
    }

    if (!("id" in value)) {
      throw new Error(msgError("ID do Pokemón inválido."));
    }

    if (!("name" in value)) {
      throw new Error(msgError("Nome do Pokemón inválido."));
    }

    if (!("height" in value)) {
      throw new Error(msgError("Altura do Pokemón inválido."));
    }

    if (!("weight" in value)) {
      throw new Error(msgError("Peso do Pokemón inválido."));
    }

    // if (!("types" in value)) {
    //   throw new Error(msgError("Tipo do Pokemón inválido."));
    // }

    // if (!("stats" in value)) {
    //   throw new Error(msgError("Estatísticas do Pokemón inválidas."));
    // }

    return {
      id: Number(value.id), 
      name: String(value.name), 
      height: Number(value.height), 
      weight: Number(value.weight)
      // types: value.types.map(
      //   (item: { type: { name: string } }) => item.type.name
      //     ), 
      // types: value.types.map(
      //         (item) => item.type.name),
    };    
  }

  private static isObject(value: unknown): value is object {
    return typeof value === "object" && value !== null 
  }


}