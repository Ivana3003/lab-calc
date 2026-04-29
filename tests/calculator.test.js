const {
  validateInputs,
  calculateMolarityMass,
  calculateMassPercent,
  calculateDilution,
  convertCToGamma,
  convertWToC,
  convertWToGamma,
} = require("../js/calculator-core");

describe("validateInputs", () => {
  test("accepts valid positive values", () => {
    expect(() => validateInputs(0, 1, 2.5)).not.toThrow();
  });

  test("throws for negative values", () => {
    expect(() => validateInputs(-1, 1)).toThrow(
      "Please enter valid positive numbers.",
    );
  });

  test("throws for NaN", () => {
    expect(() => validateInputs(NaN)).toThrow(
      "Please enter valid positive numbers.",
    );
  });
});

describe("calculateMolarityMass", () => {
  test("calculates mass for cm3 input", () => {
    const result = calculateMolarityMass(2, 500, 58.44, "cm3");
    expect(result).toBeCloseTo(58.44, 6);
  });

  test("throws for invalid unit", () => {
    expect(() => calculateMolarityMass(1, 1, 1, "ml")).toThrow(
      "Invalid unit selected.",
    );
  });
});

describe("calculateMassPercent", () => {
  test("returns solute and solvent masses", () => {
    const { ms, mw } = calculateMassPercent(10, 200);
    expect(ms).toBeCloseTo(20, 6);
    expect(mw).toBeCloseTo(180, 6);
  });

  test("throws when percent is above 100", () => {
    expect(() => calculateMassPercent(101, 100)).toThrow(
      "Mass percent cannot exceed 100%.",
    );
  });
});

describe("calculateDilution", () => {
  test("calculates stock and water volume", () => {
    const { v1, vWater } = calculateDilution(5, 1, 100, "cm3");
    expect(v1).toBeCloseTo(20, 6);
    expect(vWater).toBeCloseTo(80, 6);
  });

  test("throws when stock concentration is zero", () => {
    expect(() => calculateDilution(0, 1, 100, "cm3")).toThrow(
      "Stock concentration cannot be zero.",
    );
  });

  test("throws when final concentration is not lower", () => {
    expect(() => calculateDilution(2, 2, 100, "cm3")).toThrow(
      "Final concentration must be lower than initial concentration.",
    );
  });
});

describe("conversion helpers", () => {
  test("convertCToGamma computes mass concentration", () => {
    expect(convertCToGamma(2, 58.44)).toBeCloseTo(116.88, 6);
  });

  test("convertWToC computes concentration", () => {
    expect(convertWToC(10, 1.2, 60)).toBeCloseTo(2, 6);
  });

  test("convertWToC throws when molar mass is zero", () => {
    expect(() => convertWToC(10, 1, 0)).toThrow("Molar mass cannot be zero.");
  });

  test("convertWToGamma computes mass concentration", () => {
    expect(convertWToGamma(5, 1.1)).toBeCloseTo(55, 6);
  });

  test("convertWToGamma throws when percent is above 100", () => {
    expect(() => convertWToGamma(120, 1)).toThrow(
      "Mass fraction cannot exceed 100%.",
    );
  });
});
