const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", () => {
  const url = document.getElementById("url").value;

  chrome.storage.local.set({
    renderUrl: url
  });

  alert("Saved!");
});