export type TCountries = {
  name: {
    common: string;
  };
  cioc: string;
  region: string;
  languages: TLanguages;
  population: number;
  fifa: string;
  flags: {
    png: string;
  };
  currencies: {
    [code: string]: TCurrency;
  };
};

type TCurrency = {
  name: string;
  symbol: string;
};

type TLanguages = {
  [code: string]: string;
};
