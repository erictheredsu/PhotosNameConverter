'use strict';

const assert = require('assert');
const fileOperator = require('../src/fileOperator');

describe('fileNameConvert', () => {

    let app;
    before( async() =>{
        app = new fileOperator();
    })

    beforeEach( async ()=>{
        let expect = ['2018-04-01', '2020-08-01@Ningyiyuan', '2021-05-12@Kangqiao'];
        await app.rmfolder('./data', expect);
    })

    it('create folders', async () =>{
        let expect = ['April 1, 2018', 'Kangqiao, May 12, 2021', 'Ningyiyuan, August 1, 2020'];
        await app.createFolders('./data', expect);
        assert.ok("will test in other case");

    })


    it('get folder list', async () => {
        let expect = ['April 1, 2018', 'Kangqiao, May 12, 2021', 'Ningyiyuan, August 1, 2020'];
        const res = await app.getFolderList('./data');
        assert.deepStrictEqual(res, expect);
    });

    it('rename folder', async () => {

       await app.renameFolders('./data');

       let expect = ['2018-04-01', '2020-08-01@Ningyiyuan', '2021-05-12@Kangqiao'];
       const res = await app.getFolderList('./data');

       assert.deepStrictEqual(res, expect);

    });






});