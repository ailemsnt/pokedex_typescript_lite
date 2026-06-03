import { PokemonResumo } from '../models/Pokemon';
import { formatPokemon, msgError } from '../utils/textFormatters';
import { PokemonValidator } from '../validators/PokemonValidator';

const url_base = "https://pokeapi.co/api/v2/pokemon/"

export async function buscarPokemon(nomeOuId: string | number): Promise<PokemonResumo | null> {
  try {
    const validValue = PokemonValidator.validateValue(nomeOuId);

    if (!validValue) {
      console.log(msgError(`Busca por Pokémon *${nomeOuId}* não é válida.`));
      return null;
    } 

    const valorSemZeroEsquerda = typeof nomeOuId === "string" && /^\d+$/.test(nomeOuId) ? Number(nomeOuId) : nomeOuId;
    const response = await fetch(`${url_base}${nomeOuId}`);    
    
    if (!response.ok) {
      console.log(msgError(`Pokémon *${nomeOuId}* não encontrado.`));
      return null;
    }

    //trata status 404

    const dados = PokemonValidator.validateJson(await response.json());   
    
    const pokemon: PokemonResumo = {
      id: dados.id,
      name: dados.name,
      height: dados.height,
      weight: dados.weight,
      types: dados.types,
      stats: dados.stats
    };
    // mapear dados
    return pokemon;

  } catch (erro) {
    console.log(msgError(`Não foi possível buscar o Pokémon *${nomeOuId}*.`));
    return null;
  }
}