const { remote, electron } = require("electron");
const { shell, spawn } = require("child_process");
const child = require("child_process").execFile;
const fs = require("fs");

const appDiv = document.getElementById("appOptions");

const closeBtn = document.getElementById("closeBtn");
closeBtn.addEventListener("click", (event) => {
  var window = remote.getCurrentWindow();
  window.close();
});

const settingsBtn = document.getElementById("settingsBtn");
settingsBtn.addEventListener("click", (event) => {
  const vscodeCmd = spawn("cmd.exe", [
    "/c",
    "code ../../IDE-Launcher-win32-ia32/settings.json",
  ]);
  vscodeCmd.stderr.on("data", (data) => {
    console.error(data.toString());
  });
});

fs.readFile(
  "../../IDE-Launcher-win32-ia32/settings.json",
  "utf8",
  (err, jsonString) => {
    if (err) {
      console.log("Error reading file from disk: ", err);
      return;
    }
    try {
      const settings = JSON.parse(jsonString);
      console.log(settings.apps);
      settings.apps.forEach((element) => {
        let elemId = element.name.replace(/\s/g, "");
        var appLaunchBtn = document.createElement("button");
        var lineBreak1 = document.createElement("br");
        var lineBreak2 = document.createElement("br");
        appLaunchBtn.type = "button";
        appLaunchBtn.className = "btn btn-success";
        appLaunchBtn.id = elemId;
        appLaunchBtn.textContent = element.name;
        appDiv.appendChild(appLaunchBtn);
        appDiv.appendChild(lineBreak1);
        appDiv.appendChild(lineBreak2);
        appLaunchBtn.onclick = () => {
          const app = spawn(element.execPath, { detached: true });
          app.stderr.on("data", (data) => {
            console.error(data.toString());
          });
          const window = remote.getCurrentWindow();
          setTimeout(() => {
            window.close();
          }, 1000);
        };
      });
    } catch (err) {
      console.log("Error parsing JSON string: ", err);
    }
  }
);
