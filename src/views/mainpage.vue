<template>
  <!-- 메뉴 ----------------------------------------------------------------------------------->
  <body class="bg-neutral-900">
    <br />
    <br />
    <header
      class="sticky top-4 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full"
    >
      <nav
        class="relative max-w-[66rem] w-full bg-neutral-800 rounded-[28px] py-3 ps-5 pe-2 md:flex md:items-center md:justify-between md:py-0 mx-2 lg:mx-auto"
        aria-label="Global"
      >
        <div v-if="login_type === '2'" class="shrink-0">
          <a
            :href= "img"
            target="_blank"
          >
            <img
              class="h-16 w-16 object-cover rounded-full"
              :src="img"
              alt="Current profile photo"
            />
          </a>
         
        </div>
        &nbsp; 
        <div class="w-96 text-white text-2xl">    {{name}} 님 환영합니다!  </div>
        <div class="flex items-center justify-between">
          <!-- End Logo -->

          <div class="md:hidden">
            <button
              type="button"
              class="hs-collapse-toggle size-8 flex justify-center items-center text-sm font-semibold rounded-full bg-neutral-800 text-white disabled:opacity-50 disabled:pointer-events-none"
              data-hs-collapse="#navbar-collapse"
              aria-controls="navbar-collapse"
              aria-label="Toggle navigation"
            >
              <svg
                class="hs-collapse-open:hidden flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6"></line>
                <line x1="3" x2="21" y1="12" y2="12"></line>
                <line x1="3" x2="21" y1="18" y2="18"></line>
              </svg>
              <svg
                class="hs-collapse-open:block hidden flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Collapse -->
        <div
          id="navbar-collapse"
          class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block"
        >
          <div
            class="flex flex-col gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:justify-end md:gap-y-0 md:gap-x-7 md:mt-0 md:ps-7"
          >
            <a
              @click="scrollToPosition(0)"
              class="text-sm text-white hover:text-neutral-300 md:py-4 focus:outline-none focus:text-neutral-300"
              aria-current="page"
              >Top</a
            >
            <a
              @click="scrollToPosition(1)"
              class="text-sm text-white hover:text-neutral-300 md:py-4 focus:outline-none focus:text-neutral-300"
              aria-current="page"
              >Content</a
            >
            <a
              @click="scrollToPosition(2)"
              class="text-sm text-white hover:text-neutral-300 md:py-4 focus:outline-none focus:text-neutral-300"
              href="#"
              >Game</a
            >
            <a
              @click="scrollToPosition(3)"
              class="text-sm text-white hover:text-neutral-300 md:py-4 focus:outline-none focus:text-neutral-300"
              href="#"
              >Contact</a
            >

            <div>
              <a
                @click="logout()"
                class="group inline-flex items-center gap-x-2 py-2 px-3 bg-[#ff0] font-medium text-sm text-neutral-800 rounded-full focus:outline-none"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
        <!-- End Collapse -->
      </nav>
    </header>

    <!-- 본문 ----------------------------------------------------------------------------------------->

    <main id="content" class="mt-0">
      <!-- Hero -->
      <div ref="scroll0" class="bg-neutral-900">
        <div class="max-w-6xl mx-auto px-4 xl:px-0 pt-24 lg:pt-32 pb-24">
          <h1 class="font-semibold text-white text-5xl md:text-6xl pl-16">
            <span class="text-[#ff0]">Welcome to DIGI Game World</span> <br />
            <p class="text-4xl md:text-5xl">
              Power contents & Crazy performance game
            </p>
          </h1>
          <div class="max-w-6xl pl-20">
            <p class="mt-3 text-neutral-400 text-xl">
              DIGI game world is the first website created by three novice
              developers, day and night.<br />
              We don't know why it works, so we don't take questions about games
              and content. <br />
              Thanks to chat GPT and Google.
            </p>
          </div>
        </div>
      </div>
      <!-- End Hero -->

      <!-- Case Stories -->
      <div
        ref="scroll1"
        class="bg-neutral-900 bg-gradient-to-t from-black to-transparent"
      >
        <div class="max-w-5xl px-4 xl:px-0 py-24 mx-auto">
          <!-- Title -->
          <div class="max-w-5xl mb-10 lg:mb-14 pl-8">
            <h2
              class="text-white font-semibold text-2xl md:text-4xl md:leading-tight"
            >
              Power Contents
            </h2>
            <p class="mt-1 text-neutral-400 text-xl">
              Experience great work that stimulates users' emotions and recharge
              their energy! <br />Here are three products with the best
              performance.
            </p>
          </div>
          <!-- End Title -->

          <!-- Card Grid -->
          <div
            class="grid grid-cols-1 lg:grid-cols-3 items-center border border-neutral-700 divide-y lg:divide-y-0 lg:divide-x divide-neutral-700 rounded-xl"
          >
            <!-- Card -->
            <a
              @click="gomanitto()"
              class="group relative z-10 p-4 md:p-6 h-full flex flex-col bg-neutral-900 first:rounded-t-xl last:rounded-b-xl lg:first:rounded-l-xl lg:first:rounded-tr-none lg:last:rounded-r-xl lg:last:rounded-bl-none before:absolute before:inset-0 before:bg-gradient-to-b before:hover:from-transparent before:hover:via-transparent before:hover:to-[#ff0]/10 before:via-80% before:-z-[1] before:last:rounded-b-xl lg:before:first:rounded-s-xl lg:before:last:rounded-e-xl lg:before:last:rounded-bl-none before:opacity-0 before:hover:opacity-100"
              href="#"
            >
              <div class="mb-5">
                <img
                  class="flex-shrink-0 w-8 h-8"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  src="@/assets/santa.png"
                />

                <div class="mt-5">
                  <p class="font-semibold text-5xl text-white">Manito Santa</p>
                  <h3 class="mt-5 font-medium text-lg text-white">
                    Together makes Happier
                  </h3>
                  <p class="mt-1 text-neutral-400">
                    다른 사람에게 즐거움을 주는 것은 나 자신 또한 행복해지는
                    방법입니다. Manito Santa를 통해 즐거움을 함께 공유하고 더욱
                    가까운 관계를 만들어 보세요.
                  </p>
                </div>
              </div>
              <p class="mt-auto">
                <span
                  class="font-medium text-sm text-[#ff0] pb-1 border-b-2 border-neutral-700 group-hover:border-[#ff0] transition focus:outline-none group-focus:border-[#ff0]"
                >
                  Go Start
                </span>
              </p>
            </a>
            <!-- End Card -->

            <!-- Card -->
            <a
              @click="golunch()"
              class="group relative z-10 p-4 md:p-6 h-full flex flex-col bg-neutral-900 first:rounded-t-xl last:rounded-b-xl lg:first:rounded-l-xl lg:first:rounded-tr-none lg:last:rounded-r-xl lg:last:rounded-bl-none before:absolute before:inset-0 before:bg-gradient-to-b before:hover:from-transparent before:hover:via-transparent before:hover:to-[#ff0]/10 before:via-80% before:-z-[1] before:last:rounded-b-xl lg:before:first:rounded-s-xl lg:before:last:rounded-e-xl lg:before:last:rounded-bl-none before:opacity-0 before:hover:opacity-100"
              href="#"
            >
              <div class="mb-5">
                <img
                  class="flex-shrink-0 w-8 h-8"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  src="@/assets/santa.png"
                />

                <div class="mt-6">
                  <p class="font-semibold text-5xl text-white">Jummechu</p>
                  <h3 class="mt-16 font-medium text-lg text-white">
                    Lunch menu is problem..
                  </h3>
                  <p class="mt-1 text-neutral-400">
                    인류 최대의 난제, '오늘 점심 뭐먹지?' <br />
                    Jummechu는 빅데이터 시대에 적합한 점심 메뉴 데이터베이스를
                    바탕으로 사용자에게 최고의 점심 메뉴를 추천합니다.
                  </p>
                </div>
              </div>
              <p class="mt-auto">
                <span
                  class="font-medium text-sm text-[#ff0] pb-1 border-b-2 border-neutral-700 group-hover:border-[#ff0] transition focus:outline-none group-focus:border-[#ff0]"
                >
                  Go Start
                </span>
              </p>
            </a>
            <!-- End Card -->

            <!-- Card -->
            <a
              @click="gorolling()"
              class="group relative z-10 p-4 md:p-6 h-full flex flex-col bg-neutral-900 first:rounded-t-xl last:rounded-b-xl lg:first:rounded-l-xl lg:first:rounded-tr-none lg:last:rounded-r-xl lg:last:rounded-bl-none before:absolute before:inset-0 before:bg-gradient-to-b before:hover:from-transparent before:hover:via-transparent before:hover:to-[#ff0]/10 before:via-80% before:-z-[1] before:last:rounded-b-xl lg:before:first:rounded-s-xl lg:before:last:rounded-e-xl lg:before:last:rounded-bl-none before:opacity-0 before:hover:opacity-100"
              href="#"
            >
              <div class="mb-5">
                <img
                  class="flex-shrink-0 w-8 h-8"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  src="@/assets/santa.png"
                />

                <div class="mt-5">
                  <p class="font-semibold text-5xl text-white">Rolling Paper</p>
                  <h3 class="mt-6 font-medium text-lg text-white">
                    Can you feel my heartbeat?
                  </h3>
                  <p class="mt-1 text-neutral-400">
                    마음을 전하는 것은 언제나 즐거운 일입니다. Rolling Paper을
                    통해 소중한 사람에게 평소 하고 싶었던 말을 전해보세요.
                    <br />
                    상대방 모습이 벌써 행복해 보이네요!
                  </p>
                </div>
              </div>
              <p class="mt-auto">
                <span
                  class="font-medium text-sm text-[#ff0] pb-1 border-b-2 border-neutral-700 group-hover:border-[#ff0] transition focus:outline-none group-focus:border-[#ff0]"
                >
                  Go Start
                </span>
              </p>
            </a>
            <!-- End Card -->
          </div>
          <!-- End Card Grid -->
        </div>
      </div>
      <!-- End Case Stories -->

      <!-- Testimonials -->
      <div ref="scroll2"></div>
      <div class="bg-neutral-900">
        <div class="max-w-5xl px-4 xl:px-0 py-10 lg:py-20 mx-auto">
          <!-- Title -->
          <div class="max-w-5xl mb-10 lg:mb-14 pl-8">
            <h2
              class="text-white font-semibold text-4xl md:text-5xl md:leading-tight"
            >
              Crazy Performance Game
            </h2>
            <p class="mt-1 text-neutral-400 text-2xl">
              I don't understand why this is working..
              <br />Here are three products with the best performance.
            </p>
          </div>

          <!-- End Title -->

          <!-- Grid -->
          <div
            class="md:grid md:grid-cols-2 md:gap-10 lg:gap-16 md:items-center"
          >
            <div>
              <!-- Blockquote -->
              <blockquote>
                <p
                  class="font-medium text-xl text-white md:text-2xl md:leading-normal xl:text-3xl xl:leading-normal"
                >
                  게임을 잘해서 프로가 아닙니다.<br />
                  강한 정신력을 가지고 있기 때문에, <br />
                  <strong>프로</strong>입니다.
                </p>

                <footer class="mt-6 ml-80">
                  <div class="flex items-center">
                    <div class="md:hidden flex-shrink-0">
                      <img
                        class="size-12 rounded-full"
                        src="https://images.unsplash.com/photo-1671725501928-b7d85698ccd8?q=80&amp;w=320&amp;h=320&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Image Description"
                      />
                    </div>
                    <div class="ms-4 md:ms-0">
                      <div class="text-base font-semibold text-white">
                        Faker
                      </div>
                      <div class="text-xs text-neutral-400">
                        T1 | League of Legends
                      </div>
                    </div>
                  </div>
                </footer>
              </blockquote>
              <!-- End Blockquote -->
            </div>
            <!-- End Col -->

            <div class="hidden md:block mb-24 md:mb-0">
              <img
                class="rounded-xl"
                src="@/assets/banner_game1.jpg"
                alt="Image Description"
              />
            </div>
            <!-- End Col -->
          </div>
          <!-- End Grid -->
        </div>
      </div>
      <!-- End Testimonials -->

      <!-- Stats -->
      <div class="bg-neutral-900">
        <div class="max-w-5xl px-4 xl:px-0 py-10 mx-auto">
          <div class="border border-neutral-800 rounded-xl">
            <div
              class="p-4 lg:p-8 bg-gradient-to-bl from-neutral-800 via-neutral-900 to-neutral-950 rounded-xl"
            >
              <div
                class="grid grid-cols-1 sm:grid-cols-3 items-center gap-y-20 gap-x-12"
              >
                <!-- Stats -->
                <div @click="gogame()"
                  class="relative text-center first:before:hidden before:absolute before:-top-full sm:before:top-1/2 before:start-1/2 sm:before:-start-6 before:w-px before:h-20 before:bg-neutral-800 before:rotate-[60deg] sm:before:rotate-12 before:transform sm:before:-translate-y-1/2 before:-translate-x-1/2 sm:before:-translate-x-0 before:mt-3.5 sm:before:mt-0"
                >
                  <svg
                    class="flex-shrink-0 size-6 sm:size-8 text-[#ff0] mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m11 17 2 2a1 1 0 1 0 3-3"></path>
                    <path
                      d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"
                    ></path>
                    <path d="m21 3 1 11h-2"></path>
                    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path>
                    <path d="M3 4h8"></path>
                  </svg>
                  <div class="mt-3 sm:mt-5">
                    <h3 class="text-lg sm:text-3xl font-semibold text-white">
                      GAME1
                    </h3>
                    <p class="mt-1 text-sm sm:text-base text-neutral-400">
                      game1 status
                    </p>
                  </div>
                </div>
                <!-- End Stats -->

                <!-- Stats -->
                <div
                  class="relative text-center first:before:hidden before:absolute before:-top-full sm:before:top-1/2 before:start-1/2 sm:before:-start-6 before:w-px before:h-20 before:bg-neutral-800 before:rotate-[60deg] sm:before:rotate-12 before:transform sm:before:-translate-y-1/2 before:-translate-x-1/2 sm:before:-translate-x-0 before:mt-3.5 sm:before:mt-0"
                >
                  <svg
                    class="flex-shrink-0 size-6 sm:size-8 text-[#ff0] mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path d="m11 17 2 2a1 1 0 1 0 3-3"></path>
                    <path
                      d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"
                    ></path>
                    <path d="m21 3 1 11h-2"></path>
                    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"></path>
                    <path d="M3 4h8"></path>
                  </svg>
                  <div class="mt-3 sm:mt-5">
                    <h3 class="text-lg sm:text-3xl font-semibold text-white">
                      GAME2
                    </h3>
                    <p class="mt-1 text-sm sm:text-base text-neutral-400">
                      game2 status
                    </p>
                  </div>
                </div>
                <!-- End Stats -->

                <!-- Stats -->
                <div
                  class="relative text-center first:before:hidden before:absolute before:-top-full sm:before:top-1/2 before:start-1/2 sm:before:-start-6 before:w-px before:h-20 before:bg-neutral-800 before:rotate-[60deg] sm:before:rotate-12 before:transform sm:before:-translate-y-1/2 before:-translate-x-1/2 sm:before:-translate-x-0 before:mt-3.5 sm:before:mt-0"
                >
                  <svg
                    class="flex-shrink-0 size-6 sm:size-8 text-[#ff0] mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"
                    ></path>
                    <path
                      d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"
                    ></path>
                    <path d="m2 16 6 6"></path>
                    <circle cx="16" cy="9" r="2.9"></circle>
                    <circle cx="6" cy="5" r="3"></circle>
                  </svg>
                  <div class="mt-3 sm:mt-5">
                    <h3 class="text-lg sm:text-3xl font-semibold text-white">
                      GAME3
                    </h3>
                    <p class="mt-1 text-sm sm:text-base text-neutral-400">
                      game3 status
                    </p>
                  </div>
                </div>
                <!-- End Stats -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End Stats -->

      <!-- Contact -->
      <div ref="scroll3"></div>
      <div class="bg-neutral-900">
        <div class="max-w-5xl px-4 xl:px-0 py-10 lg:py-20 mx-auto">
          <!-- Title -->

          <div class="max-w-5xl mb-10 lg:mb-14 pl-8">
            <h2
              class="text-white font-semibold text-4xl md:text-5xl md:leading-tight"
            >
              Contact us
            </h2>
            <p class="mt-1 text-neutral-400 text-2xl">
              DIGI Game World 관련 궁금한 점이 있다면, 언제든지 편하게
              연락해주세요.
            </p>
          </div>
          <!-- End Title -->
          <!-- save point -->

          <div class="space-y-14">
            <!-- Item -->
            <div class="flex gap-x-5">
              <svg
                class="flex-shrink-0 size-10 text-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div class="grow w-96">
                <h4 class="text-white font-semibold text-2xl">Our address</h4>

                <address class="mt-1 text-neutral-400 text-xl not-italic">
                  33, Seocho-daero 74-gil Seocho-gu, Seoul Republic of Korea
                </address>
              </div>
            </div>
            <!-- End Item -->

            <!-- Item -->
            <div class="flex gap-x-5">
              <svg
                class="flex-shrink-0 size-10 text-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"
                ></path>
                <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"></path>
              </svg>
              <div class="grow">
                <h4 class="text-white font-semibold text-2xl">Email us</h4>

                <a
                  class="mt-1 text-neutral-400 text-xl"
                  href="#mailto:example@site.co"
                  target="_blank"
                >
                  sjung8009@kbfg.com
                </a>
              </div>
            </div>
            <!-- End Item -->

            <!-- Item -->
            <div class="flex gap-x-5">
              <svg
                class="flex-shrink-0 size-10 text-neutral-500"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m3 11 18-5v12L3 14v-3z"></path>
                <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
              </svg>
              <div class="grow">
                <h4 class="text-white font-semibold text-2xl">Information</h4>
                <p class="mt-1 text-neutral-400 text-xl">
                  위 사이트는 DIGI Campus 연수생 산출물로서, 교육용으로 활용
                  예정입니다.
                </p>
              </div>
            </div>
            <!-- End Item -->
          </div>
          <!-- End Col -->
        </div>
      </div>
      <!-- End Contact -->
    </main>
  </body>
</template>

<script>
import axios from "axios";
import vueCookies from "vue-cookies";

export default {
  name: "App",
  data() {
    return {
      name: this.$store.getters.getlogin_info.name,
      login_type: this.$store.getters.getlogin_info.login_type,
      token: this.$store.getters.gettoken.token,
      img: this.$store.getters.getimg,
    };
  },

  created() {
    if (this.$route.query.code) {
      this.setKakaoToken();
    }
  },

  methods: {
    gomanitto() {
      this.$router.push("/manitto");
      console.log(this.name);
      console.log(this.login_type);
      console.log(this.token);
    },
    gorolling() {
      this.$router.push("/roll1");
      console.log(this.name);
      console.log(this.login_type);
      console.log(this.token);
    },

    golunch() {
      this.$router.push("/food");
      console.log(this.name);
      console.log(this.login_type);
      console.log(this.token);
    },

     gogame() {
      this.$router.push("/CheckGame");
      console.log(this.name);
      console.log(this.login_type);
      console.log(this.token);
    },

    scrollToPosition(position) {
      // position에 따라 스크롤할 요소를 정의
      let targetRef;
      if (position === 0) {
        targetRef = this.$refs.scroll0;
      } else if (position === 1) {
        targetRef = this.$refs.scroll1;
      } else if (position === 2) {
        targetRef = this.$refs.scroll2;
      } else if (position === 3) {
        targetRef = this.$refs.scroll3;
      }

      // 해당 요소로 스크롤
      targetRef.scrollIntoView({ behavior: "smooth", block: "start" });
    },

    // 카카오 로그아웃
    async btn_off() {
      vueCookies.keys().forEach((cookie) => vueCookies.remove(cookie));
      await axios
        .post("https://kapi.kakao.com/v1/user/unlink", null, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + this.token,
          },
        })
        .then((res) => {
          alert("성공");
          console.log(res);
          this.$router.push("/");
        });

      this.$store.commit("init");
      console.log(this.$store.getters.getlogin_info);

      if (!window.Kakao.Auth.getAccessToken()) {
        console.log("Not logged in.");
        return;
      }

      window.Kakao.Auth.logout(function () {
        vueCookies.remove("access-token");
        vueCookies.remove("refresh-token");
        alert("로그아웃 되었습니다.", window.Kakao.Auth.getAccessToken());
        this.$router.push("/");
      });
    },

    logout() {
      let obj = {};
      obj.name = this.name;
      console.log(obj.name);
      let url = "http://localhost:3000/logout";

      if (this.login_type == "2") {
        axios
          .get(url, {
            params: obj,
          })
          .then((res) => {
            console.log(res);
            this.btn_off();
          })
          .catch((error) => {
            console.error(
              "데이터베이스 로그아웃 업데이트에 실패했습니다.",
              error
            );
          });
      } else if (this.login_type == "1") {
        axios
          .get(url, {
            params: obj,
          })
          .then((res) => {
            console.log(res);
            this.$store.commit("init");
            this.$router.push("/");
          })
          .catch((error) => {
            console.error(
              "데이터베이스 로그아웃 업데이트에 실패했습니다.",
              error
            );
          });
      } else {
        this.$store.commit("init");
        this.$router.push("/");
      }
    },
  },
};
</script>
