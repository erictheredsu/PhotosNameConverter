
const fspromise = require('fs').promises;
const pathLib = require('path');
const fileNameConvert = require('./fileNameConvert');

const nameConverter = new fileNameConvert();

module.exports = function () {


    this.getFolderList = async function(path){
        let nameArr = new Array();
        try {
            const dir = await fspromise.opendir(path);
            for await (const dirent of dir)
              //console.log(dirent.name);
              nameArr.push(dirent.name);
          } catch (err) {
            console.error(err);
          }
          return nameArr.sort();
    };

    this.renameFolders = async (path)=>{
        try {
            const dir = await fspromise.opendir(path);
            for await (const dirent of dir){
                let newName = nameConverter.splitName(dirent.name);
                if(newName === dirent.name){
                    continue;
                }
                let oldSubPath = pathLib.join(path,dirent.name); 
                let newSubPath = pathLib.join(path,newName);             
                let subDir = await fspromise.rename(oldSubPath,newSubPath);
            }
          } catch (err) {
            console.error(err);
          }
    };

    this.createFolders = async (path, array) =>{
        try {
                array.forEach((elem) =>{
                    let subPath = pathLib.join(path, elem);
                    fspromise.mkdir(subPath);
                });
          } catch (err) {
            console.error(err);
          }
    };

    this.rmfolder = async (path,array) =>{
        try {
            array.forEach((elem) =>{
                let subPath = pathLib.join(path, elem);
                fspromise.rmdir(subPath);
            });
      } catch (err) {
        console.error(err);
      }
    };

    

};