var eventful = require('eventful-node');
var client = new eventful.Client('TD6FdJXNngq5Cppt');

client.searchEvents({ keywords: 'Marina' }, function(err, data){
 
  if(err){
  
    return console.error(err);
  
  }
  
  console.log('Recieved ' + data.search.total_items + ' events');
  
  console.log('Event listings: ');
  
  //print the title of each event 
  for(var i in data.search.events){
  
    console.log(data.search.events[i].title);
  
  }
 
});


//Testing
//set API_KEY=<YOUR_EVENTFUL_API_KEY>
//grunt test