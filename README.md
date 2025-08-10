# mcp-risk-engine

mcp-risk-engine/
│
├── api/
│   └── check-risk.js     # Vercel API endpoint for webhook calls
│
├── utils/
│   ├── fetchBTCPrice.js  # Gets BTC price from API
│   ├── fetchFlows.js     # Gets stablecoin inflow/outflow data
│   └── riskRules.js      # Your rule-based prediction logic
│
├── package.json
├── README.md             # Setup instructions
└── vercel.json           # Config for Vercel deployment
