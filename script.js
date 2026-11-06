const CATEGORIES = [
  { id: "wild", label: "Wild" },
  { id: "cozy", label: "Cozy/Comfy" },
  { id: "curious", label: "Curious" },
  { id: "thriving", label: "Thriving" },
];

async function loadEvents() {
  const response = await fetch("events.json");
  const events = await response.json();
  showEvents(events);
  console.log(events);
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

function createFallback(eventData) {
  const fallback = document.createElement("div");
  fallback.classList.add("card-image", "card-fallback", `category-${eventData.categories[0]}`);
  fallback.textContent = eventData.title;
  return fallback;
}

function createEventCard(eventData) {
  const card = document.createElement("li");
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
  card.classList.add("card");

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

function showEvents(events) {
  const eventsContainer = document.getElementById("event-list");

  for (const eventData of events) {
    const card = createEventCard(eventData);
    eventsContainer.appendChild(card);
  }
}

loadEvents();