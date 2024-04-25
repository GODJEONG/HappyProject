<template>
  <!-- <button class="left: 90px" @click="handleTrainAnimationEnd()">click</button> -->
  <!-- 배경 이미지 -->
  <img alt="bg_img" src="@/assets/roll/back5.png" class="bg" />

  <!-- 뒤로가기 이미지 버튼 -->
  <router-link to="/roll1" class="decoBack">
    <img src="@/assets/roll/back.png" />
  </router-link>

  <div class="content">
    <div class="title">{{ name }} 님에게</div>
    <div class="title">도착한 메세지!</div>
  </div>

  <img alt="main_img" src="@/assets/roll/train.png" class="train" />

  <div v-if="showImg">
    <div @click="showMemo('deco1')" v-if="deco1_status" style="cursor: pointer">
      <img src="@/assets/roll/deco1.png" class="ribbon moving" />
      <!--리본-->
    </div>

    <div @click="showMemo('deco2')" v-if="deco2_status" style="cursor: pointer">
      <img src="@/assets/roll/deco2.png" class="party moving" />
      <!--폭죽-->
    </div>

    <div @click="showMemo('deco6')" v-if="deco6_status" style="cursor: pointer">
      <img src="@/assets/roll/deco6.png" class="party2 moving" />
      <!--하트-->
    </div>

    <div @click="showMemo('deco5')" v-if="deco5_status" style="cursor: pointer">
      <img src="@/assets/roll/deco5.png" class="msg moving" />
      <!--메세지-->
    </div>

    <div @click="showMemo('deco3')" v-if="deco3_status" style="cursor: pointer">
      <img src="@/assets/roll/deco3.png" class="headband moving" />
      <!--머리띠-->
    </div>

    <div @click="showMemo('deco4')" v-if="deco4_status" style="cursor: pointer">
      <img src="@/assets/roll/deco4.png" class="cake moving" />
      <!--케이크-->
    </div>

    <div @click="showMemo('deco8')" v-if="deco8_status" style="cursor: pointer">
      <img src="@/assets/roll/deco8.png" class="sunglasses moving" />
      <!--선글라스-->
    </div>

    <div @click="showMemo('deco7')" v-if="deco7_status" style="cursor: pointer">
      <img src="@/assets/roll/deco7.png" class="dog moving" />
      <!--강아지-->
    </div>

    <div @click="showMemo('deco9')" v-if="deco9_status" style="cursor: pointer">
      <img src="@/assets/roll/deco9.png" class="present moving" />
      <!--선물-->
    </div>
  </div>

  <!-- 메모내용 팝업창 -->
  <div v-if="isPopupVisible" class="popup">
    <div>
      {{ currentMemo }} <br /><br />
      <button class="popupButton" @click="closeMemo">닫기</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      name: this.$store.getters.getlogin_info.name,
      memos: [],

      deco1_status: false,
      deco2_status: false,
      deco3_status: false,
      deco4_status: false,
      deco5_status: false,
      deco6_status: false,
      deco7_status: false,
      deco8_status: false,
      deco9_status: false,

      isPopupVisible: false,
      currentMemo: "",
      showImg: false, // 이미지 표시 여부를 저장하는 데이터 속성 추가
    };
  },
  watch: {
    showImg() {},
  },
  created() {
    this.handleTrainAnimationEnd();
    this.getrollpaper();
  },
  methods: {

    showMemo(key) {
      this.key = key;
      console.log("showmemo");
      for (let i = 0; i < this.memos.length; i++) {
        console.log(this.memos[i].img);
        console.log('key' + key);
        if (this.memos[i].img == key) {
          console.log(this.memos[i]);
          console.log(this.memos[i].contents);
          this.currentMemo = this.memos[i].contents;
        } else {
          console.log("none");
        }
      }
      this.isPopupVisible = true;
    },

    closeMemo() {
      this.isPopupVisible = false;
      this.currentMemo = null;
    },

    getrollpaper() {
      let obj = {};
      obj.name = this.name;
      let url = "http://localhost:3000/getrollpaper";
      axios
        .get(url, {
          params: obj,
        })
        .then((res) => {
          console.log(res);
          if (res.data == null || res.data == "") {
            console.log("메모가 없습니다!!");
          } else {
            this.memos = res.data;
            console.log(this.memos);
            console.log(this.memos[0]);
            console.log(this.memos[0].img);

            this.iconshow();
          }
        });
    },

    iconshow() {
      for (let i = 0; i < this.memos.length; i++) {
        console.log(this.memos.length);
        let memoKey = `${this.memos[i].img}_status`;
        console.log(memoKey);
        this[memoKey] = true;
        console.log(this.deco1_status);
        console.log(this.deco2_status);
      }
    },
    handleTrainAnimationEnd() {
      // this.showImg =true;
      setTimeout(() => {
        this.showImg = true;
      }, 2100); // 기차 애니메이션의 지속 시간이 2초이므로, 2.1초 뒤에 이미지 표시
    },
  },
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

/* 공통부분 */
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
.decoBack {
  position: absolute;
  top: 20px; /* 좌측 상단으로부터의 거리 */
  left: 20px; /* 좌측 상단으로부터의 거리 */
  width: 50px;
}
.title {
  position: relative;
  text-align: center;
  margin-top: 0px;
  color: palevioletred;
  font-size: 30px; /* 글자 크기 */
  font-weight: 900; /* 글자 굵기 */
}
.content {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.button {
  padding: 10px 130px;
  margin-left: 10px;
  border-radius: 30px;
  border: none;
  background-color: palevioletred;
  color: white;
  cursor: pointer;
}

.train {
  position: absolute;
  max-width: 1400px;
  margin: 0;
  background-position: center top; /* 수직 중앙 정렬 */
  animation: moveTrain 2s linear; /* 애니메이션 적용 */
  bottom: 20px; /* 기차 위치 조정 */
  right: 0; /* 오른쪽 정렬 */
}
@keyframes moveTrain {
  0% {
    transform: translateX(100%); /* 초기 위치 설정: 오른쪽 끝 */
  }
  100% {
    transform: translateX(-20%); /* 최종 위치 설정: 화면 왼쪽의 일정 선 */
  }
}
/* 애니메이션 종료 후 기차 위치 고정 */
.train {
  animation-fill-mode: forwards;
}

/* 메모 */
.popup {
  position: fixed; /* 화면에 고정된 위치 */
  top: 50%; /* 수직 가운데로 */
  left: 50%; /* 수평 가운데로 */
  transform: translate(-50%, -50%); /* 화면 중앙 정렬 */
  padding: 10px 20px;

  background-color: #ffffe0; /* 배경색 */
  border: 5px dashed pink; /* 테두리 스타일 */
  border-radius: 30px; /* 테두리 둥글게 */
  color: hsla(0, 1%, 32%, 0.965); /* 글자색 */
  font-size: 25px; /* 글자 크기 */
  font-weight: bold; /* 글자 굵기 */
  font-family: Arial; /* 글꼴 */

  display: flex; /* 내용을 가운데 정렬하기 위해 */
  align-items: center; /* 수직 가운데 정렬 */
  justify-content: center; /* 수평 가운데 정렬 */
  z-index: 9999; /* 다른 모든 요소보다 높은 우선순위 */
  width: 30vh; /* 너비 */
  height: 40vh; /* 높이 */
}
.popupButton {
  margin-top: auto;
  padding: 10px 50px;
  margin-left: 10px;
  border-radius: 30px;
  border: none;
  background-color: palevioletred;
  color: white;
  cursor: pointer;
}

/* deco 장식 기본 설정 */
.image-row {
  display: flex;
  justify-content: center; /* 이미지를 가운데 정렬하고 */
  margin: 50px 50px; /* 위아래 여백은 50px, 오른쪽과 왼쪽 여백은 각각 100px */
}
.img-margin {
  margin: 0 20px; /* 원하는 만큼의 여백 설정 */
}
.moving {
  animation: bounce 2s ease-in-out infinite;
}
@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}
/* deco 장식 9가지 */
.ribbon {
  position: absolute;
  top: 550px; /* 작을수록 위쪽 */
  left: 615px; /* 작을수록 왼쪽 */
  width: 120px; /* 크기 */
  transform: translate(
    -50%,
    -50%
  ); /* 요소의 가로 및 세로 길이의 절반만큼 이동하여 중앙 정렬 */
  z-index: 1; /* 다른 요소보다 위로 올라오도록 설정 */
}
.party {
  position: absolute;
  top: 340px;
  left: 190px;
  width: 100px;
  transform: translate(-50%, -50%);
  z-index: 10;
}
.party2 {
  position: absolute;
  top: 360px;
  left: 965px;
  width: 90px;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.msg {
  position: absolute;
  top: 65px;
  left: 650px;
  width: 120px;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.headband {
  position: absolute;
  top: 410px;
  left: 1105px;
  width: 90px;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.dog {
  position: absolute;
  top: 440px;
  left: 1290px;
  width: 120px;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.cake {
  position: absolute;
  top: 440px;
  left: 1480px;
  width: 120px;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.sunglasses {
  position: absolute;
  top: 360px;
  left: 825px;
  width: 70px;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.present {
  position: absolute;
  top: 70px;
  left: 1180px;
  width: 120px;
  transform: translate(-50%, -50%);
  z-index: 1;
}
</style>