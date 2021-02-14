# reaktor-assignment-2021

My solution to the 2021 Reaktor [junior developer assignment](https://www.reaktor.com/junior-dev-assignment/), powered by [Svelte](https://svelte.dev), [Express](https://expressjs.com) and [Socket.IO](https://socket.io).

## Running

The application runs on Heroku, and can be accessed [here](TODO).

## Development

To get started on development, simply clone the repository and install the dependencies with `npm i`. After that, the following scripts may prove helpful:

- `npm start`: Starts the sirv web server. Not recommended to be run stand-alone.
- `npm run dev`: Starts the Rollup live reload server. Recommended setup for UI development.
- `npm run start:server`: Starts the Express/Socket.IO server that also provides the web UI.
- `npm run dev:server`: Starts the server component with Nodemon-powered live-reloading enabled.
- `npm test`: Run the linter.