/**
 * Energy calculation utilities
 * Based on EcoLogits methodology from wattsup-vscode-copilot-chat
 * 
 * This is a simplified version that estimates energy consumption based on:
 * - Estimated token count from query length
 * - GPU energy consumption per token
 * - Datacenter overhead (PUE)
 */

// Constants based on EcoLogits research
// Energy consumption per token for a typical LLM
const GPU_ENERGY_PER_TOKEN = 1.5e-6; // kWh per token (simplified average)
const DATACENTER_PUE = 1.2; // Power Usage Effectiveness
const CHARS_PER_TOKEN = 4; // Rough approximation: 4 characters per token

export interface EnergyResult {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  energyKWh: number;
  energyWh: number;
}

/**
 * Estimate token count from text
 * @param text - Input text
 * @returns Estimated number of tokens
 */
export function estimateTokenCount(text: string): number {
  if (!text || text.trim().length === 0) {
    return 0;
  }
  // Simple estimation: divide character count by average chars per token
  return Math.ceil(text.length / CHARS_PER_TOKEN);
}

/**
 * Calculate energy consumption for a query
 * @param inputText - The user's query text
 * @param outputTokens - Expected output tokens (default: 3x input)
 * @returns Energy consumption object with kWh and equivalences
 */
export function calculateEnergy(
  inputText: string,
  outputTokens: number | null = null
): EnergyResult {
  const inputTokens = estimateTokenCount(inputText);
  
  // If output tokens not specified, estimate as 3x input (typical for completion)
  const estimatedOutputTokens = outputTokens || inputTokens * 3;
  
  // Total tokens processed (input read multiple times + output generation)
  const totalTokens = inputTokens + estimatedOutputTokens;
  
  // Calculate GPU energy consumption
  const gpuEnergy = totalTokens * GPU_ENERGY_PER_TOKEN;
  
  // Apply datacenter overhead
  const totalEnergy = gpuEnergy * DATACENTER_PUE; // in kWh
  
  return {
    inputTokens,
    outputTokens: estimatedOutputTokens,
    totalTokens,
    energyKWh: totalEnergy,
    energyWh: totalEnergy * 1000, // Convert to Wh for easier reading
  };
}

/**
 * Calculate CO2 emissions (simplified)
 * Using global average carbon intensity: ~475g CO2/kWh
 * @param energyKWh - Energy in kWh
 * @returns CO2 in kg
 */
export function calculateCO2(energyKWh: number): number {
  const GLOBAL_CARBON_INTENSITY = 0.475; // kg CO2 per kWh (world average)
  return energyKWh * GLOBAL_CARBON_INTENSITY;
}
