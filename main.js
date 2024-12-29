// DOM要素の取得
const todosTableBody = document.querySelector("#todos tbody");
const nameInput = document.querySelector("#name");
const commentInput = document.querySelector("#comment");
const submitBtn = document.getElementById("btn");
const downloadBtn = document.getElementById("download");

// ローカルストレージからデータを取得する関数
const getDataFromLocalStorage = () => {
  const dataStr = localStorage.getItem("data");
  return dataStr ? JSON.parse(dataStr) : [];
}

// データをローカルストレージに保存する関数
const saveDataToLocalStorage = (data) => {
  localStorage.setItem("data", JSON.stringify(data));
}

// データをテーブルに表示する関数
const displayDataInTable = (data) => {
  todosTableBody.innerHTML = "";

  data.forEach((item, index) => {
    const tr = document.createElement("tr");
    tr.classList.add("align-middle");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.comment}</td>
      <td>${item.date}</td>
      <td><button class="btn btn-danger" onclick="deleteData(${index})">Delete</button></td>
    `;
    todosTableBody.appendChild(tr);
  });
}

// データを削除する関数
const deleteData = (index) => {
  const data = getDataFromLocalStorage();
  data.splice(index, 1);
  saveDataToLocalStorage(data);
  displayDataInTable(data);
}

// フォームの送信処理
submitBtn.addEventListener("click", () => {
  const current = new Date();
  const current_str = `${current.getFullYear()}/${(current.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${current.getDate().toString().padStart(2, "0")}`;

  const item = {
    name: nameInput.value,
    comment: commentInput.value,
    date: current_str,
  };

  const data = getDataFromLocalStorage();
  data.push(item);
  saveDataToLocalStorage(data);
  displayDataInTable(data);

  nameInput.value = "";
  commentInput.value = "";
  nameInput.focus();
});

// ダウンロードボタンのクリック処理
downloadBtn.addEventListener("click", () => {
  const data = getDataFromLocalStorage();
  const jsonData = JSON.stringify(data);
  const fileName = `myData_${new Date().toISOString().slice(0, 10)}.json`;

  const jsonBlob = new Blob([jsonData], { type: "application/json" });
  const url = URL.createObjectURL(jsonBlob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = fileName;
  downloadLink.click();
});

// ページ読み込み時にデータを表示
document.addEventListener("DOMContentLoaded", () => {
  const data = getDataFromLocalStorage();
  displayDataInTable(data);
});
