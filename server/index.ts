import * as angularUniversal from 'angular-universal-express-firebase';

export let ofermaps = angularUniversal.trigger({
    index: __dirname + '/dist/index.html',
    main: __dirname + '/dist/main-bundle',
    enableProdMode: true,
    cdnCacheExpiry: 1200,
    browserCacheExpiry: 600
})

// import 'zone.js/dist/zone-node';
// import * as functions from 'firebase-functions';
// import * as express from 'express';
// import { renderModuleFactory } from "@angular/platform-server";
// import * as fs from 'fs';

// const document = fs.readFileSync(__dirname + '/index.html', 'utf8');
// const main = require(__dirname + '/dist/main.bundle').AppServerModuleNgFactory;

// const app = express();
// app.get('**', (req, res) => {
//     const url = req.path;
//     renderModuleFactory(main, { document, url })
//         .then(html => {
//             res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
//             res.send(html)
//     })
// })

// export let ofermaps = functions.https.onRequest(app)