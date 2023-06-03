var displayPresentDay = document.querySelector("#presentDay");
var presentDay = moment();
displayPresentDay.textContent = presentDay.format("dddd, MMMM Do YYYY");

// the following time blocks were used for standard business working day hours
var businessDaytimeBlock = $(".time-block").addClass("row");
var scheduleText = $("<p>").addClass("description");
businessDaytimeBlock.append(scheduleText);

var presentHour = parseInt(moment().format("H")); // This line converts the code to a string.

// when a user refreshes the page, the saved events persist
var loadEvents = function (timeFrames) {
 
  timeFrames.forEach((element) => {
  console.log(element);
  var text = localStorage.getItem(parseInt(element.time));
  console.log(text);
  if (text) {
      element.text.val(text);
    }
  });
};

var fetchEvents = function () {
  var temporaryArray = [];
  
  $("textarea").each(function (index, elem) {
    temporaryArray.push({
      time: $(elem).attr("id"),
      text: $(elem),
    });
  });
  loadEvents(temporaryArray);
};

// The time frames indicate past, present, and future events.
$("textarea").each(function () {
  var $this = $(this);
  var id = parseInt($this.attr("id"));

  if (id < presentHour) {
    $(this).addClass("past");
  }
  if (id > presentHour) {
    $(this).addClass("future");
  }
  if (id === presentHour) {
    $(this).addClass("present");
  }
});

$("button.saveBtn").click(function (event, loadEvents) {
  event.preventDefault();

  var $element = $(this).siblings("textarea");
  var time = $element.attr("id");
  console.log(time);
  // The line of code below gets text input via $.val()
  var text = $element.val().trim();
  console.log(text);

  // The line of codes below is for saving events in the work day scheduler to the localStorage
  if (time && text !== "") {
    console.log(time, text);
    localStorage.setItem(time, text);
  }
});

$(".saveBtn").hover(function () {
  $(this).addClass("saveBtn:hover");
});

fetchEvents();