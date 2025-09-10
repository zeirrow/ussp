const siteName = "U.S.S.P.";
const nameOutputs = document.querySelectorAll(".site-name-output");

nameOutputs.forEach((el) => {
  el.textContent = siteName;
});

const featherIcons = `
        <symbol id="users" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <path d="M20 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="15.5" cy="7" r="4"></circle>
        </symbol>
        <symbol id="barber-shop" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M14.5 19.5h-5M8.5 22h7"></path>
            <path d="M12 17V2a2 2 0 0 0-2-2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4"></path>
            <path d="M10 21a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2v-2"></path>
        </symbol>
        <symbol id="camera" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <path d="M15 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
            <path d="M10.5 5.5a2.5 2.5 0 0 0-5 0"></path>
            <path d="M18.5 5.5a2.5 2.5 0 0 0-5 0"></path>
            <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3.5a2.5 2.5 0 0 1 5 0h3.5a2 2 0 0 1 2 2v10z"></path>
        </symbol>
        <symbol id="desktop" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
            <line x1="8" y1="21" x2="16" y2="21"></line>
            <line x1="12" y1="17" x2="12" y2="21"></line>
        </symbol>
    `;
document.body.insertAdjacentHTML(
  "afterbegin",
  `<svg class="hidden">${featherIcons}</svg>`
);

// Animation for fade-in elements
document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeInOptions = {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  };

  const fadeInObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, fadeInOptions);

  fadeElements.forEach((element) => {
    fadeInObserver.observe(element);
  });
});

// Form validation
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const inputs = form.querySelectorAll("input, textarea");

  // Validation patterns
  const patterns = {
    name: /^[a-zA-Z\s]{2,50}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    business: /^[a-zA-Z0-9\s\-&',.]{0,100}$/,
    message: /^[\s\S]{10,1000}$/,
  };

  // Error messages
  const errorMessages = {
    name: "Please enter a valid name (2-50 characters, letters and spaces only)",
    email: "Please enter a valid email address",
    business:
      "Business name can only contain letters, numbers, spaces, and basic punctuation",
    message: "Please enter a message between 10 and 1000 characters",
  };

  // Add event listeners to all inputs
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      validateField(this);
    });

    input.addEventListener("input", function () {
      clearError(this);
    });
  });

  // Form submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    let isValid = true;
    inputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (!isValid) {
      document.getElementById("form-error").classList.remove("hidden");
      document.getElementById("form-success").classList.add("hidden");
      form.classList.add("shake");
      setTimeout(() => form.classList.remove("shake"), 500);
      return;
    }

    await submitForm();
  });

  // Validate a single field
  function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);

    clearError(field);

    if (field.hasAttribute("required") && value === "") {
      showError(field, errorElement, "This field is required");
      return false;
    }

    if (!field.hasAttribute("required") && value === "") {
      return true;
    }

    if (!patterns[fieldName].test(value)) {
      showError(field, errorElement, errorMessages[fieldName]);
      return false;
    }

    field.classList.add("border-green-500");
    return true;
  }

  function showError(field, errorElement, message) {
    field.classList.remove("border-gray-300", "border-green-500");
    field.classList.add("border-red-500");

    errorElement.textContent = message;
    errorElement.classList.add("show");
  }

  function clearError(field) {
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);

    field.classList.remove("border-red-500", "border-green-500");
    field.classList.add("border-gray-300");

    errorElement.textContent = "";
    errorElement.classList.remove("show");

    document.getElementById("form-error").classList.add("hidden");
  }

  // Real API submission
  async function submitForm() {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    submitButton.classList.add("opacity-75");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.value,
          email: form.email.value,
          business: form.business.value,
          message: form.message.value,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        document.getElementById("form-success").classList.remove("hidden");
        document.getElementById("form-error").classList.add("hidden");
        form.reset();
        inputs.forEach((input) =>
          input.classList.remove("border-green-500", "border-red-500")
        );
      } else {
        throw new Error("Failed to send");
      }
    } catch (err) {
      document.getElementById("form-error").classList.remove("hidden");
      document.getElementById("form-success").classList.add("hidden");
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
      submitButton.classList.remove("opacity-75");
    }
  }
});
