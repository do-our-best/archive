//* access token 얻기 https://developers.google.com/identity/sign-in/web/reference
//* 캘린더 API https://developers.google.com/calendar/api/v3/reference/calendarList/list

const login = document.querySelector(".login");
const selectDate = document.querySelector(".select-date button");
const randomDate = document.querySelector(".select-date input");
const selectSchedule = document.querySelector(".schedule button");
const scheduleText = document.querySelector(".schedule input");
const save = document.querySelector(".save button");

const client_id = "";
const scopeList = [
    "https://www.googleapis.com/auth/calendar",
    "https://www.googleapis.com/auth/calendar.events",
    "https://www.googleapis.com/auth/calendar.addons.execute",
];
const scope = scopeList.join(" ");

//! Access token
function init() {
    gapi.load("auth2", onLoad);
    function onLoad() {
        console.log("onLoad called");
        /* Ready. Make a call to gapi.auth2.init or some other API */
    }
}

//! Access token
login.addEventListener("click", () => {
    gapi.auth2.authorize(
        {
            client_id,
            scope,
            response_type: "id_token permission",
        },
        (res) => {
            if (res.error) {
                console.log("ERROR");
                return;
            }

            const accessToken = res.access_token;
            const idToken = res.id_token;
            window.accessToken = accessToken;
            window.idToken = idToken;
            const vh100 = document.documentElement.clientHeight;
            window.scrollTo(0, vh100);
        }
    );
});

//! Calendar API
const handleSave = async () => {
    try {
        const calendarId = await getFirstCalendarId();
        const result = await postSchedule(
            calendarId,
            window.randomDate,
            window.scheduleText
        );
        window.alert("성공적으로 저장되었습니다!");
    } catch (error) {
        window.alert("문제가 발생했습니다.");
        console.log(error);
    }
};

//! Calendar API
const getFirstCalendarId = async () => {
    const result = await axios({
        method: "get",
        url: "https://www.googleapis.com/calendar/v3/users/me/calendarList",
        headers: {
            Authorization: "Bearer " + window.accessToken,
        },
    });
    return result?.data?.items[0]?.id;
};

//! Calendar API
const postSchedule = async (calendarId, text = "schedule title", date) => {
    const result = await axios.post(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        {
            start: {
                date,
            },
            end: {
                date,
            },
            summary: text,
        },
        {
            headers: {
                Authorization: "Bearer " + window.accessToken,
            },
        }
    );
    return result;
};

//* event listener
selectDate.addEventListener("click", () => {
    const generate202109dd = generateDate("2021")("09");
    const date = generate202109dd(getRandomInt(10, 20));
    randomDate.value = date;
    window.randomDate = date;
});

selectSchedule.addEventListener("click", () => {
    window.scheduleText = scheduleText.value;
});

save.addEventListener("click", () => {
    handleSave();
});

//* util
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}

function handleButtonText(newText) {
    login.innerHTML = newText;
}

function generateDate(year) {
    return (month) => {
        return (day) => {
            return [year, month, day].join("-");
        };
    };
}
