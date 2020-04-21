const express = require("express");
const app = express();
const body = require("body-parser");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const oAuth2Client = new OAuth2(
  "182495443400-t5askoj4laqtm778c0i9puqlrlkjif9p.apps.googleusercontent.com",
  "4P2s2lwhIK377rUy0BUk2j45"
);

oAuth2Client.setCredentials({
  refresh_token:
    "1//04DD89oh4DlTzCgYIARAAGAQSNwF-L9IrzRcAISiCygn3Lg7jAvDFkKAkd5dqvdZKBH6Ft7QyQVqHK6rkarUAiN2T-vqoLIDWpzc",
});

const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

// let eventName = "init";
// let eventLocation = "init";
// let eventDescription = "init";
// let venueLink = "https://google.com/maps/search/";

//let eventsList = [];

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");

calendar.events.list(
  {
    calendarId: "michael@a2zeta.com",
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: "startTime",
  },
  (err, res) => {
    if (err) {
      return console.log("The API returned an error: " + err);
    }
    if (res) {
      eventsList = JSON.stringify(res.data.items);
    }
  }
);

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/events", function (req, res) {
  res.render("events", { eventsLists: eventsList });
});

app.get("/contact", function (req, res) {
  res.render("contact");
});

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});
