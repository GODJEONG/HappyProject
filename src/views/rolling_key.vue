<template>
  <!-- <div id="app"> -->
  <!-- 배경 이미지 -->
  <img alt="bg_img" src="@/assets/roll/back5.png" class="bg" />

  <!-- 뒤로가기 이미지 버튼 -->
  <!-- <router-link to="/mainpage" class="decoBack">
      <img src="@/assets/roll/back.png">
    </router-link> -->

  <div>
    <img
      @click="gohome()"
      src="@/assets/home.png"
      class="max-w-4xl transition-transform duration-300 transform hover:scale-110 absolute right-3 mt-0 mr-8"
      style="max-width: 70px; z-index: 3"
    />
  </div>

  <!-- 입력 창 -->

  <div class="boxx">
    <div class="input-container">
      <div class="input-title">
        <p>내 열차<br />보러가기</p>
        <router-link to="/roll3" class="decoGo1">
          <img src="@/assets/roll/go.png" />
        </router-link>
      </div>
    </div>

    <div class="input-container">
      <div class="input-content">
        <p>열차<br />꾸며주기</p>
        <router-link to="/roll2" class="decoGo2">
          <img src="@/assets/roll/go.png" />
        </router-link>
      </div>
    </div>
  </div>

  <img
    src="@/assets/roll/princess.png"
    class="princess"
    style="
      position: fixed;
      bottom: 140px;
      left: 145px;
      right: 10px;
      z-index: 9999;
    "
  />

  <img
    src="@/assets/roll/castle.png"
    class="decoCastle"
    style="position: fixed; top: 20px; left: 1040px; right: 0px; z-index: 9999"
  />

  <div class="input-container">
    <div class="input-content">
      <p>열차<br />꾸며주기</p>
      <router-link to="/roll2" class="decoGo2">
        <img src="@/assets/roll/go.png" />
      </router-link>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    gohome() {
      this.$router.push("/mainpage");
    },
  },
  components: {},
};
</script>

<style>
#app {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center; /* 세로 가운데 정렬을 위해 추가 */
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 1000%;
  height: 1000%;
  object-fit: cover;
  z-index: -1;
}

.input-container {
  margin: 20px;
  width: 300px;
}

.input-title,
.input-content {
  height: 80px;
  padding: 20px;
  border: 5px dashed pink;
  border-radius: 30px;
  background-color: #ffffe0;

  color: hsla(0, 1%, 32%, 0.965);
  font-size: 25px;
  font-weight: bold;
  font-family: Arial;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30vh;
  height: 40vh;
}
.princess {
  width: 500px;
}
.decoCastle {
  width: 400px;
}
.decoBack {
  position: absolute;
  top: 20px; /* 좌측 상단으로부터의 거리 */
  left: 20px; /* 좌측 상단으로부터의 거리 */
  width: 50px;
}
.decoGo1 {
  width: 100px;
}
.decoGo2 {
  width: 100px;
}
</style>
