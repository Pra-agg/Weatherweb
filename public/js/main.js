const submitBtn = document.getElementById("submitBtn");
const cityname = document.getElementById("city-name");
const city_name = document.getElementById("city_name")
const temp_real = document.getElementById("temp_real");
const tempstatus = document.getElementById("temp_status")
const datahide = document.querySelector(".middle_layer");
const day = document.getElementById("day");
const todaydate = document.getElementById("today_data");


const getinfo = async(event) => {
    event.preventDefault();
    let cityval = cityname.value;

    if (cityval === "") {
        city_name.innerText = `Please write the name before search`
        datahide.classList.add("data_hide");
    } else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=e70008e658839db15cd5038e9916549a`;
            const response = await fetch(url)
            const data = await response.json();
            const arrdata = [data]
            console.log(arrdata[0].main.temp)
            temp_real.innerText = arrdata[0].main.temp;
            city_name.innerText = `${arrdata[0].name},${arrdata[0].sys.country}`
                // tempstatus condition
            const tempState = arrdata[0].weather[0].main;
            if (tempState == "Sunny") {
                tempstatus.innerHTML = " <i class='fas fa-sun' style='color:#eccc68'></i>"
            } else if (tempState == "Clouds") {
                tempstatus.innerHTML = " <i class='fas fa-cloud' style='color:#f1f2f6'></i>"
            } else if (tempState == "Rainy") {
                tempstatus.innerHTML = " <i class='fas fa-cloud-rain' style='color:#a4b0be'></i>"
            } else {
                tempstatus.innerHTML = " <i class='fas fa-sun' style='color:#eccc68'></i>"
            }
            datahide.classList.remove("data_hide")
            cityval = "";

        } catch {
            city_name.innerText = `Please write the name before search`
            datahide.classList.add("data_hide")
            cityval = "";
        }
    }
}
submitBtn.addEventListener('click', getinfo);

// date and time

const getcurrentday = () => {
    var weekday = new Array(7);
    weekday[0] = "Sun"
    weekday[1] = "Mon"
    weekday[2] = "Tue"
    weekday[3] = "Wed"
    weekday[4] = "Thur"
    weekday[5] = "Fri"
    weekday[6] = "Sat"
    let curtime = new Date()
    let day = weekday[curtime.getDay()];
    return day;
}

const getcurrentdate = () => {
    var months = [
        "jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    var time = new Date();
    var month = months[time.getMonth()];
    var date = time.getDate();
    var year = time.getFullYear();
    let hours = time.getHours();
    let mins = time.getMinutes();
    let period = "AM";
    if (hours > 11) {
        period = "PM"
        if (hours > 12) {
            hours -= 12;
        }
    }
    if (mins < 10) {
        mins = "0" + mins;
    }
    return `${month}${date} | ${hours}:${mins}${period}`;
};

day.innerText = getcurrentday();
todaydate.innerText = getcurrentdate();