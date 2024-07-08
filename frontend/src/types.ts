// TODO
export interface Country {
  id: number
  code: string
  name: string
  emoji: string
  continent : Continent
}

export interface Continent {
    id: number
    name: string
    countries : [Country]
  }