export interface Country {
  name: Name
  tld: string[]
  cca2: string
  ccn3: string
  cca3: string
  independent: boolean
  status: string
  unMember: boolean
  currencies: Currencies
  idd: Idd
  capital: string[]
  altSpellings: string[]
  region: string
  subregion: string
  languages: Languages
  translations: Translations
  latlng: number[]
  landlocked: boolean
  area: number
  demonyms: Demonyms
  flag: string
  maps: Maps
  population: number
  fifa: string
  car: Car
  timezones: string[]
  continents: string[]
  flags: Flags
  coatOfArms: CoatOfArms
  startOfWeek: string
  capitalInfo: CapitalInfo
  postalCode: PostalCode
  borders: Array<string>
}

export interface Name {
  common: string
  official: string
  nativeName: NativeName
}

export interface NativeName {
  [key: string]: NativeNameObject
}

export interface NativeNameObject {
  official: string
  common: string
}

export interface Currencies {
  [key: string]: Currency
}

export interface Currency {
  name: string
  symbol: string
}

export interface Idd {
  root: string
  suffixes: string[]
}

export interface Languages {
  [key: string]: string
}

export interface Translations {
  [key: string]: Translation
}

export interface Translation {
  official: string
  common: string
}

export interface Demonyms {
  [key: string]: Demonym
}

export interface Demonym {
  f: string
  m: string
}

export interface Maps {
  googleMaps: string
  openStreetMaps: string
}

export interface Car {
  signs: string[]
  side: string
}

export interface Flags {
  png: string
  svg: string
}

export interface CoatOfArms {}

export interface CapitalInfo {
  latlng: number[]
}

export interface PostalCode {
  format: string
  regex: string
}
