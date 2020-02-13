const {app, BrowserWindow, Menu} = require('electron')
const path = require('path')

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 250,
    height: 400,
    resizable: false
  })
  mainWindow.loadFile('index.html')
}

let menu = Menu.buildFromTemplate([
  {
      label: 'Menu',
      submenu: [
          {label:'About', role: 'about'},
          {label:'Exit', role: 'quit'}
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
