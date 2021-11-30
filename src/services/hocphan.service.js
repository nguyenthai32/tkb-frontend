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
    getAll() { return http.get("/hocphan"); }
    findbyMaHP(mahp) { return http.get(`/hocphan/${mahp}`); }
}


export default new HocPhanService();