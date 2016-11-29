/**
 * Created by Rakesh on 11/29/2016.
 */
$(document).ready(mainFunction);

setInterval(mainFunction, 1000*60*30);

function mainFunction(){
console.log("Main Weather app called");


    $.get("http://ipinfo.io/json", function(loc){
        //console.log(loc);
        var lat = loc.loc.split(',')[0].trim();
        var long = loc.loc.split(',')[1].trim();
       // console.log("lat: " + Number(lat) + " Long: " + Number(long));
        getWeather(lat, long);
    });


}

function getWeather(lat, long){

    var myUrl = "http://api.openweathermap.org/data/2.5/weather?";

    $.ajax({

        url :myUrl,

        data : {appid : "d0a92584b6b234f3227b0c01e0cf0a23",
            lat : lat,
            lon : long
            },

        success: mySuccess,
        error: myError,


        cache:false


    });


}


function mySuccess(result){

    //console.log("Success: " + JSON.stringify(result));
    $("#location").empty();
    $("#temp").empty();
    $("#desc").empty();
    $("#icon").empty();
    $("#time").empty();
    var time  = new Date()

    var timeFormat = time.getFullYear()+"-"+Number(time.getMonth()+1)+"-"+time.getDate()+" "+time.getHours()+":"+time.getMinutes();
    $("#time").append("Last Updated at: " +timeFormat );


    var location =result.name + ", " + result.sys.country;

    $("#location").append(location);

    $("#icon").attr("src", "http://openweathermap.org/img/w/"+result.weather[0].icon+".png");

    var kelvin = result.main.temp;
    var celsius = kelvin - 273.15;
    var farenheit  = (kelvin * (9/5)) - 459.67;

    $("#temp").append(Math.round(celsius++) + "&deg;C");
    $("#temp").attr("temp", "C");

    $("#desc").append(result.weather[0].description);

    $("#temp").click(function(){
        var toggle = $("#temp").attr("temp");
        if(toggle === "C"){
            $("#temp").empty();
            $("#temp").append(Math.round(farenheit) + "&deg;F");
            $("#temp").attr("temp", "F");
        }else if(toggle === "F"){
            $("#temp").empty();
            $("#temp").append(Math.round(celsius) + "&deg;C");
            $("#temp").attr("temp", "C");

        }

    });





}

function myError(error){
    alert("Error: Check Console for more info");

    console.log("Error: " + JSON.stringify(error));
}