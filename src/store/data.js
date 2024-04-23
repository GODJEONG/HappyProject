import { createStore } from 'vuex'


const store = createStore({
    state: {
        login_info: []
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

        init(state) {
            console.log(state);
            console.log('============');
            state.login_info.pop();

            console.log(state.login_info);

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
    }
})

export default store;