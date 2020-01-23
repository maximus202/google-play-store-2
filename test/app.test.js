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
                expect(res.body[0]).to.include.keys(
                    'App',
                    'Category',
                    'Rating',
                    'Reviews',
                    'Size',
                    'Installs',
                    'Type',
                    'Price',
                    'Content Rating',
                    'Genres',
                    'Last Updated',
                    'Current Ver',
                    'Android Ver');
            })
    });
    it('Should return sorted array of all apps if sorting by Rating', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'Rating' })
            .then(res => {
                let sorted = true;
                let i = 0;
                while (i < res.body.length - 1) {
                    const appAtI = res.body[i];
                    const appAtIPlus1 = res.body[i + 1];
                    if (appAtIPlus1.Rating < appAtI.Rating) {
                        sorted = false;
                        break;
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            });
    });
    //Should return sorted array of all apps if sorting by app
    it('Should return error if any other value other than rating or app is passed for sort', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'mistake' })
            .expect(400)
    })
    it('Should return filtered array of apps if genres is passed', () => {
        supertest(app)
            .get('/apps')
            .query({ genreSearch: 'Card' })
            .expect(200)
            .then(res => {
                expect(res.body[0].Genres).to.be.a('string');
            })
    });
    //Should return error if any other value other than allowed for genres
    //Should return filtered and sorted array of apps if sort and genre are passed
})