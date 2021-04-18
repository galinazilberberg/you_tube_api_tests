import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');
import faker from 'faker';
import { expect } from 'chai';

const TOKEN = '23735529a2f083e71a06289906cc8873c65bec7e7779855f322830d95c511019';

describe.skip('Users', () => {
  let userId;

   describe('METHOD POST', ()=>{

    it('POST /users',  function () {
        const data ={
            email: faker.unique(faker.internet.email), //`test${Math.floor(Math.random()*9999)}@mail.com`
            name:faker.name.findName(),
            gender:faker.random.arrayElement(['Male','Female']),
            status:faker.random.arrayElement(['Active','Inactive'])
        };

        return request
            .post('users')
            .set("Authorization",`Bearer ${TOKEN}`)
            .send(data)
            .then(res => {
                expect(res.body.data).to.deep.include(data);
                userId = res.body.data.id
                console.log(userId)
            });
    });
});

    describe('METHOD GET', ()=>{

        it('GET /users', () => {
            return request
                .get(`users?access-token=${TOKEN}`)
                .then(res => {
                    expect(res.body.data).to.not.be.empty;
                });
        });
//check if user with id exist
        it('GET /users/:id', () => {
            return request
                .get(`users/${userId}}?access-token=${TOKEN}`)
                .then(res => {
                    expect(res.body.data).to.not.be.empty;
                });
        });
    });

    describe('METHOD PUT', ()=>{

        it ('PUT /users:id',   function () {
            const data = {
                email: faker.unique(faker.internet.email),
                name: faker.name.findName(),
            }
            return request
                .put(`users/${userId}`)
                .set("Authorization",`Bearer ${TOKEN}`)
                .send(data)
                .then(res => {
                    expect(res.body.data).to.deep.include(data);
                });
        });
    });

    describe('METHOD DELETE', ()=>{

        it('DELETE /users:id ', function () {
            return request
                .delete (`users/${userId}`)
                .set("Authorization",`Bearer ${TOKEN}`)
                .then(res => {
                    expect(res.body.data).to.be.eq(null);
                });
        });
    });
});
