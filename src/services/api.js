import axios from 'axios';

const getInstance = () => {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:5000/',
        timeout: 30000
      });
    return instance; 
};

export const registerAccessToken = (token) => {
    axios.defaults.headers["authorization"] = `Bearer ${token}`;
}

export const api = {
    systemAdmin : {
        getCordinates: async (data) => {
            return await getInstance().post('',data);
        },
        editCordinates: async (data) => {
            return await getInstance().put('',data);
        },
        deleteCordinates: async (data) => {
            return await getInstance().delete('',data);
        }
    },

    auth : {
        login: async (data) => {
            return await getInstance().post('user/login',data);
        },
        register: async (data) => {
            return await getInstance().post('user/register',data);
        }
    }
}