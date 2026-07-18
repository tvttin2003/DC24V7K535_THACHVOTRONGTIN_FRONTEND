<template>
  <div class="page row">
    <div class="col-12">
      <InputSearch v-model="searchText" />
    </div>
    
    <div class="col-12 mt-2">
      <div class="input-group">
        <div class="input-group-prepend">
          <label class="input-group-text" for="hobbyFilter">Lọc theo sở thích</label>
        </div>
        <select class="custom-select" id="hobbyFilter" v-model="selectedHobby" @change="filterByHobby">
          <option value="">-- Tất cả sở thích --</option>
          <option v-for="hobby in hobbiesList" :key="hobby" :value="hobby">
            {{ hobby }}
          </option>
        </select>
      </div>
    </div>

    <div class="mt-3 col-12">
      <h4>
        Danh bạ
        <i class="fas fa-address-book"></i>
      </h4>
      <ContactList
        v-if="filteredContacts.length > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có liên hệ nào.</p>

      <div class="mt-3 d-flex justify-content-start align-items-center" style="gap: 10px;">
        <button class="btn btn-sm btn-primary" @click="refreshList">
          <i class="fas fa-redo"></i> Làm mới
        </button>

        <button class="btn btn-sm btn-success" @click="goToAddContact">
          <i class="fas fa-plus"></i> Thêm mới
        </button>

        <button class="btn btn-sm btn-danger" @click="removeAllContacts">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>
    
   
    <div class="mt-4 col-12">
      <div v-if="activeContact" class="card p-3 shadow-sm">
        <h4>
          <i class="fas fa-info-circle"></i>
        </h4>
        <ContactCard :contact="activeContact" />
        <div class="mt-2">
          <router-link
            :to="{
              name: 'contact.edit',
              params: { id: activeContact._id },
            }"
          >
            <span class="badge badge-warning p-2 text-dark" style="cursor: pointer;">
              <i class="fas fa-edit"></i> Hiệu chỉnh
            </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactCard from "@/components/ContactCard.vue";
import ContactService from "@/services/contact.service";

export default {
  components: {
    InputSearch,
    ContactList,
    ContactCard,
  },
  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
      selectedHobby: "",
      hobbiesList: [
        "Nghe nhạc", "Thể thao", "Khám phá", "Làm việc", "Đam mê xe",
        "Âm nhạc", "Chơi nhạc cụ", "Xem phim", "Chơi game", "Đọc sách"
      ],
    };
  },
  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },
  computed: {
    contactStrings() {
      return this.contacts.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join("");
      });
    },
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      return this.contacts.filter((_contact, index) =>
        this.contactStrings[index].toLowerCase().includes(this.searchText.toLowerCase())
      );
    },
    activeContact() {
      if (this.activeIndex < 0) return null;
      return this.filteredContacts[this.activeIndex];
    },
  },
  methods: {
    async retrieveContacts() {
      try {
        if (this.selectedHobby) {
          this.contacts = await ContactService.api.get(`/?hobby=${this.selectedHobby}`, ContactService.getOptions()).then(res => res.data);
        } else {
          this.contacts = await ContactService.getAll();
        }
      } catch (error) {
        console.log(error);
      }
    },
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },
    async filterByHobby() {
      this.searchText = ""; 
      this.activeIndex = -1;
      await this.retrieveContacts();
    },
    async removeAllContacts() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },
    goToAddContact() {
      this.$router.push({ name: "contact.add" });
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>