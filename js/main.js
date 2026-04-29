/**
 * LabCalc - Central Logic Hub
 * Modern ES6+ approach with event delegation and proper error handling
 */

// State management
const LabCalc = {
  core: null,
  currentTab: "molarity",
  // Initialize app
  init() {
    this.core = window.CalculatorCore;

    if (!this.core) {
      this.showError("Calculator module failed to load.");
      return;
    }

    this.setupEventListeners();
    this.setupKeyboardShortcuts();
  },

  // Setup all event listeners
  setupEventListeners() {
    // Tab navigation
    document.querySelectorAll(".tab-link").forEach((tab) => {
      tab.addEventListener("click", (e) => this.handleTabClick(e));
    });

    // Form submissions
    document.querySelectorAll(".calc-form").forEach((form) => {
      form.addEventListener("submit", (e) => this.handleFormSubmit(e));
    });

    // Copy buttons
    document.querySelectorAll(".copy-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const targetId = e.currentTarget.getAttribute("data-copy");
        this.copyValue(targetId, e.currentTarget);
      });
    });
  },

  // Keyboard shortcuts
  setupKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      // Ctrl/Cmd + 1-4 for tabs
      if ((e.ctrlKey || e.metaKey) && e.key >= "1" && e.key <= "4") {
        e.preventDefault();
        const tabs = document.querySelectorAll(".tab-link");
        tabs[parseInt(e.key) - 1]?.click();
      }
    });
  },

  // Tab switching
  handleTabClick(event) {
    const targetTab = event.currentTarget.getAttribute("data-tab");

    // Remove active from all
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });

    document.querySelectorAll(".tab-link").forEach((tab) => {
      tab.classList.remove("active");
      tab.setAttribute("aria-selected", "false");
    });

    // Add active to selected
    document.getElementById(targetTab)?.classList.add("active");
    event.currentTarget.classList.add("active");
    event.currentTarget.setAttribute("aria-selected", "true");
  },

  // Form submission router
  handleFormSubmit(event) {
    event.preventDefault();
    const calcType = event.target.getAttribute("data-calc");

    const calculations = {
      molarity: () => this.calculateMolarity(),
      "mass-percent": () => this.calculateMassPercent(),
      dilution: () => this.calculateDilution(),
      "c-to-gamma": () => this.convertCToGamma(),
      "w-to-c": () => this.convertWToC(),
      "w-to-gamma": () => this.convertWToGamma(),
    };

    if (calculations[calcType]) {
      calculations[calcType]();
    }
  },

  // Error display
  showError(message) {
    const toast = document.getElementById("error-toast");
    if (toast) {
      toast.textContent = message;
      toast.classList.remove("hidden");

      setTimeout(() => {
        toast.classList.add("hidden");
      }, 3000);
    } else {
      // Fallback to alert if toast element doesn't exist
      alert(message);
    }
  },

  // Input validation helper
  validateInputs(...inputs) {
    const values = inputs.map((id) =>
      parseFloat(document.getElementById(id).value),
    );

    if (values.some((v) => isNaN(v))) {
      this.showError("Please fill in all required fields");
      return null;
    }

    if (values.some((v) => v < 0)) {
      this.showError("Values cannot be negative");
      return null;
    }

    return values;
  },

  // Update result display
  updateResult(selector, value) {
    const element = document.querySelector(selector);
    if (element) {
      element.textContent =
        typeof value === "number" ? value.toFixed(4) : value;
    }
  },

  // CALCULATIONS

  // 1. Molarity: m = c * V * M
  calculateMolarity() {
    const values = this.validateInputs("mol-c", "mol-v", "mol-m");
    if (!values) return;

    try {
      const [c, v, m] = values;
      const unit = document.getElementById("mol-v-unit").value;
      const mass = this.core.calculateMolarityMass(c, v, m, unit);

      this.updateResult("#res-molarity .output", mass);
    } catch (error) {
      this.showError(error.message);
    }
  },

  // 2. Mass Percent: ms = (w/100) * mr
  calculateMassPercent() {
    const values = this.validateInputs("perc-w", "perc-mr");
    if (!values) return;

    try {
      const [w, mr] = values;
      const { ms, mw } = this.core.calculateMassPercent(w, mr);

      this.updateResult("#res-percent .output-s", ms);
      this.updateResult("#res-percent .output-w", mw);
    } catch (error) {
      this.showError(error.message);
    }
  },

  // 3. Dilution: c1V1 = c2V2
  calculateDilution() {
    const values = this.validateInputs("dil-c1", "dil-c2", "dil-v2");
    if (!values) return;

    try {
      const [c1, c2, v2] = values;
      const unitV2 = document.getElementById("dil-v2-unit").value;
      const { v1, vWater } = this.core.calculateDilution(c1, c2, v2, unitV2);

      this.updateResult("#res-dilution .output-v1", v1.toFixed(2));
      this.updateResult("#res-dilution .output-water", vWater.toFixed(2));
    } catch (error) {
      this.showError(error.message);
    }
  },

  // 4. Conversions: c → γ (γ = c * M)
  convertCToGamma() {
    const values = this.validateInputs("conv-c", "conv-m-mass");
    if (!values) return;

    try {
      const [c, m] = values;
      const gamma = this.core.convertCToGamma(c, m);

      this.updateResult("#res-gamma .output", gamma.toFixed(2));
    } catch (error) {
      this.showError(error.message);
    }
  },

  // 5. Conversions: ω → c (c = (ω * ρ * 10) / M)
  convertWToC() {
    const values = this.validateInputs(
      "conv-w-to-c",
      "conv-rho-to-c",
      "conv-m-molar",
    );
    if (!values) return;

    try {
      const [w, rho, m] = values;
      const c = this.core.convertWToC(w, rho, m);

      this.updateResult("#res-w-to-c .output", c);
    } catch (error) {
      this.showError(error.message);
    }
  },

  // 6. Conversions: ω → γ (γ = ω * ρ * 10)
  convertWToGamma() {
    const values = this.validateInputs("conv-w-to-gamma", "conv-rho-to-gamma");
    if (!values) return;

    try {
      const [w, rho] = values;
      const gamma = this.core.convertWToGamma(w, rho);

      this.updateResult("#res-w-to-gamma .output", gamma.toFixed(2));
    } catch (error) {
      this.showError(error.message);
    }
  },

  //  COPY FUNCTIONALITY

  copyValue(containerId, buttonElement) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const outputs = container.querySelectorAll(
      ".output, .output-s, .output-w, .output-v1, .output-water",
    );
    let textToCopy = "";

    if (outputs.length === 1) {
      textToCopy = outputs[0].textContent;
    } else if (containerId === "res-percent") {
      textToCopy = `Solute: ${outputs[0].textContent}g, Water: ${outputs[1].textContent}g`;
    } else if (containerId === "res-dilution") {
      textToCopy = `Stock V1: ${outputs[0].textContent}cm³, Add Water: ${outputs[1].textContent}cm³`;
    }

    if (!textToCopy || textToCopy.includes("—")) {
      this.showError("No result to copy");
      return;
    }

    this.copyToClipboard(textToCopy)
      .then(() => {
        this.showCopySuccess(buttonElement);
      })
      .catch(() => {
        this.showError("Failed to copy to clipboard");
      });
  },

  // Clipboard with fallback
  copyToClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    } else {
      // Fallback for non-HTTPS or older browsers
      return new Promise((resolve, reject) => {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-999999px";
        document.body.appendChild(textarea);
        textarea.select();

        try {
          document.execCommand("copy");
          document.body.removeChild(textarea);
          resolve();
        } catch (error) {
          document.body.removeChild(textarea);
          reject(error);
        }
      });
    }
  },

  // Visual feedback for copy
  showCopySuccess(button) {
    const originalText = button.textContent;
    button.textContent = "✅";
    button.classList.add("success");

    setTimeout(() => {
      button.textContent = originalText;
      button.classList.remove("success");
    }, 1500);
  },
};

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => LabCalc.init());
} else {
  LabCalc.init();
}
