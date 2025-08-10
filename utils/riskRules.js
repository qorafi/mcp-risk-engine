export function predictPriceChange(flows) {
  const inflowThreshold = 50000000;   // Bearish if > threshold
  const outflowThreshold = 50000000;  // Bullish if > threshold

  if (flows.netInflow > inflowThreshold) return -0.1; // -10% price in future
  if (flows.netOutflow > outflowThreshold) return 0.05; // +5% price in future

  return 0; // Neutral
}

