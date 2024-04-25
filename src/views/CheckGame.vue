<template>
  <div class="app-container">
    <div class="relative">
      <img
        @click="gohome()"
        src="@/assets/home.png"
        class="max-w-4xl transition-transform duration-300 transform hover:scale-110 absolute right-3 mt-4 mr-8"
        style="max-width: 70px; z-index: 3"
      />
    </div>
    <div class="flex items-center justify-center h-screen">
      <div>
        <div class="text-4xl text-blue-900">{{ message }}</div>
        <div
          id="screen"
          :class="state"
          @click="onClickScreen"
          class="my-8 border 7px border-4 solid border-black-900 text-5xl"
        ></div>
        <br />
        <template v-if="result.length">
          <div class="text-3xl text-stone-600">평균 시간: {{ average }}ms</div>
          <button class="text-2xl text-red-600" @click="onReset">
            평균 기록 리셋
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;
export default {
  data() {
    return {
      result: [],
      state: "waiting",
      message: "▼화면을 클릭하면 게임을 시작합니다!▼",
    };
  },
  computed: {
    average() {
      return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0;
    },
  },
  methods: {
    gohome() {
      this.$router.push("/mainpage");
    },

    onReset() {
      this.result = [];
    },
    onClickScreen() {
      if (this.state === "waiting") {
        this.state = "ready";
        this.message = "조커가 나오면 클릭하세요.";
        timeout = setTimeout(() => {
          this.state = "now";
          this.message = "지금 클릭!";
          startTime = new Date();
        }, Math.floor(Math.random() * 1000) + 2000); // 2~3초
      } else if (this.state === "ready") {
        clearTimeout(timeout);
        this.state = "waiting";
        this.message = "너무 성급하시군요! 조커가 나오면 클릭하세요.";
      } else if (this.state === "now") {
        endTime = new Date();
        this.state = "end";
        this.message = "화면 클릭시 다시시작합니다!";
        this.result.push(endTime - startTime);
      } else if (this.state === "end") {
        this.state = "waiting";
        this.message = "▼화면을 클릭하면 게임을 시작합니다!▼";
        //this.result.push(endTime - startTime);
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: 국민연금체, 평창 평화체, Yeongdeok Snow Crab;
  font-weight: bold;
}

.app-container {
  background-image: url("@/assets/manittoback12.jpg");
  background-repeat: no-repeat; /* 이미지 반복 없음 */
  background-size: cover; /* 이미지를 요소에 맞게 확장 */
  background-position: center; /* 이미지를 가운데 정렬 */
}

#screen {
  width: 700px;
  height: 400px;
  text-align: center;
  user-select: none;
}
#screen.waiting {
  background-image: url("@/assets/gamestart.png");
  background-size: cover; /* 이미지를 요소에 맞게 확장 */
  background-position: center; /* 이미지를 가운데 정렬 */
}

#screen.ready {
  background-image: url("@/assets/waiting.jpg");
  background-size: cover; /* 이미지를 요소에 맞게 확장 */
  background-position: center; /* 이미지를 가운데 정렬 */
}
#screen.now {
  /* background-color: greenyellow; */
  background-image: url("@/assets/jocker.jpg");
  background-size: cover; /* 이미지를 요소에 맞게 확장 */
  background-position: center; /* 이미지를 가운데 정렬 */
}
#screen.end {
  background-image: url("@/assets/late.jpg");
  background-size: cover; /* 이미지를 요소에 맞게 확장 */
  background-position: center; /* 이미지를 가운데 정렬 */
}
</style>
