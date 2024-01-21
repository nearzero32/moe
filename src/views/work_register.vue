<template>
  <div class="text-right">
    <v-row class="he" style="padding-block: 2%">
      <VCol cols="12" md="6" class="log">
        <img class="logo" src="@/assets/sc.png" alt="logo" />
        <h3 class="title">مدارس الياسمن الأهلية</h3>
      </VCol>
      <VCol cols="12" md="6" class="text-center">
        <h5 style="color: #757776">الأستمارة الألكترونية لطلب التعيين</h5>
      </VCol>
    </v-row>
    <VCard style="background-color: white">
      <VContainer class="text-right">
        <VForm v-model="addData.isFormValid">
          <v-row class="mt-10">
          <!-- name -->
          <v-col cols="12" md="6">
            <v-text-field
              label="الاسم الثلاثي"
              :rules="Rules.required"
              v-model="data_upload.name"
              outlined
              dense
              required
            >
            </v-text-field>
          </v-col>
          <v-col :cols="file ? '6' : '12'" :md="file ? '3' : '6'">
            <v-file-input
              @change="onFileChange"
              show-size
              v-model="file"
              truncate-length="15"
              outlined
              label="الصورة"
              dense
              accept="image/*"
            ></v-file-input>
          </v-col>
          <v-col cols="6" md="3" v-if="file">
            <v-img
              :src="data_upload.image"
              contain
              style="width: 200px; height: 100px"
            ></v-img>
          </v-col>
          <!-- birthday -->
          <v-col cols="12" md="4">
            <VTextField
                v-model="data_upload.birthday"
                :rules="Rules.required"
                dense
                label="المواليد"
                type="date"
                outlined
                clearable
              />
          </v-col>
          <!-- degree -->
          <v-col cols="12" md="4">
            <v-text-field
              label="التحصيل الدراسي"
              :rules="Rules.required"
              v-model="data_upload.degree"
              outlined
              dense
              required
            >
            </v-text-field>
          </v-col>
          <!-- college -->
          <v-col cols="12" md="4">
            <v-text-field
              label="الجامعة"
              :rules="Rules.required"
              v-model="data_upload.college"
              outlined
              dense
              required
            >
            </v-text-field>
          </v-col>
          <!-- year_graduate -->
          <v-col cols="12" md="4">
            <v-autocomplete
              v-model="data_upload.year_graduate"
              :rules="Rules.required"
              :items="years"
              label="سنة التخرج"
              outlined
              dense
              required
            />
          </v-col>
          <!-- phone1 -->
          <v-col cols="12" md="4">
            <v-text-field
              label="رقم الهاتف 1"
              type="number"
              v-model="data_upload.phone1"
              :rules="[phoneNumberRule]"
              outlined
              dense
              required
            >
            </v-text-field>
          </v-col>
          <!-- phone2 -->
          <v-col cols="12" md="4">
            <v-text-field
              label="رقم الهاتف 2"
              type="number"
              v-model="data_upload.phone2"
              :rules="[phoneNumberRule]"
              outlined
              dense
              required
            >
            </v-text-field>
          </v-col>
          <!-- address -->
          <v-col cols="12">
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  label="العنوان"
                  v-model="data_upload.address"
                  :rules="Rules.required"
                  outlined
                  dense
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  label="م"
                  v-model="data_upload.address_m"
                  :rules="Rules.required"
                  outlined
                  dense
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="3">
                <v-text-field
                  label="ز"
                  v-model="data_upload.address_z"
                  :rules="Rules.required"
                  outlined
                  dense
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="2">
                <v-text-field
                  label="د"
                  v-model="data_upload.address_d"
                  :rules="Rules.required"
                  outlined
                  dense
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <!-- nearest_landmark -->
          <v-col cols="12" md="4">
            <v-text-field
              label="أقرب نقطة دالة"
              v-model="data_upload.nearest_landmark"
              :rules="Rules.required"
              outlined
              dense
              required
            >
            </v-text-field>
          </v-col>
          <!-- nearest_landmark -->
          <v-col cols="12" md="4">
            <v-select
              v-model="data_upload.social_status"
              :items="social_status_items"
              :rules="Rules.required"
              outlined
              dense
              required
            >
            </v-select>
          </v-col>
          <!-- nearest_landmark -->
          <v-col cols="12" md="4">
            <v-text-field
              label="العمل سابقا"
              v-model="data_upload.last_work"
              :rules="Rules.required"
              outlined
              dense
              required
            >
            </v-text-field>
          </v-col>
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

<style scoped>
.log {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.he {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-image: url("@/assets/yasmin-website.jpg");
  background-size: cover;
  background-repeat: no-repeat;
}
.title {
  font-size: 1rem;
  font-weight: 700;
  color: #757776;
  margin-bottom: 1rem;
}

.logo {
  width: 100px;
  height: 100px;
}
.v-selection-control-group--inline {
  flex-direction: row;
  flex-wrap: wrap;
  flex-direction: row-reverse !important;
}
</style>
