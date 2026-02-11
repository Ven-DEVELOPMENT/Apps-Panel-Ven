const { app, BrowserWindow } = require('electron');
const { autoUpdater } = require('electron-updater');
const https = require('https');
const path = require('path');

app.setAppUserModelId("com.ven.emiliapanel");

let mainWindow;
let splash;

const CURRENT_VERSION = app.getVersion();
const ANNOUNCEMENT_URL = "https://raw.githubusercontent.com/Ven-DEVELOPMENT/Apps-Panel-Ven/main/announcement.json";

// ================= CREATE WINDOW =================

function createWindow() {

  splash = new BrowserWindow({
    width: 500,
    height: 300,
    frame: false,
    alwaysOnTop: true,
    resizable: false,
    icon: path.join(__dirname, 'assets/icon.ico')
  });

  splash.loadFile('index.html');

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    icon: path.join(__dirname, 'assets/icon.ico')
  });

  checkSystemStatus();
}

// ================= CHECK SYSTEM =================

function checkSystemStatus() {

  https.get(ANNOUNCEMENT_URL, (res) => {
    let data = '';

    res.on('data', chunk => data += chunk);

    res.on('end', () => {
      try {
        const config = JSON.parse(data);

        // ===== FORCE UPDATE CHECK =====
        if (config.minVersion && compareVersions(CURRENT_VERSION, config.minVersion) < 0) {
          showForceUpdateScreen(config.message);
          autoUpdater.checkForUpdatesAndNotify();
          return;
        }

        // ===== MAINTENANCE CHECK =====
        if (config.enabled) {
          const now = new Date();
          const endTime = new Date(config.endTime);

          if (now < endTime) {
            showMaintenanceScreen(config.title, config.message, endTime);
            return;
          }
        }

        loadMainApp();

      } catch (err) {
        loadMainApp();
      }
    });

  }).on('error', () => {
    loadMainApp();
  });
}

// ================= LOAD NORMAL APP =================

function loadMainApp() {

  mainWindow.loadURL('https://thewinwincafe.com');

  mainWindow.webContents.on('did-stop-loading', () => {
    if (splash && !splash.isDestroyed()) {
      splash.destroy();
      mainWindow.show();
    }
  });

  setTimeout(() => {
    if (splash && !splash.isDestroyed()) {
      splash.destroy();
      mainWindow.show();
    }
  }, 8000);
}

// ================= FORCE UPDATE SCREEN =================

function showForceUpdateScreen(message) {

  const html = `
  <html>
  <body style="background:#0f172a;color:white;font-family:sans-serif;text-align:center;margin-top:35vh;">
    <h1>⚠ Update Required</h1>
    <p>${message}</p>
    <p>Current Version: ${CURRENT_VERSION}</p>
    <p>Silakan tunggu proses update...</p>
  </body>
  </html>
  `;

  mainWindow.loadURL("data:text/html;charset=utf-8," + encodeURIComponent(html));

  if (splash && !splash.isDestroyed()) {
    splash.destroy();
  }

  mainWindow.show();
}

// ================= MAINTENANCE SCREEN =================

function showMaintenanceScreen(title, message, endTime) {

  const html = `
  <html>
  <body style="background:#111827;color:white;font-family:sans-serif;text-align:center;margin-top:35vh;">
    <h1>🚧 ${title}</h1>
    <p>${message}</p>
    <div id="timer" style="font-size:30px;margin-top:20px;"></div>

    <script>
      const end = new Date("${endTime.toISOString()}").getTime();

      function updateCountdown() {
        const now = new Date().getTime();
        const distance = end - now;

        if (distance <= 0) {
          document.getElementById("timer").innerHTML = "Maintenance selesai. Restart aplikasi.";
          return;
        }

        const hours = Math.floor(distance / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("timer").innerHTML =
          hours + "h " + minutes + "m " + seconds + "s ";
      }

      setInterval(updateCountdown, 1000);
      updateCountdown();
    </script>
  </body>
  </html>
  `;

  mainWindow.loadURL("data:text/html;charset=utf-8," + encodeURIComponent(html));

  if (splash && !splash.isDestroyed()) {
    splash.destroy();
  }

  mainWindow.show();
}

// ================= VERSION COMPARISON =================

function compareVersions(v1, v2) {
  const a = v1.split('.').map(Number);
  const b = v2.split('.').map(Number);

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const num1 = a[i] || 0;
    const num2 = b[i] || 0;
    if (num1 > num2) return 1;
    if (num1 < num2) return -1;
  }
  return 0;
}

// ================= AUTO UPDATE =================

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall();
});

app.whenReady().then(() => {
  createWindow();
});
