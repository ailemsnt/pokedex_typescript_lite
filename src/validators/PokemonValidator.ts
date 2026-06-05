import { ValidationError } from '../models/CustomErrors';
import { PokemonResumo } from '../models/Pokemon';
import { msgError, msgWarning } from '../utils/textFormatters';

const MAX_POKE_ID = 100000;
const MIN_POKE_ID = 1;
const MAX_NAME_LENGTH = 50; 

function validatePokeName(name: string): boolean {
  const trimmedName = String(name).trim();

  if (trimmedName === "") {
    throw new ValidationError(msgWarning("Nome do Pokémon não informado."));        
  }

  if ((trimmedName.length < MIN_POKE_ID) || (trimmedName.length > MAX_NAME_LENGTH)){
    throw new ValidationError(msgWarning(`Oficialmente os nomes de Pokémons não contem tantos caracteres quanto informados. Valor informado: ${name}`));        
  }

  if (/\s/.test(trimmedName)) {
    throw new ValidationError(msgWarning("Nome não pode conter espaços."));       
  }

  if (!/^[\p{L}-]+$/u.test(trimmedName)) {
    throw new ValidationError(msgWarning(`Nomes do Pokémon em formato inválido, não contém letras. Valor informado: ${name}`));     
  }

  return true;
}

function validatePokeId(id: number): boolean {  
  if (isNaN(id)) {
    throw new ValidationError(msgWarning(`ID do Pokémon informado inválido. Valor informado: ${id}`));       
  }

  if (!(Number.isFinite(id))) {
    throw new ValidationError(msgWarning(`ID do Pokémon não pode ser inifito. Valor informado: ${id}`));     
  }

  if (!(Number.isInteger(id))) {
    throw new ValidationError(msgWarning(`ID do Pokémon não pode ser número decimal. Valor informado: ${id}`));      
  }

  if ((Number(id) < MIN_POKE_ID) || (Number(id) > MAX_POKE_ID)){
    throw new ValidationError(msgWarning(`IDs de Pokémons são oficialmente limitados entre ${MIN_POKE_ID} a ${MAX_POKE_ID}. Valor informado: ${id}`));                  
  }   
  
  return true;
}
export class PokemonValidator {
  static validateJson(value: unknown): PokemonResumo | null{
    if (!this.isObject(value)) {
      throw new ValidationError(msgError("Retorno inválido."));      
    }

    if (!("id" in value)) {
      throw new ValidationError(msgError("ID do Pokemón não encontrado."));      
    }

    if (!("name" in value)) {
      throw new ValidationError(msgError("Nome do Pokemón não encontrado."));      
    }

    if (!("height" in value)) {
      throw new ValidationError(msgError("Altura do Pokemón não encontrada."));      
    }

    if (!("weight" in value)) {
      throw new ValidationError(msgError("Peso do Pokemón não encontrado."));    
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

    switch (typeof nameOrId) {
      case "number":
        return validatePokeId(nameOrId);
      case "string":
        return validatePokeName(nameOrId);
      default:
        throw new ValidationError(msgWarning(`ID ou Nome do Pokémon em formato inválido. Valor informado: ${nameOrId}`));    
    }    
  }

  private static isObject(value: unknown): value is object {
    return typeof value === "object" && value !== null 
  }
}