<script>
export default {
  props: {
    contact: { type: Object, required: true },
  },
};
</script>

<template>
  <div>
    <div class="p-1">
      <strong>Tên:</strong>
      {{ contact.name }}
    </div>
    <div class="p-1">
      <strong>E-mail:</strong>
      {{ contact.email }}
    </div>
    <div class="p-1">
      <strong>Địa chỉ:</strong>
      {{ contact.address }}
    </div>
    <div class="p-1">
      <strong>Điện thoại:</strong>
      {{ contact.phone }}
    </div>
    <!-- ĐÃ ĐỔI: Hiển thị danh sách sở thích thay cho Liên hệ yêu thích -->
    <div class="p-1">
      <strong>Sở thích:</strong>
      <span v-if="contact.hobbies && contact.hobbies.length > 0">
        <span 
          v-for="hobby in contact.hobbies" 
          :key="hobby" 
          class="badge badge-info mr-1"
        >
          {{ hobby }}
        </span>
      </span>
      <span v-else class="text-muted small">Không có sở thích nào được chọn</span>
    </div>
  </div>
</template>