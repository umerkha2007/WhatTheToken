/**
 * Equivalence data for relatable comparisons
 * Shows how long common appliances could run with the energy from an LLM query
 */

export interface Equivalence {
  id: string;
  label: string;
  emoji: string;
  powerWatts: number;
  unit: 'hours' | 'minutes' | 'seconds' | 'charges';
  enabled: boolean;
  description: string;
}

export interface EquivalenceResult extends Equivalence {
  value: number;
  formatted: string;
}

export const EQUIVALENCES: Equivalence[] = [
  {
    id: 'led-bulb',
    label: 'LED bulb (10W)',
    emoji: '💡',
    powerWatts: 10,
    unit: 'hours',
    enabled: true,
    description: 'A typical LED light bulb'
  },
  {
    id: 'laptop',
    label: 'Laptop (50W)',
    emoji: '💻',
    powerWatts: 50,
    unit: 'hours',
    enabled: true,
    description: 'Average laptop power consumption'
  },
  {
    id: 'microwave',
    label: 'Microwave (1000W)',
    emoji: '⏲️',
    powerWatts: 1000,
    unit: 'seconds',
    enabled: true,
    description: 'Standard microwave oven'
  },
  {
    id: 'phone-charge',
    label: 'Smartphone charges',
    emoji: '📱',
    powerWatts: 12, // 12Wh per charge
    unit: 'charges',
    enabled: true,
    description: 'Full smartphone battery charge'
  },
  {
    id: 'tv',
    label: 'TV (100W)',
    emoji: '📺',
    powerWatts: 100,
    unit: 'hours',
    enabled: true,
    description: 'Modern LED television'
  },
  {
    id: 'ac',
    label: 'Air conditioner (1500W)',
    emoji: '❄️',
    powerWatts: 1500,
    unit: 'seconds',
    enabled: false,
    description: 'Room air conditioning unit'
  }
];

/**
 * Calculate how long an appliance could run with given energy
 * @param energyWh - Energy in Watt-hours
 * @param equivalence - Equivalence object from EQUIVALENCES
 * @returns Calculated equivalence value
 */
export function calculateEquivalence(
  energyWh: number,
  equivalence: Equivalence
): number {
  const { powerWatts, unit } = equivalence;
  
  if (unit === 'charges') {
    // For phone charges, powerWatts represents Wh per charge
    return energyWh / powerWatts;
  }
  
  // Calculate runtime in hours
  const runtimeHours = energyWh / powerWatts;
  
  if (unit === 'seconds') {
    return runtimeHours * 3600; // Convert to seconds
  }
  
  if (unit === 'minutes') {
    return runtimeHours * 60; // Convert to minutes
  }
  
  return runtimeHours; // Return hours
}

/**
 * Format equivalence value for display
 * @param value - Calculated equivalence value
 * @param equivalence - Equivalence object
 * @returns Formatted string
 */
export function formatEquivalence(
  value: number,
  equivalence: Equivalence
): string {
  const { unit } = equivalence;
  
  if (value < 0.01) {
    return `< 0.01 ${unit}`;
  }
  
  if (unit === 'seconds' && value >= 60) {
    const minutes = value / 60;
    if (minutes >= 60) {
      const hours = minutes / 60;
      return `${hours.toFixed(2)} hours`;
    }
    return `${minutes.toFixed(1)} minutes`;
  }
  
  if (unit === 'hours' && value < 1) {
    const minutes = value * 60;
    if (minutes < 1) {
      const seconds = minutes * 60;
      return `${seconds.toFixed(1)} seconds`;
    }
    return `${minutes.toFixed(1)} minutes`;
  }
  
  if (value < 1) {
    return `${value.toFixed(2)} ${unit}`;
  }
  
  return `${value.toFixed(1)} ${unit}`;
}
