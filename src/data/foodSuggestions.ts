import type { FoodSuggestion } from '../types/multiday';

// Sugestões de alimentação por região e período

export const foodSuggestionsDatabase = {
  Pelourinho: {
    breakfast: [
      {
        type: 'breakfast' as const,
        placeName: 'Cafelia',
        description: 'Tapiocas recheadas e café colonial completo',
        cuisine: 'Brasileira/Regional',
        priceRange: 'R$ 25-40',
        mapsLink: 'https://maps.app.goo.gl/cafelia',
        specialties: ['Tapioca de carne seca', 'Café regional', 'Suco de frutas tropicais'],
      },
      {
        type: 'breakfast' as const,
        placeName: 'Café Alquimia',
        description: 'Café especial e pães artesanais',
        cuisine: 'Cafeteria',
        priceRange: 'R$ 20-35',
        mapsLink: 'https://maps.app.goo.gl/alquimia',
        specialties: ['Café coado na hora', 'Bolo de tapioca', 'Pão na chapa'],
      },
    ],
    lunch: [
      {
        type: 'lunch' as const,
        placeName: 'Restaurante do SENAC',
        description: 'Comida baiana tradicional e autêntica',
        cuisine: 'Baiana',
        priceRange: 'R$ 45-70',
        mapsLink: 'https://maps.app.goo.gl/senac',
        specialties: ['Moqueca', 'Bobó de camarão', 'Vatapá'],
      },
      {
        type: 'lunch' as const,
        placeName: 'Maria Mata Mouro',
        description: 'Restaurante com vista incrível',
        cuisine: 'Baiana/Contemporânea',
        priceRange: 'R$ 60-90',
        mapsLink: 'https://maps.app.goo.gl/maria-mata-mouro',
        specialties: ['Camarão na moranga', 'Risoto de polvo', 'Vista panorâmica'],
      },
    ],
    dinner: [
      {
        type: 'dinner' as const,
        placeName: 'Bar do Carmo',
        description: 'Vista panorâmica + música ao vivo',
        cuisine: 'Contemporânea',
        priceRange: 'R$ 60-100',
        mapsLink: 'https://maps.app.goo.gl/bar-carmo',
        specialties: ['Petiscos variados', 'Drinks autorais', 'Música ao vivo'],
      },
    ],
    snack: [
      {
        type: 'snack' as const,
        placeName: 'Sorveteria da Ribeira',
        description: 'Sorvetes artesanais com sabores regionais',
        cuisine: 'Sorveteria',
        priceRange: 'R$ 15-25',
        mapsLink: 'https://maps.app.goo.gl/sorveteria-ribeira',
        specialties: ['Sorvete de tapioca', 'Cupuaçu', 'Graviola'],
      },
    ],
  },

  'Rio Vermelho': {
    breakfast: [
      {
        type: 'breakfast' as const,
        placeName: 'Café com Arte',
        description: 'Café da manhã à beira-mar',
        cuisine: 'Cafeteria',
        priceRange: 'R$ 30-45',
        mapsLink: 'https://maps.app.goo.gl/cafe-arte',
        specialties: ['Vista pro mar', 'Açaí na tigela', 'Omelete caprichado'],
      },
    ],
    lunch: [
      {
        type: 'lunch' as const,
        placeName: 'Mercado do Peixe',
        description: 'Frutos do mar fresquíssimos preparados na hora',
        cuisine: 'Frutos do mar',
        priceRange: 'R$ 50-80',
        mapsLink: 'https://maps.app.goo.gl/mercado-peixe',
        specialties: ['Moqueca preparada na hora', 'Camarão grelhado', 'Casquinha de siri'],
      },
      {
        type: 'lunch' as const,
        placeName: 'Paraíso Tropical',
        description: 'Buffet à quilo com opções baianas',
        cuisine: 'Buffet/Baiana',
        priceRange: 'R$ 40-60',
        mapsLink: 'https://maps.app.goo.gl/paraiso-tropical',
        specialties: ['Grande variedade', 'Vista pro mar', 'Ar-condicionado'],
      },
    ],
    dinner: [
      {
        type: 'dinner' as const,
        placeName: 'Boteco do França',
        description: 'Petiscos e cerveja gelada em ambiente descontraído',
        cuisine: 'Boteco/Brasileira',
        priceRange: 'R$ 50-90',
        mapsLink: 'https://maps.app.goo.gl/boteco-franca',
        specialties: ['Bolinhos de bacalhau', 'Fritas', 'Chopp gelado'],
      },
      {
        type: 'dinner' as const,
        placeName: 'Caranguejo do Faustino',
        description: 'Especializado em caranguejo',
        cuisine: 'Frutos do mar',
        priceRange: 'R$ 80-120',
        mapsLink: 'https://maps.app.goo.gl/caranguejo-faustino',
        specialties: ['Caranguejo inteiro', 'Casquinha', 'Molhos especiais'],
      },
    ],
    snack: [
      {
        type: 'snack' as const,
        placeName: 'Acarajé da Dinha',
        description: 'O acarajé mais famoso de Salvador',
        cuisine: 'Comida de rua/Baiana',
        priceRange: 'R$ 15-25',
        mapsLink: 'https://maps.app.goo.gl/acaraje-dinha',
        specialties: ['Acarajé recheado', 'Abará', 'Vatapá caseiro'],
      },
      {
        type: 'snack' as const,
        placeName: 'Sorbeteria da Ribeira',
        description: 'Sorvetes artesanais',
        cuisine: 'Sorveteria',
        priceRange: 'R$ 12-20',
        mapsLink: 'https://maps.app.goo.gl/sorbeteria',
        specialties: ['Frutas tropicais', 'Açaí', 'Sorvetes veganos'],
      },
    ],
  },

  'Farol da Barra': {
    breakfast: [
      {
        type: 'breakfast' as const,
        placeName: 'Padaria Pão Dourado',
        description: 'Padaria tradicional à beira-mar',
        cuisine: 'Padaria',
        priceRange: 'R$ 20-35',
        mapsLink: 'https://maps.app.goo.gl/pao-dourado',
        specialties: ['Pão francês quentinho', 'Tapioca', 'Suco natural'],
      },
    ],
    lunch: [
      {
        type: 'lunch' as const,
        placeName: 'Paraíso Tropical',
        description: 'Restaurante com vista para o mar',
        cuisine: 'Baiana/Frutos do mar',
        priceRange: 'R$ 55-85',
        mapsLink: 'https://maps.app.goo.gl/paraiso',
        specialties: ['Moqueca', 'Vista espetacular', 'Ar-condicionado'],
      },
      {
        type: 'lunch' as const,
        placeName: 'Caranguejo do Faustino',
        description: 'Frente para o mar com especialidade em caranguejo',
        cuisine: 'Frutos do mar',
        priceRange: 'R$ 70-110',
        mapsLink: 'https://maps.app.goo.gl/faustino-barra',
        specialties: ['Caranguejo', 'Casquinha de siri', 'Peixe grelhado'],
      },
    ],
    dinner: [
      {
        type: 'dinner' as const,
        placeName: 'Soho Salvador',
        description: 'Restaurante contemporâneo com drinks',
        cuisine: 'Contemporânea',
        priceRange: 'R$ 80-130',
        mapsLink: 'https://maps.app.goo.gl/soho',
        specialties: ['Drinks autorais', 'Música ao vivo', 'Ambiente sofisticado'],
      },
    ],
    snack: [
      {
        type: 'snack' as const,
        placeName: 'Sorvete Cubano',
        description: 'Sorveteria tradicional de Salvador',
        cuisine: 'Sorveteria',
        priceRange: 'R$ 10-18',
        mapsLink: 'https://maps.app.goo.gl/cubano',
        specialties: ['Tradicional há décadas', 'Sabores clássicos', 'Casquinha crocante'],
      },
    ],
  },

  'Cidade Baixa': {
    lunch: [
      {
        type: 'lunch' as const,
        placeName: 'Restaurante Maria de São Pedro',
        description: 'Comida baiana caseira',
        cuisine: 'Baiana',
        priceRange: 'R$ 35-55',
        mapsLink: 'https://maps.app.goo.gl/maria-sp',
        specialties: ['Comida caseira', 'Preço justo', 'Porções generosas'],
      },
    ],
    snack: [
      {
        type: 'snack' as const,
        placeName: 'Casa da Tereza',
        description: 'Tapiocas e café regional',
        cuisine: 'Cafeteria',
        priceRange: 'R$ 15-28',
        mapsLink: 'https://maps.app.goo.gl/tereza',
        specialties: ['Tapioca recheada', 'Café regional', 'Bolos caseiros'],
      },
    ],
  },

  Carmo: {
    breakfast: [
      {
        type: 'breakfast' as const,
        placeName: 'Café Alquimia',
        description: 'Café especial em ambiente tranquilo',
        cuisine: 'Cafeteria',
        priceRange: 'R$ 22-38',
        mapsLink: 'https://maps.app.goo.gl/alquimia-carmo',
        specialties: ['Café especial', 'Brunch aos fins de semana', 'Ambiente agradável'],
      },
    ],
    lunch: [
      {
        type: 'lunch' as const,
        placeName: 'Restaurante do Carmo',
        description: 'Comida tradicional baiana',
        cuisine: 'Baiana',
        priceRange: 'R$ 40-65',
        mapsLink: 'https://maps.app.goo.gl/rest-carmo',
        specialties: ['Feijoada (sábados)', 'Moqueca', 'Ambiente familiar'],
      },
    ],
    dinner: [
      {
        type: 'dinner' as const,
        placeName: 'Bar do Carmo',
        description: 'Vista incrível + ambiente descontraído',
        cuisine: 'Contemporânea',
        priceRange: 'R$ 55-95',
        mapsLink: 'https://maps.app.goo.gl/bar-carmo-dinner',
        specialties: ['Vista panorâmica', 'Petiscos', 'Música ao vivo eventual'],
      },
    ],
  },
};

// Função helper para buscar sugestões de comida
export function getFoodSuggestion(
  region: string,
  mealType: FoodSuggestion['type']
): FoodSuggestion | null {
  const regionSuggestions = foodSuggestionsDatabase[region as keyof typeof foodSuggestionsDatabase];
  if (!regionSuggestions) return null;

  const suggestions = regionSuggestions[mealType as keyof typeof regionSuggestions];
  if (!suggestions || suggestions.length === 0) return null;

  // Retorna aleatoriamente uma das opções disponíveis
  return suggestions[Math.floor(Math.random() * suggestions.length)];
}

// Função para pegar sugestão baseada no horário
export function getFoodSuggestionByTime(region: string, hour: number): FoodSuggestion | null {
  let mealType: FoodSuggestion['type'];

  if (hour >= 6 && hour < 11) mealType = 'breakfast';
  else if (hour >= 11 && hour < 15) mealType = 'lunch';
  else if (hour >= 15 && hour < 18) mealType = 'snack';
  else mealType = 'dinner';

  return getFoodSuggestion(region, mealType);
}
