const UNITS = {
  CM3_TO_DM3: 1000,
};

function validateInputs(...inputs) {
  if (
    inputs.some(
      (input) => Number.isNaN(input) || !Number.isFinite(input) || input < 0,
    )
  ) {
    throw new Error("Please enter valid positive numbers.");
  }
}

function validateUnit(unit) {
  if (unit !== "cm3" && unit !== "dm3") {
    throw new Error("Invalid unit selected.");
  }
}

function calculateMolarityMass(c, v, m, unit) {
  validateInputs(c, v, m);
  validateUnit(unit);
  const vDm3 = unit === "cm3" ? v / UNITS.CM3_TO_DM3 : v;
  return c * vDm3 * m;
}

function calculateMassPercent(w, mr) {
  validateInputs(w, mr);
  if (w > 100) throw new Error("Mass percent cannot exceed 100%.");
  const ms = (w / 100) * mr;
  const mw = mr - ms;
  return { ms, mw };
}

function calculateDilution(c1, c2, v2, unit) {
  validateInputs(c1, c2, v2);
  validateUnit(unit);

  if (c1 === 0) throw new Error("Stock concentration cannot be zero.");
  if (c2 >= c1)
    throw new Error(
      "Final concentration must be lower than initial concentration.",
    );

  const v2Cm3 = unit === "dm3" ? v2 * UNITS.CM3_TO_DM3 : v2;
  const v1 = (c2 * v2Cm3) / c1;
  const vWater = v2Cm3 - v1;

  if (vWater < 0)
    throw new Error("Calculated water volume cannot be negative.");

  return { v1, vWater };
}

function convertCToGamma(c, m) {
  validateInputs(c, m);
  return c * m;
}

function convertWToC(w, rho, m) {
  validateInputs(w, rho, m);
  if (w > 100) throw new Error("Mass fraction cannot exceed 100%.");
  if (m === 0) throw new Error("Molar mass cannot be zero.");
  return (w * rho * 10) / m;
}

function convertWToGamma(w, rho) {
  validateInputs(w, rho);
  if (w > 100) throw new Error("Mass fraction cannot exceed 100%.");
  return w * rho * 10;
}

const CalculatorCore = {
  validateInputs,
  calculateMolarityMass,
  calculateMassPercent,
  calculateDilution,
  convertCToGamma,
  convertWToC,
  convertWToGamma,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = CalculatorCore;
}

if (typeof window !== "undefined") {
  window.CalculatorCore = CalculatorCore;
}
