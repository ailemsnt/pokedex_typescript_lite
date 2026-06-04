import { ValidationError } from '../models/CustomErrors';
import { PokemonResumo } from '../models/Pokemon';
import { msgError, msgWarning } from '../utils/textFormatters';

export class PokemonValidator {
  static validateJson(value: unknown): PokemonResumo | null{
    if (!this.isObject(value)) {
      throw new ValidationError(msgError("Retorno inválido."));      
    }

    if (!("id" in value)) {
      throw new ValidationError(msgError("ID do Pokemón inválido."));      
    }

    if (!("name" in value)) {
      throw new ValidationError(msgError("Nome do Pokemón inválido."));      
    }

    if (!("height" in value)) {
      throw new ValidationError(msgError("Altura do Pokemón inválido."));      
    }

    if (!("weight" in value)) {
      throw new ValidationError(msgError("Peso do Pokemón inválido."));    
    }

    if (!("types" in value)) {
      throw new ValidationError(msgError("Tipo do Pokemón inválido."));      
    }

    if (!Array.isArray(value.types)) {
      throw new ValidationError(msgError("Tipos do Pokémon inválidos."));     
    }

    // if (!("stats" in value)) { // TODO: implementar o validador de stats, para garantir que o formato do retorno da API está correto, e não apenas validar a existência da propriedade
    //   console.log(msgError("Estatísticas do Pokemón inválidas."));
    //   return null;
    // }  
    //   console.log(msgError("Estatísticas do Pokemón inválidas."));
    // }

    return {
      id: Number(value.id), 
      name: String(value.name), 
      height: Number(value.height), 
      weight: Number(value.weight),
      types: "types" in value ? value.types as PokemonResumo["types"] : [],
      stats: "stats" in value ? value.stats as PokemonResumo["stats"] : []
    };    
  }

  static validateValue(nameOrId : string | number): boolean {
    if ((nameOrId === null) || (nameOrId === undefined)){
      throw new ValidationError(msgWarning("ID ou Nome do Pokémon não informado."));     
    }

    if ((typeof nameOrId !== "string") && (typeof nameOrId !== "number")) {
      throw new ValidationError(msgWarning(`ID ou Nome do Pokémon em formato inválido. Valor informado: ${nameOrId}`));      
    }

    if (typeof nameOrId === "number") {
      if (isNaN(nameOrId)) {
        throw new ValidationError(msgWarning(`ID do Pokémon informado inválido. Valor informado: ${nameOrId}`));       
      }

      if (!(Number.isFinite(nameOrId))) {
        throw new ValidationError(msgWarning(`ID do Pokémon não pode ser inifito. Valor informado: ${nameOrId}`));     
      }

      if (!(Number.isInteger(nameOrId))) {
        throw new ValidationError(msgWarning(`ID do Pokémon não pode ser número decimal. Valor informado: ${nameOrId}`));      
      }

      if ((Number(nameOrId) < 1) || (Number(nameOrId) > 100000)){
          throw new ValidationError(msgWarning(`IDs de Pokémons são oficialmente limitados entre 1 a 100000. Valor informado: ${nameOrId}`));                  
      }     
    }
    
    if (typeof nameOrId === "string") {
      if (String(nameOrId).trim() === '') {
          throw new ValidationError(msgWarning("Nome do Pokémon não informado."));        
      }

      if ((String(nameOrId).trim().length < 1) || (String(nameOrId).trim().length > 50)){
          throw new ValidationError(msgWarning(`Oficialmente os nomes de Pokémons não contem tantos caracteres quanto informados. Valor informado: ${nameOrId}`));        
      }

      if (/\s/.test(nameOrId)) {
        throw new ValidationError(msgWarning("Nome não pode conter espaços."));       
      }

      if (!/^[\p{L}-]+$/u.test(String(nameOrId).trim())) {
        throw new ValidationError(msgWarning(`Nomes do Pokémon em formato inválido, não contém letras. Valor informado: ${nameOrId}`));     
      }
    }
    
    return true;
  }

  private static isObject(value: unknown): value is object {
    return typeof value === "object" && value !== null 
  }
}