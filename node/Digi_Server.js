const express = require('express');  //설치한 express를 가져와서 선언
const app = express(); // 위에 선언한 express를 실행
const cors = require('cors');  //cors 설정
const bodyParser = require("body-parser");
const { WebClient } = require('@slack/web-api');

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

// ------ 정------------------------------------------------------------------------------------------------------
// 일반 로그인 상태 update
app.get('/baselogin_status', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let id = req.query.id;
    let password = req.query.password;

    let query = "update member set login_type = '1' where ID = ? and PW =? ";
    console.log(id, password);

    connection.query(query, [id, password], (err, result, fields) => {
        if (err) throw err;
        res.json(1);

    })
});

// 일반 로그인을 통한 정보 저장
app.get('/membercheck', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let id = req.query.id;
    let password = req.query.password;

    let query = "select * from member where ID = ? and PW =? ";
    console.log(id, password);

    connection.query(query, [id, password], (err, result, fields) => {
        if (err) throw err;
        if (result.length > 0) {
            console.log(result);
            if (result[0]) {
                console.log(result[0]);
                responserdata = result;
                responserdata.state = 'Ok';
                console.log(responserdata);
            }
            else {
                responserdata.state = 'none';
                console.log(responserdata);
            }
            res.json(responserdata);
        }
        else {
            res.json('null');
            console.log('null');
        }
    });
});


// 카카오 로그인 상태 update
app.get('/kakaologin_status', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let name = req.query.name;

    let query = "update member set login_type = '2' where name = ?";
    console.log(name);

    connection.query(query, [name], (err, result, fields) => {
        if (err) throw err;
        res.json(1);

    })
});

// 카카오로그인을 통한 정보 저장
app.get('/kakaomembercheck', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let name = req.query.name;

    let query = "select * from member where name = ?";
    console.log(name);

    connection.query(query, [name], (err, result, fields) => {
        if (err) throw err;
        if (result.length > 0) {
            console.log(result);
            if (result[0]) {
                console.log(result[0]);
                responserdata = result;
                responserdata.state = 'Ok';
            }
            else {
                responserdata.state = 'none';
            }
            res.json(responserdata);
        }
    });
});

app.get('/logout', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let name = req.query.name;

    let query = "update member set login_type = '' where name = ?";
    console.log(name);

    connection.query(query, [name], (err, result, fields) => {
        if (err) throw err;
        res.json(1);

    })
});

// id 중복 체크
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

// 이름 체크
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

    let query = "insert member values (?,?,?,'0','','');";
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

    let query = "select NAME from member where NAME not in (select manitto from member where manitto != '0') and NAME != trim(?)";

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

// 마니또 메모 저장
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

// 내 마니또 메모 가져오기
app.get('/getmemo', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let name = req.query.name;

    let query = "select manitto_meno from member where manitto = ?";
    console.log(name);

    connection.query(query, [name], (err, result, fields) => {
        if (err) throw err;
        if (result[0]) {
            console.log(result);
            responserdata = result;
        }
        else {
            responserdata = null;
        }
        res.json(responserdata);
    })

});

// 마니또 미션 전달 
app.get('/manittomission', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let query = "select mission from manitto_misson";

    connection.query(query, (err, rows) => {
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


// 마니또 초기화
app.get('/manittodelete', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let name = req.query.name;

    let query = "update member set manitto = '0' , manitto_meno='' where name = ?";
    console.log(name);

    connection.query(query, [name], (err, result, fields) => {
        if (err) throw err;
        res.json(1);
    })

});

// 마니또 배정 여부 확인
app.get('/checkmanitto', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let name = req.query.name;

    let query = "select * from member where name = ? ";
    console.log(name);

    connection.query(query, [name], (err, result, fields) => {
        if (err) throw err;
        if (result.length > 0) {
            console.log(result);
            if (result[0]) {
                console.log(result[0]);
                responserdata = result;
                responserdata.state = 'Ok';
            }
            else {
                responserdata.state = 'none';
            }
            res.json(responserdata);
        }
    });
});

// 마니또 슬랙 
app.get('/manittoslack', (req, res) => {
    let manitto = req.query.manitto;
    botClient.chat
        .postMessage({
            // channel: 'C06UVAY8UCE', // 전송할 채널 아이디
            channel: 'C06E1B5L3PG',
            text: manitto +'님의 마니또가 당신에게 쪽지를 보냈습니다. \n지금 바로 확인해보세요! 주소: http://localhost:8080 ',
            // text: '하이',
        })
        .then(() => {
            console.log('slack 메시지 전송 완료');
        })
        .catch((error) => {
            console.log('오류가 발생했습니다.');
            console.error(error);
        })
})

// 경민-------------------------------------------------------------------------------------------------------------

app.get('/rollslack', (req, res) => {
    let name = req.query.name;
    botClient.chat
        .postMessage({
            // channel: 'C06UVAY8UCE', // 전송할 채널 아이디
            channel: 'C06E1B5L3PG',
            text: '칙칙폭폭~' + name + '님에게 롤링페이퍼 메세지가 도착했습니다!!',
        })
        .then(() => {
            console.log('메시지 전송 완료');
            res.json(1);
        })
        .catch((error) => {
            console.log('오류가 발생했습니다.');
            console.error(error);
        })
})

app.get('/rollpaperinsert', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let target = req.query.target;
    let contents = req.query.contents;
    let img = req.query.img;

    let query = "insert rollpaper (name, img, contents) values (?,?,?);";
    console.log(target, contents, img);

    connection.query(query, [target, img, contents], (err, result, fields) => {
        if (err) throw err;
        res.json(result);
    })
});


app.get('/roll_getnameall', (req, res) => {
    console.log('query');
    let query = "select NAME from member";

    connection.query(query, (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
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

app.get('/roll_getname', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = []; 
    let name = "%" + req.query.name + "%";
    console.log(name);

    let query = "select NAME from member where NAME like ? ";

    connection.query(query, [name], (err, rows) => {
        if (err) throw err;
        if (rows.length > 0) {
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

// 내 마니또 메모 가져오기
app.get('/getrollpaper', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let name = req.query.name;

    let query = " select img, contents from rollpaper where name = ?";
    console.log(name);

    connection.query(query, [name], (err, result, fields) => {
        if (err) throw err;
        if (result[0]) {
            console.log(result);
            responserdata = result;
        }
        else {
            responserdata = null;
        }
        res.json(responserdata);
    })

});


// 은숙----------------------------------------------------------------------------------------------------------

// 식당정보가져오기
app.get('/lunchselect', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let query = "select * from lunch order by likeCount desc";
    connection.query(query, (err, result, fields) => {
        if (err) throw err;
        if (result[0]) {
            console.log(result);
            responserdata = result;
        }
        else {
            responserdata = null;
        }
        res.json(responserdata);
    })
});
//점심 랜덤 추천
app.get('/randomLunch', (req, res) => {
    console.log(req.query);
    console.log('query');
    let responserdata = {};
    let query = "select * from lunch";
    connection.query(query, (err, result, fields) => {
        if (err) throw err;
        if (result[0]) {
            console.log(result);
            responserdata = result;
        }
        else {
            responserdata = null;
        }
        res.json(responserdata);
    })
});
//식당 좋아요 plus
app.get('/likeplus', (req, res) => {
    console.log(req.query);
    console.log('query');
    let name =req.query.name;
    let responserdata = {};
    let query = "UPDATE lunch  SET likeCount = likeCount + 1 WHERE name = ?";
    console.log(name);
    connection.query(query, [name,name], (err, result, fields) => {
        if (err) throw err;
        res.json(1);
    })
});
// 좋아요 수 가져오기
app.get('/likeselect', (req, res) => {
    console.log(req.query);
    console.log('query');
    let name =req.query.name;
    let responserdata = {};
    let query = "select name, likeCount from lunch where name = ? ";
    connection.query(query,[name], (err, result, fields) => {
        if (err) throw err;
        if (result[0]) {
            console.log(result);
            responserdata = result;
        }
        else {
            responserdata = null;
        }
        res.json(responserdata);
    })
});
//이미지 디렉토리 생성(데베에서 사진불러오기위함)
const fs = require('fs');
// 이미지를 저장할 디렉토리 경로
const imageDirPath = './public/images';
// 디렉토리 존재 여부 확인 후 없으면 생성
if (!fs.existsSync(imageDirPath)) {
    fs.mkdirSync(imageDirPath, { recursive: true });
    console.log('이미지 디렉토리가 생성되었습니다.');
} else {
    console.log('이미지 디렉토리가 이미 존재합니다.');
}
