<template>
  <div class="page mt-5">
    <div class="card p-4 shadow-sm">
      <h3 class="text-center mb-4">Đăng Ký Tài Khoản</h3>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Tài khoản mới</label>
          <input v-model="username" type="text" class="form-control" required placeholder="Tên đăng nhập..."/>
        </div>
        <div class="form-group">
          <label>Mật khẩu</label>
          <input v-model="password" type="password" class="form-control" required placeholder="Mật khẩu bảo mật..."/>
        </div>
        <p v-if="error" class="text-danger small">{{ error }}</p>
        <button type="submit" class="btn btn-success btn-block">Đăng ký tài khoản</button>
      </form>
      <div class="text-center mt-3">
        <span class="small">Đã có tài khoản? </span>
        <router-link :to="{ name: 'login' }" class="small">Đăng nhập</router-link>
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
    async handleRegister() {
      try {
        await ContactService.register({
          username: this.username,
          password: this.password,
        });
        alert("Đăng ký tài khoản mới thành công! Tiến hành đăng nhập.");
        this.$router.push({ name: "login" });
      } catch (err) {
        this.error = err.response?.data?.message || "Đăng ký thất bại.";
      }
    },
  },
};
</script>