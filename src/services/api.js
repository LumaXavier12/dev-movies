import axios from 'axios'

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: '1ba0af5d7dacf08d39bf69748d8555fd',
        language: 'pt-BR',
        page: 1
    }

})

export default api