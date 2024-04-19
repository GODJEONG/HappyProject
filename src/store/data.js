import { createdata } from 'vuex'


const data = createdata({
    state: {
        studentList: []
    },
    mutations: {
        addstu(state, obj) {
            console.log(state);
            console.log('============');
            console.log(obj);

            state.studentList.push(obj);
        },
        removeStu(state, obj) {
            for (let li = 0; li < state.studentList.length; li++) {
                if (obj.name === state.studentList[li].name) {
                    state.studentList.splice(li, 1);
                    break;
                }
            }
        },
        modistu(state, obj) {
            for (let li = 0; li < state.studentList.length; li++) {
                if (obj.name === state.studentList[li].name) {
                    state.studentList.splice(li, 1, {
                        name: obj.name,
                        kor: obj.kor,
                        eng: obj.eng,
                        mat: obj.mat
                    });
                }
            }
        }
    },
    getters: {
        getstudentlist(state) {
            return state.studentList;
        }
    }
})

export default data;