'use strict';

const assert = require('assert');
const fileOperator = require('../src/fileOperator');
const { execSync} = require('child_process');
const { SSL_OP_EPHEMERAL_RSA } = require('constants');

describe('fileOperator', () => {

    let app;
    before( async() =>{
        app = new fileOperator();
        execSync('sh dataPrepare.sh');
    })

    //below step is replace by 'dataPrepare.sh' 

    // beforeEach( async ()=>{
    //     let expect = ['2018-04-01', '2020-08-01@Ningyiyuan', '2021-05-12@Kangqiao'];
    //     await app.rmfolder('./data', expect);
    // })

    // it('should create folders', async () =>{
    //     let expect = ['April 1, 2018', 'Kangqiao, May 12, 2021', 'Ningyiyuan, August 1, 2020'];
    //     await app.createFolders('./data', expect);
    //     assert.ok("will test in other case");
    // })


    it('should get sub folder list of root folder', async () => {
        let expect = ['April 1, 2018', 'Kangqiao, May 12, 2021', 'Ningyiyuan, August 1, 2020'];
        const res = await app.getFolderList('./data');
        assert.deepStrictEqual(res, expect);
    });

    it('should rename folder', async () => {

       await app.renameFolders('./data');

       let expect = ['2018-04-01', '2020-08-01@Ningyiyuan', '2021-05-12@Kangqiao'];
       const res = await app.getFolderList('./data');

       assert.deepStrictEqual(res, expect);

    });

    it('should rename sub files in sub folder, with sub folder\'s name ' , async () =>{
        const res = await app.getFolderList('./data');
        await res.forEach(async (elem) =>{
            await app.renameFilesInFolder('./data', elem);
        })
        let expect = ['2018-04-01_1.jpeg', '2018-04-01_2.jpeg', '2018-04-01_3.jpeg'];
        const res1 = await app.getFolderList('./data/2018-04-01');
        assert.deepStrictEqual(res1, expect); //how to wait the all forEach finish then getFolderList?
    });






});