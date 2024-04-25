<template>
  <div id="app">
    <!-- 배경 이미지 -->
    <img alt="bg_img" src="@/assets/roll/back5.png" class="bg" />

    <!-- 뒤로가기 이미지 버튼 -->
    <router-link to="/roll1" class="decoBack">
      <img src="@/assets/roll/back.png" />
    </router-link>

    <!-- 입력 창1 -->
    <div v-if="showFrame1" class="basicFrame">
      <img
        src="@/assets/roll/princess.png"
        class="princess"
        style="
          position: fixed;
          bottom: 12px;
          left: 145px;
          right: 10px;
          z-index: 9999;
        "
      />

      <div class="title">
        누구에게 메세지를 보낼까요 ?

        <div class="container">
          <!-- 사용자에게 검색 대상을 입력받는 부분 -->
          <input
            type="text"
            v-model="searchName"
            placeholder="상대방 이름 입력"
            style="width: 300px; text-align: center"
          />
          &nbsp;
          <button
            class="text-xm text-slate-100 bg-red-500/80 rounded-xl drop-shadow-lg"
            @click="search()"
          >
            &nbsp;&nbsp;검색&nbsp;&nbsp;
          </button>
          <br /><br />

          <!-- 검색 결과를 출력할 부분 -->
          <div v-if="searchResult.length > 0" class="searchBox">
            <p style="color: hsla(0, 1%, 32%, 0.965)">검색된 이름</p>
            <br />
            <!-- 데이터베이스에서 일치하는 이름을 출력 -->
            <p
              v-for="result in searchResult"
              style="color: hsla(0, 1%, 32%, 0.965); cursor: pointer"
              @click="clickSave(result.NAME)"
              :key="result.NAME"
            >
              {{ result.NAME }}
            </p>
          </div>
        </div>

        <img
          src="@/assets/roll/go.png"
          class="go1"
          style="cursor: pointer"
          @click="showNextFrame"
        />
        <img
          src="@/assets/roll/nogo.png"
          class="nogo1"
          style="cursor: pointer"
        />
        <button class="button" @click="saveNshowNextFrame">확인</button>
      </div>
    </div>

    <!-- 입력 창2 -->
    <div v-if="!showFrame1 && !showFrame3 && !showFrame4" class="basicFrame2">
      <div class="title">
        꾸며줄 이모티콘을 골라주세요
        <img
          src="@/assets/roll/go.png"
          class="go2"
          style="cursor: pointer"
          @click="showNextFrame2"
        />
        <img
          src="@/assets/roll/nogo.png"
          class="nogo2"
          style="cursor: pointer"
          @click="showBeforeFrame2"
        />

        <div class="image-row">
          <img
            src="@/assets/roll/deco1.png"
            v-if="deco1_status"
            class="img_hover img-margin"
            @click="btn_choice('deco1')"
          />
          <!--리본-->
          <img
            src="@/assets/roll/deco2.png"
            v-if="deco2_status"
            class="img_hover img-margin"
            @click="btn_choice('deco2')"
          />
          <!--폭죽-->
          <img
            src="@/assets/roll/deco6.png"
            v-if="deco6_status"
            class="img_hover img-margin"
            @click="btn_choice('deco6')"
          />
          <!--하트-->
        </div>
        <div class="image-row">
          <img
            src="@/assets/roll/deco5.png"
            v-if="deco5_status"
            class="img_hover img-margin"
            @click="btn_choice('deco5')"
          />
          <!--메세지-->
          <img
            src="@/assets/roll/deco3.png"
            v-if="deco3_status"
            class="img_hover img-margin"
            @click="btn_choice('deco3')"
          />
          <!--머리띠-->
          <img
            src="@/assets/roll/deco4.png"
            v-if="deco4_status"
            class="img_hover img-margin"
            @click="btn_choice('deco4')"
          />
          <!--케이크-->
        </div>
        <div class="image-row">
          <img
            src="@/assets/roll/deco8.png"
            v-if="deco8_status"
            class="img_hover img-margin"
            @click="btn_choice('deco8')"
          />
          <!--선글라스-->
          <img
            src="@/assets/roll/deco7.png"
            v-if="deco7_status"
            class="img_hover img-margin"
            @click="btn_choice('deco7')"
          />
          <!--강아지-->
          <img
            src="@/assets/roll/deco9.png"
            v-if="deco9_status"
            class="img_hover img-margin"
            @click="btn_choice('deco9')"
          />
          <!--선물-->
        </div>
        <br />
        <img
          src="@/assets/roll/princess2.png"
          class="princess"
          style="
            position: fixed;
            top: 30px;
            left: 1277px;
            right: 10px;
            z-index: 9999;
          "
        />
        <button class="button" @click="showNextFrame2">확인</button>
      </div>
    </div>

    <!-- 입력 창3 -->
    <div v-if="!showFrame2 && !showFrame1 && !showFrame4" class="basicFrame3">
      <div class="title">
        메세지를 남겨주세요 ! <br />
        <br />

        <textarea
          type="text"
          class="msgBox"
          style="width: 80%; height: 350px; overflow-y: auto"
          placeholder="메세지를 입력해주세요"
          v-model="memo_text"
        ></textarea>
        <!-- <input type="text" class="msgBox" style="width: 80%; height: 80px;" 
        placeholder="닉네임을 입력해주세요" v-model="memo_nick">  -->

        <img
          src="@/assets/roll/princess.png"
          class="princess"
          style="
            position: fixed;
            top: 80px;
            left: 145px;
            right: 10px;
            z-index: 9999;
          "
        />
        <button class="button" @click="showNextFrame3">확인</button>
      </div>
    </div>

    <div v-if="!showFrame1 && !showFrame2 && !showFrame3" class="showFrame4">
      <div class="memo memo-content">
        <br /><br /><br />
        To {{ clickName }} <br />
        메시지<br />
        {{ memo_text }}
        <br />
        <div class="flex items-center justify-center w-24 h-24">
          <img :src="require(`@/assets/roll/${img_choice}.png`)" alt="이미지" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "App",
  data() {
    return {
      memos: [],
      showFrame1: true,
      showFrame2: false,
      showFrame3: false,
      showFrame4: false,

      // frame1 - 검색 대상
      searchName: "", // 검색 대상을 입력받는 변수
      searchResult: [], // 데이터베이스에서 검색 결과를 저장할 배열
      clickName: "", // 클릭된 이름을 저장할 변수

      // frame2,3 - 사용자 입력 후
      img_choice: "", // 선택된 이미지
      memo_text: "", // 입력된 메모
      // memo_nick: '', // 입력된 닉네임

      // 선택된 이미지
      deco1_status: true,
      deco2_status: true,
      deco3_status: true,
      deco4_status: true,
      deco5_status: true,
      deco6_status: true,
      deco7_status: true,
      deco8_status: true,
      deco9_status: true,
    };
  },
  watch: {
    searchName() {},
    memo_text() {},
    img_choice() {},
  },
  created() {},
  methods: {
    search() {
      if (this.searchName === "" || this.searchName == null) {
        this.searchall();
      } else {
        this.searchone();
      }
    },

    searchall() {
      let url = "http://localhost:3000/roll_getnameall";
      axios.get(url).then((res) => {
        console.log(res);
        console.log(res.data[0].NAME);
        this.searchResult = res.data;
        console.log(this.searchResult);
      });
    },

    searchone() {
      let obj = {};
      obj.name = this.searchName;
      let url = "http://localhost:3000/roll_getname";
      console.log(obj.name);
      axios
        .get(url, {
          params: obj,
        })
        .then((res) => {
          console.log(res);
          //   console.log(res.data[0].NAME);

          this.searchResult = res.data;
          console.log(this.searchResult);
          if (this.searchResult.length == 0) {
            Swal.fire("알림!", "검색된 사람이 없습니다!", "");
            return;
          } else {
            console.log(this.searchResult);
          }
        });
    },

    getrollpaper() {
      let obj = {};
      obj.name = this.clickName;
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

            this.iconblind();
          }
        });
    },

    iconblind() {
      for (let i = 0; i < this.memos.length; i++) {
        console.log(this.memos.length);
        let memoKey = `${this.memos[i].img}_status`;
        console.log(memoKey);
        this[memoKey] = false;
        console.log(this.deco1_status);
        console.log(this.deco2_status);
      }
    },

    clickSave(value) {
      // 클릭된 이름 저장
      this.clickName = value;
      console.log(this.clickName);
      Swal.fire({
        title: this.clickName + "님을 선택했습니다!",
        icon: "success",
      });
      this.getrollpaper();
    },
    btn_choice(img) {
      Swal.fire("알림!", "이모티콘이 선택되었습니다.", "");

      console.log(img); // 확인용
      this.img_choice = img;
    },

    // 프레임 부분
    saveNshowNextFrame() {
      this.showNextFrame();
    },
    showNextFrame() {
      this.showFrame2 = true;
      this.showFrame1 = false;
      this.showFrame3 = false;
    },
    showNextFrame2() {
      this.showFrame3 = true;
      this.showFrame1 = false;
      this.showFrame2 = false;
    },
    showBeforeFrame2() {
      this.showFrame1 = true;
      this.showFrame2 = false;
      this.showFrame3 = false;
    },

    slacksend() {
      let obj = {};
      obj.name = this.clickName;
      let url = "http://localhost:3000/rollslack";
      axios
        .get(url, {
          params: obj,
        })
        .then((res) => {
          console.log("slack complete" + res);
        });
    },

    // 마지막 확인버튼 눌렀을 때
    showNextFrame3() {
      this.showFrame1 = false; // 창 닫기 3개
      this.showFrame2 = false;
      this.showFrame3 = false;
      this.showFrame4 = true;

      this.slacksend();

      // 선택한 이미지 출력
      switch (this.img_choice) {
        case "deco1":
          this.ribbon_status = true;
          break;
        case "deco2":
          this.party_status = true;
          break;
        case "deco6":
          this.party2_status = true;
          break;
        case "deco5":
          this.msg_status = true;
          break;
        case "deco3":
          this.headband_status = true;
          break;
        case "deco4":
          this.cake_status = true;
          break;
        case "deco8":
          this.sunglasses_status = true;
          break;
        case "deco7":
          this.dog_status = true;
          break;
        case "deco9":
          this.present_status = true;
          break;
      }
      this.rollcreate();
    },

    rollcreate() {
      let obj = {};
      obj.target = this.clickName;
      obj.contents = this.memo_text;
      obj.img = this.img_choice;

      let url = "http://localhost:3000/rollpaperinsert";
      axios
        .get(url, {
          params: obj,
        })
        .then((res) => {
          console.log(res);
          console.log("롤링페이퍼 insert 요청 완료");
        })
        .catch((error) => {
          // 요청 실패 시 에러 메시지 출력
          console.error("롤링페이퍼 데이터 추가 요청에 실패했습니다:", error);
        });
    },
  },
};
</script>

<style>
* {
  font-family: 국민연금체, 나눔스퀘어라운드, 에스코어 드림;
}

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
.princess {
  width: 500px;
}
.title {
  position: relative;
  text-align: center;
  margin-top: 0px;
  color: palevioletred;
  font-size: 30px; /* 글자 크기 */
  font-weight: 900; /* 글자 굵기 */
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
.decoBack {
  position: absolute;
  top: 20px; /* 좌측 상단으로부터의 거리 */
  left: 20px; /* 좌측 상단으로부터의 거리 */
  width: 50px;
}

/* 프레임1 */
.basicFrame {
  margin: 20px;
  width: 300px;

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

  width: 70vh;
  height: 80vh;
}
.go1 {
  width: 100px;
  position: absolute; /* go 이미지를 절대 위치로 설정 */
  bottom: -16px; /* go 이미지의 위쪽을 0으로 설정하여 부모 요소에 맞춰서 상단 정렬 */
  right: -60px; /* go 이미지의 오른쪽을 0으로 설정하여 부모 요소에 맞춰서 우측 정렬 */
}
.nogo1 {
  width: 100px;
  position: absolute; /* go 이미지를 절대 위치로 설정 */
  bottom: -16px; /* 부모 요소의 아래쪽에서 20px 위로 이동 */
  left: -50px; /* go 이미지의 오른쪽을 0으로 설정하여 부모 요소에 맞춰서 우측 정렬 */
}
.container {
  position: relative;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 100px;
}
.searchBox {
  background-color: white;
  border: 5px dashed pink; /* 분홍색 점선 테두리 */
  border-radius: 30px; /* 둥근테두리 */
  padding: 50px; /* 안쪽여백 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 그림자 */
  max-width: 300px; /* 가로 크기 */
  margin: 0 auto; /* 수평 가운데 정렬 */
}

/* 프레임2 */
.basicFrame2 {
  margin: 20px;
  width: 300px;

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

  width: 70vh;
  height: 80vh;
}
.go2 {
  width: 100px;
  position: absolute; /* go 이미지를 절대 위치로 설정 */
  bottom: -16px; /* go 이미지의 위쪽을 0으로 설정하여 부모 요소에 맞춰서 상단 정렬 */
  right: -25px; /* go 이미지의 오른쪽을 0으로 설정하여 부모 요소에 맞춰서 우측 정렬 */
}
.nogo2 {
  width: 100px;
  position: absolute; /* go 이미지를 절대 위치로 설정 */
  bottom: -16px; /* 부모 요소의 아래쪽에서 20px 위로 이동 */
  left: -15px; /* go 이미지의 오른쪽을 0으로 설정하여 부모 요소에 맞춰서 우측 정렬 */
}
/* deco 장식 기본 설정 */
.image-row {
  display: flex;
  justify-content: center; /* 이미지를 가운데 정렬하고 */
  margin: 30px 50px; /* 위아래 여백은 50px, 오른쪽과 왼쪽 여백은 각각 100px */
}
.img-margin {
  margin: 0 10px; /* 원하는 만큼의 여백 설정 */
  width: 110px;
}
.img_hover:hover {
  transform: scale(1.1);
  transition: transform 0.2s; /* 변환 효과의 지속 시간을 설정합니다. */
}

/* 프레임3 */
.basicFrame3 {
  margin: 20px;
  width: 300px;

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

  width: 70vh;
  height: 80vh;
}
.msgBox {
  border: 5px dashed pink;
  border-radius: 50px; /* 둥근 테두리 */
  box-sizing: border-box; /* 입력창 크기 계산에 테두리를 포함 */
  margin-bottom: 20px; /* 입력창 간 간격 조정 */
  padding: 30px; /* 내부 여백 */
  font-size: 30px; /* 폰트 크기 */
  text-align: center;
  margin-bottom: 55px;
}

/* 마지막 결과 띄우는 부분 : 스티커, 메모내용, 닉네임 */
.memo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 위치 */

  width: 600px; /* 크기 */
  height: 600px;
  background-image: url("@/assets/roll/memo.png");
  background-size: cover; /* 이미지가 영역을 채우도록 설정 */
  padding: 20px;

  animation: shake 1s ease-in-out;
  /* animation: flyIn 1s ease-in-out forwards; */
  /* animation: fadeInUp 1s ease-in-out; */

  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
}

/* 애니메이션 효과 */

@keyframes shake {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  25% {
    transform: translate(-50%, -50%) rotate(5deg);
  }
  50% {
    transform: translate(-50%, -50%) rotate(-5deg);
  }
  75% {
    transform: translate(-50%, -50%) rotate(5deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
}
/* @keyframes flyIn {
  from {
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    transform: translate(-50%, -50%) scale(1); 
  }
} */
/* @keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate(-50%, 50%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
} */

/* 메모 내용 */
.memo-content {
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: hsla(0, 1%, 32%, 0.965);
  margin-top: -20px; /* 원하는 만큼의 음수값으로 설정하여 상단 여백 조절 */
}
</style>
