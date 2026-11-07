const CATEGORIES = [
  { id: "wild", label: "Wild" },
  { id: "cozy", label: "Cozy/Comfy" },
  { id: "curious", label: "Curious" },
  { id: "thriving", label: "Thriving" },
];

// State: things the page needs to remember
let events = [];        // all the events, filled in when the page loads
let currentIndex = 0;   // which event we are showing
let savedIds = JSON.parse(localStorage.getItem("savedIds")) || [];

// Buttons on the page
const skipButton = document.getElementById("skip-button");
const saveButton = document.getElementById("save-button");

const DATA_DATE = new Date("2026-10-21T00:00"); // the day the fake events were written for

function getDaysToShift() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((today - DATA_DATE) / msPerDay);
}

async function loadEvents() {
  const response = await fetch("events.json");
  events = await response.json();
  showCurrentEvent();
  console.log("days to shift:", getDaysToShift());
}

function formatPrice(price) {
  if (price === 0) {
    return "Free";
  }
  return `${price} RON`;
}

function formatDate(start) {
  const date = new Date(start);
  return date.toLocaleString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function getCategoryLabel(categoryId) {
  const category = CATEGORIES.find((item) => item.id === categoryId);
  return category.label;
}

function isSaved(eventData) {
  return savedIds.includes(eventData.id);
}

function updateSaveButton() {
  const currentEvent = events[currentIndex];
  saveButton.textContent = isSaved(currentEvent) ? "Saved" : "Save";
}

function createFallback(eventData) {
  const fallback = document.createElement("div");
  fallback.classList.add("card-image", "card-fallback", `category-${eventData.categories[0]}`);
  fallback.textContent = eventData.title;
  return fallback;
}

function createEventCard(eventData) {
  const card = document.createElement("li");
  card.classList.add("card");

  if (eventData.image) {
    const image = document.createElement("img");
    image.classList.add("card-image");
    image.src = eventData.image;
    image.alt = eventData.title;
    image.addEventListener("error", () => {
      image.replaceWith(createFallback(eventData));
    });
    card.appendChild(image);
  } else {
    card.appendChild(createFallback(eventData));
  }

  const title = document.createElement("h2");
  title.classList.add("card-title");
  title.textContent = eventData.title;
  card.appendChild(title);

  const venue = document.createElement("p");
  venue.classList.add("card-venue");
  venue.textContent = eventData.venue.name;
  card.appendChild(venue);

  const categoryRow = document.createElement("div");
  categoryRow.classList.add("card-categories");

  for (const categoryId of eventData.categories) {
    const tag = document.createElement("span");
    tag.classList.add("card-category", `category-${categoryId}`);
    tag.textContent = getCategoryLabel(categoryId);
    categoryRow.appendChild(tag);
  }

  card.appendChild(categoryRow);

  const price = document.createElement("p");
  price.classList.add("card-price");
  price.textContent = formatPrice(eventData.price);
  card.appendChild(price);

  const date = document.createElement("p");
  date.classList.add("card-date");
  date.textContent = formatDate(eventData.start);
  card.appendChild(date);

  return card;
}

function showCurrentEvent() {
  const eventsContainer = document.getElementById("event-list");
  eventsContainer.innerHTML = "";

  const card = createEventCard(events[currentIndex]);
  eventsContainer.appendChild(card);

  updateSaveButton();
}

function showNextEvent() {
  currentIndex = (currentIndex + 1) % events.length;
  showCurrentEvent();
}

skipButton.addEventListener("click", showNextEvent);

saveButton.addEventListener("click", () => {
  const currentEvent = events[currentIndex];

  if (!isSaved(currentEvent)) {
    savedIds.push(currentEvent.id);
    localStorage.setItem("savedIds", JSON.stringify(savedIds));
  }

  updateSaveButton();
});

loadEvents();