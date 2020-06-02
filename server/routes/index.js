exports.index = function(req, res){
    //res.render('index', { title: 'Регистрация' });
    console.log( __dirname  + "/../index.html")
    res.sendFile( __dirname  + "/../index.html" );
   // res.sendFile('./../index.html');
};