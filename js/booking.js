/* booking.js — booking form: validation, submit to Google Apps Script, success/error states. */

(function () {
  // ---------------------------------------------------------------
  // Google Apps Script Web App endpoint
  // ---------------------------------------------------------------
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzsf-y-eDaq_35-o3NPlHMhTXDuxMBfjsY0gx2iubWSmiZ91CiWl4tvHJYYmu-X8G5vNA/exec";

  const form = document.getElementById("bookingForm");
  const submitBtn = document.getElementById("submitBtn");
  const statusEl = document.getElementById("formStatus");

  const fields = {
    name: { input: document.getElementById("name"), error: document.getElementById("nameError") },
    eventname: { input: document.getElementById("eventname"), error: document.getElementById("eventnameError") },
    phone: { input: document.getElementById("phone"), error: document.getElementById("phoneError") },
    date: { input: document.getElementById("date"), error: document.getElementById("dateError") }
  };

  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  const phonePattern = /^[0-9+\-\s()]{7,15}$/;

  function clearFieldErrors() {
    Object.values(fields).forEach(({ input, error }) => {
      input.removeAttribute("aria-invalid");
      error.textContent = "";
    });
  }

  function setFieldError(key, message) {
    fields[key].input.setAttribute("aria-invalid", "true");
    fields[key].error.textContent = message;
  }

  function validate() {
    clearFieldErrors();
    let valid = true;

    if (!fields.name.input.value.trim()) {
      setFieldError("name", "Please enter your name.");
      valid = false;
    }
    if (!fields.eventname.input.value.trim()) {
      setFieldError("eventname", "Please enter an event name.");
      valid = false;
    }
    const phoneVal = fields.phone.input.value.trim();
    if (!phoneVal) {
      setFieldError("phone", "Please enter a phone number.");
      valid = false;
    } else if (!phonePattern.test(phoneVal)) {
      setFieldError("phone", "Enter a valid phone number.");
      valid = false;
    }
    const dateVal = fields.date.input.value.trim();
    if (!dateVal) {
      setFieldError("date", "Please enter a date.");
      valid = false;
    } else if (!datePattern.test(dateVal)) {
      setFieldError("date", "Use DD/MM/YYYY format.");
      valid = false;
    }

    return valid;
  }

  function showSuccess() {
    statusEl.textContent = "Thank you! Your function has been booked — we'll be in touch shortly.";
    statusEl.className = "form-status success";
    form.reset();
    clearFieldErrors();
    submitBtn.disabled = false;
    submitBtn.textContent = "Book Your Function";
    if (typeof window.triggerFireworks === "function") {
      window.triggerFireworks();
    }
  }

  function showError() {
    statusEl.textContent = "Something went wrong. Please try again in a moment.";
    statusEl.className = "form-status error";
    submitBtn.disabled = false;
    submitBtn.textContent = "Book Your Function";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!validate()) {
      statusEl.textContent = "Please fix the highlighted fields.";
      statusEl.className = "form-status error";
      return;
    }

    const name = fields.name.input.value.trim();
    const eventname = fields.eventname.input.value.trim();
    const phone = fields.phone.input.value.trim();
    const date = fields.date.input.value.trim();

    submitBtn.disabled = true;
    submitBtn.textContent = "Booking...";
    statusEl.textContent = "";
    statusEl.className = "form-status";

    const url = SCRIPT_URL + "?" + new URLSearchParams({ name, eventname, phone, date });

    fetch(url, { method: "GET", mode: "no-cors" })
      .then(() => showSuccess())
      .catch(() => showError());
  });
})();
