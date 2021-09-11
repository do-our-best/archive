document.querySelectorAll('#user-list tr').forEach((el) => {
    el.addEventListener('click', function () {
        const id = el.querySelector('td').textContent;
        getPost(id);
    });
});

async function getUser() {
    try {
        const res = await axios.get('/users');
        const users = res.data;
        console.log(users);
        const tbody = document.querySelector('#user-list tbody');
        tbody.innerHTML = '';
        users.map(function (user) {
            const row = document.createElement('tr');
            row.addEventListener('click', () => {
                getPost(user._id);
            });
            let td = document.createElement('td');
            td.textContent = user._id;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.name;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.age;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.info;
            row.appendChild(td);
            td = document.createElement('td');
            td.textContent = user.is_admin ? '관리자' : '일반회원';
            row.appendChild(td);
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}

async function getPost(id) {
    try {
        const res = await axios.get(`/users/${id}/posts`);
        const posts = res.data;

        document.getElementById('get_user_id').innerHTML = `작성자 아이디 : ${id}`;
        document.getElementById('user_id').value = id;
        
        const tbody = document.querySelector('#post-list tbody');
        tbody.innerHTML = '';
        posts.map(function (post) {
            
            console.log(post);
            const row = document.createElement('tr');
            let td = document.createElement('td');

            td.textContent = post._id;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = post.user_id.name;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = post.title;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = post.body;
            row.appendChild(td);

            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async () => {
                const newTitle = prompt('수정할 제목을 입력하세요.');
                const newBody = prompt('수정할 게시글 내용을 입력하세요.');
                try {
                    if (newTitle) {
                        await axios.patch(`/posts/${post.id}`, {
                            title: newTitle,
                        });
                    }

                    if (newBody) {
                        await axios.patch(`/posts/${post.id}`, {
                            body: newBody,
                        });
                    }
                    
                    getPost(id);
                } catch (err) {
                    console.error(err);
                }
            });

            const remove = document.createElement('button');
            remove.textContent = '삭제';
            remove.addEventListener('click', async () => {
                try {
                    del = confirm('정말로 삭제하시겠습니까?');
                    if (del) await axios.delete(`/posts/${post.id}`);
                    getPost(id);
                } catch (err) {
                    console.error(err);
                }
            });

            td = document.createElement('td');
            td.appendChild(edit);
            row.appendChild(td);

            td = document.createElement('td');
            td.appendChild(remove);
            row.appendChild(td);

            tbody.appendChild(row);
        });
    } catch (err) {
        console.error(err);
    }
}

document.getElementById('user-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    const age = e.target.age.value;
    const info = e.target.info.value;

    if ( ! name) {
        return alert('이름을 입력하세요');
    }
    if ( ! age) {
        return alert('나이를 입력하세요');
    }

    try {
        await axios.post('/users', { name, age, info });
        getUser();
    } catch (err) {
        console.log(name, age, info);
        console.error(err);
    }

    e.target.username.value = '';
    e.target.age.value = '';
    e.target.info.value = '';
});

document.getElementById('post-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = e.target.user_id.value;
    const title = e.target.title.value;
    const body = e.target.body.value;
    if ( ! id) {
        return alert('사용자를 선택하세요.');
    }
    if ( ! title) {
        return alert('제목을 입력하세요');
    }
    if ( ! body) {
        return alert('내용을 입력하세요');
    }

    try {
        await axios.post('/posts', { id, title, body });
        getPost(id);
    } catch (err) {
        console.error(err);
    }

    e.target.title.value = '';
    e.target.body.value = '';
});