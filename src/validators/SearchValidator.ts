import { LocalBoxError, ValidationError } from "../models/CustomErrors";

const MAX_POKE_ID = 100000;
const MIN_POKE_ID = 1;
const MIN_NAME_LENGTH = 3; 
const MAX_NAME_LENGTH = 50; 

export class SearchValidator {
  static validateValue(nameOrId : string | number): boolean {
    if ((nameOrId === null) || (nameOrId === undefined)){
      throw new ValidationError("ID ou Nome do Pokémon não informado.");     
    }

    switch (typeof nameOrId) {
      case "number":
        return this.validatePokeId(nameOrId);
      case "string":
        return this.validatePokeName(nameOrId);
      default:
        throw new ValidationError(`ID ou Nome do Pokémon em formato inválido. Valor informado: ${nameOrId}`);    
    }    
  }
  
  private static validatePokeName(name: string): boolean {
    const StringName = String(name);
    const trimmedName = StringName.trim();

    if (StringName.trim() === "") {
      throw new ValidationError("Nome do Pokémon não informado.");        
    }

    if ((trimmedName.length < MIN_NAME_LENGTH) || (trimmedName.length > MAX_NAME_LENGTH)){
      throw new ValidationError(`Oficialmente os nomes de Pokémons contem entre ${MIN_NAME_LENGTH} e ${MAX_NAME_LENGTH} caracteres. Valor informado: ${name}`);        
    }

    if (/\s/.test(StringName)) {
      throw new ValidationError("Nome não pode conter espaços.");       
    }

    if (/[^a-z0-9-]/i.test(StringName)) {
      throw new ValidationError(`A busca do Pokémon contém caracteres inválidos. Utilize apenas letras, números ou hífen (-). Valor informado: ${name}`);     
    }

    return true;
  }

  private static validatePokeId(id: number): boolean {  
    if (isNaN(id)) {
      throw new ValidationError(`ID do Pokémon informado inválido. Não é um número.`);       
    }

    if (!(Number.isFinite(id))) {
      throw new ValidationError(`ID do Pokémon não pode ser inifito. Valor informado: ${id}`);     
    }

    if (!(Number.isInteger(id))) {
      throw new ValidationError(`ID do Pokémon não pode ser número decimal. Valor informado: ${id}`);      
    }

    if ((Number(id) < MIN_POKE_ID) || (Number(id) > MAX_POKE_ID)){
      throw new ValidationError(`IDs de Pokémons são oficialmente limitados entre ${MIN_POKE_ID} a ${MAX_POKE_ID}. Valor informado: ${id}`);                  
    }   
    
    return true;
  }  
}