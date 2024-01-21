<template>
  <div class="text-right">
    <v-row class="he" style="padding-block: 2%">
      <VCol cols="12" md="6" class="log">
        <img class="logo" src="@/assets/sc.png" alt="logo" />
        <h3 class="title">مدارس الياسمن الأهلية</h3>
      </VCol>
      <VCol cols="12" md="6" class="text-center">
        <h5 style="color: #757776">الأستمارة الألكترونية للروضة</h5>
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
              :src="image"
              contain
              style="width: 200px; height: 100px"
            ></v-img>
            <VCol cols="12" md="6">
              <v-text-field
                label="اسم الطفل الرباعي"
                :rules="Rules.required"
                v-model="name"
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
                <span class="subtitle-1 text-sm-h6"
                  >المرحلة الدراسية حاليآ:</span
                >
                <v-radio-group v-model="currentStage" inline dir="rtl">
                  <v-radio label="NG" value="NG" color="primary"></v-radio>
                  <v-radio label="PG" value="PG" color="red"></v-radio>
                  <v-radio label="KG1" value="KG1" color="yellow"></v-radio>
                  <v-radio label="KG2" value="KG2" color="gray"></v-radio>
                </v-radio-group>
              </div>
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                v-model="birthday"
                :rules="Rules.required"
                dense
                label="مواليد الطفل"
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
                <v-radio-group v-model="sequence" inline dir="rtl">
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
                v-model="brotherNumbers"
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
                  v-model="liveWithParents"
                  inline
                  dir="rtl"
                  class="ml-5"
                >
                  <v-radio label="نعم" :value="true" color="primary"></v-radio>
                  <v-radio label="كلا" :value="false" color="red"></v-radio>
                </v-radio-group>
              </div>
            </VCol>
            <VCol cols="12" md="6" v-if="!liveWithParents">
              <v-text-field
                outlined
                dense
                label="اذكر مع من يقيم التلميذ"
                v-model="reason"
              ></v-text-field>
            </VCol>
            <VCol cols="12" md="6">
              <VTextField
                label="التحصيل الدراسي للأب"
                :rules="Rules.required"
                v-model="fathersStudy"
                outlined
                dense
                required
              />
            </VCol>
            <VCol cols="12" md="6">
              <v-text-field
                label="مهنة الأب ومكان عمله"
                :rules="Rules.required"
                v-model="fathersJob"
                outlined
                dense
                required
              >
              </v-text-field>
            </VCol>
            <VCol cols="12" md="6">
              <v-text-field
                label="التحصيل الدراسي للأم"
                v-model="mothersStudy"
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
                v-model="mothersJob"
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
                v-model="previouslyKindergartenName"
                :rules="Rules.required"
                outlined
                dense
                required
              >
              </v-text-field>
            </VCol>
            <VCol cols="12" md="6">
              <v-textarea
                rows="1"
                label="سبب النقل من الروضة السابقة"
                v-model="reasonSchoolName"
                :rules="Rules.required"
                outlined
                dense
                required
              >
              </v-textarea>
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
                    v-model="house"
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
                    v-model="alley"
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
                    v-model="locality"
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
                v-model="nearestPoint"
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
                v-model="fatherPhone"
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
                v-model="motherPhone"
                :rules="[phoneNumberRule]"
                outlined
                dense
                required
                border
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
                  >هل لدى الطفل اي نوع من الحساسية:</span
                >
                <v-radio-group
                  v-model="is_allergic"
                  inline
                  dir="rtl"
                  class="ml-5"
                >
                  <v-radio label="نعم" :value="true" color="primary"></v-radio>
                  <v-radio label="كلا" :value="false" color="red"></v-radio>
                </v-radio-group>
              </div>
            </VCol>
            <VCol cols="12" md="6">
              <v-text-field
                label="هل لدى الطفل اي نوع من الامراض المزمنة"
                v-model="diseases"
                :rules="Rules.required"
                outlined
                dense
                required
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
import api from "@/api/register";

export default {
  data: () => ({
    menu2: false,
    date: null,
    name: null,
    image: null,
    birthday: null,
    currentStage: "NG",
    brotherNumbers: 1,
    sequence: "الوحيد",
    liveWithParents: true,
    reasonSchoolName: null,
    fathersStudy: null,
    fathersJob: null,
    mothersStudy: null,
    mothersJob: null,
    previouslyKindergartenName: null,
    // previouslyKindergartenName: null,
    reason: null,
    address: null,
    house: null,
    alley: null,
    locality: null,
    nearestPoint: null,
    fatherPhone: null,
    motherPhone: null,
    file: null,
    is_allergic: false,
    allergic: null,
    diseases: null,
    father_name: null,
    father_signature: null,
    mother_signature: null,

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

      const response = await api.addKindergarten({
        name: this.name,
        image: this.image,
        birthday: this.birthday,
        currentStage: this.currentStage,
        brotherNumbers: this.brotherNumbers,
        sequence: this.sequence,
        liveWithParents: this.liveWithParents,
        reason: this.reason,
        fathersStudy: this.fathersStudy,
        fathersJob: this.fathersJob,
        mothersStudy: this.mothersStudy,
        mothersJob: this.mothersJob,
        previouslyKindergartenName: this.previouslyKindergartenName,
        reasonSchoolName: this.reasonSchoolName,
        address: this.address,
        house: this.house,
        alley: this.alley,
        locality: this.locality,
        nearestPoint: this.nearestPoint,
        fatherPhone: this.fatherPhone,
        motherPhone: this.motherPhone,
        is_allergic: this.is_allergic,
        allergic: this.allergic,
        diseases: this.diseases,
      });

      if (response.status === 401) {
        this.$store.dispatch("submitLogout");
      } else if (response.status === 500) {
        this.addData.loading = false;
        this.showDialogfunction(response.data.message, "#FF5252");
      } else {
        this.addData.loading = false;
        this.showDialogfunction(response.data.message, "primary");
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
          this.image = base64;
        } else {
          this.image = null;
        }
      } else {
        this.image = null;
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
