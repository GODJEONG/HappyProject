function promise() {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            console.log('start');
            resolve('data');
        }, 1000);
    });
}
first();
async function first(){
    let data = await promise();
    console.log(data);
}


promise().then(value => {
    console.log(value);
    for (var i = 0; i < 9; i++) {
        console.log(i);
    }
})
    .catch(error => {
        console.log(error);
    });


//----콜백----------------------------------------------------------

// let test2 = () => {
//     console.log('test');
// }
// test2();


// start(first);
// start(second);

// start(function (val) {
//     console.log('first=', val);
// });

// start(val => {
//     console.log('first = ', val)
// });


// function start(abc) {
//     console.log('start');
//     let val = 100;
//     abc(val);
// }

// function first() {
//     console.log('first');
// }

// function second() {
//     console.log('second');
// }


//------------------------------------------






// 명강사님 자료
// let test = () => {
//     console.log('test');
// }
// test();
// start(first);
// start(second);
// start(val => {
//     console.log('where');
//     console.log('first = ', val);
// })
// function start(abc) {
//     console.log('start');
//     let val = 100;
//     abc(val);
// }
// function first() {
//     console.log('first');
// }
// function second() {
//     console.log('second');
// }