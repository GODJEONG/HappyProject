import { createStore } from 'vuex'


const store = createStore({
    state: {
        login_info: [],
        token:[],
        img: [],
    },
    mutations: {
        create(state, obj) {
            console.log(state.login_info);
            console.log('============');
            console.log(obj);

            state.login_info.push(obj);

        },
        info(state, obj) {
            console.log(state);
            console.log('============');
            console.log(obj);

            state.login_info.push(obj);

            console.log(state.login_info);

        },
        img(state, obj) {
            console.log(state);
            console.log('============');
            console.log(obj);

            state.img.push(obj);

            console.log(state.img);
        },

        init(state) {
            console.log(state);
            console.log('============');
            state.login_info.pop();
            state.img.pop();

            console.log(state.login_info);

        },

        token(state,obj) {
            console.log(state);
            console.log('============');
            state.token.push(obj);

            console.log(state.token);

        },

    },
    getters: {
        getlogin_info(state) {
            if (state.login_info[0] == null)
                return 1
            else {
                return state.login_info[0].data[0]
            }
        },

        gettoken(state) {
            if (state.token[0] == null)
                return 1
            else {
                return state.token[0]
            }
        },

        getimg(state) {
            if (state.img[0] == null)
                return 1
            else {
                return state.img[0]
            }
        },
    }
})

export default store;