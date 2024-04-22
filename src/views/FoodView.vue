<template>
  <div class="app-container">
    <h1 class="text-6xl my-12">오늘 뭐먹을까?</h1>
    <!--지도띄우기-->
    <div
      class="my-8 border border solid 7px"
      id="map"
      style="width: 1200px; height: 500px; background: gray"
    >
      지도
    </div>

    <div class="text-3xl my-7">오늘의 식당 추천</div>
    <ul class="grid grid-cols-1 gap-4">
      <template v-for="restaurant in restaurantList" :key="restaurant.name">
        <li class="h-48 bg-slate-500 grid grid-cols-2">
          <div class="bg-slate-200">{{ restaurant.img }}</div>
          <div>
            <div>{{ restaurant.name }}</div>
            <div>{{ restaurant.menu }}</div>
          </div>
        </li>
      </template>
    </ul>

    <div class="text-3xl my-7">식당리스트</div>

    <div class="text-xl my-7">
      <input type="checkbox" v-model="checkedTagList" value="해장" /><label
        >해장</label
      >&nbsp;
      <input type="checkbox" v-model="checkedTagList" value="고기" /><label
        >고기</label
      >&nbsp;
      <input type="checkbox" v-model="checkedTagList" value="분식" /><label
        >분식</label
      >&nbsp;
      <input type="checkbox" v-model="checkedTagList" value="비건" /><label
        >비건</label
      >&nbsp;
      <input type="checkbox" v-model="checkedTagList" value="간단" /><label
        >간단</label
      >&nbsp;
      <input type="checkbox" v-model="checkedTagList" value="면" /><label
        >면</label
      >&nbsp;
    </div>

    <ul class="grid grid-cols-3 gap-4">
      <template v-for="restaurant in restaurantList" :key="restaurant.name">
        <li
          class="h-48 bg-slate-500 grid grid-cols-2"
          v-if="restaurant.isVisible"
        >
          <div class="bg-slate-200">{{ restaurant.img }}</div>
          <div>
            <div>{{ restaurant.name }}</div>
            <div>{{ restaurant.menu }}</div>
            <div>{{ restaurant.description }}</div>
            <button @click="like(restaurant.name)">좋아요</button>
            <div>{{ restaurant.likeCount }}</div>
            <div v-for="tag in restaurant.tag" :key="tag">
              {{ tag }}
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      restaurantList: [],
      checkedTagList: [],
    };
  },
  created() {
    this.getRestaurantList();
    //지도 그리기,
    // 지도 마커들 찍기 메서드 호출
    // for (let i = 0; i < this.restaurantList.length; i++) {
    //     if (this.restaurantList[i].isMap===true){
    //         //마커찍기

    //     }
    // }
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
        var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
        var options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new kakao.maps.LatLng(37.497, 127.0281), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };
        // kakao.maps.Map('지도넣을컨테이터', '옵션')
        new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      });
    },

    //지도그리기,마커 메소드 만들기

    getRestaurantList() {
      //서버에 식당리스트를 요청한다
      const response = [
        {
          name: " 식당1",
          description: "식당설명",
          menu: "메뉴1,메뉴2,메뉴3",
          img: "DB에서 불러온 사진.jpg",
          likeCount: 0,
          tag: ["해장", "고기"],
          isLike: false,
          isVisible: true,
          isMap: true,
          //isMap 가 트루인애들만 좌표주기
        },
        {
          name: " 식당2",
          description: "식당설명",
          menu: "메뉴1,메뉴2,메뉴3",
          img: "DB에서 불러온 사진.jpg",
          likeCount: 0,
          tag: ["분식", "해장"],
          isLike: false,
          isVisible: true,
        },
        {
          name: " 식당3",
          description: "식당설명",
          menu: "메뉴1,메뉴2,메뉴3",
          img: "DB에서 불러온 사진.jpg",
          likeCount: 0,
          tag: ["간단", "비건"],
          isLike: false,
          isVisible: true,
        },
      ];
      //식당리스트를 받는다
      //받은 식당 리스트를 출력한다
      console.log(response);
      this.restaurantList = response;
    },

    like(name) {
      //서버에 식당을 좋아요 처리 요청
      console.log(name);
      //좋아요 처리 응답받음
      //좋아요 숫자 올려줌, 눌린 하트처리, 두번은안눌림, 취소없음.
      for (let i = 0; i < this.restaurantList.length; i++) {
        if (
          name === this.restaurantList[i].name &&
          this.restaurantList[i].isLike == false
        ) {
          this.restaurantList[i].likeCount++;
          this.restaurantList[i].isLike = true;
        }
      }
    },
  },
  watch: {
    checkedTagList(checkedTagList) {
      console.log(checkedTagList);
      const x = ["비건", "고기"];
      console.log([...new Set([...checkedTagList, ...x])]);
      for (let i = 0; i < this.restaurantList.length; i++) {
        const merged = [
          ...new Set([...checkedTagList, ...this.restaurantList[i].tag]),
        ];
        this.restaurantList[i].isVisible =
          merged.length !==
          checkedTagList.length + this.restaurantList[i].tag.length;
      }
    },
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
</style>
