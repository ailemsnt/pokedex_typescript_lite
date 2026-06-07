import { PokemonItem } from "../models/Pokemon";
import { readFile, writeFile } from "node:fs/promises";
import { formatPokeName, msgError, msgSucess } from "../utils/textFormatters";
import { FILE_DATABASE } from "../config/constantes";
import { LocalBoxError, ValidationError } from "../models/CustomErrors";

export async function readPokemonFile(): Promise<PokemonItem[]> {
  try {
    const pokeText = await readFile(FILE_DATABASE, { encoding: "utf-8" });
		if (String(pokeText).trim().length === 0){
			return [];
		}
    return JSON.parse(pokeText);
  } catch (erro) {
    console.log(msgError("Não foi possível ler os dados do arquivo."));
    return [];
  }
}

export async function savePokemonToFile(pokemon: PokemonItem): Promise<boolean> {
	try {
		const pokemons = await readPokemonFile();
		if (!pokemons) {
			await writeFile(FILE_DATABASE, JSON.stringify([pokemon]), {
				encoding: "utf-8",
			});
		}

		const pokemonExists = pokemons.some(
			(pokeFile: PokemonItem) => pokeFile.id === pokemon.id,
		);

		if (pokemonExists) {		
			return false;
		}

		pokemons.push(pokemon);

		await writeFile(FILE_DATABASE, JSON.stringify(pokemons), {
			encoding: "utf-8",
		});

		return true;
	} catch (erro) {		
		console.log("Não foi possível salvar os dados no arquivo: ");
		return false;
	}
}

export async function removePokemonFromFile(id: number): Promise<PokemonItem | null> {
	try {
		const pokemons = await readPokemonFile();

		const pokemonToRemove = pokemons.find((pokemon) => pokemon.id === id);

		if (!pokemonToRemove) {			
			return null;
		}

    const pokemonRemoved = pokemons.filter((pokemon) => pokemon.id !== id);

		await writeFile(FILE_DATABASE, JSON.stringify(pokemonRemoved), {
			encoding: "utf-8",
		});
		return pokemonToRemove;
	} catch {
		console.log("Não foi possível ler os dados do arquivo.");	
		return null;
	}
}
