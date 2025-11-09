export interface RouteStep {
  name: string;
  time: string;
  description: string;
  maps: string;
}

export interface FoodSuggestions {
  manha?: string;
  almoco?: string;
  tarde?: string;
  jantar?: string;
  noite?: string;
}

export interface Route {
  id: string;
  region: string;
  duration: string;
  vibe: string;
  steps: RouteStep[];
  food_suggestions: FoodSuggestions;
}

export interface DayTrip {
  name: string;
  tempo: string;
  como_chegar: string;
  maps: string;
}

export type Duration = '1h' | '2h' | '3h' | '4h' | 'Dia inteiro';
export type Region = 'Pelourinho' | 'Carmo' | 'Rio Vermelho' | 'Farol da Barra' | 'Cidade Baixa';
export type Vibe = 'Cultural' | 'Gastronomia' | 'Fotos / Instagram' | 'Caminhada leve';
