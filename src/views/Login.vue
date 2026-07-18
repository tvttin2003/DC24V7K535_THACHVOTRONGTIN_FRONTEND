<template>
  <div class="page mt-5">
    <div class="card p-4 shadow-sm">
      <h3 class="text-center mb-4">Đăng Nhập Hệ Thống</h3>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label>Tài khoản</label>
          <input v-model="username" type="text" class="form-control" required placeholder="Nhập username..."/>
        </div>
        <div class="form-group">
          <label>Mật khẩu</label>
          <input v-model="password" type="password" class="form-control" required placeholder="Nhập password..."/>
        </div>
        <p v-if="error" class="text-danger small">{{ error }}</p>
        <button type="submit" class="btn btn-primary btn-block">Đăng nhập</button>
      </form>
      <div class="text-center mt-3">
        <span class="small">Chưa có tài khoản? </span>
        <router-link :to="{ name: 'register' }" class="small">Đăng ký ngay</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ContactService from "@/services/contact.service";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await ContactService.login({
          username: this.username,
          password: this.password,
        });
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("username", response.username);
        this.$router.push({ name: "contactbook" });
      } catch (err) {
        this.error = err.response?.data?.message || "Đăng nhập thất bại. Vui lòng thử lại.";
      }
    },
  },
};
</script>