// ===== Feature 1: Contact form validation and preview =====
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const topicSelect = document.getElementById("topic");
const messageInput = document.getElementById("message");
const summaryBox = document.getElementById("form-summary");

// Shows an error under a field (or clears it if message is empty)
function showError(input, message) {
  document.getElementById(input.id + "-error").textContent = message;
}

// Checks that an email looks like text@text.text
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Adds one "Label: value" line to the preview (textContent keeps it safe)
function addSummaryLine(label, value) {
  const line = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = label + ": ";
  const text = document.createElement("span");
  text.textContent = value;
  line.appendChild(strong);
  line.appendChild(text);
  summaryBox.appendChild(line);
}

// Builds the preview shown after the form passes validation
function showSummary(name, email, topic, message) {
  summaryBox.textContent = "";
  const heading = document.createElement("h3");
  heading.textContent = "Form validated (browser demonstration only, nothing was sent)";
  summaryBox.appendChild(heading);
  addSummaryLine("Name", name);
  addSummaryLine("Email", email);
  addSummaryLine("Topic", topic);
  addSummaryLine("Message", message);
}

// Runs when the form is submitted: validates all three fields
function handleFormSubmit(event) {
  event.preventDefault(); // stop the page reloading
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
  let isValid = true;

  summaryBox.textContent = ""; // clear any old preview

  if (name === "") {
    showError(nameInput, "Please enter your name.");
    isValid = false;
  } else {
    showError(nameInput, "");
  }

  if (email === "") {
    showError(emailInput, "Please enter your email.");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError(emailInput, "Please enter a valid email, like name@example.com.");
    isValid = false;
  } else {
    showError(emailInput, "");
  }

  if (message === "") {
    showError(messageInput, "Please enter a message.");
    isValid = false;
  } else {
    showError(messageInput, "");
  }

  if (isValid) {
    showSummary(name, email, topicSelect.value, message);
  }
}

contactForm.addEventListener("submit", handleFormSubmit);
// ===== Feature 2: Theme switch (light / dark) =====
const themeButton = document.getElementById("theme-toggle");

// Switches between light and dark, and updates the button text
function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-theme");
  themeButton.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
  themeButton.setAttribute("aria-pressed", isDark);
}

themeButton.addEventListener("click", toggleTheme);
// ===== Feature 3: Gallery viewer =====
const galleryPhotos = document.querySelectorAll("#gallery figure");
const prevButton = document.getElementById("prev-photo");
const nextButton = document.getElementById("next-photo");
const photoCounter = document.getElementById("photo-counter");
let currentPhoto = 0;

// Shows only the current photo, updates the counter, and
// disables Previous on the first photo and Next on the last
function showPhoto(index) {
  galleryPhotos.forEach(function (photo, i) {
    photo.hidden = i !== index;
  });
  photoCounter.textContent = "Photo " + (index + 1) + " of " + galleryPhotos.length;
  prevButton.disabled = index === 0;
  nextButton.disabled = index === galleryPhotos.length - 1;
}

// Moves to the previous photo (does nothing on the first one)
function showPreviousPhoto() {
  if (currentPhoto > 0) {
    currentPhoto--;
    showPhoto(currentPhoto);
  }
}

// Moves to the next photo (does nothing on the last one)
function showNextPhoto() {
  if (currentPhoto < galleryPhotos.length - 1) {
    currentPhoto++;
    showPhoto(currentPhoto);
  }
}

prevButton.addEventListener("click", showPreviousPhoto);
nextButton.addEventListener("click", showNextPhoto);
showPhoto(currentPhoto);
// ===== Feature 4: Mobile navigation =====
const menuButton = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

// Opens or closes the menu and updates the button text and state
function toggleMenu() {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.textContent = isOpen ? "Close Menu" : "Menu";
  menuButton.setAttribute("aria-expanded", isOpen);
}

// Closes the menu after a link is tapped
function closeMenu() {
  navLinks.classList.remove("open");
  menuButton.textContent = "Menu";
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", toggleMenu);
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});