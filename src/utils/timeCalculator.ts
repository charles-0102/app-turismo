// Utilitários para cálculos de tempo

export function parseDuration(duration: string): number {
  // Converte "30min", "1h", "1h30min" para minutos
  const hourMatch = duration.match(/(\d+)h/);
  const minMatch = duration.match(/(\d+)min/);

  let totalMinutes = 0;
  if (hourMatch) totalMinutes += parseInt(hourMatch[1]) * 60;
  if (minMatch) totalMinutes += parseInt(minMatch[1]);

  return totalMinutes;
}

export function formatDuration(minutes: number): string {
  // Converte minutos para formato "1h30min"
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours > 0 && mins > 0) return `${hours}h${mins}min`;
  if (hours > 0) return `${hours}h`;
  return `${mins}min`;
}

export function addTime(timeStr: string, minutesToAdd: number): string {
  // Adiciona minutos a um horário "09:00"
  const [hours, minutes] = timeStr.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + minutesToAdd;

  const newHours = Math.floor(totalMinutes / 60) % 24;
  const newMinutes = totalMinutes % 60;

  return `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`;
}

export function calculateTotalTime(durations: string[]): number {
  // Soma total de durações em minutos
  return durations.reduce((total, duration) => {
    return total + parseDuration(duration);
  }, 0);
}

export function isWithinPeriod(
  timeStr: string,
  period: 'morning' | 'afternoon' | 'evening'
): boolean {
  const [hours] = timeStr.split(':').map(Number);

  if (period === 'morning') return hours >= 6 && hours < 12;
  if (period === 'afternoon') return hours >= 12 && hours < 18;
  if (period === 'evening') return hours >= 18 || hours < 6;

  return false;
}

export function getPeriodStartTime(period: 'morning' | 'afternoon' | 'evening'): string {
  if (period === 'morning') return '09:00';
  if (period === 'afternoon') return '13:00';
  return '19:00';
}
