/**
 * Popular LLM models with their parameter counts and energy characteristics
 * Data sourced from EcoLogits and model documentation
 * 
 * Parameters are in billions (B)
 * For MoE (Mixture of Experts) models, we use the active parameters
 */

export interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  parameters: number; // in billions
  type: 'dense' | 'moe';
  description: string;
}

export const MODELS: ModelInfo[] = [
  // OpenAI Models
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    parameters: 220, // MoE active params (avg)
    type: 'moe',
    description: 'Latest multimodal model from OpenAI'
  },
  {
    id: 'gpt-4-turbo',
    name: 'GPT-4 Turbo',
    provider: 'OpenAI',
    parameters: 275, // MoE active params (avg)
    type: 'moe',
    description: 'Faster and more efficient GPT-4'
  },
  {
    id: 'gpt-4',
    name: 'GPT-4',
    provider: 'OpenAI',
    parameters: 550, // MoE active params (avg)
    type: 'moe',
    description: 'Original GPT-4 model'
  },
  {
    id: 'gpt-3.5-turbo',
    name: 'GPT-3.5 Turbo',
    provider: 'OpenAI',
    parameters: 45, // avg estimate
    type: 'dense',
    description: 'Fast and affordable model'
  },
  
  // Anthropic Models
  {
    id: 'claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    parameters: 137.5, // MoE active params (avg)
    type: 'moe',
    description: 'Balanced performance and speed'
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    provider: 'Anthropic',
    parameters: 137.5, // MoE active params (avg)
    type: 'moe',
    description: 'Most capable Claude model'
  },
  {
    id: 'claude-3-sonnet',
    name: 'Claude 3 Sonnet',
    provider: 'Anthropic',
    parameters: 137.5, // MoE active params (avg)
    type: 'moe',
    description: 'Balanced Claude model'
  },
  {
    id: 'claude-3-haiku',
    name: 'Claude 3 Haiku',
    provider: 'Anthropic',
    parameters: 45, // Smaller model estimate
    type: 'dense',
    description: 'Fastest Claude model'
  },
  
  // Google Models
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    parameters: 137.5, // MoE active params (avg)
    type: 'moe',
    description: 'Fast multimodal model'
  },
  {
    id: 'gemini-1.5-pro',
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    parameters: 275, // MoE active params (avg)
    type: 'moe',
    description: 'Advanced reasoning model'
  },
  
  // Meta Models
  {
    id: 'llama-3.1-405b',
    name: 'Llama 3.1 405B',
    provider: 'Meta',
    parameters: 405,
    type: 'dense',
    description: 'Largest open-source model'
  },
  {
    id: 'llama-3.1-70b',
    name: 'Llama 3.1 70B',
    provider: 'Meta',
    parameters: 70,
    type: 'dense',
    description: 'Powerful open-source model'
  },
  {
    id: 'llama-3.1-8b',
    name: 'Llama 3.1 8B',
    provider: 'Meta',
    parameters: 8,
    type: 'dense',
    description: 'Efficient open-source model'
  },
  
  // Mistral Models
  {
    id: 'mistral-large',
    name: 'Mistral Large',
    provider: 'Mistral AI',
    parameters: 123,
    type: 'dense',
    description: 'Flagship Mistral model'
  },
  {
    id: 'mistral-medium',
    name: 'Mistral Medium',
    provider: 'Mistral AI',
    parameters: 45, // estimate
    type: 'dense',
    description: 'Balanced Mistral model'
  },
  {
    id: 'mixtral-8x7b',
    name: 'Mixtral 8x7B',
    provider: 'Mistral AI',
    parameters: 12.9, // MoE active params
    type: 'moe',
    description: 'MoE open-source model'
  }
];

/**
 * Get model by ID
 */
export function getModelById(id: string): ModelInfo | undefined {
  return MODELS.find(m => m.id === id);
}

/**
 * Get models grouped by provider
 */
export function getModelsByProvider(): Record<string, ModelInfo[]> {
  return MODELS.reduce((acc, model) => {
    if (!acc[model.provider]) {
      acc[model.provider] = [];
    }
    acc[model.provider].push(model);
    return acc;
  }, {} as Record<string, ModelInfo[]>);
}
