<template>
  <div class="text-right">
    <VCard style="background-color: white">
      <VContainer class="text-right">
        <VForm v-model="addData.isFormValid">
          <v-row class="mt-10">
            <!-- name -->
          <div class="inputField" id="">
              <v-text-field
                label="الاسم الثلاثي"
                :rules="Rules.required"
                v-model="data_upload.name"
              >
              </v-text-field>
          </div>
            <div class="images">
              <div class="warning">
                <span class="iIcon">i</span>
                <h6>
                  اضغط علامة <span class="inlineIcon">+</span> لأضافة المستمسكات
                  و الصور المطلوبة
                </h6>
              </div>
              <div class="imgContainer">
                <!-- <div class="title">أدخل صورة هويتك</div> -->
                <div class="imgBox">
                  <button class="addBtn">+</button>
                  <h4>البطاقة الوطنية ( الوجه )</h4>
                </div>
              </div>
              <div class="imgContainer">
                <!-- <div class="title">أدخل صورة هويتك</div> -->
                <div class="imgBox">
                  <button class="addBtn">+</button>
                  <h4>البطاقة الوطنية ( الكَفة )</h4>
                </div>
              </div>
              <div class="imgContainer">
                <!-- <div class="title">أدخل صورة هويتك</div> -->
                <div class="imgBox">
                  <button class="addBtn">+</button>
                  <h4>البطاقة الوطنية ( الكَفة )</h4>
                </div>
              </div>
            </div>
            <!-- btn -->
            <v-col cols="12">
              <v-btn
                block
                color="#757575"
                style="color: white"
                :loading="addData.loading"
                :disabled="!addData.isFormValid"
                @click="submitData"
              >
                <span class="register_btn">ارسال</span>
                <v-icon>fa-file-invoice</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </VForm>
      </VContainer>
    </VCard>
    <!--- Dialog for show info to user-->
    <v-dialog v-model="dialogData.open" max-width="500px">
      <v-toolbar :color="dialogData.color" dense></v-toolbar>
      <v-card>
        <v-card-title class="headline justify-center">
          {{ dialogData.bodyText }}
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialogData.open = false">
            تم
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import work_register_api from "@/api/work_register";

export default {
  data: () => ({
    menu2: false,

    date: null,

    social_status_items: ["اعزب", "متزوج", "مطلق", "ارمل"],

    data_upload: {
      name: null,
      image: null,
      birthday: null,
      degree: null,
      college: null,
      year_graduate: null,
      phone1: null,
      phone2: null,
      social_status: "اعزب",
      last_work: null,
      nearest_landmark: null,
      address: null,
      address_m: null,
      address_d: null,
      address_z: null,
    },

    years: [],

    file: null,

    Rules: {
      required: [(value) => !!value || "الحقل مطلوب"],
    },

    dialogData: {
      open: false,
      color: "primary",
      bodyText: "test",
    },

    addData: {
      isFormValid: false,
      loading: false,
    },
  }),

  mounted() {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1960; year--) {
      this.years.push(year);
    }
  },
  watch: {
    file: {
      handler(newFile, oldFile) {
        if (newFile !== null) {
          if (newFile.length > 0) {
            console.log("تم اختيار ملف جديد:");
          } else {
            this.student_image = null;
            this.file = null;
          }
        }
      },
      deep: true,
    },
  },

  methods: {
    async submitData() {
      if (this.data_upload.image === null) {
        this.showDialogfunction("يجب اختيار صورة", "#FF5252");
        return;
      }

      this.addData.loading = true;

      const response = await work_register_api.add({
        name: this.data_upload.name,
        image: this.data_upload.image,
        birthday: this.data_upload.birthday,
        degree: this.data_upload.degree,
        college: this.data_upload.college,
        year_graduate: this.data_upload.year_graduate,
        phone1: this.data_upload.phone1,
        phone2: this.data_upload.phone2,
        social_status: this.data_upload.social_status,
        last_work: this.data_upload.last_work,
        nearest_landmark: this.data_upload.nearest_landmark,
        address: this.data_upload.address,
        address_m: this.data_upload.address_m,
        address_d: this.data_upload.address_d,
        address_z: this.data_upload.address_z,
      });

      if (response.status === 401) {
        this.$store.dispatch("submitLogout");
      } else if (response.status === 500) {
        this.addData.loading = false;
        this.showDialogfunction(response.data.results, "#FF5252");
      } else {
        this.addData.loading = false;
        this.data_upload.name = null;
        this.data_upload.image = null;
        this.data_upload.birthday = null;
        this.data_upload.degree = null;
        this.data_upload.college = null;
        this.data_upload.year_graduate = null;
        this.data_upload.phone1 = null;
        this.data_upload.phone2 = null;
        this.data_upload.social_status = null;
        this.data_upload.last_work = null;
        this.data_upload.nearest_landmark = null;
        this.data_upload.address = null;
        this.data_upload.address_m = null;
        this.data_upload.address_d = null;
        this.data_upload.address_z = null;
        this.file = null;

        this.showDialogfunction(response.data.results, "primary");
      }
    },

    showDialogfunction(bodyText, color) {
      this.dialogData.open = true;
      this.dialogData.bodyText = bodyText;
      this.dialogData.color = color;
    },

    async onFileChange() {
      if (Array.isArray(this.file) && this.file.length > 0) {
        const files = this.file[0];
        if (files instanceof Blob) {
          const toBase64 = (files) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(files);
              reader.onload = () => resolve(reader.result);
              reader.onerror = (error) => reject(error);
            });

          const base64 = await toBase64(files);
          this.data_upload.image = base64;
        } else {
          this.data_upload.image = null;
        }
      } else {
        this.data_upload.image = null;
      }
    },

    phoneNumberRule(value) {
      const regex = /^07\d{9}$/;
      if (!value) {
        return "الحقل مطلوب";
      } else if (!value.match(regex)) {
        return "يجب كتابة رقم صحيح";
      }
      return true;
    },
  },

  computed: {
    url() {
      if (this.file) {
        return URL.createObjectURL(this.file);
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use "../styles/scss/mixins" as *;
@use "../styles/scss/vars" as *;
@use "../styles/scss/placeholders";

.images {
  @extend %centering;
  flex-direction: row;
  width: 100%;
  margin: 12px;
  gap: 1rem;
  .warning {
    @extend %centering;
    flex-wrap: nowrap;
    justify-content: flex-start;
    flex-direction: row-reverse;
    padding: 0 10px;
    width: 100%;
    background-color: $lastColor;
    border-bottom: solid 1px $mainColor;
    h6 {
      margin-right: 10px;
      .inlineIcon {
        font-size: 1.8rem;
        color: $mainColor;
      }
    }
    .iIcon {
      font-size: 1.5rem;
      background-color: $accColor;
      color: $mainColor;
      display: block;
      text-align: center;
      border: dashed 2px $mainColor;
      border-radius: 50%;
      height: 30px;
      aspect-ratio: 1;
      line-height: 23px;
    }
  }
  .imgContainer {
    width: calc(100% / 2 - 1rem);
    background-color: $lastColor;
    height: 200px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    cursor: pointer;
    @include minQuery(600px) {
      width: 100%;
    }
    .title {
      background-color: $mainColor;
      border-top-left-radius: 16px;
      border-top-right-radius: 16px;
      padding: 4px 16px;
      color: $lastColor;
    }
    .imgBox {
      @extend %centering;
      border: dashed 3px $mainColor;
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
      //style (2)
      //border-top: none; // <== commenting this line
      border-radius: 16px;
      height: 100%; // heigth 100% for style (2) and calc(100% - 34px) for main style
    }
    .addBtn {
      color: $mainColor;
      font-size: 3rem;
    }
  }
}
</style>
