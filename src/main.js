const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const UglifyPHP = require("uglify-php");
const Store = require("electron-store");
const store = new Store();

let createWindow = () => {
  const win = new BrowserWindow({
    width: 550,
    height: 450,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "..", "public", "js", "index.js"),
    },
    icon: path.join(__dirname, "..", "public", "favicon.ico"),
  });
  win.loadFile(path.join(__dirname, "..", "public", "index.html"));
  win.menuBarVisible = false;
};

let outputWindow = () => {
  const win = new BrowserWindow({
    width: 550,
    height: 500,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "..", "public", "js", "ouput.js"),
    },
    icon: path.join(__dirname, "..", "public", "favicon.ico"),
  });
  win.loadFile(path.join(__dirname, "..", "public", "ouput.html"));
  win.menuBarVisible = false;
};

app.whenReady().then(() => {
  createWindow();
});

//EVETNS OF CLICK OR UPLOAD DATA
ipcMain.on("compress-code", (event, data) => {
  let paths = {
    src: data,
    dest: "output/file_min.php",
  };

  let options = {
    excludes: [
      "$GLOBALS",
      "$_SERVER",
      "$_GET",
      "$_POST",
      "$_FILES",
      "$_REQUEST",
      "$_SESSION",
      "$_ENV",
      "$_COOKIE",
      "$php_errormsg",
      "$HTTP_RAW_POST_DATA",
      "$http_response_header",
      "$argc",
      "$argv",
      "$this",
    ],
    minify: {
      replace_variables: true,
      remove_whitespace: true,
      remove_comments: true,
      minify_html: true,
    },
  };

  // You can use a path or the source code
  UglifyPHP.minify(paths.src, options)
    .then((source) => {
      //console.log(source);
      store.set("output", source);
      outputWindow();
    })
    .catch((error) => {
      console.log(error);
    });
});
//HANDLE EVETNS
ipcMain.handle("source-data", (event, data) => {
  return store.get("output");
});
