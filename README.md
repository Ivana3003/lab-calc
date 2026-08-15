# 🧪 LabCalc (Professional Solution Preparator & Unit Converter)

## 📸 Preview

![LabCalc Screenshot](./screenshot.png)

A high-precision web application designed for chemists, researchers, and students to automate complex laboratory calculations and ensure accuracy in solution preparation.

## 🔬 The Intersection of Chemistry & Code

As a **Master of Organic Chemistry**, I engineered this tool to replace manual calculations and prone-to-error spreadsheets.

- **Scientific Integrity:** Developed using standard IUPAC notation, including correct lowercase symbols for mass concentration (γ) and mass fraction (ω).
- **Precision First:** Implements 4-decimal precision for molar calculations, mirroring the sensitivity of analytical balances.

## 🌟 Features

- **Molarity Calculator:** Calculate required mass for specific molar concentrations (c) with integrated volume unit conversion (cm³ ↔ dm³).
- **Mass Percent Hub:** Effortlessly determine the mass of both solute and solvent for percentage-based solutions.
- **Dilution Engine:** Practical c₁V₁ = c₂V₂ logic that automatically calculates the exact volume of stock solution and the required amount of water to add.
- **Professional Conversions:** Advanced conversion cards for switching between c, γ, and ω, accounting for density (ρ) and molar mass (M).
- **Recent Calculation History:** Stores up to six recent calculations in localStorage and lets users restore previous inputs.
- **Quick Input Presets:** Provides common Mass % and solution-mass combinations for faster data entry.
- **Consistent Precision:** Displays calculator results and history summaries with four decimal places while preserving calculation precision internally.
- **One-Click Copy:** Integrated clipboard functionality with smart formatting (📋 icon) for quick data transfer to lab notebooks.
- **Minimalist Lab UI:** A clean, distraction-free interface optimized for use in laboratory environments with a strict focus on scientific notation.
- **Intelligent Feedback System:** Custom toast notifications with clear validation and error messages instead of blocking alerts.
- **Accessibility Support:** Semantic tab and panel relationships, keyboard tab navigation, visible focus states, and live announcements for results and errors.

## 🛠️ Tech Stack

- **HTML5:** Semantic structure with a focus on logical input flow and accessibility.
- **CSS3:** Modern minimalist design using **CSS Variables**, Flexbox, and **Strict Text Transformation** rules to preserve lowercase scientific symbols (γ, ω).
- **JavaScript (ES6+):**
  - **State Management:** Implemented using a central `LabCalc` object to manage application state and logic.
  - **Event Delegation:** Optimized performance by handling interactions through dynamic event listeners.
  - **Keyboard Accessibility:** Integrated `Ctrl/Cmd + 1-4` shortcuts for a seamless laboratory workflow.
  - **Robust Validation:** Custom validation engine that prevents non-physical results (e.g., negative mass or concentrations exceeding 100%) and handles unavailable inputs safely.
  - **Smart Clipboard API:** Advanced copy logic with a reliable fallback for older browser environments.
  - **Strict Execution:** Runtime scripts use strict mode and deferred loading to improve safety and page initialization.

## 🧪 Educational Goals & Learning Outcomes

This project demonstrates proficiency in:

1. **Complex Algorithm Mapping:** Translating multi-variable chemical formulas into clean, efficient JavaScript code.
2. **State Management:** Handling real-time UI updates across multiple calculation modules without page reloads.
3. **UI/UX for Specialized Tools:** Creating a professional tool that prioritizes clarity and speed, avoiding unnecessary "bloat".
4. **Scientific Accuracy:** Maintaining strict adherence to international scientific standards in software naming and notation.

## 🚀 Roadmap

This project is under continuous development. The current release includes:

- [x] **Unit Testing:** Jest test suite implemented to verify calculation accuracy for core formulas.
- [x] **Calculation History:** Persistent recent-calculation panel with restore and clear-history actions.
- [x] **Quick Input Presets:** Common presets for faster Mass % calculator input.
- [x] **Accessibility Polish:** Keyboard navigation, ARIA relationships, focus management, and live error announcements.
- [x] **Error Handling:** Toast-based validation and safe handling of unexpected errors.
- [x] **Code Quality:** Strict mode for runtime scripts and deferred script loading.

## 🚀 Installation & Usage

1. Clone the repository or download the source code.
2. Open `index.html` in any modern web browser.
3. Choose your calculation tab and start preparing your solutions with 100% confidence.

## 🧪 Testing

This project uses **Jest** for unit testing to ensure calculation accuracy.

**Setup & Run Tests:**

```bash
npm install
npm test
```

Tests verify the core calculation logic across molarity, dilution, mass percent, and concentration conversion functions.

---

### 👩‍🔬 Author

**[Ivana Tatić]**
_Master of Organic Chemistry & Aspiring Web Developer_

Feel free to connect or check out my other projects!
