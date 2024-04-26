<template>
  <div class="bg">
    <div class="message-count">(이름)님에게 전달된</div>
    <div class="message-count">(n)개의 메세지 !</div>

    <div @click="memo_write" style="cursor: pointer">
      <img src="@/assets/roll/deco1.png" class="ribbon moving" />
    </div>

    <button class="btn_menu" @click="setTest">메뉴</button>

    <button class="btn_decoTree" @click="btn_Open()">열차 꾸며주기</button>
    <div class="model_bl" v-if="model_open">
      <!-- true면 태그 생성(요 아래 네 줄이 보여짐), false면 태그 닫힘(컴포넌트 없애기) -->
      <div class="model_wh">
        <span class="model_title">{{ model_title }}</span
        ><br /><br />

        <div class="image-row">
          <img
            src="@/assets/roll/deco1.png"
            v-if="!ribbon_status"
            class="img_hover img-margin"
            @click="btn_choice('deco1')"
          />
          <!--리본-->
        </div>

        <button
          class="btn_decoTree"
          @click="btn_close"
          style="margin-right: 10px"
        >
          닫기
        </button>
        <button class="btn_decoTree" @click="btn_Open2">다음</button>

        <!-------------- 메모  입력 ------------------------------------------------------------>
        <div class="model_bl" v-if="model_open2">
          <div class="model_wh">
            <span class="model_title">{{ model_title2 }}</span
            ><br /><br />

            <textarea
              type="text"
              class="message"
              style="
                width: 80%;
                height: 450px;
                overflow-y: auto;
                margin: 0 auto;
              "
              placeholder="메세지를 입력해주세요"
              v-model="memo_text"
            ></textarea>
            <br />
            <button
              class="btn_decoTree"
              @click="btn_close()"
              style="margin-right: 10px"
            >
              닫기
            </button>
            <button class="btn_decoTree" @click="btn_success()">확인</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-------------- 메모  입력 ------------------------------------------------------------>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "DecorateTreePage",
  data() {
    return {
      name: this.$store.getters.getlogin_info.name,
      target: "", // 보내는 상대방 이름
      img_choice: "", // 선택된 이미지 ( 팝업창 1에서 선택 된 이미지 )

      model_open: false, // 클릭하게 되면 true로 바뀜
      model_title: "행복열차로 꾸며주세요 !",
      model_open2: false,
      model_title2: "행복메세지로 채워주세요 !",

      ribbon_status: false,
      party_status: false,
      party2_status: false,
      msg_status: false,
      headband_status: false,
      cake_status: false,
      sunglasses_status: false,
      dog_status: false,
      present_status: false,

      memo_text: "", // 남긴 메모 내용

      stylePopup: {
        display: "none",
      },
      // decoObj: {
      //   ribbon : true, //class명, true면 실행
      //   party : true,
      //   party2 : true,
      //   msg : true,
      //   headband : true,
      //   cake : true,
      //   sunglasses : true,
      //   dog : true,
      //   present : true
      // }
    };
  },
  methods: {
    btn_Open() {
      this.model_open = true;
      this.model_open2 = false;
    },
    btn_close() {
      this.model_open = false;
      this.model_open2 = false;
    },

    slacksend() {
      let obj = {};
      obj.name = this.name;
      let url = "http://localhost:3000/rollslack";
      axios
        .get(url, {
          params: obj,
        })
        .then((res) => {
          console.log("slack complete" + res);
        });
    },

    btn_Open2() {
      this.model_open2 = true;
    },

    // 이미지 선택 및 저장 ---------------
    btn_choice(img) {
      console.log(img);
      this.img_choice = img;
      console.log("선택" + this.img_choice);
    },

    // 메모 및 이미지를 서버로 전달
    btn_success() {
      this.btn_close();

      console.log("choise, ", this.img_choice);

      this.slacksend();

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

      console.log("message content: ", this.memo_text); // 메모 내용 담긴거 확인용

      this.rollcreate();

      this.memo_text = ""; // 메세지 내용 초기화
      this.memo_nick = ""; // 닉네임 내용 초기화
    },

    rollcreate() {
      let obj = {};
      obj.target = this.target;
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

    memo_write() {
      this.stylePopup.display = "flex";
      Swal.fire({
        title: "메모 제목",
        html: "테스트 메모입니다",
        // '<span class="text-5xl">' +
        // this.randomRestaurant.name +
        // "</span>" +
        // "입니다!",
        icon: "success",
      });
    },
  },
};
</script>

<style>
* {
  font-family: 국민연금체, 나눔스퀘어라운드, 에스코어 드림;
}
#drag-container {
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;
  position: relative;
}

.draggable {
  position: absolute;
}

.bg {
  background-color: #ffffe0;
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  /* background-image: url('@/assets/roll/back5.png'); /* 배경 이미지 경로 */
  /* background-size: cover; /* 화면에 꽉 차게 배경 이미지 크기 조절 */
  /* background-position: center; /* 배경 이미지를 가운데 정렬 */
  /* background-repeat: no-repeat; /* 배경 이미지 반복 없음 */
  /* z-index: -500; /* 다른 요소들보다 뒤에 위치하도록 설정 */
}
.train {
  position: relative;
  /* position: absolute; */
  max-width: 1800px;
  /* left: 50%; /* 좌측 시작 위치를 컨테이너의 가운데로 이동 */
  /* top: 0; /* 상단 위치 고정 */
  /*  transform: translateX(-80%); /* 가운데 정렬 */
  margin: 0;
  background-position: center top; /* 배경 이미지를 수직 중앙으로 정렬합니다. */

  animation: moveTrain 5s linear; /* 애니메이션 적용 */
}
.train-container {
  overflow: hidden; /* 이미지 이동 시 컨테이너를 벗어나는 부분을 가리기 위해 */
}
@keyframes moveTrain {
  0% {
    transform: translateX(100%); /* 시작 위치: 오른쪽 끝에서 */
  }
  100% {
    transform: translateX(-100%); /* 종료 위치: 왼쪽 끝까지 */
  }
}

.message-count {
  color: #ff9eae;
  /* margin-top: 60px; */
  font-size: 40px;
}

.btn_decoTree,
.btn_menu {
  /* 버튼 스타일을 설정하세요 */
  padding: 10px 20px;
  font-size: 40px;
  color: white;
  background-color: #ff9eae;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn_menu {
  position: absolute;
  top: 10px;
  right: 10px;
}

.model_bl {
  position: fixed; /* 화면 스크롤에 관계없이 고정 위치 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.model_wh {
  background: #ffffe0;
  width: 35%; /* 팝업 창의 너비 */
  height: 70%; /* 팝업 창의 높이 */
  z-index: 100;
}

.img_hover:hover {
  transform: scale(1.1);
  transition: transform 0.2s; /* 변환 효과의 지속 시간을 설정합니다. */
}

.img_hover2:hover {
  transform: scale(1.3);
  transition: transform 0.2s; /* 변환 효과의 지속 시간을 설정합니다. */
}

.btn_close {
  margin-top: 20px;
}

.model_title {
  margin-top: 100px;
  color: #ff9eae;
  font-size: 40px;
  font-weight: bold;
}

.model_content {
  margin-top: 100px;
}

.message {
  border: 2px solid black; /* 검은색 테두리 */
  border-radius: 50px; /* 둥근 테두리 */
  box-sizing: border-box; /* 입력창 크기 계산에 테두리를 포함 */
  margin-bottom: 50px; /* 입력창 간 간격 조정 */
  padding: 50px; /* 내부 여백 */
  font-size: 30px; /* 폰트 크기 */
  text-align: center;
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

/* deco장식 9가지 */
.ribbon {
  position: relative;
  top: -370px; /* 작을수록 위쪽 */
  left: -285px; /* 작을수록 왼쪽 */
  width: 120px; /* 크기 */
  transform: translate(
    -50%,
    -50%
  ); /* 요소의 가로 및 세로 길이의 절반만큼 이동하여 중앙 정렬 */
  z-index: 1; /* 다른 요소보다 위로 올라오도록 설정 */
}
.party {
  position: relative;
  top: -650px;
  left: -400px;
  width: 120px;
  transform: translate(-50%, -50%);
  z-index: 10;
}
.party2 {
  position: relative;
  top: -630px;
  left: -290px;
  width: 120px;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.msg {
  position: relative;
  top: -620px;
  left: -660px;
  width: 120px;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.headband {
  position: relative;
  top: -565px;
  left: -107px;
  width: 120px;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.cake {
  position: relative;
  top: -500px;
  left: 600px;
  width: 150px;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.sunglasses {
  position: relative;
  top: -650px;
  left: -50px;
  width: 110px;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.dog {
  position: relative;
  top: -500px;
  left: 850px;
  width: 150px;
  transform: translate(-50%, -50%);
  z-index: 1;
}
.present {
  position: relative;
  top: -350px;
  left: -850px;
  width: 150px;
  transform: translate(-50%, -50%);
  z-index: 1;
}
</style>
