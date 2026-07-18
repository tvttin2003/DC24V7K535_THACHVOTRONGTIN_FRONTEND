import createApiClient from "./api.service";

class ContactService {
    constructor(baseUrl = "/api/contacts") {
        this.api = createApiClient(baseUrl);
    }

    // Hàm phụ trợ tự động lấy cấu hình Header chứa ID người dùng đang đăng nhập
    getOptions() {
        const userId = localStorage.getItem("userId");
        return {
            headers: {
                "x-user-id": userId || "",
            }
        };
    }

    // --- Các API xác thực tài khoản ---
    async register(data) {
        return (await this.api.post("/../users/register", data)).data;
    }

    async login(data) {
        return (await this.api.post("/../users/login", data)).data;
    }

    async getAll() {
        return (await this.api.get("/", this.getOptions())).data;
    }
    async create(data) {
        return (await this.api.post("/", data, this.getOptions())).data;
    }
    async deleteAll() {
        return (await this.api.delete("/", this.getOptions())).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`, this.getOptions())).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data, this.getOptions())).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`, this.getOptions())).data;
    }
}

export default new ContactService();