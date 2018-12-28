import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import expect from 'expect.js';
import server from '../server/index';
import db from '../server/models';

const { Locations } = db;
dotenv.config();


chai.use(chaiHttp);

describe('Location test', () => {
  before(() => {
    Locations.destroy({ truncate: true });
  });

  describe('/POST Location', () => {
    it('should add a location without male and female count', (done) => {
      const name = 'location1';
      chai.request(server)
        .post('/api/locations')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ name })
        .end((err, res) => {
          expect(res).to.be.ok();
          expect(res.status).to.eql(200);
          expect(res.body.message).to.eql('Location added successfully');
          expect(res.body.success).to.eql(true);
          expect(res.body.location.name).to.eql(name);
          expect(res.body.location.male).to.eql(0);
          expect(res.body.location.female).to.eql(0);
          done();
        });
    });

    it('should add a location with male and female counts', (done) => {
      const name = 'location2';
      chai.request(server)
        .post('/api/locations')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({ name: 'location2', male: 10, female: 12 })
        .end((err, res) => {
          expect(res).to.be.ok();
          expect(res.status).to.eql(200);
          expect(res.body.message).to.eql('Location added successfully');
          expect(res.body.success).to.eql(true);
          expect(res.body.location.name).to.eql(name);
          expect(res.body.location.male).to.eql(10);
          expect(res.body.location.female).to.eql(12);
          done();
        });
    });

    it('should add a location with male and female counts and parent location', (done) => {
      const name = 'location3';
      chai.request(server)
        .post('/api/locations')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          name: 'location3', male: 10, female: 12, ParentIdLocation: 1,
        })
        .end((err, res) => {
          expect(res).to.be.ok();
          expect(res.status).to.eql(200);
          expect(res.body.message).to.eql('Location added successfully');
          expect(res.body.success).to.eql(true);
          expect(res.body.location.name).to.eql(name);
          expect(res.body.location.male).to.eql(10);
          expect(res.body.location.female).to.eql(12);
          done();
        });
    });
  });
  describe('/GET Locations', () => {
    it('should get all locations', (done) => {
      chai.request(server)
        .get('/api/locations')
        .end((err, res) => {
          expect(res).to.be.ok();
          expect(res.status).to.be.eql(200);
          expect(res.body.message).to.be.eql('Locations gotten successfully');
          expect(res.body.locations).to.be.an('object');
          expect(res.body.locations.rows).to.be.an('array');
          done();
        });
    });
  });
});
