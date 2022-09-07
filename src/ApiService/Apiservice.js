//get TODAY
var date = new Date();
var last = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let hours = date.getHours();
let minus = date.getMinutes();
if (month < 10) month = '0' + month;
if (day < 10) day = '0' + day;
if (hours < 10) hours = '0' + hours;
if (minus < 10) minus = '0' + minus;
let today = year + '-' + month + '-' + day;
let now = hours + ':' + minus + '(' + day + '/' + month + ')';
//GET LAST DAY
var lastday = last.getDate();
var lastMo = last.getMonth() + 1;
var lastY = last.getFullYear();
let lastfday = lastY + '-' + lastMo + '-' + lastday;

//convert date ob => string
function handleDay(e) {
    const yyyy = e.getFullYear();
    let mm = e.getMonth() + 1; // Months start at 0!
    let dd = e.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    return (day = yyyy + '-' + mm + '-' + dd);
}
const Timeline = 'http://localhost:3000/TIME_LINE';

// GET all item

export function getTimeLine() {
    return fetch(Timeline).then((data) => data.json());
}
export function addTimeline(data, callback) {
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch(Timeline, options)
        .then((response) => response.json())
        .then(callback);
}

export { today, date, handleDay, lastfday, now };
