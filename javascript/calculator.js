/**
 * AI Automation ROI Estimator
 * Swift Tech Co. — https://swifttechco.com
 *
 * Calculates annual savings, payback period, and 5-year ROI for AI automation.
 */

const PROCESSES = {
  "Customer support & ticketing":  { autoRate: 0.70, implBase: 18000 },
  "Data entry & processing":       { autoRate: 0.85, implBase: 12000 },
  "Invoice & document handling":   { autoRate: 0.80, implBase: 20000 },
  "Lead qualification & outreach": { autoRate: 0.65, implBase: 15000 },
  "Report generation & analytics": { autoRate: 0.75, implBase: 22000 },
  "Content creation & moderation": { autoRate: 0.60, implBase: 16000 },
  "HR onboarding & offboarding":   { autoRate: 0.70, implBase: 24000 },
  "Inventory & order management":  { autoRate: 0.80, implBase: 28000 },
};

const TEAM_SIZES = {
  "1 to 5 people":   1.0,
  "5 to 15 people":  1.55,
  "15 to 50 people": 2.3,
  "50+ people":      3.4,
};

/**
 * Calculate AI automation ROI.
 *
 * @param {string} process - One of the PROCESSES keys.
 * @param {string} teamSize - One of the TEAM_SIZES keys.
 * @param {number} hoursPerWeek - Total team hours spent on this process per week.
 * @param {number} hourlyRate - Average hourly cost (USD).
 * @returns {{ annualSavings, implCost, paybackMonths, roi5yrPct, autoRatePct, hoursSavedPerWeek }}
 */
function calculate(process, teamSize, hoursPerWeek, hourlyRate) {
  if (!PROCESSES[process]) throw new Error(`Unknown process: ${process}`);
  if (TEAM_SIZES[teamSize] === undefined) throw new Error(`Unknown team size: ${teamSize}`);
  if (hoursPerWeek <= 0) throw new Error("hoursPerWeek must be > 0");
  if (hourlyRate <= 0) throw new Error("hourlyRate must be > 0");

  const { autoRate, implBase } = PROCESSES[process];
  const annualSavings = Math.round(hoursPerWeek * autoRate * 52 * hourlyRate);
  const implCost = Math.round(implBase * TEAM_SIZES[teamSize]);
  const paybackMonths = Math.max(1, Math.round(implCost / annualSavings * 12));
  const roi5yrPct = Math.round((annualSavings * 5 - implCost) / implCost * 100);

  return {
    annualSavings,
    implCost,
    paybackMonths,
    roi5yrPct,
    autoRatePct:      Math.round(autoRate * 100),
    hoursSavedPerWeek: Math.round(hoursPerWeek * autoRate),
  };
}

module.exports = { PROCESSES, TEAM_SIZES, calculate };
