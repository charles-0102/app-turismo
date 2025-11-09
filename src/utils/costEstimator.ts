import type { CostEstimate, DayItinerary } from '../types/multiday';

// Estima custos de uma viagem

export function estimateCosts(dailyItinerary: DayItinerary[]): CostEstimate {
  let totalFood = 0;
  let totalTransport = 0;
  let totalEntries = 0;

  dailyItinerary.forEach((day) => {
    // Custos de alimentação por dia
    totalFood += 150; // Média R$ 150/dia (café + almoço + jantar)

    // Custos de transporte por dia
    const regionsVisited = new Set([
      day.morning.region,
      day.afternoon.region,
      day.evening.region,
    ]);
    totalTransport += regionsVisited.size * 15; // R$ 15 por deslocamento entre regiões

    // Custos de entradas
    [day.morning, day.afternoon, day.evening].forEach((period) => {
      period.activities.forEach((activity) => {
        if (activity.entryFee) {
          totalEntries += activity.entryFee;
        }
      });
    });
  });

  const total = totalFood + totalTransport + totalEntries;
  const perDay = Math.round(total / dailyItinerary.length);

  return {
    food: Math.round(totalFood),
    transport: Math.round(totalTransport),
    entries: Math.round(totalEntries),
    total: Math.round(total),
    perDay,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
