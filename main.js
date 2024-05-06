const tbody = document.querySelector("#todos tbody");
const name = document.querySelector("#name");
const comment = document.querySelector("#comment");
const btn = document.getElementById("btn");

let listItems = [];
// フォーム入力しボタンを押す
btn.addEventListener("click", () => {
  const current = new Date();
  const current_str = `${current.getFullYear()}/${(current.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${current.getDate().toString().padStart(2, "0")}`;

  // オブジェクト形式でlistItems配列に入れていきローカルストレージに保存
  let item = {
    name: name.value,
    comment: comment.value,
    date: current_str,
  };
  listItems.push(item);
  localStorage.setItem("data", JSON.stringify(listItems));
  // ページをリロード
  window.location.reload();
});

// ページをリロードするとローカルストレージの中身が再表示される
document.addEventListener("DOMContentLoaded", () => {
  const dataStr = localStorage.getItem("data");
  if (dataStr === undefined) {
    return;
  }
  listItems = dataStr ? JSON.parse(dataStr) : [];

  listItems.forEach((item, index) => {
    // テーブルの部品生成
    const tr = document.createElement("tr");
    tr.classList.add("align-middle");
    const tdIndex = document.createElement("td");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    const td4 = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteData(index);
    deleteButton.classList.add("btn", "btn-danger");
    // テーブルの部品にデータを挿入
    tdIndex.innerText = index + 1;
    td1.innerText = item.name;
    td2.innerText = item.comment;
    td3.innerText = item.date;
    td4.appendChild(deleteButton);
    // テーブルの部品を表示
    tr.appendChild(tdIndex);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tbody.appendChild(tr);
  });
});

function deleteData(index) {
  listItems.splice(index, 1);

  // 配列をJSON形式に変換してlocalStorageに保存
  localStorage.setItem("data", JSON.stringify(listItems));

  // データリストを更新
  window.location.reload();
}

const download = document.getElementById("download");
download.addEventListener("click", () => {
  // localStorageからデータを取得
  const localStorageData = localStorage.getItem("data");

  // JSON形式に変換
  const jsonData = JSON.parse(localStorageData);

  // 現在の日付を取得
  const today = new Date();

  // 年、月、日を取得
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  // ファイル名を指定してJSONファイルとして保存
  const fileName = `myData_${year}${month}${day} .json`;
  const jsonBlob = new Blob([JSON.stringify(jsonData)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(jsonBlob);

  // ダウンロードリンクを生成してクリックさせる（ファイルをダウンロード）
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = fileName;
  downloadLink.click();
});
