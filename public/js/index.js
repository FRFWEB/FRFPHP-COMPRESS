const { ipcRenderer } = require("electron");

window.addEventListener("load", () => {
  let getUploadFile = document.getElementById("frf_code_upload");
  let setNameFiles = document.getElementById("frf_file_name");
  let submitCompress = false;
  //LOAD FILE
  getUploadFile.addEventListener("change", (e) => {
    setNameFiles.innerHTML = "";
    let getExtension = e.target.files[0].name.split(".")[1];
    console.log(getExtension);
    if (getExtension != "php") {
      setNameFiles.innerHTML = `<p>the file is not .php</p>`;
      submitCompress = false;
      return false;
    }
    setNameFiles.innerHTML = `
      <p>${e.target.files[0].name} ${e.target.files[0].size} kb</p>
    `;
    submitCompress = true;
    return true;
  });

  //SUBMIT FILE
  let getForm = document.forms.namedItem("code");
  getForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (submitCompress == true) {
      ipcRenderer.send("compress-code", getUploadFile.files[0].path);
    }
  });
});
