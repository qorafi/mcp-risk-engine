import fetchBTCPrice from "../utils/fetchBTCPrice.js";
import fetchFlows from "../utils/fetchFlows.js";
import { predictPriceChange } from "../utils/riskRules.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST method allowed" });
  }

  try {
    const { wallet, btcCollateral, loanAmount, liqThreshold } = req.body;
    if (!wallet || !btcCollateral || !loanAmount || !liqThreshold) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 1. Fetch data
    const btcPrice = await fetchBTCPrice();
    const flows = await fetchFlows();

    // 2. Predict change
    const predictedChange = predictPriceChange(flows);

    // 3. Risk check for 7d / 15d / 30d
    const horizons = { "7d": 1, "15d": 2, "30d": 3 };
    const report = {};

    for (let h in horizons) {
      const change = predictedChange * horizons[h];
      const futurePrice = btcPrice * (1 + change);
      const ratio = (btcCollateral * futurePrice) / loanAmount;
      report[h] = ratio < liqThreshold ? "HIGH RISK" : "SAFE";
    }

    return res.status(200).json({
      wallet,
      btcPrice,
      predictedChange,
      flows,
      report
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}

