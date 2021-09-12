
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
                await fspromise.rename(oldSubPath,newSubPath);
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
        return false;
      }
      return true;
    };

    this.renameFilesInFolder = async(rootPath, parentFolder) =>{
      try {
          let subFolderPath = pathLib.join(rootPath, parentFolder);
          let subFiles = await this.getFolderList(subFolderPath);
          let sequence = 1;
          subFiles.forEach(async (elem)=>{
              try {
                let oldFilePath = pathLib.join(subFolderPath, elem);
                let info = pathLib.parse(oldFilePath);
                let newName = parentFolder + '_' + sequence + info.ext;
                sequence++;
                let newPath = pathLib.join(subFolderPath,newName );
                return await fspromise.rename(oldFilePath,newPath);
              } catch (error) {
                console.error(err);
              }
          });
        } catch (err) {
          console.error(err);
          return false
      }
      return true;
    }

};