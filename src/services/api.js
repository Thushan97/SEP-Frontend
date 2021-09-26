import axios from 'axios';
    
const getInstance = () => {
    const instance = axios.create({
        baseURL: 'http://127.0.0.1:5000/',
        timeout: 30000
    });

    instance.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");
    return instance;
}

export const registerAccessToken = (token) => {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}

export const api = {
    forestAdmin : {
        registerForest: async (data) => {
            return await getInstance().post('forest/register',data);
        },
        getUsers: async (data) => {
            return await getInstance().get('users/forestAdmins');
        },
        addForestOfficer: async (data) => {
            return await getInstance().post('user/forestOfficer',data);
        }
    },

    auth : {
        login: async (data) => {
            return await getInstance().post('user/login',data);
        },
        register: async (data) => {
            return await getInstance().post('user/register',data);
        }
    },

    forestOfficer : {
        sendDate : async (data) => {
            return await getInstance().post('forest/get_tiles',data);
        },
        getTileDataByTileId : async (data) => {
            return await getInstance().post('forest/get_tile_details',data);
        }
    },

    systemAdmin : {
        addForestAdmin : async (data) => {
            return await getInstance().post('user/forestAdmin', data);
        }
    }
}