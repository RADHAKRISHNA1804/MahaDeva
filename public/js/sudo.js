// sudos scripts
function test() {
  var month = document.forms["formUpdateHoroscope"]["month"].value;
  var x = document.forms["formUpdateHoroscope"]["horoscope"].value;

   if (month == "") {
       alert("Month must be filled out");
       return false;
   }
   if (horoscope == "") {
     alert("Horoscope must be filled out");
     return false;
   }
   return true;
}

// var postPreview = function ()
