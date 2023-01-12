import axios from 'axios';

// Define the base URL for the API
const Domain = 'http://localhost:3000/';

// Define the base route for the API
const Route = `${Domain}api/`;

// Create an object to hold API methods
const ApiController = {
  // Define a method to GET the server using axios
  getServer:()=>axios.get(Route),
};

// Export the ApiController object as the default export
export default ApiController;