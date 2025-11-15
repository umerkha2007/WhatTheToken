# WhatTheToken

WhatTheToken is a simple web app designed to estimate and visualize the carbon footprint and energy consumption associated with Large Language Model (LLM) queries. As language models become more prevalent, understanding their environmental impact is increasingly important for responsible AI usage and sustainability awareness.

## Features

- **Estimate Energy and Carbon Footprint**: Calculate the approximate energy usage and CO2 impact of each LLM query.
- **Visualize History**: View charts and graphs showing the cumulative impact of all your queries.
- **Works with Multiple LLMs**: Easily integrate with popular large language models, including OpenAI, Azure, Anthropic, and more.
- **Actionable Insights**: Get tips and recommendations to optimize queries and reduce carbon footprint.
- **Export Data**: Download query history and impact metrics for further analysis.

## Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/umerkha2007/WhatTheToken.git
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the application**

   ```bash
   npm start
   # or
   yarn start
   ```

4. Open your browser and go to [http://localhost:3000](http://localhost:3000)

## How It Works

WhatTheToken estimates energy and CO₂ emissions by calculating GPU/CPU cycles and associating them with publicly available carbon intensity data per region. For each query, the app provides an estimated environmental impact, which you can track over time.

## Contributing

We welcome contributions! Please open issues and pull requests for improvements, new features, or bug fixes.

## License

This project is open source under the MIT License.

## Acknowledgments

- Carbon intensity data sources: [electricityMap](https://www.electricitymap.org/) and [carbontracker](https://github.com/lfwa/carbontracker)
- LLM APIs: OpenAI, Azure, Anthropic

---
*Made with a focus on sustainability and responsible AI.*
