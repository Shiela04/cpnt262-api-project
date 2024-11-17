# Weather Dashboard Mini Project

This is a simple weather dashboard web app that fetches live weather data for any city in the world using API. Users can enter their name and get a personalized greeting. Users can also select their preferred temperature unit (celsius or fahrenheit) and search weather by city name.

## Author name

Shiela Daguio

## Attributions

- API: [Weatherbit.io](https://www.weatherbit.io/)
- Images: [Unsplash](https://unsplash.com/)

## Pseudo code

This outlines the flow of the application

**When page loads:**

- Loads saved preferences (ussername, temperature unit, and last searched city)
- Displays username and preferred temperature unit

**When "save name" button is clicked:**

- Saves the username in local storage and sets a cookie
- Displays a personalized greeting with the name that was entered

**When "get weather" button is clicked:**

- Saves the preferred unit in the local storage
- If no city is entered, it shows an error message
- Saves the city in current session

**If the API response is successfull:**

Displays weather details

**If the API response is unsuccessful or cannot find city:**

Shows an error message

## License

This project is licensed under the MIT lincense. See the [LICENSE](LICENSE.md) file for details.
