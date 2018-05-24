$(document).ready(function() {

  var twitchName = ["ESL_SC2", "OgamingSC2", "JimBenOfficial", "freecodecamp", "SirActionSlacks", "BrownMan", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
  var userName = [];
  var userLogo = [];
  var userStatus = [];
  var userURL = [];
  var userOnline = [];
  var userStream = [];
  var userGame = [];

  for (var i=0; i<twitchName.length; i++) {
    ajaxChannel(i);
  }

  function ajaxChannel(i) {
    $.ajax({
      type: "get",
      url: "https://api.twitch.tv/kraken/channels/" + twitchName[i],
      headers: {"Client-ID": "9szmid9uhp4i9xpda3ienaatl9cz4s"},
      success: function(data) {
       userURL[i] = (data.url);
       userName[i] = ("<a href =" + userURL[i] + ">" + data.display_name + "</a>");
       userLogo[i] = ("<img class = logo src=" + data.logo + ">");
       userStatus[i] = (data.status);
       createHTML(data);
     },
      error: function(data) {
       userName[i] = twitchName[i];
       userLogo[i] = ("<img class = logo src = http://www.ewtnet.com/wp-content/uploads/2014/01/Sign-Error-icon.png>");
       userStatus[i] = "Account does not exist.";
       createHTML(data);
      }
  });
 };

  for (var j=0; j<twitchName.length; j++) {
    ajaxStream(j);
  }

  function ajaxStream(j) {
    $.ajax({
      type: "get",
      url: "https://api.twitch.tv/kraken/streams?channel=" + twitchName[j],
      headers: {"Client-ID": "9szmid9uhp4i9xpda3ienaatl9cz4s"},
      success: function(strdata) {
        console.log(strdata);
        if (strdata.streams.length > 0) {
          userOnline[j] = ("Online");
        }
        else {
          userOnline[j] = ("Offline");
        }
        createHTML(strdata);
      },
      error: function() {
        console.log("Unable to obtain stream data for" + twitchName[j] + ".")
      }
    });
  };

  function createHTML(data, strdata) {
    var myHTML = "";
    var onlineOrOffline = "";

    for (var k=0; k<userName.length; k++) {

    if (userOnline[k] == "Offline") {
       onlineOrOffline = "offline-box";
      }
    if (userOnline[k] == "Online") {
       onlineOrOffline = "online-box";
      }

      myHTML += "<div class =" + onlineOrOffline + ">";
      myHTML += "<div class = row>";
      myHTML += "<div class = col-xs-3>" + userLogo[k] + "</div>";
      myHTML += "<div class = col-xs-3>" + "<h3 class = user-name>" + userName[k] + "</h3>"
      myHTML += "<h3 class = user-online>" + userOnline[k] + "</h3>" + "</div>";
      myHTML += "<div class = col-xs-5>" + "<h3 class = user-status><i>" + userStatus[k] + "</i></h3>" + "</div>";
      myHTML += "</div>";
      myHTML += "</div>";

    $("#myHTML").html(myHTML);
  };
} //end of HTML creation

});//end of document ready
