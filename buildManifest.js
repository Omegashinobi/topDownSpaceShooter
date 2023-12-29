const fs = require("fs");
const path = require("path");

const absolutePath = path.resolve("./src/assets");
let options;
let fileTree = {};

function readBase() {
    return new Promise((resolve, reject) => {
        try {
            console.log("---Finding Base Folder...");
            files = fs.readdirSync(absolutePath);
            resolve(files);
        } catch(err) {
            reject(err);
        }
    }).then(async (files) => {
        console.log("...Base Folder Set---");
        return files;
    }).catch((err)=>{
        console.log("!!! FAILED TO READ BASE !!!");
        errorLog(err.message);
    })
}

function errorLog(err) {
    if(err) {
        console.log("\n!!! ERROR LOG !!!");
        console.log(err);
    } else {
        console.log("!!! NO ERROR LOG FOUND !!!");
    }
}

function readLevel(absolutePath, files) {
    return new Promise((resolve, reject) => {
        console.log("---Reading Subfolders...");
        try {
            resolve();
        } catch(err) {
            reject(err);
        }
    }).then((data)=>{
        console.log("...Sub Folders Read---");
    }).catch((err)=>{
        console.log("!!! FAILED TO READ SUBFOLDERS !!!");
        errorLog(err.message);
    })
}

function readObjects(path, ext, tree) {
    try {
        console.log(`       ---Pushing Objects From : ${path}... ---`);
        const files = fs.readdirSync(path);
        files.forEach(e => {
            if (e.split(".")[1] === ext) {
                console.log(`           adding ${e}`);

                let header = e.split(".")[1];
                let jsonArray = [];
                let imageArray = [];

                let entry = `{${header} : {
                   "JSON" :  ${jsonArray},
                   "IMAGE" : ${imageArray}
                }}`;
                tree.push(entry);
            }
        });
    } catch(err) {
        console.log("!!! FAILED TO PUSH TO ARRAY !!!");
        errorLog(err.message);
    }    
}

function parseObject(files, ext, outputHeader) {
    return new Promise((resolve,reject)=>{
        try {
            let out = [];
            files.forEach((e)=>{
                if(e.split("."[1] === ext)) {
                    out.push(e);
                }
            })
        } catch(err) {
            console.log(`!!! FAILED TO TO PARSE ${ext} !!!`);
            errorLog(err.message);
        }
    }).then((data)=>{
        return `${outputHeader} : ${data}`
    })
}

function parseImageObject() {

}

function buildJSON() {
    return new Promise((resolve,reject)=>{
        try {
            console.log("---Assembeling Manifest---");
            let output = JSON.stringify(fileTree);
            fs.writeFileSync(`${absolutePath}/assetManifest.json`, output);
            resolve();    
        } catch {
            reject(err);
        }
    }).then(()=>{
        console.log("\n|||MANIFEST BUILT|||\n\n");
    }).catch((err)=>{
        console.log("!!! FAILED TO BUILD JSON MANIFEST !!!");
        errorLog(err.message);
    })
}

module.exports = async function (params) {
    try {
        params = options;
        console.log(`\n\n|||BUILDING MANIFEST|||\n`);
        let files = await readBase();
        await readLevel(absolutePath, files);
        await buildJSON();
    } catch (err) {
        console.log("!!!ERROR BUILDING MANIFEST!!!");
    }
}