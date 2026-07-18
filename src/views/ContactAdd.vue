<template>
  <div class="page">
    <h4>Thêm Liên hệ Mới</h4>
    <ContactForm
      :contact="newContact"
      @submit:contact="createContact"
    />
    <p>{{ message }}</p>
  </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    ContactForm,
  },
  data() {
    return {
      newContact: {
        name: "",
        email: "",
        address: "",
        phone: "",
        hobbies: [], // Khởi tạo mảng trống sẵn ở đây
      },
      message: "",
    };
  },
  methods: {
    async createContact(data) {
      try {
        await ContactService.create(data);
        alert("Thêm liên hệ mới thành công.");
        this.$router.push({ name: "contactbook" });
      } catch (error) {
        console.log(error);
        this.message = "Đã có lỗi xảy ra khi thêm liên hệ.";
      }
    },
  },
};
</script>