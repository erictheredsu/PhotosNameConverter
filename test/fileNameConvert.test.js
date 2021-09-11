'use strict';

const assert = require('assert');
const fileNameConvert = require('../src/fileNameConvert');

describe('fileNameConvert', () => {

    let app;
    before( async() =>{
        app = new fileNameConvert();
    })


    it('only long date format 1', async () => {
        let fileName = "April 1, 2018";
        const res = app.splitName(fileName);
        assert.equal(res, '2018-04-01');

    });

    it('only long date format 2', async () => {
        let fileName = "October 10, 2021";
        const res = app.splitName(fileName);
        assert.equal(res, '2021-10-10');

    });

    it('location info & long date format 1', async () => {
        let fileName = "Kangqiao, October 6, 2020";
        const res = app.splitName(fileName);
        assert.equal(res, '2020-10-06@Kangqiao');
    });

    it('location info & long date format 2', async () => {

        let fileName = 'Kangqiao & Beicai, July 11, 2021';
        const res = app.splitName(fileName);
        assert.equal(res, '2021-07-11@Kangqiao & Beicai');
    });

    it('other format dont change ', async () => {

        let fileName = '2020-10-06@Kangqiao';
        const res = app.splitName(fileName);
        assert.equal(res, '2020-10-06@Kangqiao');
    });


});