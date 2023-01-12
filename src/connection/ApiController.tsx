import axios from 'axios';
const Domain = 'http://localhost:3000/';
const Route = `${Domain}api/`;
const ApiController = {
        getServer:()=>axios.get(Route),
};
export default ApiController;


