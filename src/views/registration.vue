<template>
  <div class="text-right">
    <v-row class="he" style="padding-block: 2%">
      <VCol cols="12" md="6" class="log">
        <img class="logo" src="@/assets/sc.png" alt="logo" />
        <h3 class="title">مدارس الياسمن الأهلية</h3>
      </VCol>
      <VCol cols="12" md="6" class="text-center">
        <h5 style="color: #757776">الأستمارة الألكترونية للمدرسة</h5>
      </VCol>
    </v-row>
    <VCard style="background-color: white">
      <VContainer class="text-right">
        <VForm v-model="addData.isFormValid">
          <VRow style="padding-block: 2%">
            <VCol :cols="file ? '6' : '12'" :md="file ? '3' : '6'">
              <v-file-input
                @change="onFileChange"
                show-size
                v-model="file"
                truncate-length="15"
                outlined
                label="صورة التلميذ"
                dense
                accept="image/*"
              ></v-file-input>
            </VCol>
            <v-img
              v-if="file"
              :src="student_image"
              contain
              style="width: 200px; height: 100px"
            ></v-img>
            <VCol cols="12" md="6">
              <v-text-field
                dir="rtl"
                label="اسم التلميذ الرباعي"
                :rules="Rules.required"
                v-model="student_name"
                outlined
                dense
                required
              >
              </v-text-field>
            </VCol>
            <VCol cols="12" md="6">
              <div
                class="d-flex align-center"
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <span class="subtitle-1 text-sm-h6 text-right">
                  : المرحلة الدراسية حاليآ
                </span>
                <v-radio-group v-model="student_class" inline dir="rtl">
                  <v-radio
                    label="الاول"
                    value="الاول"
                    color="primary"
                  ></v-radio>
                  <v-radio label="الثاني" value="الثاني" color="red"></v-radio>
                  <v-radio
                    label="الثالث"
                    value="الثالث"
                    color="yellow"
                  ></v-radio>
                  <v-radio label="الرابع" value="الرابع" color="gray"></v-radio>
                  <v-radio
                    label="الخامس"
                    value="الخامس"
                    color="black"
                  ></v-radio>
                  <v-radio
                    label="السادس"
                    value="السادس"
                    color="orange"
                  ></v-radio>
                </v-radio-group>
              </div>
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model="student_birthday"
                :rules="Rules.required"
                dense
                label="مواليد التلميذ"
                type="date"
                outlined
                clearable
              />
            </VCol>
            <VCol cols="12" md="6">
              <div
                class="d-flex align-center"
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <span class="subtitle-1 text-sm-h5"
                  >تسلسل التلميذ بين أخوته:</span
                >
                <v-radio-group v-model="student_brother_rank" inline dir="rtl">
                  <v-radio
                    label="الوحيد"
                    value="الوحيد"
                    color="primary"
                  ></v-radio>
                  <v-radio label="الاول" value="الاول" color="red"></v-radio>
                  <v-radio label="الوسط" value="الوسط" color="yellow"></v-radio>
                  <v-radio label="الاخير" value="الاخير" color="gray"></v-radio>
                </v-radio-group>
              </div>
            </VCol>
            <VCol cols="12" md="6">
              <v-text-field
                label="عدد الأخوة"
                :rules="Rules.required"
                type="number"
                v-model="student_brother_number"
                outlined
                dense
                required
              >
              </v-text-field>
            </VCol>
            <VCol cols="12" md="6">
              <div
                class="d-flex align-center"
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: space-between;
                "
              >
                <span class="subtitle-1 text-sm-h5"
                  >يقيم التلميذ مع الأبوين:</span
                >
                <v-radio-group
                  v-model="is_staying_with_his_fathers"
                  inline
                  dir="rtl"
                  class="ml-5"
                >
                  <v-radio label="نعم" :value="true" color="primary"></v-radio>
                  <v-radio label="كلا" :value="false" color="red"></v-radio>
                </v-radio-group>
              </div>
            </VCol>
            <VCol cols="12" md="6" v-if="!is_staying_with_his_fathers">
              <v-text-field
                outlined
                dense
                label="اذكر مع من يقيم التلميذ"
                v-model="student_staying_with"
              ></v-text-field>
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                label="التحصيل الدراسي للأب"
                :rules="Rules.required"
                v-model="father_degree"
                outlined
                dense
                required
              />
            </VCol>
            <VCol cols="12" md="6">
              <v-text-field
                label="مهنة الأب ومكان عمله"
                :rules="Rules.required"
                v-model="father_jop"
                outlined
                dense
                required
              >
              </v-text-field>
            </VCol>
            <VCol cols="12" md="6">
              <v-text-field
                label="التحصيل الدراسي للأم"
                v-model="mother_degree"
                :rules="Rules.required"
                outlined
                dense
                required
              >
              </v-text-field>
            </VCol>
            <VCol cols="12" md="6">
              <v-text-field
                label="مهنة الأم ومكان عملها"
                v-model="mother_jop"
                :rules="Rules.required"
                outlined
                dense
                required
              >
              </v-text-field>
            </VCol>
            <VCol cols="12" md="6">
              <v-text-field
                label="اسم الروضة سابقآ"
                v-model="past_Kindergarten"
                :rules="Rules.required"
                outlined
                dense
                required
              >
              </v-text-field>
            </VCol>
            <VCol cols="12" md="6">
              <v-text-field
                label="اسم المدرسة في الوقت الحالي"
                v-model="school_name"
                :rules="Rules.required"
                outlined
                dense
                required
              >
              </v-text-field>
            </VCol>
            <!-- past_school_reason -->
            <VCol cols="12" md="6">
              <v-textarea
                rows="1"
                label="سبب النقل من المدرسة الحالية"
                v-model="past_school_reason"
                :rules="Rules.required"
                outlined
                dense
                required
              >
              </v-textarea>
            </VCol>
            <!-- note for end user -->
            <VCol cols="12">
              <span class="subtitle-1 text-sm-h5"
                >* نرتأي لمصلحة التلميذ بقائه في مدرسته الحالية إذا لم يكن هناك
                سبب مقنع للنقل</span
              >
            </VCol>
            <!-- address -->
            <VCol cols="12">
              <v-row>
                <VCol cols="12" md="4">
                  <v-text-field
                    label="العنوان"
                    v-model="address"
                    :rules="Rules.required"
                    outlined
                    dense
                    required
                  >
                  </v-text-field>
                </VCol>
                <VCol cols="12" md="3">
                  <v-text-field
                    label="م"
                    v-model="address_m"
                    :rules="Rules.required"
                    outlined
                    dense
                    required
                  >
                  </v-text-field>
                </VCol>
                <VCol cols="12" md="3">
                  <v-text-field
                    label="ز"
                    v-model="address_z"
                    :rules="Rules.required"
                    outlined
                    dense
                    required
                  >
                  </v-text-field>
                </VCol>
                <VCol cols="12" md="2">
                  <v-text-field
                    label="د"
                    v-model="address_d"
                    :rules="Rules.required"
                    outlined
                    dense
                    required
                  >
                  </v-text-field>
                </VCol>
              </v-row>
            </VCol>
            <!-- nearest_landmark -->
            <VCol cols="12" md="6">
              <v-text-field
                label="أقرب نقطة دالة"
                v-model="nearest_landmark"
                :rules="Rules.required"
                outlined
                dense
                required
              >
              </v-text-field>
            </VCol>
            <!-- father_phone -->
            <VCol cols="12" md="6">
              <v-text-field
                label="رقم هاتف الأب"
                type="number"
                v-model="father_phone"
                :rules="[phoneNumberRule]"
                outlined
                dense
                required
              >
              </v-text-field>
            </VCol>
            <!-- mother_phone -->
            <VCol cols="12" md="6">
              <v-text-field
                label="رقم هاتف الأم"
                type="number"
                v-model="mother_phone"
                :rules="[phoneNumberRule]"
                outlined
                dense
                required
                border
              >
              </v-text-field>
            </VCol>
            <!-- btn -->
            <VCol cols="12">
              <v-btn
                block
                color="#757575"
                style="color: white"
                :loading="addData.loading"
                :disabled="!addData.isFormValid"
                @click="submitData"
              >
                <span class="register_btn hvr-float-shadow">التسجيل في الاستمارة</span>
                <v-icon>fa-file</v-icon>
              </v-btn>
            </VCol>
          </VRow>
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
import api from "@/api/register.js";

export default {
  data: () => ({
    menu2: false,
    date: null,
    student_name: null,
    student_image: null,
    student_birthday: null,
    student_class: "الاول",
    student_brother_number: 1,
    student_brother_rank: "الوحيد",
    is_staying_with_his_fathers: true,
    student_staying_with: null,
    father_degree: null,
    father_jop: null,
    mother_degree: null,
    mother_jop: null,
    past_Kindergarten: null,
    school_name: null,
    past_school_reason: null,
    address: null,
    address_m: null,
    address_z: null,
    address_d: null,
    nearest_landmark: null,
    father_phone: null,
    mother_phone: null,
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
      this.addData.loading = true;

      const response = await api.add({
        student_name: this.student_name,
        student_image: this.student_image,
        student_birthday: this.student_birthday,
        student_class: this.student_class,
        student_brother_number: this.student_brother_number,
        student_brother_rank: this.student_brother_rank,
        is_staying_with_his_fathers: this.is_staying_with_his_fathers,
        student_staying_with: this.student_staying_with,
        father_degree: this.father_degree,
        father_jop: this.father_jop,
        mother_degree: this.mother_degree,
        mother_jop: this.mother_jop,
        past_Kindergarten: this.past_Kindergarten,
        school_name: this.school_name,
        past_school_reason: this.past_school_reason,
        address: this.address,
        address_m: this.address_m,
        address_z: this.address_z,
        address_d: this.address_d,
        nearest_landmark: this.nearest_landmark,
        father_phone: this.father_phone,
        mother_phone: this.mother_phone,
      });

      if (response.status === 401) {
        this.$store.dispatch("submitLogout");
      } else if (response.status === 500) {
        this.addData.loading = false;
        this.showDialogfunction(response.data.results, "#FF5252");
      } else {
        this.addData.loading = false;
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
          this.student_image = base64;
        } else {
          this.student_image = null;
        }
      } else {
        this.student_image = null;
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
      if (this.file instanceof Blob) {
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
