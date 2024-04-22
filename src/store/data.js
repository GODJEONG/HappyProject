import { createStore } from 'vuex'


const store = createStore({
    state: {
        studentList: []
    },
    mutations: {
        info(state, obj) {
            console.log(state.login_info);
            console.log('============');
            console.log(obj);

            state.login_info.push(obj);

        },
    },
    getters: {
        getlogin_info(state) {
            return state.login_info;
        },
    }
})

export default store;