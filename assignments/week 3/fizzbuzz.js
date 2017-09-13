var num1 = prompt("First number");
var num2 = prompt("Second number");

var i = parseInt(num1);
var j = parseInt(num2);

fizzbuzz(i,j);

function fizzbuzz(i,j){
if(i>j){
  window.alert("Please enter the range correctly");
}
else
{
  for (var a=i; a<=j; a++)
  {
    if ( a % 3 == 0 && a%5==0)
        console.log("fizzbuzz");
    else if ( a%3 == 0)
        console.log("fizz");
    else if ( a%5 == 0)
        console.log("buzz");
    else
        console.log(a);
  }
}}
