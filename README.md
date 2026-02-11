# 📦 Emilia Panel

Emilia Panel is a Windows desktop application built with **Electron** and integrated with the **Pterodactyl panel** for simpler and more convenient server management.

---

## 🚀 Features

- 📌 Automatic maintenance notifications
- 🔄 Auto-update system using GitHub Releases
- ⏱ Splash screen with delay
- 🛠 Force update requirement when needed
- 🚧 Maintenance mode with countdown
- 🪟 Native Windows app with modern UI

---

## 📝 Requirements

- Windows 10 or later
- Internet connection (for update & maintenance checks)
- GitHub Releases setup for auto update

---

## 📦 Installation

Download the latest release on GitHub:

👉 https://github.com/Ven-DEVELOPMENT/Apps-Panel-Ven/releases

Run the installer and follow the setup process.

---

## ⚙️ Usage

After installation:

1. Open **Emilia Panel** from Start Menu or desktop shortcut.
2. Wait for the splash screen.
3. App will check for update and maintenance status.
4. If update required → app will automatically download and install.
5. If maintenance enabled → you will see a countdown screen.
6. Otherwise → main panel opens.

---

## 🔄 Auto Update

Auto update works via GitHub Releases.

Make sure:

1. The latest release has a `latest.yml` file
2. Your `minVersion` in `announcement.json` matches the release version

---

## 🛠 Development

Clone the repository:

```bash
git clone https://github.com/Ven-DEVELOPMENT/Apps-Panel-Ven.git
cd Apps-Panel-Ven
npm install
Run in development mode:

npm start
📦 Building & Publishing
Build installer:

npm run build
Build and publish to GitHub Releases:

npm run dist
Make sure you have a valid GH_TOKEN set:

setx GH_TOKEN "YOUR_GITHUB_TOKEN"
📄 Config Files
announcement.json
Used for:

📢 Maintenance mode

🚨 Force update requirement

Example:

{
  "enabled": false,
  "minVersion": "1.0.3",
  "title": "Scheduled Maintenance",
  "message": "Platform is being updated.",
  "endTime": "2026-02-12T16:00:00Z"
}
📍 License
Licensed under MIT License.

✉️ Contact
Author: Ven Development
GitHub: https://github.com/Ven-DEVELOPMENT
© 2025-2026
