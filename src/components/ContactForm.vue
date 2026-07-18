<template>
  <Form @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label for="name">Tên</label>
      <Field 
        name="name" 
        type="text" 
        class="form-control" 
        v-model="contactLocal.name"
      />
      <ErrorMessage name="name" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="email">E-mail</label>
      <Field 
        name="email" 
        type="email" 
        class="form-control" 
        v-model="contactLocal.email"
      />
      <ErrorMessage name="email" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <Field 
        name="address" 
        type="text" 
        class="form-control" 
        v-model="contactLocal.address"
      />
      <ErrorMessage name="address" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="phone">Điện thoại</label>
      <Field 
        name="phone" 
        type="tel" 
        class="form-control" 
        v-model="contactLocal.phone"
      />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>

    <!-- ĐÃ ĐỔI: Phần chọn tối đa 10 Sở Thích -->
    <div class="form-group">
      <label><strong>Sở thích liên hệ:</strong></label>
      <div class="row px-3">
        <div 
          v-for="hobby in availableHobbies" 
          :key="hobby" 
          class="col-6 form-check mb-2"
        >
          <input 
            type="checkbox" 
            class="form-check-input" 
            :id="hobby"
            :value="hobby"
            v-model="contactLocal.hobbies" 
          />
          <label :for="hobby" class="form-check-label">{{ hobby }}</label>
        </div>
      </div>
    </div>

    <div class="form-group mt-4">
      <button type="submit" class="btn btn-primary">Lưu</button>
      <button v-if="contactLocal._id" type="button" class="ml-2 btn btn-danger" @click="deleteContact">
        Xóa
      </button>
      <button type="button" class="ml-2 btn btn-secondary" @click="Cancel">
        Thoát
      </button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["submit:contact", "delete:contact"],
  props: {
    contact: { type: Object, required: true }
  },
  data() {
    const contactFormSchema = yup.object().shape({
      name: yup
        .string()
        .required("Tên phải có giá trị.")
        .min(2, "Tên phải ít nhất 2 ký tự.")
        .max(50, "Tên có nhiều nhất 50 ký tự."),
      email: yup
        .string()
        .email("E-mail không đúng.")
        .max(50, "E-mail tối đa 50 ký tự."),
      address: yup.string().max(100, "Địa chỉ tối đa 100 ký tự."),
      phone: yup
        .string()
        .matches(
          /((09|03|07|08|05)+([0-9]{8})\b)/, 
          "Số điện thoại không hợp lệ."
        ),
    });
    return {
      contactLocal: { 
        ...this.contact,
        hobbies: this.contact.hobbies || [] // Khởi tạo mảng trống nếu chưa có
      },
      contactFormSchema,
      // Danh sách đúng 10 sở thích theo yêu cầu của toi
      availableHobbies: [
        "Nghe nhạc",
        "Thể thao",
        "Khám phá",
        "Làm việc",
        "Đam mê xe",
        "Âm nhạc",
        "Chơi nhạc cụ",
        "Xem phim",
        "Chơi game",
        "Đọc sách"
      ],
    };
  },
  watch: {
    contact: {
      handler(val) {
        this.contactLocal = { 
          ...val,
          hobbies: val.hobbies || []
        };
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    submitContact() {
      this.$emit("submit:contact", this.contactLocal);
    },
    deleteContact() {
      this.$emit("delete:contact", this.contactLocal._id);
    },
    Cancel() {
      const reply = window.confirm('You have unsaved changes! Do you want to leave?');
      if (reply) {
        this.$router.push({ name: "contactbook" });
      }
    },
  },
};
</script>

<style scoped>
.error-feedback {
  color: red;
}
</style>