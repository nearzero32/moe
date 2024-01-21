<template>
<div class="continer">
  <div class="content">
    <img src="@/assets/alwizara-removebg-preview.png" alt="">
  </div>
  <div class="login">
    <h1>Login</h1>
      <input type="text" class="orderNumber" placeholder="شماره سفارش">
      <input type="text" class="idNumber" placeholder="شماره سفارش">
      <v-btn block>Login</v-btn>
  </div>
</div>
</template>
// جمهورية العراق وزارة التربية محافظة المثنى المديرية العامة لتربية للتربية في المثنى

<style lang="scss" scoped>

@mixin query($size){
  @media (max-width: #{$size}){
    @content;
  }
}
  $minWidth:100%;
  $mainColor: salmon;
  $accColor: yellow;
  // vars
  %centering{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  // placeHoldrs
  }
  .continer{
    @extend %centering;
    flex-direction: row-reverse;
    height: 100vh;
    width: 100%;
  }
  .login{
    @extend %centering;
    gap: 2rem;
    width: 80%;
    h1{
      font-size: 2.4rem;
    }
    .orderNumber,.idNumber{
      width: 100%;
      background-color: #{$mainColor} ;
      padding: 5px 15px ;
      outline: none;
      direction: rtl;
      border-bottom: 1px solid #{$accColor};
    }
  }
</style>
