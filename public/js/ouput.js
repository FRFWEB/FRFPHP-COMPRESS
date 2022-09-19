window.addEventListener("load", () => {
  const { ipcRenderer } = require("electron");
  let buttonCopyData = document.getElementById("frf_compress_copy");
  let setOutputData = document.getElementById("frf_show_ouput_data");
  setOutputData.innerHTML = "";
  setOutputData.readOnly = true;
  ipcRenderer
    .invoke("source-data")
    .then((result) => {
      setOutputData.innerHTML = result;
    })
    .catch((err) => {
      setOutputData.innerHTML = error;
    });
  buttonCopyData.addEventListener("click", () => {
    setOutputData.select();
    if (document.execCommand("copy")) {
      buttonCopyData.innerHTML = "Copy Success";
      setTimeout(() => {
        buttonCopyData.innerHTML = "Copy Ouput";
      }, 1000);
    }
  });
});
