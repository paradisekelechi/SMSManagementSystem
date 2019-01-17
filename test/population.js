import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import expect from 'expect.js';
import server from '../server/index';

dotenv.config();
chai.use(chaiHttp);

describe('Population test', () => {
  describe('/GET Total Population', () => {
    it('should get total population', (done) => {
      chai.request(server)
        .get('/api/population')
        .end((err, res) => {
          expect(res).to.be.ok();
          expect(res.status).to.be.eql(200);
          expect(res.body.message).to.be.eql('Population gotten successfully');
          expect(res.body.population).to.be.an('object');
          done();
        });
    });
  });
});
