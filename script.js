async function loadEvents() {
  const response = await fetch("events.json");
  const events = await response.json();
  showEvents(events);
}

loadEvents();

function showEvents(events) {
  const eventsContainer = document.getElementById("event-list");

  for (const eventData of events) {
    const eventItem = document.createElement("li");
    eventItem.textContent = eventData.title;
    eventsContainer.appendChild(eventItem);
  }
}