//var eventful = require('eventful-node');
//var client = new eventful.Client('TD6FdJXNngq5Cppt');

//<html>

//Javascript Sample page <br>

//<script type="text/javascript" src="http://api.eventful.com/js/api">

//</script>

//<script type="text/javascript">

//https://github.com/eventful

function show_alert()

{

  var oArgs = {

            app_key:"TD6FdJXNngq5Cppt",

            id: "20218701",

            page_size: 25 ,

  };

  EVDB.API.call("/events/get", oArgs, function(oData) {

      // Note: this relies on the custom toString() methods below

    });

}



function show_alert2()

{

   var oArgs = {

      app_key: "YOUR APP KEY",

      q: "music",

      where: "Marina", 

      "date": "2013061000-2015062000",

      page_size: 5,

      sort_order: "popularity",

   };

   EVDB.API.call("/events/search", oArgs, function(oData) {

      // Note: this relies on the custom toString() methods below

    });

}

//</script>



//<body>

//Run Sample api searches <br><br>

//<input type="button" onclick="show_alert()" value="Query #1 " /> <br>

//<input type="button" onclick="show_alert2()" value="Query #2 " /> <br>

//</body>

//</html>




//Testing
//set API_KEY=<YOUR_EVENTFUL_API_KEY>
//grunt test