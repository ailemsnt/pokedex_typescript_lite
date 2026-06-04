class PokeType {
  constructor(
    public name: string
  ){}
}

export class PokemonTypes {
  constructor(
    public type: PokeType[]
  ) {}
}