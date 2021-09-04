const formPostUser = document.querySelector("#form-post-user");
const inputUserName = document.querySelector("#input-user-name");
const userList = document.querySelector("#user-list");

/**
 * div 태그에 추가할 유저항목
 * @param name :이름
 * @param idx : 인덱스
 * @returns {HTMLDivElement}
 */
function createUserCard(name, idx) {
    const card = document.createElement("div");

    const title = document.createElement("span");
    title.textContent = name;

    const updateButton = document.createElement("button");
    updateButton.textContent = "update"
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";

    card.append(title, updateButton, deleteButton);
    card.classList.add("user-card")
    // 삭제 버튼과 수정버튼에 이벤트 추가
    updateEvent(updateButton, idx);
    deleteEvent(deleteButton, idx);
    return card;
}

/**
 * 수정 버튼 눌렀을떄 이벤트
 * @param button 버튼 객체
 * @param idx 아아템 인덱스
 */
function updateEvent(button, idx) {
    button.addEventListener("click", async (evt) => {
        if (inputUserName.value) {
            console.log("onClick : update button")
            // 서버에서 정보수정후
            await axios.put(`user/${idx}`, {
                name: inputUserName.value
            });
            // ui 에 업데이트
            await onUiUpdate();
            inputUserName.value = '';
            inputUserName.focus();
        } else {
            alert("입력해주세요");
        }
    });
}

/**
 * 삭제 버튼 눌렀을떄 이벤트
 * @param button 버튼 객체
 * @param idx 아아템 인덱스
 */
function deleteEvent(button, idx) {
    button.addEventListener("click", async (evt) => {
        console.log("onClick : delete button")
        await axios.delete(`user/${idx}`);
        await onUiUpdate();
        inputUserName.focus();
    });
}

/**
 * 서버에서 정보 요청후 UI 업데이트
 * @returns {Promise<void>}
 */
async function onUiUpdate() {
    // 원래 항목은 전체 지움
    userList.innerHTML = ""
    // 서버에서 데이터 요청후 UI 에 업데이트 시킴
    const result = await axios.get("/user");
    const data = result.data;
    if (data.length > 0) {
        data.forEach((el, idx) => {
            const card = createUserCard(el.name, idx);
            userList.append(card)
        });
    }
}

// form 에서 submit 했을때
formPostUser.addEventListener("submit", async (evt) => {
    // 새로고침 막기
    evt.preventDefault();
    if (inputUserName.value) {
        await axios.post("/user", {
            name: inputUserName.value
        });
        inputUserName.value = "";
        inputUserName.focus();
        // 아이템 추가후 UI 업데이트
        await onUiUpdate();
    } else {
        alert("입력해주세요");
    }
});

// 새로고침시 ui 업데이트
window.onload = onUiUpdate;