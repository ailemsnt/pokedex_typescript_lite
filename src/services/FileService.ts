import { PokemonResumo } from "../models/Pokemon";
import { readFile, writeFile } from "node:fs/promises";
import { formatPokeName } from "../utils/textFormatters";

const URL_DATABASE = `./database.json`;

async function readPokeFile(): Promise<PokemonResumo[]> {
  try {
    const pokeText = await readFile(URL_DATABASE, { encoding: "utf-8" });
    return JSON.parse(pokeText);
  } catch {
    console.log("Não foi possível ler os dados do arquivo.");
    return [];
  }
}

export async function savePokeFile(pokemon: PokemonResumo): Promise<void> {
	try {
  const pokemons = await readPokeFile();

  if (!pokemons) {
    await writeFile(URL_DATABASE, JSON.stringify([pokemon]), {
      encoding: "utf-8",
    });
  }

  const pokemonExists = pokemons.some(
    (pokeFile: PokemonResumo) => pokeFile.id === pokemon.id,
  );
  if (pokemonExists) {
    console.log(
      `Pokémon informado "${formatPokeName(pokemon.name)}" já existe e não será gravado no arquivo.`,
    );
    return;
  }

  pokemons.push(pokemon);

  await writeFile(URL_DATABASE, JSON.stringify(pokemons), {
    encoding: "utf-8",
  });

  console.log(
    `Pokémon "${pokemon.id}" - "${formatPokeName(pokemon.name) ? pokemon.name : "-Nome não informado-"}" incluído no arquivo com sucesso!`,
  );
	} catch (erro) {
		console.log("Não foi possível salvar os dados no arquivo.");
	}
}
