import axios from 'axios';

class FirebaseApiClient {
    client = 'https://astrobyte-6bc9c-default-rtdb.europe-west1.firebasedatabase.app/'
    constructor(databaseURL) {
        this.URL = databaseURL;
    }

    async fetchData() {
        try {
            const response = await axios.get(`${this.client}${this.URL}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}
export default FirebaseApiClient;
