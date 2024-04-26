const express = require('express');  //설치한 express를 가져와서 선언
const app = express(); // 위에 선언한 express를 실행
const cors = require('cors');  //cors 설정
const bodyParser = require("body-parser");

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'qwe123!@#',
    database: 'digi'
})

connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());    //cors함수 실행
app.listen(3000, function () {     // 노드의 포트 3000
    console.log('node Start');
})

//function 의 첫번째 매개변수는 request(요청한것), 두번째는 reponse (응답값)/
//  함수표현식방법임. 우리가 자주 써왔던 것이 함수선언식방법.
app.get('/', (req, res) => {
    res.send('Hello World');
})
app.get('/test', (req, res) => {
    console.log('test hello');
    let obj = {};
    obj.result = "ok";
    obj.name = "신정";
    obj.age = 10;
    res.json(obj);
})

app.get('/get1', (req, res) => {
    console.log(req.query);

})

app.post('/post1', (req, res) => {
    console.log('post1 도착');
    console.log(req.body);
    let obj = {};
    obj.name = req.body.name;
    res.json(obj);

})

app.get('/query', (req, res) => {
    console.log('query');
    let responserdata = {};

    connection.query('select * from emp', (err, rows) => {
        if (err) throw err;
        if (rows[0]) {
            console.log(rows[0]);
            responserdata = rows;
            responserdata.state = 'Ok';
        }
        else {
            responserdata.state = 'none';
        }
        res.json(responserdata);
    })
})


app.get('/query2', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let job = req.query.job;
    let empNo = req.query.empNo;

    // SQL 쿼리를 작성하여 주어진 직무와 직원 번호에 해당하는 데이터를 조회합니다.
    let sql = 'SELECT * FROM EMP WHERE JOB="' + job + '" AND EMPNO = "' + empNo + '"'; // 여기를 수정
    connection.query(sql, (err, rows) => {
        if (err) throw err;
        if (rows[0]) {
            console.log(rows[0]);
            responserdata = rows;
            responserdata.state = 'Ok';
        }
        else {
            responserdata.state = 'none';
        }
        res.json(responserdata);
    });
});

app.get('/query3', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let job = req.query.job;
    let empNo = req.query.empNo;

    let query = 'select * from emp where job = ? and empno = ?';

    connection.query(query, [job, empNo], (err, rows) => {
        if (err) throw err;
        if (rows[0]) {
            console.log(rows[0]);
            responserdata = rows;
            responserdata.state = 'Ok';
        }
        else {
            responserdata.state = 'none';
        }
        res.json(responserdata);
    });
});


app.get('/query4', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let sal = req.query.sal;

    let query = 'select * from emp where sal > ?';

    connection.query(query, [sal], (err, rows) => {
        if (err) throw err;
        if (rows[0]) {
            console.log(rows[0]);
            responserdata = rows;
            responserdata.state = 'Ok';
        }
        else {
            responserdata.state = 'none';
        }
        res.json(responserdata);
    });
});

app.post('/insert', (req, res) => {
    let data = req.body;
    let deptNo = data.deptNo;
    let dname = data.dname;
    let loc = data.loc;
    let query = 'insert into DEPT (DEPTNO, DNAME, LOC) values (?, ?, ?)';
    console.log(deptNo, dname, loc);

    connection.query(query, [deptNo, dname, loc], (err, result, fields) => {
        if (err) throw err;
        console.log(result);
    })
})

app.get('/promise', async (req, res) => {
    let val = -1;
    val = await third();
    console.log('promise');
    console.log(val);
})
function second() {
    let query = 'SELECT COUNT(*) as total FROM EMP';
    connection.query(query, (err, rows) => {
        if (err) throw err;
        if (rows[0]) {
            console.log(rows[0]);
            return rows[0];
        }
    })
}
function third() {  // select 하고 insert할때 promise 필요!! select 응답값 받고 나서 insert한다
    return new Promise((resovle, reject) => {
        let query = 'SELECT COUNT(*) as total FROM EMP';
        connection.query(query, (err, rows) => {
            if (err) throw err;
            if (rows[0]) {
                console.log(rows[0].total);
                resovle(rows[0].total);  //retrun 역할
            }
        })
    })
}



app.get('/idcheck', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let id = req.query.id;

    let query = "select id from member";

    connection.query(query, (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            console.log(rows);
            let registered_id = rows.map(row => row.id); // 모든 ID를 배열로 추출

            if (registered_id.includes(id)) {
                res.json({ exists: true }); // 중복된 ID가 있음을 알려줌
            } else {
                res.json({ exists: false }); // 중복된 ID가 없음을 알려줌
            }
        } else {
            res.json({ exists: false }); // 회원 정보가 없음을 알려줌
        }
    });
});


app.get('/namecheck', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let name = req.query.name;

    let query = "select name from digifamily";

    connection.query(query, (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
            console.log(rows);
            let digimember = rows.map(row => row.name);
            if (digimember.includes(name)) {
                res.json({ exists: true });
            } else {
                res.json({ exists: false });
            }
        } else {
            res.json({ exists: false });
        }
    });
});


// member insert 
app.get('/memberinsert', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let id = req.query.id;
    let name = req.query.name;
    let pw = req.query.pw;

    let query = "insert member values (?,?,?,'0','');";
    console.log(name, id, pw);

    connection.query(query, [id, pw, name], (err, result, fields) => {
        if (err) throw err;
        res.json(1);
    })
});

// 마니또 가능 name 제공
app.get('/manittopossible', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let name = req.query.name;

    let query = "select NAME from member where NAME not in (select manitto from member where manitto != '0') and NAME != ?";

    connection.query(query, [name], (err, rows) => {
        if (err) throw err;
        if (rows[0]) {
            console.log(rows[0]);
            responserdata = rows;
            responserdata.state = 'Ok';
        }
        else {
            responserdata.state = 'none';
        }
        res.json(responserdata);
    });
});


// 내 마니또 update 
app.get('/manittoupdate', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let manitto = req.query.manitto;
    let name = req.query.name;

    let query = "update member set manitto = ? where name = ?";
    console.log(name, manitto);

    connection.query(query, [manitto, name], (err, result, fields) => {
        if (err) throw err;
        res.json(1);
    })
});

app.get('/manittomeno', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let manitto = req.query.manitto;
    let meno = req.query.meno;

    let query = "update member set manitto_meno = ? where manitto = ?";
    console.log(meno, manitto);

    connection.query(query, [meno, manitto], (err, result, fields) => {
        if (err) throw err;
        res.json(1);
    })

});


app.get('/manittodelete', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let name = req.query.name;

    let query = "update member set manitto = '0' where name = ?";
    console.log(name);

    connection.query(query, [name], (err, result, fields) => {
        if (err) throw err;
        res.json(1);
    })

});
