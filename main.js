const { app, BrowserWindow, Menu } = require('electron')
const openAboutWindow = require('about-window').default;
const join = require('path').join;

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 505,
    resizable: false
  })
  mainWindow.loadFile('index.html')
}

let menu = Menu.buildFromTemplate([
  {
    label: 'Menu',
    submenu: [
      {
        label: 'About', role: 'about', click: () =>
          openAboutWindow({
            icon_path: join(__dirname, 'assets', 'img', 'fujiwara.jpg'),
            copyright: 'Copyright (c) 2020 Igor Pugachev',
            show_close_button: 'Close',
            package_json_dir: __dirname,
            adjust_window_size: true
          })
      },
      { label: 'Exit', role: 'quit' }
    ]
  }
])
Menu.setApplicationMenu(menu)


app.on('ready', createWindow)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
