import type {
  MultiDayTrip,
  DayItinerary,
  PeriodPlan,
  Activity,
  TravelStyle,
  TravelPace,
  RegionHours,
} from '../types/multiday';
import { getActivitiesByRegion } from '../data/activityDatabase';
import { getFoodSuggestion } from '../data/foodSuggestions';
import { parseDuration, addTime, getPeriodStartTime } from './timeCalculator';
import { estimateCosts } from './costEstimator';

// Configurações de ritmo
const paceConfig = {
  Relaxado: {
    activitiesPerPeriod: 2,
    timeMultiplier: 1.5,
    includeBreaks: true,
  },
  Moderado: {
    activitiesPerPeriod: 3,
    timeMultiplier: 1.0,
    includeBreaks: false,
  },
  Intenso: {
    activitiesPerPeriod: 4,
    timeMultiplier: 0.75,
    includeBreaks: false,
  },
};

// Distribuir regiões pelos dias
function distributeRegionsAcrossDays(
  totalDays: number,
  selectedRegions: RegionHours[]
): RegionHours[][] {
  const sortedRegions = [...selectedRegions].sort((a, b) => b.hours - a.hours);
  const distribution: RegionHours[][] = Array.from({ length: totalDays }, () => []);

  if (totalDays === 2) {
    // 2 dias: dividir regiões igualmente
    sortedRegions.forEach((region, index) => {
      distribution[index % 2].push(region);
    });
  } else if (totalDays === 3) {
    // 3 dias: 1-2 regiões por dia, priorizando as com mais horas
    if (sortedRegions.length <= 3) {
      sortedRegions.forEach((region, index) => {
        distribution[index].push(region);
      });
    } else {
      // Mais de 3 regiões: combinar algumas
      distribution[0].push(sortedRegions[0]);
      distribution[1].push(sortedRegions[1]);
      distribution[2].push(sortedRegions[2]);
      // Regiões restantes distribuídas
      sortedRegions.slice(3).forEach((region, index) => {
        distribution[index % 3].push(region);
      });
    }
  } else {
    // 4 dias
    sortedRegions.forEach((region, index) => {
      distribution[index % 4].push(region);
    });
  }

  return distribution.filter((day) => day.length > 0);
}

// Selecionar atividades para um período
function selectActivitiesForPeriod(
  region: string,
  hoursAvailable: number,
  style: TravelStyle,
  pace: TravelPace,
  startTime: string
): Activity[] {
  const allActivities = getActivitiesByRegion(region);
  const config = paceConfig[pace];
  const maxActivities = config.activitiesPerPeriod;

  // Filtrar por estilo se não for "Misto"
  let filtered = allActivities;
  if (style !== 'Misto') {
    const categoryMap: Record<string, string> = {
      Cultural: 'cultural',
      Gastronomia: 'food',
      'Fotos / Instagram': 'photo',
      'Caminhada leve': 'photo',
    };
    const preferredCategory = categoryMap[style];
    filtered = allActivities.filter((a) => a.category === preferredCategory);

    // Se não houver atividades do estilo, usar todas
    if (filtered.length === 0) filtered = allActivities;
  }

  // Selecionar até maxActivities
  const selected: Activity[] = [];
  const minutesAvailable = hoursAvailable * 60;
  let totalMinutes = 0;
  let currentTime = startTime;

  for (let i = 0; i < Math.min(maxActivities, filtered.length); i++) {
    const activity = filtered[i];
    const activityMinutes = parseDuration(activity.duration) * config.timeMultiplier;

    if (totalMinutes + activityMinutes <= minutesAvailable) {
      const endTime = addTime(currentTime, activityMinutes);

      selected.push({
        ...activity,
        startTime: currentTime,
        endTime: endTime,
        duration: `${Math.round(activityMinutes)}min`,
      });

      totalMinutes += activityMinutes;
      currentTime = addTime(currentTime, activityMinutes + (config.includeBreaks ? 15 : 0));
    }
  }

  return selected;
}

// Criar plano para um período (manhã/tarde/noite)
function createPeriodPlan(
  period: 'morning' | 'afternoon' | 'evening',
  region: string,
  hours: number,
  style: TravelStyle,
  pace: TravelPace
): PeriodPlan {
  const startTime = getPeriodStartTime(period);
  const activities = selectActivitiesForPeriod(region, hours, style, pace, startTime);

  // Determinar tipo de refeição
  let mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' = 'lunch';
  if (period === 'morning') mealType = 'breakfast';
  else if (period === 'afternoon') mealType = 'lunch';
  else mealType = 'dinner';

  const foodSuggestion = getFoodSuggestion(region, mealType) || {
    type: mealType,
    placeName: 'Explorar opções locais',
    description: 'Diversos restaurantes na região',
    cuisine: 'Variada',
    priceRange: 'R$ 30-60',
    mapsLink: '',
  };

  return {
    period,
    region,
    durationHours: hours,
    activities,
    foodSuggestion,
    weatherTip:
      period === 'afternoon'
        ? 'Período mais quente. Use protetor solar!'
        : undefined,
  };
}

// Criar itinerário de um dia
function createDayPlan(
  dayNumber: number,
  regions: RegionHours[],
  style: TravelStyle,
  pace: TravelPace
): DayItinerary {
  const mainRegion = regions[0].region;
  const totalHours = regions.reduce((sum, r) => sum + r.hours, 0);

  // Distribuir horas entre manhã, tarde e noite
  let morningHours = 0;
  let afternoonHours = 0;
  let eveningHours = 0;

  if (totalHours <= 4) {
    // Meio dia: concentrar em um período
    if (totalHours <= 2) {
      morningHours = totalHours;
    } else {
      afternoonHours = totalHours;
    }
  } else if (totalHours <= 6) {
    // Dia parcial: manhã + tarde OU tarde + noite
    morningHours = Math.min(3, totalHours / 2);
    afternoonHours = totalHours - morningHours;
  } else {
    // Dia completo: distribuir entre os 3 períodos
    morningHours = 3;
    afternoonHours = 4;
    eveningHours = totalHours - 7;
  }

  // Se tiver múltiplas regiões, distribuir
  let morningRegion = mainRegion;
  let afternoonRegion = mainRegion;
  let eveningRegion = regions.length > 1 ? regions[1].region : mainRegion;

  const morning = createPeriodPlan('morning', morningRegion, morningHours, style, pace);
  const afternoon = createPeriodPlan('afternoon', afternoonRegion, afternoonHours, style, pace);
  const evening = createPeriodPlan('evening', eveningRegion, eveningHours, style, pace);

  // Adicionar tempo de deslocamento se mudar de região
  if (afternoonRegion !== morningRegion) {
    afternoon.travelTimeFromPrevious = '15-20 min de Uber/Táxi';
  }
  if (eveningRegion !== afternoonRegion) {
    evening.travelTimeFromPrevious = '15-20 min de Uber/Táxi';
  }

  return {
    dayNumber,
    mainRegion,
    morning,
    afternoon,
    evening,
    travelNotes: [
      'Comece o dia descansado',
      'Mantenha-se hidratado',
      'Leve protetor solar e boné',
    ],
  };
}

// Função principal: gerar itinerário completo
export function generateItinerary(
  days: number,
  selectedRegions: RegionHours[],
  style: TravelStyle,
  pace: TravelPace
): MultiDayTrip {
  // Validações
  if (selectedRegions.length < 2) {
    throw new Error('Selecione pelo menos 2 regiões');
  }

  if (days < 2 || days > 4) {
    throw new Error('Número de dias deve ser entre 2 e 4');
  }

  // Distribuir regiões pelos dias
  const regionsPerDay = distributeRegionsAcrossDays(days, selectedRegions);

  // Criar itinerário para cada dia
  const dailyItinerary: DayItinerary[] = regionsPerDay.map((dayRegions, index) =>
    createDayPlan(index + 1, dayRegions, style, pace)
  );

  // Calcular custos
  const estimatedCost = estimateCosts(dailyItinerary);

  return {
    id: `trip-${Date.now()}`,
    totalDays: days,
    regions: selectedRegions.map((r) => r.region),
    style,
    pace,
    dailyItinerary,
    estimatedCost,
    createdAt: new Date().toISOString(),
  };
}
