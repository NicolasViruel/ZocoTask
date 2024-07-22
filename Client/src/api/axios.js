//configuramos axios y su domino base
import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true //para que establezca las cookies ahi
})

export default instance