// Imports the Express app
const app = require('./src/app');

// Sets the port on which the server will listen
const PORT = process.env.PORT || 3000;

// Starts the server and listens for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
