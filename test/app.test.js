const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('GET /apps test suite.', () => {
    it('Should return array of all apps if no parameters are passed', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res).to.be.an('object');
            })
    });
    it('Should return sorted array of all apps if sorting by Rating', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: Rating })
            .expect(200)
            .then(res => {

            })
    });
    //Should return sorted array of all apps if sorting by app
    //Should return error if any other value other than rating or app is passed for sort
    //Should return filtered array of apps if genres is passed
    //Should return error if any other value other than allowed for genres
    //Should return filtered and sorted array of apps if sort and genre are passed
})