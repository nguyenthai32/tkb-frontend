import http from "../common/http";
import store from "../store";

class TkbService {
    constructor() {
        http.interceptors.request.use(config => {
            const user = store.getters.loggedInUser;
            if (user && user.accessToken) {
                config.headers.authorization = `Bearer ${user.accessToken}`;

            }
            return config;
        });
    }
    getAll() { return http.get("/tkb"); }
    add(data) { return http.post('/tkb', data) }
    xoa(id) { return http.delete(`/tkb/${id}`) }


}


export default new TkbService();