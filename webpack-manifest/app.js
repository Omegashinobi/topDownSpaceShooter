const fs = require("fs");
const path = require("path");

class BuildMainifestPlugin {
    constructor(params) {
        this.params = params;
        this.path = path.resolve(params['path']);
        this.manifest = params['manifest'];
        this.groups = params['groups'];

        this.filemapType = "";

        this.output = {};
    }
    apply(compiler) {
        let _this = this;
        const pluginName = BuildMainifestPlugin.name;
        const { webpack } = compiler;
        const { Compilation } = webpack;
        const { RawSource } = webpack.sources;

        compiler.hooks.environment.tap('BuildManifestPlugin', async (compilation) => {
            try {
                console.log(`\n\n|||BUILDING MANIFEST|||\n`);
                this.output["base"] = "./assets/";
                await _this.readLevel();
                console.log(`\n|||MANIFEST BUILT|||\n`);
            } catch (err) {
                console.log("!!!ERROR BUILDING MANIFEST!!!");
                console.log("\n ERROR: " + err)
            }
        });

        compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
            compilation.hooks.processAssets.tap(
                {
                    name: pluginName,
                    stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
                },
                () => {
                    compilation.emitAsset(
                        "assetManifest.json",
                        new RawSource(JSON.stringify(_this.output))
                    );
                }
            );
        });
    }

    readLevel() {
        return new Promise((resolve, reject) => {
            console.log("---Reading Subfolders...");
            try {
                let data = this.groups.map((e) => {
                    console.log(`   ---Reading ${e.name} ...`);
                    if (typeof e.fileMap === "object") {
                        this.output[e.name] = {};
                        Object.keys(e.fileMap).forEach((group) => {
                            this.output[e.name][group] = [];
                          });
                    } else {
                        this.output[e.name] = {
                            files: []
                        };
                    }
                    this.readObjects(fs.readdirSync(`${this.path}/${e.name}`), e);
                });
                resolve(data);
            } catch (err) {
                reject(err);
            }
        }).then((data) => {
            console.log("...Sub Folders Read---");
        }).catch((err) => {
            console.log("!!! FAILED TO READ SUBFOLDERS !!!");
            this.errorLog(err);
        })
    }

    readObjects(files, group) {
        return new Promise((resolve, reject) => {
            try {
                if (group.length <= 0) {
                    reject("No filetypes found");
                }
                console.log(`       ---Pushing Objects From : ${group.name}... ---`);
                if (typeof group.fileMap === "object") {
                    Object.keys(group.fileMap).forEach((e) => {
                        files.forEach((file) => {
                            if (group.fileMap[e].indexOf(file.split(".")[1]) > -1) {
                                console.log(`       ---Pushing ${file} into ${e} ---`)
                                this.output[group.name][e].push(file);
                            }
                        })
                    })
                } else {
                    files.forEach((e) => {
                        if (group.fileMap.indexOf(e.split(".")[1]) > -1) {
                            console.log(`       ---Pushing ${e}---`)
                            this.output[group.name].files.push(e);
                        }
                    })
                }

                resolve();
            } catch (err) {
                reject(err.message);
            }
        }).then(() => {
            console.log(`   ...${group.name} Read!---`)
        }).catch((err) => {
            console.log("!!! FAILED TO PUSH TO ARRAY !!!");
            this.errorLog(err);
        });
    }

    errorLog(err) {
        if (err) {
            console.log("\n!!! ERROR LOG !!!");
            console.log(err);
        } else {
            console.log("!!! NO ERROR LOG FOUND !!!");
        }
    }
}

module.exports = BuildMainifestPlugin;
