import { PokemonResumo } from '../models/Pokemon';
import { msgError, msgWarning } from '../utils/textFormatters';

export class PokemonValidator {
  static validateJson(value: unknown): PokemonResumo {
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
      //types: value.types.map(
      //   (item: { type: { name: string } }) => item.type.name
      //     ), 
      // types: value.types.map(
      //         (item) => item.type.name),
    };    
  }

  static validateValue(nameOrId : string | number): boolean {
    if (nameOrId === null) {
      console.log(msgWarning("ID ou Nome do Pokémon não informado."));
      return false;
    }

    if ((typeof nameOrId !== "string") && (typeof nameOrId !== "number")) {
      console.log(msgWarning("ID ou Nome do Pokémon em formato inválido."));
      return false;
    }

    

    if (typeof nameOrId === "string") {
      if (String(nameOrId).trim() === '') {
          console.log(msgWarning("Nome do Pokémon não informado."));
          return false;
      }

      if ((String(nameOrId).trim().length < 1) && (String(nameOrId).trim().length > 12)){
          console.log(msgWarning("Nomes de Pokémons são oficialmente limitados de 1 a 12 caracteres."));
          return false;
      }
      
    }

    if (typeof nameOrId === "number") {
      if (isNaN(nameOrId) || (nameOrId < 1)) {
        console.log(msgWarning(`ID do Pokémon informado inválido. Valor informado: ${nameOrId}`));
        return false;
      }
    }
    
    return true;
  }

  private static isObject(value: unknown): value is object {
    return typeof value === "object" && value !== null 
  }


}