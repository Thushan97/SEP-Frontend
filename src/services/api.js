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
            return await getInstance().get('user/forestOfficer');
        },
        addForestOfficer: async (data) => {
            return await getInstance().post('user/forestOfficer',data);
        },
        deleteForestOfficer: async (data) => {
            return await getInstance().post('user/deleteForestOfficer',data);
        },
        updateForestOfficer: async (data) => {
            return await getInstance().post('user/updateForestOfficer', data);
        },
        getForestId : async (data) => {
            return await getInstance().post('user/forestAdmin/forestId', data);
        },
        getForestArea: async (data) => {
            return await getInstance().get(`forest/area/${data}`);
        },
        addRestrictionAreas: async (data) => {
            return await getInstance().post(`forest/area/${data.forest_id}`,data)
        } 

    },

    auth : {
        login: async (data) => {
            return await getInstance().post('user/login',data);
        },
        register: async (data) => {
            return await getInstance().post('user/register',data);
        },
        logout: async (data) => {
            return await getInstance().post('user/logout',data);
        }
    },

    forestOfficer : {
        sendDate : async (data) => {
            return await getInstance().post('forest/get_tiles',data);
        },
        getTileDataByTileId : async (data) => {
            return await getInstance().post('forest/get_tile_details',data);
        },
        getImageByID : async (data) => {
            return await getInstance().get(`forest/get_tile_view/${data}`);
        },
        updateDetails: async (data) => {
            return await getInstance().post('user/forestOfficer/update', data);
        },
        getForestNameById: async (data) => {
            return await getInstance().get(`forest/get_forest_name/${data}`);
        },
        addForestDetails: async (data) => {
            return await getInstance().post('forest/add_forest_details', data);
        }
    },

    systemAdmin : {
        addForestAdmin : async (data) => {
            return await getInstance().post('user/forestAdmin', data);
        },
        getForestNamesAndIds: async () => {
            return await getInstance().get('forest/forestNames');
        }
    },

    activeInformationPage : {
        getPosts : async () => {
            return await getInstance().get('/forestpage');
        },
        getSinglePost : async (data) => {
            return await getInstance().get(`forestpage/d/${data}`);
        }
    }
}