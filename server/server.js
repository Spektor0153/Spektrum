const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    jwt = require('jsonwebtoken'),
   // users = require('./users'),
    cors = require('cors'),
    mysql = require('mysql2')

const routes = require('./routes');
const http = require("http");
const socketIO = require("socket.io");
const server = http.createServer(app);
const io = socketIO(server);
const multer = require('multer')
const {wrapAsync} = require('@rimiti/express-async');
const fs = require('fs');
const path = require('path');
const passwordHash = require('password-hash');

const host = '151.248.114.72'
const port = 3001
//var port = normalizePort(process.env.PORT || '3001');
app.set('port', port);

const tokenKey = '1a2b-3c4d-5e6f-7g8h'



var corsOptions = {
  origin: 'http://151.248.114.72',
  optionsSuccessStatus: 200
}

app.use(bodyParser.json())

//app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/../public')));
//app.use(express.static(__dirname));

app.use(cors());

var AsyncRouter = require("express-async-router").AsyncRouter;
var router = AsyncRouter();

var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, path.join(__dirname, '/../public/uploadPhoto'));
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.parse(file.originalname).name +path.extname(file.originalname) );
  }
});

const upload = multer({ storage: storage })


var connection =  mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '0153',
  database : 'socialnetwork'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

let users = [];
let updateUserForAuth =  () => {
  //const rows = await connection.promise().query(`SELECT * from user`);
  connection.query("SELECT * from user", function(err, results) {
    console.log(results)
    if (results) {
      users=[...results];
    }
    console.log('updateUserForAuth')
  });
}

updateUserForAuth();
/*
connection.query("SELECT * from user", function(err, results) {
  users=[...results];
});
*/
app.get('/', routes.index);
//app.get('*', routes.index);

io.on("connection", socket => {
  console.log("New client connected= " + socket.id);

  socket.on('socketAuth',(id_user)=>{
    for (i=0; i<users.length; i++) {
      if (users[i].id==id_user) {
        users[i].socket_id=socket.id
      }
    }
  //  console.log(users)
  })

  socket.on("disconnect", (data) => {
    console.log("disconnect SOCKET")
    console.log(data)
    console.log("user disconnected");
    console.log(socket.id);
    for (i=0; i<users.length; i++) {
      if (users[i].socket_id==socket.id) {
        delete users[i].socket_id;
     //   console.log(users);
      }
    }
  });






app.use((req, res, next) => {

  console.log('USE')
  //console.log(req.headers.authorization)
  if (req.headers.authorization) {

    jwt.verify(req.headers.authorization.split(' ')[1], tokenKey, (err, payload) => {
     // if (err) console.log(err)
   //   console.log(payload)
      if (err) next()
      else if (payload) {

        for (let user of users) {

          if (user.id === payload.id) {
            console.log('id='+user.id +'   payload='+ payload.id)
            req.user = user
           // next()
          }
        }

        if (!req.user) next()
      }
    })

  }

  next()
})




  app.get('/user', async (req, res) => {
    if (req.user) {
      console.log('req.user!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
     // console.log(req.user);
      const rows = await connection.promise().query(`SELECT id, id_user, name, img, status, DATE_FORMAT(dateb, '%d %M %Y') as dateb, 
        (select SUM(countNewM) from (select id_room, id_user from roomsUser where id_user=${req.user.id}) r inner join (
        select id_room, count(*) as countNewM from messages where id_user!=${req.user.id} and read_message=0 group by id_room) m on r.id_room=m.id_room) as countNewM,
        school, about from profiles p where id_user=${req.user.id}`);
      res.send(rows[0][0]).status(201);

    }
    //else return res.status(401).json({ message: 'Not authorized' })
  })


  app.post('/api/auth', (req, res) => {
 console.log(req.body)
 // console.log(res)
  console.log('auth')

  for (let user of users) {
    //console.log(user)

    //passwordHash.verify('password123', hashedPassword)
    //if (req.body.login === user.login && req.body.password === user.password) {
    console.log('---------------------!')
    console.log(user.login)
    console.log(req.body.login)
    console.log(passwordHash.verify(req.body.password, user.passwordhash))

    if (req.body.login === user.login && passwordHash.verify(req.body.password, user.passwordhash) ) {
      return res.status(200).json({
        id: user.id,
        login: user.login,
        token: jwt.sign({ id: user.id }, tokenKey)
      })
    }
  }

  return res.status(404).json({ message: 'User not found' })
})







app.get('/posts', async (req, res) => {
  if (req.user) {
    const rows = await connection.promise().query(`SELECT * from posts where id_user=${req.user.id}  order  by  dateCreate desc`);
    res.send(rows[0]).status(201);
  }  else return res.status(401).json({ message: 'Not authorized' })
})

  app.post('/sendStatus', async (req, res) => {
    if (req.user) {
      try {
        const rows = await connection.promise().query(`update profiles  set status ='${req.body.text}' where id_user=${req.user.id};`);
        //console.log(rows)
        res.send(rows[0]).status(201);
      } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'SQL error' })
      }


    }  else return res.status(401).json({ message: 'Not authorized' })
  })








  app.get('/getFriends', async (req, res) => {
  if (req.user) {
    try {
      const rows = await connection.promise().query(`select *, (select id_friend from friends f where f.id_user=${req.user.id} and p.id_user=f.id_friend) as follow, 
          (select id_friend from friends f where f.id_friend=${req.user.id} and p.id_user=f.id_user) as follower  from profiles p  where p.id_user!=${req.user.id}`);
      res.send(rows[0]).status(201);
    } catch (e) {
      console.log(e)
      res.status(401).json({ message: 'SQL error' })
    }
  }  else return res.status(401).json({ message: 'Not authorized' })
})

app.post('/followFriend', async (req, res) => {
  console.log('followFriend')
  if (req.user) {
    try {
      console.log(req.body)
      const rows = await connection.promise().query(`INSERT INTO friends (id_user, id_friend) VALUES (${req.user.id}, '${req.body.id_friend}');`);
      //console.log(rows)
      const rows_posts = await connection.promise().query(`select *, (select id_friend from friends f where f.id_user=${req.user.id} and p.id_user=f.id_friend) as follow from profiles p  where p.id_user!=${req.user.id}`);
      res.send(rows_posts[0]).status(201);
    } catch (e) {
      console.log(e)
      res.status(401).json({ message: 'SQL error' })
    }


  }  else return res.status(401).json({ message: 'Not authorized' })
})

app.post('/unFollowFriend', async (req, res) => {
  console.log('unFollowFriend')
  if (req.user) {
    try {
      console.log(req.body)
      const rows = await connection.promise().query(`delete from friends where id_friend=${req.body.id_friend} and id_user=${req.user.id};`);
      //console.log(rows)
      const rows_posts = await connection.promise().query(`select *, (select id_friend from friends f where f.id_user=${req.user.id} and p.id_user=f.id_friend) as follow from profiles p  where p.id_user!=${req.user.id}`);
      res.send(rows_posts[0]).status(201);
    } catch (e) {
      console.log(e)
      res.status(401).json({ message: 'SQL error' })
    }


  }  else return res.status(401).json({ message: 'Not authorized' })
})


app.get('/friendId', async (req, res) => {
  console.log('friendId')
  console.log(req.body)
  console.log(req.query)
  if (req.user) {
    try {
      const rows = await connection.promise().query(`SELECT *, (select id_friend from friends f where f.id_user=${req.user.id} and p.id_user=f.id_friend) as follow  from profiles p where id_user=${req.query.userId}`);
      res.send(rows[0][0]).status(201);
    } catch (e) {
      console.log(e)
      res.status(401).json({ message: 'SQL error' })
    }
  }  else return res.status(401).json({ message: 'Not authorized' })
})


  app.get('/getProfile', async (req, res) => {
    console.log('getProfile')
   // console.log(req.query)
   // console.log(req.user)
    if (req.user) {
      console.log('getProfile 222222222222')
      try {
        const rows_profile = await connection.promise().query(`SELECT id, id_user, name, img, status, DATE_FORMAT(dateb, '%d %M %Y') as dateb, school, about, 
          (select id_friend from friends f where f.id_user=${req.user.id}  and p.id_user=f.id_friend) as follow,
          (SELECT count(id) FROM friends where id_user=${req.query.id_user} ) as folowCount,
          (SELECT count(id) FROM friends where id_friend=${req.query.id_user} ) as folowerCount,
          (SELECT count(id) FROM photos where id_user=${req.query.id_user} ) as photosCount,
          (SELECT count(id) FROM posts where id_user=${req.query.id_user} ) as postsCount
          from profiles p where id_user=${req.query.id_user} `);
        const rows_friends = await connection.promise().query(`select pr.id_user, pr.name, pr.img from (SELECT id, id_user, id_friend FROM friends where id_user=${req.query.id_user} limit 10) fr inner join profiles pr on fr.id_friend=pr.id_user`);
        const rows_posts = await connection.promise().query(`SELECT id, id_user, text, dateCreate as dateCreateFull, (select count(id) from likes l where p.id=l.id_post) as likes, (select id_user from likes l where p.id=l.id_post and l.id_user=${req.user.id}) as myLike, DATE_FORMAT(dateCreate, '%d %M %Y  в %H:%i') as dateCreate from posts p where id_user=${req.query.id_user}   order  by  dateCreateFull desc`);
        const rows_posts_likes = await connection.promise().query(`select po.id, l.id as id_like, l.id_user, p.name, p.img from (select id from posts where id_user=${req.query.id_user} ) po inner join  likes l  on po.id=l.id_post inner join profiles p on l.id_user=p.id_user order by id`);
        const rows_photos = await connection.promise().query(`SELECT id, id_user, text, img, dateCreate as dateCreateFull, DATE_FORMAT(dateCreate, '%d %M %Y  в %H:%i') as dateCreate from photos where id_user=${req.query.id_user}   order  by  dateCreateFull desc`);


        for (let i=0; i<rows_posts[0].length; i++) {
            rows_posts[0][i].likeUsers=[]
            for (let j=0; j<rows_posts_likes[0].length; j++) {
                if (rows_posts[0][i].id==rows_posts_likes[0][j].id) {
                    rows_posts[0][i].likeUsers.push(rows_posts_likes[0][j])
                }
            }
        }

        res.send({profile: rows_profile[0][0], posts: rows_posts[0], friends: rows_friends[0], photos: rows_photos[0], myPage: req.user.id==req.query.id_user?true:false}).status(201);
      } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'SQL error' })
      }
    }  else return res.status(401).json({ message: 'Not authorized' })
  })

app.get('/friendPosts', async (req, res) => {
  console.log('friendPosts')
  console.log(req.query)
  if (req.user) {
    try {
      console.log(`SELECT * from posts where id_user=${req.query.userId}  order  by  dateCreate desc`)
      const rows = await connection.promise().query(`SELECT * from posts where id_user=${req.query.userId}  order  by  dateCreate desc`);
      console.log(rows)
      res.send(rows[0]).status(201);
    } catch (e) {
      console.log(e)
      res.status(401).json({ message: 'SQL error' })
    }
  }  else return res.status(401).json({ message: 'Not authorized' })
})

app.get('/dialogs', async (req, res) => {
  console.log('dialogs')
  console.log(req.query)
  if (req.user) {
    try {

      const rows = await connection.promise().query(`select d.*, p.name, p.img from (
select im.id_room, id_author, message,  DATE_FORMAT(datesend, '%d %M %Y  в %H:%i') as datesend,  datesend as datefull, read_message,
(select count(*) from messages cm where id_user!=${req.user.id} and cm.id_room=im.id_room and cm.read_message=0) as countNewM,
(select id_user from roomsUser where id_user!=${req.user.id} and id_room=im.id_room ) as id_friend
from roomsUser u
inner join (
select f.id_user as id_author, x.id_room, message, datesend, read_message from ( 
	select id_room, MAX(datesend)  as dataMax 
		from messages  group by id_room
	) as x 
inner join messages as f on f.id_room = x.id_room and f.datesend = x.dataMax
) im on u.id_room=im.id_room where u.id_user=${req.user.id}
) as d inner join profiles p on d.id_friend=p.id_user order by datefull desc`);

      console.log(rows)
      res.send(rows[0]).status(201);
    } catch (e) {
      console.log(e)
      res.status(401).json({ message: 'SQL error' })
    }
  }  else return res.status(401).json({ message: 'Not authorized' })
})

app.get('/messages', async (req, res) => {
  console.log('messages')
 // console.log('messages='+ socket.id);
  //console.log(req.query)
  if (req.user) {
    try {
      /*поиск комнаты*/
      let id_room=0;
      const rows_room = await connection.promise().query(`select id_room from (
        select id_room, count(*) as countu from roomsUser where (id_user=${req.user.id}||id_user=${req.query.userId}) group by id_room
        ) r where r.countu=2`);
      console.log(rows_room)
      console.log(rows_room[0].length)

      /*создание комнаты если пусто*/
      if (rows_room[0].length==0) {
        const rows_insert_room = await connection.promise().query(`INSERT INTO dialogrooms VALUES (0)`);
        console.log('rows_insert_room')
        console.log(rows_insert_room)
        console.log(rows_insert_room[0].insertId)
        id_room=rows_insert_room[0].insertId
        const rows_insert_room_u1 = await connection.promise().query(`INSERT INTO roomsUser (id_room, id_user) VALUES (${id_room}, ${req.user.id})`);
        const rows_insert_room_u2 = await connection.promise().query(`INSERT INTO roomsUser (id_room, id_user) VALUES (${id_room}, ${req.query.userId})`);

      } else {
        id_room=rows_room[0][0].id_room
      }

      /*выборка для отправки*/
      const rows_message = await connection.promise().query(`select id, id_room, id_user, message, DATE_FORMAT(datesend, '%d %M %Y  в %H:%i') as datesend, datesend as datefull, read_message, (case id_user when ${req.user.id} then 0 else 1 end) as incomingMessage from messages where id_room=${id_room} order by datefull asc`);
      const rows_profile = await connection.promise().query(`select * from profiles where id_user=${req.query.userId} `);
      const rows_read = await connection.promise().query(` update messages set read_message=1 where id_room=${id_room} and id_user!=${req.user.id}`);
      const rows_new_message = await connection.promise().query(`select SUM(countNewM)  as countNewM from (select id_room, id_user from roomsUser where id_user=${req.user.id}) r inner join (
        select id_room, count(*) as countNewM from messages where id_user!=${req.user.id} and read_message=0 group by id_room) m on r.id_room=m.id_room `);

      res.send({messages: rows_message[0], profile: rows_profile[0][0], id_room: id_room, countNewM: rows_new_message[0][0].countNewM}).status(201);

      /*отправка сокетов о прочтении другому юзеру*/
      for (let i=0; i<users.length; i++) {
        console.log(users[i].id+'==='+req.query.userId)
        if (users[i].id==req.query.userId&&users[i].socket_id) {
          console.log('MESSAGES ОТПРАВИЛ ему ='+req.query.userId+' '+users[i].socket_id)
          socket.to(users[i].socket_id).emit('read_you_message_socket')
          socket.to(users[i].socket_id).emit('read_you_dialog_socket')
        }
      }


    } catch (e) {
      console.log(e)
      res.status(401).json({ message: 'SQL error' })
    }
  }  else return res.status(401).json({ message: 'Not authorized' })
})


app.post('/sendMessage', async (req, res) => {
  console.log('sendMessage')
  console.log(req.body)
  if (req.user) {
    try {

      const rows_send_m = await connection.promise().query(` INSERT INTO messages (id_room, id_user, message, datesend, read_message)  VALUES (${req.body.id_room}, ${req.user.id}, '${req.body.message}',NOW(),  0);`);

      /*выборка для отправки*/
      const rows_message = await connection.promise().query(`select id, id_room, id_user, message, DATE_FORMAT(datesend, '%d %M %Y  в %H:%i') as datesend,  datesend as datefull, read_message, (case id_user when ${req.user.id} then 0 else 1 end) as incomingMessage from messages where id_room=${req.body.id_room} order by datefull asc`);
      const rows_profile = await connection.promise().query(`select * from profiles where id_user=${req.body.id_friend} `);
     // const rows_read = await connection.promise().query(` update messages set read_message=1 where id_room=${id_room} and id_user!=${req.user.id}`);
    /*  const rows_new_message = await connection.promise().query(`select SUM(countNewM)  as countNewM from (select id_room, id_user from roomsuser where id_user=${req.user.id}) r inner join (
        select id_room, count(*) as countNewM from messages where id_user!=${req.user.id} and read_message=0 group by id_room) m on r.id_room=m.id_room `);
*/


      for (let i=0; i<users.length; i++) {
        console.log(users[i].id+'==='+req.body.id_friend)
        if (users[i].id==req.body.id_friend&&users[i].socket_id) {
          console.log('ОТПРАВИЛ ему ='+req.body.id_friend+' '+users[i].socket_id)
          socket.to(users[i].socket_id).emit('new_message_socket_alert')
          socket.to(users[i].socket_id).emit('new_dialog_message_socket_alert')
          socket.to(users[i].socket_id).emit('new_message_menu_socket_alert')
        }
      }

      res.send({messages: rows_message[0], profile: rows_profile[0][0], id_room: req.body.id_room}).status(201);
    } catch (e) {
      console.log(e)
      res.status(401).json({ message: 'SQL error' })
    }
  }  else return res.status(401).json({ message: 'Not authorized' })
})






  app.post('/likePost', async (req, res) => {
    console.log('likePost')
    console.log(req.body)
    if (req.user) {
      try {
        console.log(`insert into likes (id_post, id_user, dateCreate) values (${req.body.id_post}, ${req.user.id}, NOW())`)
        const rows_like = await connection.promise().query(`insert into likes (id_post, id_user, dateCreate) values (${req.body.id_post}, ${req.user.id}, NOW())`);
        //console.log(rows_like)
        const rows_posts = await connection.promise().query(`SELECT id, id_user, text, dateCreate as dateCreateFull, (select count(id) from likes l where p.id=l.id_post) as likes, (select id_user from likes l where p.id=l.id_post and l.id_user=${req.user.id}) as myLike, DATE_FORMAT(dateCreate, '%d %M %Y  в %H:%i') as dateCreate from posts p where id_user=${req.body.id_user}   order  by  dateCreateFull desc`);
        const rows_posts_likes = await connection.promise().query(`select po.id, l.id as id_like, l.id_user, p.name, p.img from (select id from posts where id_user=${req.body.id_user} ) po inner join  likes l  on po.id=l.id_post inner join profiles p on l.id_user=p.id_user order by id`);
        for (let i=0; i<rows_posts[0].length; i++) {
          rows_posts[0][i].likeUsers=[]
          for (let j=0; j<rows_posts_likes[0].length; j++) {
            if (rows_posts[0][i].id==rows_posts_likes[0][j].id) {
              rows_posts[0][i].likeUsers.push(rows_posts_likes[0][j])
            }
          }
        }

        res.send({posts: rows_posts[0]}).status(201);


      } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'SQL error' })
      }
    }  else return res.status(401).json({ message: 'Not authorized' })
  })


  app.post('/dislikePost', async (req, res) => {
    console.log('likePost')
    console.log(req.body)
    if (req.user) {
      try {
        console.log(`delete from likes where id_post=${req.body.id_post} and id_user=${req.user.id} `)
        const rows_like = await connection.promise().query(`delete from likes where id_post=${req.body.id_post} and id_user=${req.user.id} `);
        console.log(rows_like)
        const rows_posts = await connection.promise().query(`SELECT id, id_user, text, dateCreate as dateCreateFull, (select count(id) from likes l where p.id=l.id_post) as likes, (select id_user from likes l where p.id=l.id_post and l.id_user=${req.user.id}) as myLike, DATE_FORMAT(dateCreate, '%d %M %Y  в %H:%i') as dateCreate from posts p where id_user=${req.body.id_user}   order  by  dateCreateFull desc`);
        const rows_posts_likes = await connection.promise().query(`select po.id, l.id as id_like, l.id_user, p.name, p.img from (select id from posts where id_user=${req.body.id_user} ) po inner join  likes l  on po.id=l.id_post inner join profiles p on l.id_user=p.id_user order by id`);
        for (let i=0; i<rows_posts[0].length; i++) {
          rows_posts[0][i].likeUsers=[]
          for (let j=0; j<rows_posts_likes[0].length; j++) {
            if (rows_posts[0][i].id==rows_posts_likes[0][j].id) {
              rows_posts[0][i].likeUsers.push(rows_posts_likes[0][j])
            }
          }
        }

        res.send({posts: rows_posts[0]}).status(201);


      } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'SQL error' })
      }
    }  else return res.status(401).json({ message: 'Not authorized' })
  })




  app.post('/registration', upload.single('imageFile'), async (req, res) => {
    console.log('registration')
    console.log(req.body)
    let filedata = req.file;
    console.log(filedata);
    console.log(`insert into user (login,password,passwordhash,datecreate) values ('${req.body.login}','${req.body.password}','${passwordHash.generate(req.body.password)}',NOW()) `)
    const rows_user = await connection.promise().query(`insert into user (login,password,passwordhash,datecreate) values ('${req.body.login}','${req.body.password}','${passwordHash.generate(req.body.password)}',NOW()) `);
    const rows_profile = await connection.promise().query(`insert into profiles (id_user,name,img,dateb,school,about) values (${rows_user[0].insertId},   '${req.body.surname} ${req.body.name}', '/uploadPhoto/${filedata.filename}',  ${req.body.year&&req.body.month&&req.body.day?`'${req.body.year}-${req.body.month}-${req.body.day}'`:`NULL`}  ,    ${req.body.school?`'${req.body.school}'`:`NULL`},   ${req.body.about?`'${req.body.about}'`:`NULL`}) `);
    console.log(rows_user[0]);

    if(!filedata) {
      res.send("Ошибка при загрузке файла");
    } else{
      // res.send("Файл загружен");
      updateUserForAuth();
      return res.status(200).json({
        token: jwt.sign({ id: rows_user[0].insertId }, tokenKey)
      })

      res.send({rows_profile: rows_profile[0]}).status(201);
    }
  });




  app.post('/sendPosts', upload.single('imageFile'), async (req, res) => {
    console.log('sendPosts   -')
    console.log(req.body)
    console.log(req.user)
    if (req.user) {
      try {
        console.log('filedata=');
        let filedata = req.file;
        console.log(filedata);

        let insertHtmlPost = '';
        if (filedata) {
          insertHtmlPost=` <img src="/uploadPhoto/${filedata.filename}"/> `;
        }
        const rows = await connection.promise().query(`INSERT INTO posts (id_user, dateCreate, text, likes) VALUES (${req.user.id}, NOW(), '${insertHtmlPost} <div>${req.body.post}</div>', 0);`);
        // const rows_posts = await connection.promise().query(`SELECT  id, id_user, text, likes, DATE_FORMAT(dateCreate, '%d %M %Y  в %H:%i') as dateCreate  from posts where id_user=${req.user.id}  order  by  dateCreate desc`);
        //res.send(rows_posts[0]).status(201);

        const rows_posts = await connection.promise().query(`SELECT id, id_user, text, dateCreate as dateCreateFull, (select count(id) from likes l where p.id=l.id_post) as likes, (select id_user from likes l where p.id=l.id_post and l.id_user=${req.user.id}) as myLike, DATE_FORMAT(dateCreate, '%d %M %Y  в %H:%i') as dateCreate from posts p where id_user=${req.user.id}   order  by  dateCreateFull desc`);
        const rows_posts_likes = await connection.promise().query(`select po.id, l.id as id_like, l.id_user, p.name, p.img from (select id from posts where id_user=${req.user.id} ) po inner join  likes l  on po.id=l.id_post inner join profiles p on l.id_user=p.id_user order by id`);


        for (let i=0; i<rows_posts[0].length; i++) {
          rows_posts[0][i].likeUsers=[]
          for (let j=0; j<rows_posts_likes[0].length; j++) {
            if (rows_posts[0][i].id==rows_posts_likes[0][j].id) {
              rows_posts[0][i].likeUsers.push(rows_posts_likes[0][j])
            }
          }
        }

        res.send({posts: rows_posts[0]}).status(201);

      } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'SQL error' })
      }

    }  else return res.status(401).json({ message: 'Not authorized' })
  })

  app.get('/news', async (req, res) => {
    console.log('news');
    if (req.user) {
     /* const rows = await connection.promise().query(`select po.id, po.id_user,  DATE_FORMAT(po.dateCreate, '%d %M %Y  в %H:%i') as dateCreate , po.text, po.likes, pr.name, pr.img from (
          SELECT * from posts order  by  dateCreate desc limit 100
          ) as po inner join profiles pr on po.id_user=pr.id_user  order  by  dateCreate desc `);
      res.send(rows[0]).status(201);*/

      const rows_posts = await connection.promise().query(`SELECT p.id, p.id_user, text, dateCreate as dateCreateFull, 
          (select count(id) from likes l where p.id=l.id_post) as likes, 
          (select id_user from likes l where p.id=l.id_post and l.id_user=${req.user.id}) as myLike, 
          DATE_FORMAT(dateCreate, '%d %M %Y  в %H:%i') as dateCreate, pr.name, pr.img
               from posts p inner join profiles pr on p.id_user=pr.id_user  order  by  dateCreateFull desc`);
      const rows_posts_likes = await connection.promise().query(`select po.id, l.id as id_like, l.id_user, p.name, p.img from (select id from posts ) po inner join  likes l  on po.id=l.id_post inner join profiles p on l.id_user=p.id_user order by id`);


      for (let i=0; i<rows_posts[0].length; i++) {
        rows_posts[0][i].likeUsers=[]
        for (let j=0; j<rows_posts_likes[0].length; j++) {
          if (rows_posts[0][i].id==rows_posts_likes[0][j].id) {
            rows_posts[0][i].likeUsers.push(rows_posts_likes[0][j])
          }
        }
      }

      res.send({posts: rows_posts[0]}).status(201);


    }  else return res.status(401).json({ message: 'Not authorized' })
  })

  app.post('/likePostNews', async (req, res) => {
    console.log('likePost')
    console.log(req.body)
    if (req.user) {
      try {
        const rows_like = await connection.promise().query(`insert into likes (id_post, id_user, dateCreate) values (${req.body.id_post}, ${req.user.id}, NOW())`);
        const rows_posts = await connection.promise().query(`SELECT p.id, p.id_user, text, dateCreate as dateCreateFull, 
          (select count(id) from likes l where p.id=l.id_post) as likes, 
          (select id_user from likes l where p.id=l.id_post and l.id_user=${req.user.id}) as myLike, 
          DATE_FORMAT(dateCreate, '%d %M %Y  в %H:%i') as dateCreate, pr.name, pr.img
               from posts p inner join profiles pr on p.id_user=pr.id_user  order  by  dateCreateFull desc`);
        const rows_posts_likes = await connection.promise().query(`select po.id, l.id as id_like, l.id_user, p.name, p.img from (select id from posts ) po inner join  likes l  on po.id=l.id_post inner join profiles p on l.id_user=p.id_user order by id`);


        for (let i=0; i<rows_posts[0].length; i++) {
          rows_posts[0][i].likeUsers=[]
          for (let j=0; j<rows_posts_likes[0].length; j++) {
            if (rows_posts[0][i].id==rows_posts_likes[0][j].id) {
              rows_posts[0][i].likeUsers.push(rows_posts_likes[0][j])
            }
          }
        }

        res.send({posts: rows_posts[0]}).status(201);


      } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'SQL error' })
      }
    }  else return res.status(401).json({ message: 'Not authorized' })
  })


  app.post('/dislikePostNews', async (req, res) => {
    console.log('likePost')
    console.log(req.body)
    if (req.user) {
      try {
        const rows_like = await connection.promise().query(`delete from likes where id_post=${req.body.id_post} and id_user=${req.user.id} `);
        const rows_posts = await connection.promise().query(`SELECT p.id, p.id_user, text, dateCreate as dateCreateFull, 
          (select count(id) from likes l where p.id=l.id_post) as likes, 
          (select id_user from likes l where p.id=l.id_post and l.id_user=${req.user.id}) as myLike, 
          DATE_FORMAT(dateCreate, '%d %M %Y  в %H:%i') as dateCreate, pr.name, pr.img
               from posts p inner join profiles pr on p.id_user=pr.id_user  order  by  dateCreateFull desc`);
        const rows_posts_likes = await connection.promise().query(`select po.id, l.id as id_like, l.id_user, p.name, p.img from (select id from posts ) po inner join  likes l  on po.id=l.id_post inner join profiles p on l.id_user=p.id_user order by id`);


        for (let i=0; i<rows_posts[0].length; i++) {
          rows_posts[0][i].likeUsers=[]
          for (let j=0; j<rows_posts_likes[0].length; j++) {
            if (rows_posts[0][i].id==rows_posts_likes[0][j].id) {
              rows_posts[0][i].likeUsers.push(rows_posts_likes[0][j])
            }
          }
        }

        res.send({posts: rows_posts[0]}).status(201);


      } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'SQL error' })
      }
    }  else return res.status(401).json({ message: 'Not authorized' })
  })




  app.post('/deletePost', async (req, res) => {
    console.log('deletePost')
    if (req.user) {
      try {
        // console.log(req.body)
        const rows = await connection.promise().query(`delete from posts where id=${req.body.id}`);

        const rows_posts = await connection.promise().query(`SELECT id, id_user, text, dateCreate as dateCreateFull, (select count(id) from likes l where p.id=l.id_post) as likes, (select id_user from likes l where p.id=l.id_post and l.id_user=${req.user.id}) as myLike, DATE_FORMAT(dateCreate, '%d %M %Y  в %H:%i') as dateCreate from posts p where id_user=${req.user.id}   order  by  dateCreateFull desc`);
        const rows_posts_likes = await connection.promise().query(`select po.id, l.id as id_like, l.id_user, p.name, p.img from (select id from posts where id_user=${req.user.id} ) po inner join  likes l  on po.id=l.id_post inner join profiles p on l.id_user=p.id_user order by id`);


        for (let i=0; i<rows_posts[0].length; i++) {
          rows_posts[0][i].likeUsers=[]
          for (let j=0; j<rows_posts_likes[0].length; j++) {
            if (rows_posts[0][i].id==rows_posts_likes[0][j].id) {
              rows_posts[0][i].likeUsers.push(rows_posts_likes[0][j])
            }
          }
        }

        res.send({posts: rows_posts[0]}).status(201);
        //res.send(rows_posts[0]).status(201);
      } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'SQL error' })
      }


    }  else return res.status(401).json({ message: 'Not authorized' })
  })


  app.post('/loadPhoto', upload.array('imageFile'), async (req, res) => {
    console.log('loadPhoto   ------------------')
    console.log(req.body)
    if (req.user) {
      try {
        // console.log(req.body)
       // const rows_add_photo= await connection.promise().query(`insert into photos (id_user, text, img, dateCreate) values (1,'','/albumPhotos/BG.jpg', NOW()),(1,'','/albumPhotos/BG.jpg', NOW()) ${req.user.id}`);

      let filedata = req.files;
      let sqlInsert = filedata.reduce((acc, file) => {
        if (acc=='') {
          return acc + `(${req.user.id},'','/uploadPhoto/${file.filename}', NOW())`
        } else {
          return acc + `,(${req.user.id},'','/uploadPhoto/${file.filename}', NOW())`
        }
      }, '')

     console.log(filedata);
      console.log(sqlInsert);

        const rows_add_photo= await connection.promise().query(`insert into photos (id_user, text, img, dateCreate) values  ${sqlInsert} `);
        console.log(rows_add_photo);
        const rows_photos = await connection.promise().query(`SELECT id, id_user, text, img, dateCreate as dateCreateFull, DATE_FORMAT(dateCreate, '%d %M %Y  в %H:%i') as dateCreate from photos where id_user=${req.user.id}   order  by  dateCreateFull desc`);

        res.send({photos: rows_photos[0]}).status(201);

      } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'SQL error' })
      }
    } else return res.status(401).json({ message: 'Not authorized' })
  });

  app.post('/followFriendPage', async (req, res) => {
    console.log('followFriendPage')
    if (req.user) {
      try {
        console.log(req.body)
        const rows = await connection.promise().query(`INSERT INTO friends (id_user, id_friend) VALUES (${req.user.id}, '${req.body.id_friend}');`);
        //console.log(rows)
        const rows_friends = await connection.promise().query(`select *, (select id_friend from friends f where f.id_user=${req.user.id} and p.id_user=f.id_friend) as follow, 
          (select id_friend from friends f where f.id_friend=${req.user.id} and p.id_user=f.id_user) as follower  from profiles p  where p.id_user!=${req.user.id}`);
        res.send(rows_friends[0]).status(201);
      } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'SQL error' })
      }


    }  else return res.status(401).json({ message: 'Not authorized' })
  })

  app.post('/unFollowFriendPage', async (req, res) => {
    console.log('unFollowFriendPage')
    if (req.user) {
      try {
        console.log(req.body)
        const rows = await connection.promise().query(`delete from friends where id_friend=${req.body.id_friend} and id_user=${req.user.id};`);
        //console.log(rows)
        const rows_friends = await connection.promise().query(`select *, (select id_friend from friends f where f.id_user=${req.user.id} and p.id_user=f.id_friend) as follow, 
          (select id_friend from friends f where f.id_friend=${req.user.id} and p.id_user=f.id_user) as follower  from profiles p  where p.id_user!=${req.user.id}`);
        res.send(rows_friends[0]).status(201);
      } catch (e) {
        console.log(e)
        res.status(401).json({ message: 'SQL error' })
      }


    }  else return res.status(401).json({ message: 'Not authorized' })
  })


});

//server.listen(3001, '151.248.114.72');
server.listen(port, host, () => console.log(`Server listens http://${host} ${port}`) );
//server.listen(port, host, () => console.log(`Server listens http://${host} ${port}`))

