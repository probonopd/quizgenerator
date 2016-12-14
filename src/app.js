// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
// import os from 'os'; // native node.js module
// import { remote } from 'electron'; // native electron module
// import jetpack from 'fs-jetpack'; // module loaded from npm
// import { greet } from './hello_world/hello_world'; // code authored by you in this project
// import env from './env';

// console.log('Loaded environment variables:', env);

// var app = remote.app;
// var appDir = jetpack.cwd(app.getAppPath());

// // Holy crap! This is browser window with HTML and stuff, but I can read
// // here files like it is node.js! Welcome to Electron world :)
// console.log('The author of this app is:', appDir.read('package.json', 'json').author);


import { remote, ipcRenderer } from 'electron';

ipcRenderer.on('gen-tests-done', (event, status) => {
    alert(status);
})

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('inDirBtn').addEventListener('click', _ => {
        remote.dialog.showOpenDialog(remote.getCurrentWindow(), { properties: ['openDirectory'] },
            files => {
                document.getElementById('inDirTxt').value = files[0];
            });
    });

    document.getElementById('outDirBtn').addEventListener('click', _ => {
        remote.dialog.showOpenDialog(remote.getCurrentWindow(), { properties: ['openDirectory'] },
            files => {
                document.getElementById('outDirTxt').value = files[0];
            });
    });

    document.getElementById('quitBtn').addEventListener('click', _ => {
        ipcRenderer.send('close-main-window');
    });

    document.getElementById('okBtn').addEventListener('click', _ => {
        var inDir = document.getElementById('inDirTxt').value
        var outDir = document.getElementById('outDirTxt').value
        var numTsts = document.getElementById('numTsts').value
        ipcRenderer.send('gen-tests', inDir, outDir, numTsts);
    });
});
