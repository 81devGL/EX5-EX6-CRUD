
var date = new Date();
var last = new Date(date.getTime() - (7 * 24 * 60 * 60 * 1000));
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
if (month < 10) month = '0' + month;
if (day < 10) day = '0' + day;
let today = year + '-' + month + '-' + day;


var lastday =last.getDate();
var lastMo=last.getMonth()+1;
var lastY=last.getFullYear();
let lastfday = lastY + '-' + lastMo + '-' + lastday;

function handleDay(e){
  const yyyy = e.getFullYear();
  let mm = e.getMonth() + 1; // Months start at 0!
  let dd = e.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
return day =   yyyy + '-' + mm + '-' + dd
}

export {today,date,handleDay,lastfday}