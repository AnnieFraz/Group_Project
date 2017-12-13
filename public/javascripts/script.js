var page = 0;

//This function get events from a certain page of th ticketmaster website
function getEvents(page) {

//Displaying the information
  $('#events-panel').show();
  $('#attraction-panel').hide();

  if (page < 0) {
    page = 0;
    return;
  }
  if (page > 0) {
    //Data stored as a json
    if (page > getEvents.json.page.totalPages - 1) {
      page = 0;
      return;
    }
  }
//Getting the json and displaying it
  $.ajax({
    type: "GET",
    url: "https://app.ticketmaster.com/discovery/v2/events.json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&size=8&page=" + page,
    async: true,
    dataType: "json",
    success: function(json) {
      getEvents.json = json;
      showEvents(json);
    },
    error: function(xhr, status, err) {
      console.log(err);
    }
  });
}

//Function for the user to find a certain event
function searchEvents(searchFilter, searchCriteria) {
  $('#events-panel').show();
  $('#attraction-panel').hide();
  
  //Getting the date
  let date = new Date();
  let dd = date.getDate();
  let mm = date.getMonth() + 1;
  let yyyy = date.getFullYear();
  
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  // 2017-12-06T16:37:00Z
  let today = yyyy + '-' + mm + '-' + dd + 'T00:00:00Z';
  console.log(today);
  
  if (page < 0) {
    page = 0;
    return;
  }
  if (page > 0) {
    if (page > getEvents.json.page.totalPages - 1) {
      page = 0;
      return;
    }
  }
  //Displaying the new results after the search 
    $.ajax({
    type:"GET",
    url:"https://app.ticketmaster.com/discovery/v2/events.json?" + searchFilter + "=" + searchCriteria + "&startDateTime=" + today + "&apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG&size=4&page="+page,
    async:true,
    dataType: "json",
    success: function(json) {
      getEvents.json = json;
      showEvents(json);
    },
    error: function(xhr, status, err) {
      console.log(err);
    }
  });
}

//Displaying the array 
function showEvents(json) {
  var items = $('#events .list-group-item');
  items.hide();
  var events = json._embedded.events;
  var item = items.first();
  for (var i = 0; i < events.length; i++) {
    item.children('.list-group-item-heading').text(events[i].name);
    item.children('.list-group-item-text').text(events[i].dates.start.localDate);
    item.children('.start-time').text("Event Start: " + events[i].dates.start.localTime);
    item.children('.link').text(events[i].url);
    item.children('.min_price').text("Lowest price: $" + events[i].priceRanges[0].min);
    item.children('.max_price').text("Highest Price: $" + events[i].priceRanges[0].max);
    try {
      item.children('.venue').text(events[i]._embedded.venues[0].name + " in " + events[i]._embedded.venues[0].city.name);
    } catch (err) {
      console.log(err);
    }
    item.show();
    item.off("click");
    item.click(events[i], function(eventObject) {
      console.log(eventObject.data);
      try {
        getAttraction(eventObject.data._embedded.attractions[0].id);
      } catch (err) {
        console.log(err);
      }
    });
    item = item.next();
  }
}

//So you can look through events
$('#prev').click(function() {
  getEvents(--page);
});

$('#next').click(function() {
  getEvents(++page);
});

//Acquiring the information about a single event
function getAttraction(id) {
  $.ajax({
    type: "GET",
    url: "https://app.ticketmaster.com/discovery/v2/attractions/" + id + ".json?apikey=5QGCEXAsJowiCI4n1uAwMlCGAcSNAEmG",
    async: true,
    dataType: "json",
    success: function(json) {
      showAttraction(json);
    },
    error: function(xhr, status, err) {
      console.log(err);
    }
  });
}

//Displays information about a single event when clicked
function showAttraction(json) {
  $('#events-panel').hide();
  $('#attraction-panel').show();
  $('#profile-alert').hide();

  $('#card-go-back').click(function() {
    getEvents(page);
  });
  
  $('#tm-purchase').click(function() {
    url = json.url
    // alert(url)
    window.open(url)
  });
  
  $('#add-events-profile').click(function() {
      // $('#alert-profile').show();
      alert('Added to Profile');
  })
  
  

  $('#attraction h3').first().text(json.name);
  $('#attraction img').first().attr('src', json.images[0].url);
  $('#classification').text(json.classifications[0].segment.name + " - " + json.classifications[0].genre.name + " - " + json.classifications[0].subGenre.name);
  $('#description'.text(json.description));
}

//The search bar
$('#search_form').submit(function (evt) {
    evt.preventDefault();
    let searchFilter = $("#search_filter").val();
    // searchFilter = searchFilter.substr(3); // removes the 'by ' phrase from the filter to get key to use in url
    //alert(searchFilter);
    let searchCriteria = $('#search_input').val();
    //alert(searchCriteria);
    searchEvents(searchFilter ,searchCriteria);
  
});

//calling the function
getEvents(page);