<script>
import AppHeader from "@/components/AppHeader.vue";

export default {
  components: {
    AppHeader,
  },
  data() {
    return {
      username: localStorage.getItem("username") || "",
    };
  },
  computed: {
    // Chỉ hiển thị lời chào nếu ĐÃ ĐĂNG NHẬP và KHÔNG PHẢI ở trang login/register
    showUserNav() {
      const isLoggedIn = !!localStorage.getItem("userId");
      const isAuthPage = this.$route.name === "login" || this.$route.name === "register";
      return isLoggedIn && !isAuthPage;
    }
  },
  watch: {
    $route() {
      this.username = localStorage.getItem("username") || "";
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<template>
  <div id="app">
    <AppHeader />
    
    <!-- ĐÃ CHỈNH SỬA: Sử dụng showUserNav để ẩn hoàn toàn ở trang Login/Register -->
    <div v-if="showUserNav" class="container mt-2 text-right text-secondary">
      <span>Xin chào, <strong>{{ username }}</strong>! </span>
      <button class="btn btn-sm btn-outline-danger ml-2" @click="logout">Đăng xuất</button>
    </div>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>