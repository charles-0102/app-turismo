import type { DayTrip } from '../types';

export const dayTrips: DayTrip[] = [
  {
    name: 'Ilha de Itaparica',
    tempo: '45 min de ferry',
    como_chegar: 'Terminal São Joaquim → Ferry → Mar Grande. Saídas frequentes das 5h às 23h30.',
    maps: 'https://maps.app.goo.gl/itaparica',
  },
  {
    name: 'Morro de São Paulo',
    tempo: '1h30 de catamarã',
    como_chegar: 'Terminal náutico da Bahia Marina → Catamarã direto. Saída pela manhã (8h-9h) e retorno no fim da tarde.',
    maps: 'https://maps.app.goo.gl/morro-sp',
  },
  {
    name: 'Praia do Forte',
    tempo: '1h30 de ônibus',
    como_chegar: 'Terminal Rodoviário de Salvador → Linha 1001 (Praia do Forte). Saídas a cada hora.',
    maps: 'https://maps.app.goo.gl/praia-forte',
  },
  {
    name: 'Cachoeira e São Félix',
    tempo: '2h de ônibus',
    como_chegar: 'Terminal Rodoviário → Ônibus intermunicipal. Cidades históricas do Recôncavo Baiano.',
    maps: 'https://maps.app.goo.gl/cachoeira',
  },
  {
    name: 'Ilha dos Frades',
    tempo: '1h de lancha',
    como_chegar: 'Terminal Náutico ou Mercado Modelo → Escuna ou lancha. Praia paradisíaca com águas calmas.',
    maps: 'https://maps.app.goo.gl/ilha-frades',
  },
  {
    name: 'Mangue Seco',
    tempo: '3h (ferry + van)',
    como_chegar: 'Ferry para Itaparica + van até Mangue Seco. Cenário do filme "Tieta".',
    maps: 'https://maps.app.goo.gl/mangue-seco',
  },
];
