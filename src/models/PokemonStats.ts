class PokeStat {
  constructor(
    public name: string
  ){}
}

export class PokemonStats {
  constructor(
    public base_stat: number,
    public stat: PokeStat[]
  ) {}
}