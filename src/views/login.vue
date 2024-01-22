<template>
  <div class="continer">
    <div class="content">
      <img class="logo" src="@/assets/alwizara-removebg-preview.png" alt="" />
      <div class="text">
        <span>جمهورية العراق</span>
        <h4>وزارة التربية محافظة المثنى</h4>
        <h4>المديرية العامة للتربية في المثنى</h4>
      </div>
    </div>
    <div class="login">
      <h1>تسجيل دخول</h1>
      <input type="text" class="orderNumber" placeholder="رقم الطلب" />
      <input type="text" class="idNumber" placeholder="رقم الهوية" />
      <v-btn block @click="$router.push('work_register')">تسجيل</v-btn>
    </div>
  </div>
</template>
// جمهورية العراق وزارة التربية محافظة المثنى المديرية العامة للتربية في المثنى

<style lang="scss" scoped>
@use "../styles/scss/mixins" as *;
@use "../styles/scss/vars" as *;
@use "../styles/scss/placeholders";
.continer {
  @extend %centering;
  flex-direction: row-reverse;
  height: 100vh;
  width: 100%;
  gap: 2rem;
  .content {
    @extend %centering;
    justify-content: space-evenly;
    width: 30%;
    height: 100%;
    background-color: #{$mainColor};
    .logo {
      width: 40%;
      margin-bottom: 0.5rem;
    }
    .text {
      span {
        font-size: 1.4rem;
        margin-bottom: 0.5rem;
        display: block;
      }
      padding: 1.5rem;
      text-align: center;
      width: 100%;
      color: #{$lastColor};
    }
  }
  .login {
    @extend %centering;
    padding-left: 2rem;
    gap: 2rem;
    width: 80%;
    h1 {
      font-size: 2.4rem;
    }
    .orderNumber,
    .idNumber {
      width: 100%;
      padding: 5px 15px;
      outline: none;
      direction: rtl;
      border-bottom: 1px solid #{$mainColor};
    }
  }
  .v-btn {
    background-color: #{$mainColor};
    color: #{$lastColor};
    width: 100%;
    border-radius: 8px;
    &:hover {
      background-color: #{$accColor};
    }
  }
}

@include maxQuery(1023px) {
  .login {
    padding-left: 0;
  }
  .continer {
    flex-direction: column;
    justify-content: start;
    .content {
      flex-direction: row;
      width: 100%;
      height: 30%;
      border-bottom-left-radius: 18px;
      border-bottom-right-radius: 18px;
      .logo {
        width: 30%;
        max-width: 150px;
      }
      .text {
        padding: 0;
        width: 50%;
        span {
          font-size: 1rem;
        }
        h4 {
          margin-top: 0.5rem;
          font-size: 0.9rem;
        }
      }
    }
  }
}
@include maxQuery(700px) {
  h1 {
    font-size: 1.8rem !important;
  }
}
</style>
