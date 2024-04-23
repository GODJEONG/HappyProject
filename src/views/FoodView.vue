<template>
  <div class="app-container">
    <h1
      class="box-decoration-slice bg-gradient-to-r from-yellow-500 to-yellow-300 text-white px-2 mx-auto px-4 text-6xl my-12"
    >
      오늘 뭐먹을까yo?
    </h1>

    <!--지도띄우기-->
    <div
      class="my-8 border border solid 7px"
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
    <div class="text-slate-500 text-5xl">강남역 맛집 지도</div>
    <br /><br /><br /><br /><br /><br /><br />

    <h2
      class="box-decoration-slice bg-gradient-to-r from-green-500 to-green-200 text-white px-2 mx-auto px-4 text-6xl my-12"
    >
      오늘 점심, &nbsp;&nbsp;&nbsp;
      <button @click="random">@랜덤돌리기@</button>
    </h2>

    <ul class="grid grid-cols-1 gap-4">
      <!-- 랜덤 그리드-->
      <template v-if="randomRestaurant">
        <li class="h-48 bg-slate-500 grid grid-cols-2">
          <div class="bg-slate-200">{{ randomRestaurant.img }}</div>
          <div>
            <div>{{ randomRestaurant.name }}</div>
            <div>{{ randomRestaurant.menu }}</div>
          </div>
        </li>
      </template>
    </ul>

    <br /><br /><br /><br /><br /><br /><br />

    <h2
      class="box-decoration-slice bg-gradient-to-r from-green-400 to-yellow-300 text-white px-2 mx-auto px-4 text-6xl my-12"
    >
      취향별로 골라줄게요
    </h2>

    <div class="text-4xl my-7">
      <input
        type="checkbox"
        v-model="checkedTagList"
        value="해장"
        checked
      /><label>해장</label>&nbsp;

      <input
        type="checkbox"
        v-model="checkedTagList"
        value="고기"
        :checked="true"
      /><label>고기</label>&nbsp;

      <input
        type="checkbox"
        v-model="checkedTagList"
        value="간단"
        :checked="true"
      /><label>간단</label>&nbsp;

      <input
        type="checkbox"
        v-model="checkedTagList"
        value="건강"
        :checked="true"
      /><label>건강</label>&nbsp;

      <input
        type="checkbox"
        v-model="checkedTagList"
        value="든든"
        :checked="true"
      /><label>든든</label>&nbsp;

      <input
        type="checkbox"
        v-model="checkedTagList"
        value="면"
        :checked="true"
      /><label>면</label>&nbsp;
    </div>

    <ul class="grid grid-cols-2 gap-4">
      <template v-for="restaurant in restaurantList" :key="restaurant.name">
        <li
          class="h-48 bg-slate-500 grid grid-cols-2"
          v-if="restaurant.isVisible"
        >
          <div class="bg-slate-200" src="@/src/assets/santa.png"></div>
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

export default {
  data() {
    return {
      restaurantList: [],
      checkedTagList: ["해장", "고기", "간단", "건강", "든든", "면"],
      map: null, // 카카오맵 객체를 저장할 변수 추가
      markerList: [], // 마커 리스트를 저장할 변수 추가
      overlay: null, // 커스텀 오버레이 객체를 저장할 변수 추가
      randomRestaurant: {},
      like: "",
    };
  },
  async created() {
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

    random() {
      alert("랜덤 점심 돌아가는중~");
      let url = "http://localhost:3000/randomLunch";
      axios.get(url).then((res) => {
        console.log(res);
        console.log(res.data);
        const randomRestaurant = this.getRandomLunch(res.data);
        this.randomRestaurant = randomRestaurant;
        console.log(this.randomRestaurant);

        alert("선정된 음식점은 " + this.randomRestaurant.name + "입니다");
      });
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
      alert("좋아요추가");
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
    },

    likecheck(a) {
      alert("좋아요체크");
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
  background-image: url("@/assets/cute-food-illustration-character_553316-15.jpg");
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
