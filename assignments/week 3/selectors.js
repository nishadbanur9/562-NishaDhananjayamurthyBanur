"use strict";
var colorChange = function(){
  var colors = ["red","green","yellow","blue","pink","orange"];
  var num = Math.floor((Math.random()) * (colors.length));
  var backgroundColor = colors[num];
  return backgroundColor;
}

$(document).ready(function(){
  $(".relevant p").hide();
  $(".relevant p").each(function(i){
    $(this).delay(200*i).fadeIn();
    $(this).css("background-color",colorChange());
  });
});
