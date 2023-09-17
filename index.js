const http = require('http');
const https = require('https');
const url = require('url');
const { parse } = require('querystring');
const fs = require('fs');
const nodemailer = require('nodemailer')
const Nexmo = require('nexmo');
//подкл модуль мскл для работы с бд

http.createServer((req, res) => {
    let urlParts = url.parse(req.url);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    console.log("uu",urlParts);
    let params =[];
    let body = '';
    if (req.method == 'GET') {
        res.end('get server work');
    }
    else {
        // POST


        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            if(body!==''){
                params = JSON.parse(body);
                console.log(params,'params')
            }

            //конфигурация подключ
            const mysql = require('mysql');
            const conn = mysql.createConnection({ //в качестве параметров передаем обьект
                host: "localhost",
                user: "root",
                database: "list",
                password: ""
            });
            //создание подключения
            conn.connect(err =>{
                if(err){
                    console.log(err);
                }
                else {
                    console.log("database----ok");
                }
            });



            switch(urlParts.pathname){ //если ссылка post запроса ведет на:
                case "/loadcomments":
                                const query18 = `SELECT * FROM comments WHERE idpost=${params.idpost}`;
                                conn.query(query18,(err,result,field)=>{
                                    console.log(err);
                                    res.end(JSON.stringify(result))
                                    //console.log(field); //содерж данные о полях таблицы
                                })
                                break
                            case "/addcomment":
                                const query19 = `INSERT INTO comments (idpost, name, surname, comment, time) VALUES (${params.idpost}, '${params.name}', '${params.surname}', '${params.comment}', '${params.time}')`;
                                conn.query(query19,(err,result,field)=>{
                                    console.log(err);
                                    console.log(result.insertId);
                                    res.end(result.insertId.toString())
                                    //console.log(field); //содерж данные о полях таблицы
                                })
                                break
                case "/delpost":
                    const queryd =`DELETE FROM posts WHERE id =${params.id}`;
                    conn.query(queryd,(err,result,field)=>{
                        console.log(err);
                        res.end('1')
                        //console.log(field); //содерж данные о полях таблицы
                    })
                    break
                case "/addata":
                    const query8 = `INSERT INTO posts (title, descr, image, name, time, likes, views, comments) VALUES ('${params.title}', '${params.text}', '${params.image}', '${params.name}', '${params.time}', '${params.likes}', ${params.views}, ${params.comments})`;
                    conn.query(query8,(err,result,field)=>{
                        console.log(err);
                        console.log(result);
                      //  res.end(result.insertId.toString())
                        //console.log(field); //содерж данные о полях таблицы
                    })
                    break
                case "/updatepost":
                    const queryu = `UPDATE posts SET title = "${params.title}", descr = "${params.text}", image = "${params.image}" WHERE id = ${params.id}`;
                    conn.query(queryu,(err,result,field)=>{
                        console.log(err);
//console.log(result.insertId);
                        res.end('1');
//console.log(field); //содерж данные о полях таблицы
                    })
                    break
                        case "/updatecomment":
                             const queryc = `UPDATE posts SET comments = ${params.comments} WHERE id = ${params.id}`;
                            conn.query(queryc,(err,result,field)=>{
                           console.log(err);
                    //console.log(result.insertId);
                             res.end('1');
                    //console.log(field); //содерж данные о полях таблицы
                               })
                         break
                 case "/updatelike":
                    const query4 = `UPDATE posts SET likes ='${params.likes}' WHERE id = ${params.id}`;
                    // query = `UPDATE user SET friends ='${params.friends}'  WHERE id = '${params.id}'`;
                    conn.query(query4,(err,result,field)=>{
                        console.log(err);
                        res.end('1')
                        //console.log(field); //содерж данные о полях таблицы
                    })
                    break
                case "/updateview":
                    const query7 = `UPDATE posts SET views = ${params.views} WHERE id = ${params.id}`;
                    // query = `UPDATE user SET friends ='${params.friends}'  WHERE id = '${params.id}'`;
                    conn.query(query7,(err,result,field)=>{
                        console.log(err);
                        res.end('1')
                        //console.log(field); //содерж данные о полях таблицы
                    })
                    break
                case "/oneart":
                    const querySel = `SELECT * FROM posts WHERE id = ${params.id}`;
                    conn.query(querySel,(err,result,field)=>{
                        console.log(err);
                        console.log(result);
                        res.end(JSON.stringify(result))
                        //console.log(field); //содерж данные о полях таблицы
                    })
                    break
                case "/selectdata":
                    const query10 = `SELECT * FROM posts`;
                    conn.query(query10,(err,result,field)=>{
                        console.log(err);
                        res.end(JSON.stringify(result))
                        console.log(JSON.stringify(result),'data'); //содерж данные о полях таблицы
                    })
                    break
                case "/selectmy":
                    const querys = `SELECT * FROM posts where name ='${params.name}'`;
                    conn.query(querys,(err,result,field)=>{
                        console.log(err);
                        res.end(JSON.stringify(result))
                        console.log(JSON.stringify(result),'data'); //содерж данные о полях таблицы
                    })
                    break
                case "/getuser":
                    const query04 = `SELECT * FROM users WHERE email ='${params.email}' AND password ='${params.password}'`;
                    conn.query(query04,(err,result,field)=>{
                        console.log(err);
                        console.log(result);
                        res.end(JSON.stringify(result))
                        //console.log(field); //содерж данные о полях таблицы
                    })
                    break
                case "/getusercook":
                    const query05 = `SELECT * FROM users WHERE email ='${params.email}'`;
                    conn.query(query05,(err,result,field)=>{
                        console.log(err);
                        console.log(result);
                        res.end(JSON.stringify(result))
                        //console.log(field); //содерж данные о полях таблицы
                    })
                    break
                case "/deluser":
                    const query03 =  `DELETE FROM users WHERE email ='${params.email}'`;
                    conn.query(query03,(err,result,field)=>{
                        console.log(err);
                        res.end('1')
                        //console.log(field); //содерж данные о полях таблицы
                    })
                    break
                case "/updateuser":
                    const query02 = `UPDATE users SET name ='${params.name}',surname ='${params.surname}' WHERE email = '${params.email}'`;
                    conn.query(query02,(err,result,field)=>{
                        console.log(err);
                        res.end('1')
                        //console.log(field); //содерж данные о полях таблицы
                    })
                    break
                case "/setuser":
                    const query01 = `INSERT INTO users (name, surname, email, password) VALUES ('${params.name}', '${params.surname}', '${params.email}', '${params.password}')`;
                    conn.query(query01,(err,result,field)=>{
                        console.log(err);
                        console.log(result.insertId);
                        res.end(result.insertId.toString())
                        //console.log(field); //содерж данные о полях таблицы
                    })
                    break
                default:
                    res.end('404')
                    break
            }
/////закрытие подключения
            conn.end(err =>{
                if(err){
                    console.log(err);
                }
                else {
                    console.log("database----close");
                }

            });
        })
    }
}).listen(3500);

