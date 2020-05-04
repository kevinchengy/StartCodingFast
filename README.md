# StartCodingFast
---
## Introduction
A launcher that you can customize to have shortcuts for apps. Currently configured to launch various IDEs. 

## Build
To build this project, you will need `npm`. Builds are currently only tested on Windows. Mac and Linux may come at a later date. 
### Windows
Make sure you can in the directory where the project is located and then run the following commands:
1. `npm install`
2. `npm run package-win`
A new folder should be created called `release-builds` with the following structure:
<pre><code>
release-builds<br/>
  |_ IDE-Launcher-win32-ia32
      |_ IDE-Launcher.exe
      |_ (other files)
</code></pre>
