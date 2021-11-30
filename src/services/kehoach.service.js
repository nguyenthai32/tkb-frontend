import http from "../common/http";
import store from "../store";

class HocPhanService {
    constructor() {
        http.interceptors.request.use(config => {
            const user = store.getters.loggedInUser;
            if (user && user.accessToken) {
                config.headers.authorization = `Bearer ${user.accessToken}`;

            }
            return config;
        });
    }
    getAll() { return http.get("/kehoach"); }
    add(data) { return http.post('/kehoach', data) }
    delete(mahp) { return http.delete(`kehoach/${mahp}`) }
    getNhom() { return http.get('kehoach/getNhom') }
    getTkb(mahp, nhom) { return http.get(`kehoach/getTkb/${mahp}/${nhom}`) }
}


export default new HocPhanService();