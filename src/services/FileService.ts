import { PokemonResumo } from "../models/Pokemon";
import { readFile, writeFile } from "node:fs/promises";
import { formatPokeName } from "../utils/textFormatters";
import { FILE_DATABASE } from "../config/constantes";
import { LocalBoxError, ValidationError } from "../models/CustomErrors";

export function deleteFileDataBase() : void {
	try {
    writeFile(FILE_DATABASE, "");
	} catch (erro){
		if (erro instanceof LocalBoxError) {
			console.log(erro.message);
			return;
		} 	

    console.log("Não foi possível apagar o arquivo de dados.");
	}
}

export async function readPokemonFile(): Promise<PokemonResumo[]> {
  try {
    const pokeText = await readFile(FILE_DATABASE, { encoding: "utf-8" });
    return JSON.parse(pokeText);
  } catch {
    console.log("Não foi possível ler os dados do arquivo.");
    return [];
  }
}

export async function savePokemonToFile(pokemon: PokemonResumo): Promise<void> {
	try {
		const pokemons = await readPokemonFile();

		if (!pokemons) {
			await writeFile(FILE_DATABASE, JSON.stringify([pokemon]), {
				encoding: "utf-8",
			});
		}

		const pokemonExists = pokemons.some(
			(pokeFile: PokemonResumo) => pokeFile.id === pokemon.id,
		);
		if (pokemonExists) {
			console.log(
				`Pokémon informado "${formatPokeName(pokemon.name)}" já existe no catálogo e não será gravado no arquivo.`,
			);
			return;
		}

		pokemons.push(pokemon);

		await writeFile(FILE_DATABASE, JSON.stringify(pokemons), {
			encoding: "utf-8",
		});

		console.log(
			`Pokémon "${pokemon.id}" - "${formatPokeName(pokemon.name) ? pokemon.name : "-Nome não informado-"}" incluído no arquivo com sucesso!`,
		);
	} catch (erro) {
		if (erro instanceof LocalBoxError) {
			console.log(erro.message);
			return;
		} 
		if (erro instanceof ValidationError) {
			console.log(erro.message);
			return;
		} 
		console.log("Não foi possível salvar os dados no arquivo: ", erro);
	}
}

export async function removePokemonFromFile(id: number): Promise<boolean> {
	try {
		const pokemons = await readPokemonFile();

		const pokemonExists = pokemons.some((pokemon) => pokemon.id === id);

		if (!pokemonExists) {			
			return false;
		}

    const pokemonUpdate = pokemons.filter((pokemon) => pokemon.id !== id);

		await writeFile(FILE_DATABASE, JSON.stringify(pokemonUpdate), {
			encoding: "utf-8",
		});

		return true;
	} catch {
		console.log("Não foi possível ler os dados do arquivo.");	
		return false;
	}
}
