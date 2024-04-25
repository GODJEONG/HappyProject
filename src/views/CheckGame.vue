<template>
  <div>
    <div
      id="screen"
      :class="state"
      @click="onClickScreen"
      class="my-8 border 7px border-8 solid border-black-800"
    >
      {{ message }}
    </div>
    <template v-if="result.length">
      <div>평균 시간: {{ average }}ms</div>
      <button @click="onReset">리셋</button>
    </template>
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
      message: "클릭하면 게임이 시작합니다!",
    };
  },
  computed: {
    average() {
      return this.result.reduce((a, c) => a + c, 0) / this.result.length || 0;
    },
  },
  methods: {
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
        this.message = "너무 성급하시군요! 초록색이 된 후에 클릭하세요.";
      } else if (this.state === "now") {
        endTime = new Date();
        this.state = "waiting";
        this.message = "게임을 다시 하시려면 \n 화면을 클릭하세요!";
        this.result.push(endTime - startTime);
      }
    },
  },
};
</script>

<style scoped>
#screen {
  width: 300px;
  height: 200px;
  text-align: center;
  user-select: none;
}
#screen.waiting {
  background-color: aqua;
}
#screen.ready {
  background-color: red;
  color: white;
}
#screen.now {
  /* background-color: greenyellow; */
  background-image: url("@/assets/jocker.jpg");
  background-size: cover; /* 이미지를 요소에 맞게 확장 */
  background-position: center; /* 이미지를 가운데 정렬 */
}
</style>
