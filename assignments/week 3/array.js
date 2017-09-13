
var arr = [9,10,1,8,7,111,202,27];
max(arr);
function max(){
    arr.sort(function(a,b)
    {
        return a-b;
    });
    alert(arr[arr.length-1]);
    alert(arr[arr.length-2]);
    alert(arr[arr.length-3]);
}

-------------------------------------

var arr = [9,10,1,8,7,111,202,27];
max(arr);
function max(){
    arr.sort(function(a,b)
    {
        return a-b;
    });
    console.log(arr[arr.length-1],arr[arr.length-2],arr[arr.length-3]);
}

