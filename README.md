# WhatTheToken ⚡

WhatTheToken is a simple, frontend-only web app built with **React + TypeScript + Vite** designed to raise awareness about the energy consumption and carbon footprint of Large Language Model (LLM) queries. Users can enter a query and see how its energy consumption compares to running everyday appliances like LED bulbs, laptops, and microwaves.

> **Note**: This is an educational awareness tool with simplified calculations. Actual energy consumption varies significantly based on model size, hardware, and datacenter efficiency.

## Features

- ⚡ **Instant Energy Estimates**: Calculate approximate energy usage based on query length
- 🔌 **Relatable Comparisons**: See how your query compares to running LED bulbs, microwaves, laptops, and more
- 🌍 **CO₂ Impact**: View estimated carbon emissions for each query
- 🎨 **Clean, Simple UI**: Easy-to-use interface built with React + TypeScript
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🚀 **Fast Development**: Built with Vite for lightning-fast HMR

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and dev server
- **CSS3** - Modern styling with gradients and animations

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/umerkha2007/WhatTheToken.git
   cd WhatTheToken
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser** and go to [http://localhost:5173](http://localhost:5173)

### Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder ready for deployment.

### Preview Production Build

```bash
npm run preview
```

## How It Works

WhatTheToken uses a simplified calculation methodology based on research from [EcoLogits](https://ecologits.ai/):

1. **Token Estimation**: Converts your query text to estimated tokens (≈4 characters per token)
2. **Energy Calculation**: Uses typical GPU energy consumption per token (≈1.5×10⁻⁶ kWh/token)
3. **Datacenter Overhead**: Applies Power Usage Effectiveness (PUE) factor of 1.2
4. **CO₂ Estimation**: Converts energy to CO₂ using global average carbon intensity (≈475g CO₂/kWh)
5. **Appliance Comparisons**: Calculates how long various appliances could run with equivalent energy

### Example

A typical query like "Write a Python function to sort a list" might:
- Use ~200 tokens (input + estimated output)
- Consume ~0.0004 kWh of energy
- Emit ~0.2 grams of CO₂
- Power an LED bulb for ~2-3 minutes

## Project Structure

```
WhatTheToken/
├── public/              # Static assets
├── src/
│   ├── data/
│   │   └── equivalences.ts    # Appliance comparison data & types
│   ├── utils/
│   │   └── energyCalculator.ts # Energy calculation logic & types
│   ├── App.tsx          # Main React component
│   ├── App.css          # Component styling
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md           # This file
```

## For Collaborators

### Architecture Overview

- **Frontend Only**: No backend, API calls, or authentication required
- **React + TypeScript**: Type-safe component structure for better maintainability
- **Vite**: Fast development with Hot Module Replacement (HMR)
- **Calculation Logic**: Isolated in `src/utils/energyCalculator.ts` with full type definitions
- **Data Files**: Appliance equivalences in `src/data/equivalences.ts` with TypeScript interfaces

### Adding New Appliances

Edit `src/data/equivalences.ts` and add a new object to the `EQUIVALENCES` array:

```typescript
{
  id: 'appliance-id',
  label: 'Appliance Name (Power)',
  emoji: '🔌',
  powerWatts: 100,  // Power in watts
  unit: 'hours',    // 'hours', 'minutes', 'seconds', or 'charges'
  enabled: true,
  description: 'Description of the appliance'
}
```

TypeScript will ensure type safety across the application.

### Updating Energy Calculations

The calculation logic is in `src/utils/energyCalculator.ts`. Key constants you might want to adjust:

- `GPU_ENERGY_PER_TOKEN`: Energy per token (kWh)
- `DATACENTER_PUE`: Power Usage Effectiveness factor
- `CHARS_PER_TOKEN`: Characters per token ratio
- `GLOBAL_CARBON_INTENSITY`: CO₂ per kWh (kg)

All functions are fully typed with TypeScript interfaces.

### Type Definitions

The project uses TypeScript interfaces for type safety:

- `EnergyResult`: Return type for energy calculations
- `Equivalence`: Structure for appliance data
- `EquivalenceResult`: Extended equivalence with calculated values
- `Results`: Complete results object with all calculations

### Development Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production (includes TypeScript compilation)
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint to check code quality

## Contributing

We welcome contributions! This is a simple awareness project designed for collaboration. Areas for improvement:

- More accurate energy models
- Additional appliance comparisons
- Better token estimation algorithms
- Visualizations and charts (consider Chart.js or Recharts)
- Multi-language support (i18n)
- Model-specific calculations
- Dark mode support
- Query history tracking (localStorage)

Please open issues and pull requests for improvements, new features, or bug fixes.

## Limitations

- **Simplified Calculations**: Uses simplified formulas and average values
- **No Real API**: Doesn't connect to actual LLM APIs (by design for simplicity)
- **Model Variations**: Actual energy varies greatly by model (GPT-4 vs Llama, etc.)
- **Regional Differences**: Carbon intensity varies significantly by region
- **No Persistence**: Data is not saved between sessions

## License

This project is open source under the MIT License.

## Acknowledgments

- Energy calculation methodology inspired by [wattsup-vscode-copilot-chat](https://github.com/Ucodia/wattsup-vscode-copilot-chat)
- Research from [EcoLogits](https://ecologits.ai/)
- Carbon intensity data concepts from [electricityMap](https://www.electricitymap.org/)
- Built with [Vite](https://vite.dev/) and [React](https://react.dev/)

---
*Made with 🌱 for sustainability awareness and responsible AI*
