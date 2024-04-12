const tbody = document.querySelector('#todos tbody');
const name = document.querySelector('#name');
const comment = document.querySelector('#comment');
const btn = document.getElementById('btn');

let listItems = [];
// フォーム入力しボタンを押す
btn.addEventListener('click', () => {
    const current = new Date();
    const current_str = `${current.getFullYear()}/${(current.getMonth() + 1).toString().padStart(2, '0')}/${(current.getDate()).toString().padStart(2, '0')}`;

    // オブジェクト形式でlistItems配列に入れていきローカルストレージに保存
    let item = {
        name: name.value,
        comment: comment.value,
        date: current_str
    }
    listItems.push(item);
    localStorage.store = JSON.stringify(listItems);
    // ページをリロード
    window.location.reload();
})

// ページをリロードするとローカルストレージの中身が再表示される
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.store === undefined) {
        return;
    }
    listItems = JSON.parse(localStorage.store);

    for (let item of listItems) {
        // テーブルの部品生成
        const tr = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        // テーブルの部品にデータを挿入
        td1.innerText = item.name;
        td2.innerText = item.comment;
        td3.innerText = item.date;
        // テーブルの部品を表示
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
    }
})

