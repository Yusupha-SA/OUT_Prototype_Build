# OUT_Prototype_Build
# OUT (Out Until Tomorrow)

OUT is a web app I'm building with a small team to help people in Romania find events happening in their city. It starts with Bucharest.

Most event apps are either for nightlife or for daytime stuff. We want both in one place. That means raves and concerts, but also pottery classes, picnics, talks and workshops. The idea is that you can open it, find something to do and close it again, or spend longer scrolling and planning if you want to.

## Where it's at

Right now this is an early prototype. It's a front end only and uses fake events, so we can test what feels and looks right before building the real thing. None of the venues, events or organisers in here are real.

## What the prototype is for

- Trying out a swipe style feed for finding events
- Testing different flyer and image shapes on the cards
- Checking what information people actually need to see on an event
- Working out how the four vibe categories feel to use

## Event data

All the fake events live in `events.json`. Each event has a title, description, category, start and end time, venue, price, ticket link, image, dress code, age restriction, organiser and whether it repeats. The four categories are placeholders for now (Wild, Cozy/Comfy, Inspiring and Thriving) and we'll change them once they're confirmed.

## How to run it

1. Clone the repo
2. Open the folder in VS Code
3. Right click `index.html` and choose Open with Live Server

You need a local server because the page loads `events.json` with fetch, and browsers block that if you just double click the file.

## Built with

Plain HTML, CSS and JavaScript for now. The full version will be a proper full stack app with a backend and a database, and I'll update this when the tech choices are made.

## What's next

1. Finish the prototype and test it with people
2. Build the real version with accounts, a database and real event data
3. Add check ins, points and customisable avatars later on

## About me

I'm Yusupha, a game developer moving into software development. I'm teaching myself full stack development by building real projects, and this is my third one.
