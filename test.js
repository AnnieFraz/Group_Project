var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'tb831',
  password : '',
  database : 'eventfinder'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
  
  connection.query('SELECT * FROM api', function(err, results) {
      // if (err) throw err
      console.log(results[1].api_id)
  })
})


connection.end()