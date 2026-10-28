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

function createEventCard(eventData) {
  const card = document.createElement("li");
  card.classList.add("card");

  const title = document.createElement("h2");
  title.classList.add("card-title");
  title.textContent = eventData.title;
  card.appendChild(title);

  const venue = document.createElement("p");
  venue.classList.add("card-venue");
  venue.textContent = eventData.venue.name;
  card.appendChild(venue);

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