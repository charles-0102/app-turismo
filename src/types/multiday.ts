// Types para planejamento de viagens multi-dias

export interface MultiDayTrip {
  id: string;
  totalDays: number;
  regions: string[];
  style: TravelStyle;
  pace: TravelPace;
  dailyItinerary: DayItinerary[];
  estimatedCost: CostEstimate;
  createdAt: string;
}

export interface DayItinerary {
  dayNumber: number;
  mainRegion: string;
  date?: string;
  morning: PeriodPlan;
  afternoon: PeriodPlan;
  evening: PeriodPlan;
  travelNotes?: string[];
}

export interface PeriodPlan {
  period: 'morning' | 'afternoon' | 'evening';
  region: string;
  durationHours: number;
  activities: Activity[];
  foodSuggestion: FoodSuggestion;
  travelTimeFromPrevious?: string;
  weatherTip?: string;
}

export interface Activity {
  id: string;
  name: string;
  startTime: string; // "09:00"
  endTime: string; // "09:30"
  duration: string; // "30min"
  description: string;
  category: ActivityCategory;
  mapsLink: string;
  imageUrl?: string;
  entryFee?: number;
  accessibility?: boolean;
  tips?: string[];
}

export type ActivityCategory =
  | 'cultural'
  | 'food'
  | 'photo'
  | 'nature'
  | 'shopping'
  | 'religious'
  | 'museum'
  | 'beach';

export interface FoodSuggestion {
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  placeName: string;
  description: string;
  cuisine: string;
  priceRange: string; // "R$ 25-40"
  mapsLink: string;
  specialties?: string[];
}

export type TravelStyle = 'Cultural' | 'Gastronomia' | 'Fotos / Instagram' | 'Caminhada leve' | 'Misto';

export type TravelPace = 'Relaxado' | 'Moderado' | 'Intenso';

export interface CostEstimate {
  food: number;
  transport: number;
  entries: number;
  total: number;
  perDay: number;
}

export interface RegionHours {
  region: string;
  hours: number;
  selected: boolean;
  imageUrl?: string;
}

export interface TripPlannerFormData {
  duration: number; // 2, 3, 4
  selectedRegions: RegionHours[];
  style: TravelStyle;
  pace: TravelPace;
}
