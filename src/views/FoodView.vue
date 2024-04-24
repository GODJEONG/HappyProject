<template>
  <div class="app-container">
    <h1
      class="box-content h-28 flex items-center justify-center box-decoration-slice bg-gradient-to-r from-yellow-400 to-yellow-300 text-white px-2 px-4 text-6xl drop-shadow-lg mb-12"
    >
      오늘 뭐먹을까yo?
    </h1>
    <br />
    <br />

    <!--지도띄우기-->
    <div class="text-rose-800 text-4xl drop-shadow-sm">
      강 남 역 &nbsp;맛 집 지 도
    </div>

    <div
      class="my-8 border 7px border-8 solid border-red-500"
      id="map"
      style="
        width: 1200px;
        height: 500px;
        background: gray;
        border-radius: 26px;
        box-shadow: 0 11px 15px rgba(1, 2, 1, 0.2);
      "
    ></div>

    <br />

    <br /><br /><br /><br /><br /><br /><br />

    <h2
      class="box-content h-28 flex items-center justify-center box-decoration-slice bg-gradient-to-r from-yellow-400 to-yellow-300 text-white px-2 drop-shadow-lg mx-auto px-4 text-6xl my-12"
    >
      오늘 점심은? &nbsp;&nbsp;&nbsp;
    </h2>
    <button
      class="border-double border-4 border-yellow-600 text-5xl text-slate-100 bg-amber-600 rounded-full mb-8 drop-shadow-lg"
      @click="random"
    >
      &nbsp;랜덤추천 Click!&nbsp;
    </button>

    <ul class="grid gap-4" style="width: 80%; margin: 0 auto">
      <!-- 랜덤 그리드-->
      <template v-if="randomRestaurant">
        <li class="bg-orange-200 grid grid-cols-2" style="width: 95%">
          <div class="bg-orange-200 flex items-center justify-center">
            <div>
              <img
                :src="require(`@/assets/${randomRestaurant.img}`)"
                alt="이미지"
                class="ml-30 h-48 w-53"
              />
            </div>
          </div>

          <div>
            <div class="text-5xl mt-10">{{ randomRestaurant.name }}</div>
            <div class="text-2xl">{{ randomRestaurant.menu }}</div>
            <div class="text-4xl">{{ randomRestaurant.description }}</div>
          </div>
        </li>
      </template>
    </ul>

    <br /><br /><br /><br /><br /><br /><br />

    <h2
      class="box-content h-28 flex items-center justify-center box-decoration-slice bg-gradient-to-r from-yellow-400 to-yellow-300 text-white px-2 drop-shadow-lg mx-auto px-4 text-6xl"
    >
      취향별로 골라줄게요
    </h2>

    <h2
      class="box-content h-13 flex items-center justify-center box-decoration-slice bg-gradient-to-r from-slate-300 to-slate-400 text-slate-800 px-2 drop-shadow-lg mx-auto px-4 text-xl my-5"
    >
      카테고리를 선택하세요<br />
      ▼
    </h2>

    <div class="text-4xl my-7">
      <input type="checkbox" v-model="checkedTagList" value="전체" /><label
        class="text-bg-stone-600 drop-shadow-lg"
        >전체</label
      >&nbsp;&nbsp;

      <input type="checkbox" v-model="checkedTagList" value="해장" /><label
        class="text-bg-stone-600 drop-shadow-lg"
        >해장</label
      >&nbsp;

      <input type="checkbox" v-model="checkedTagList" value="고기" /><label
        class="text-bg-stone-600 drop-shadow-lg"
        >고기</label
      >&nbsp;

      <input type="checkbox" v-model="checkedTagList" value="간단" /><label
        class="text-bg-stone-600 drop-shadow-lg"
        >간단</label
      >&nbsp;

      <input type="checkbox" v-model="checkedTagList" value="건강" /><label
        class="text-bg-stone-600 drop-shadow-lg"
        >건강</label
      >&nbsp;

      <input type="checkbox" v-model="checkedTagList" value="든든" /><label
        class="text-bg-stone-600 drop-shadow-lg"
        >든든</label
      >&nbsp;

      <input type="checkbox" v-model="checkedTagList" value="면" /><label
        class="text-bg-stone-600 drop-shadow-lg"
        >면</label
      >&nbsp;
    </div>
    <br /><br /><br /><br />

    <!-- <div>
      <img :src="" alt="이미지" class="bg-orange-100" />
    </div> -->

    <ul class="grid grid-cols-2 gap-4">
      <template v-for="restaurant in restaurantList" :key="restaurant.name">
        <li
          class="h-48 bg-orange-200 grid grid-cols-2"
          v-if="restaurant.isVisible"
        >
          <div class="bg-orange-100 h-48 ml-24">
            <img
              :src="require(`@/assets/${restaurant.img}`)"
              alt="이미지"
              class="h-48 w-72"
            />
          </div>
          <div>
            <div class="text-5xl mt-2">{{ restaurant.name }}</div>

            <button
              class="bg-white text-xl mt-1"
              @click="likeplus(restaurant.name)"
            >
              좋아요
            </button>

            <div>{{ restaurant.likeCount }}</div>
            <br />
            <div>대표메뉴:&nbsp; {{ restaurant.menu }}</div>
            <div class="text-2xl">{{ restaurant.description }}</div>

            <!--<div v-for="tag in restaurant.tag" :key="tag">
              {{ tag }}
            </div>-->
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      restaurantList: [],
      checkedTagList: ["해장", "고기", "간단", "건강", "든든", "면"],
      map: null, // 카카오맵 객체를 저장할 변수 추가
      markerList: [], // 마커 리스트를 저장할 변수 추가
      overlay: null, // 커스텀 오버레이 객체를 저장할 변수 추가
      randomRestaurant: {
        name: "점심을",
        menu: " 고르는",
        description: "중이에요",
        img: "pin.png",
      },
      like: "",
    };
  },
  created() {
    this.checkedTagList = []; // 모든 체크박스를 해제
    this.lunchdata();
  },

  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=ece30a5f07c15c5b22afff12ff77c679&autoload=false";
      document.head.appendChild(script);
    }
  },

  methods: {
    //지도그리기
    initMap() {
      kakao.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.4959964, 127.0290566),
          level: 3,
        };
        this.map = new kakao.maps.Map(container, options);

        // 마커를 생성합니다
        const markerPositions = [
          {
            title: "★★비트빌★★",
            latlng: new kakao.maps.LatLng(37.4946121, 127.0275794),
          },
          {
            title: "을밀대",
            latlng: new kakao.maps.LatLng(37.4953995, 127.030406),
          },
          {
            title: "쿠차라",
            latlng: new kakao.maps.LatLng(37.49669069999999, 127.0268555),
          },
          {
            title: "담소소사골순대육개장",
            latlng: new kakao.maps.LatLng(37.4952167, 127.0313495),
          },
          {
            title: "담소소사골순대육개장",
            latlng: new kakao.maps.LatLng(37.4950386, 127.0297037),
          },
          {
            title: "오토김밥",
            latlng: new kakao.maps.LatLng(37.4953995, 127.030406),
          },
          {
            title: "야기카레",
            latlng: new kakao.maps.LatLng(37.4977256, 127.0292972),
          },
          // 여기에 추가적인 마커 위치를 넣어주세요
        ];

        // 마커 이미지의 이미지 주소입니다
        const imageSrc =
          "https://creazilla-store.fra1.digitaloceanspaces.com/emojis/57290/pig-face-emoji-clipart-md.png";

        for (let i = 0; i < markerPositions.length; i++) {
          // 마커 이미지의 이미지 크기 입니다
          const imageSize = new kakao.maps.Size(40, 39);

          // 마커 이미지를 생성합니다
          const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

          // 마커를 생성합니다
          const marker = new kakao.maps.Marker({
            map: this.map, // 마커를 표시할 지도
            position: markerPositions[i].latlng, // 마커를 표시할 위치
            title: markerPositions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image: markerImage, // 마커 이미지
          });

          // 마커를 리스트에 추가합니다
          this.markerList.push(marker);
        }
      });
    },

    //지도그리기,마커 메소드 만들기

    //--------------------------------------------------

    //--------------------------------------------------

    lunchdata() {
      let url = "http://localhost:3000/lunchselect";
      axios.get(url).then((res) => {
        console.log(res.data);
        this.restaurantList = res.data;
        console.log(this.restaurantList);
      });
    },

    getImageUrl(img) {
      // 이미지 요청 경로 반환
      return `http://localhost:3000${img}`;
    },

    random() {
      Swal.fire({
        title: "랜덤 점심 선택 중입니다!",
        icon: "info",
      });

      setTimeout(() => {
        let url = "http://localhost:3000/randomLunch";
        axios.get(url).then((res) => {
          console.log(res);
          console.log(res.data);
          const randomRestaurant = this.getRandomLunch(res.data);
          this.randomRestaurant = randomRestaurant;
          console.log(this.randomRestaurant);

          // 선택된 음식점을 귀여운 팝업으로 표시

          Swal.fire({
            title: "선정된 음식점은",
            html:
              '<span class="text-4xl">' +
              this.randomRestaurant.name +
              "</span>" +
              "입니다!",
            icon: "success",
          });
        });
      }, 3000); // 3초(3000밀리초) 후에 실행
    },

    //if문이 실행되고있음.
    getRandomLunch(array) {
      const randomIndex = Math.floor(Math.random() * array.length);
      const randomItem = array[randomIndex];
      console.log("엑시오스");
      if (!randomItem || !randomItem.id) {
        console.error(
          "Invalid data format or missing 'lunch' property:",
          randomItem
        );
        return null;
      }
      return randomItem;
    },

    likeplus(a) {
      Swal.fire({
        html: "좋아요를 누르셨습니다!",
        icon: "success",
      });

      let obj = {};
      obj.name = a;
      axios
        .get("http://localhost:3000/likeplus", {
          //매개변수 두개라서 콤마가 들어감.{}는  object임.
          params: obj,
        })
        .then((res) => {
          console.log(res);
          this.likecheck(obj.name);
        });

      //window.location.reload();
    },

    likecheck(a) {
      let obj = {};
      obj.name = a;
      axios
        .get("http://localhost:3000/likeselect", {
          //매개변수 두개라서 콤마가 들어감.{}는  object임.
          params: obj,
        })
        .then((res) => {
          console.log(res); //
          console.log(res.data); //
          this.like = res;
        });
    },

    closeOverlay() {
      // 커스텀 오버레이를 닫기 위한 메소드
      this.overlay.setMap(null);
    },
  },
  watch: {
    checkedTagList(checkedTagList) {
      console.log(checkedTagList);
      const x = ["해장", "고기", "간단", "건강", "든든", "면"];
      console.log([...new Set([...checkedTagList, ...x])]);
      for (let i = 0; i < this.restaurantList.length; i++) {
        const merged = [
          ...new Set([...checkedTagList, ...this.restaurantList[i].tag]), //MERGED는 = 체크된 태그리스트랑 해당레스토랑의 태그를 합친 것(중복제거)
        ];
        this.restaurantList[i].isVisible =
          merged.length !== //이 두개가 다르면 겹치는게 하나라도 있는것임.
          checkedTagList.length + this.restaurantList[i].tag.length; //체크된 태그리스트 갯수랑 해당 레스토랑의 태그 객수를 더한것.
      }
    },
    like() {},
  },
};
</script>

<style>
* {
  font-family: Cafe24 ssurround, 나눔스퀘어라운드, 에스코어 드림;
}

#map {
  margin: 0 auto; /*중앙정렬*/
}

.app-container {
  background-image: url("@/assets/backfood.jpg");
}

.overlay-container {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
  background-color: hwb(56 49% 0%); /* 배경색 설정 */
  padding: 10px; /* 오버레이 주위에 간격을 줍니다 */
  border-radius: 16px; /* 모서리를 둥글게 만듭니다 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
}
</style>
