import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');
import faker from 'faker';
import { expect } from 'chai';

const TOKEN = '23735529a2f083e71a06289906cc8873c65bec7e7779855f322830d95c511019';

describe('Users', () => {
    describe('METHOD GET', ()=>{

    // first option - simple console.log view
    //     // console.log(err);
    //     // console.log(res.body)
    // second to test GET with d
        // one()=>
    // it('GET /users', (done) => {
    //     request.get(`users?access-token=${TOKEN}`).end((err, res) => {
    //       expect(res.body.data).to.not.be.empty;
    //       done();
    //     });
//third option with 'return'
    it.skip('GET /users', () => {
        return request
            .get(`users?access-token=${TOKEN}`)
            .then(res => {
                expect(res.body.data).to.not.be.empty;
        });
    });
//check if user with id exist
    it.skip('GET /users/:id', () => {
        return request
            .get(`users/354?access-token=${TOKEN}`)
            .then(res => {
                expect(res.body.data).to.not.be.empty;
        });
    });
//check if user 354 exists
    it.skip('GET /users/:id', () => {
        return request
            .get(`users/354?access-token=${TOKEN}`)
            .then(res => {
            expect(res.body.data.id).to.be.eq(354);
        });
    });
 //filter page =5, gender = Female, status= Active & adding const url
    it.skip('GET /users with query params', () => {
        const url = `users/?access-token=${TOKEN} & page=5&gender=Female&status=Active`
        return request
            .get(url)
            .then(res => {
                expect(res.body.data).to.not.be.empty;
                res.body.data.forEach(data => { //adding loop to verify filter
                expect (data.gender).to.eq('Female');
                expect (data.status).to.eq('Active');
            })
        });
    });
 });

    describe('METHOD POST', ()=>{

      it.skip('POST /users',  function () {
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
               // console.log(res.body);//-print all entries

              // expect(res.body.data.email).to.eq(data.email);
              // expect(res.body.data.name).to.eq(data.name);
              // expect(res.body.data.gender).to.eq(data.gender);
              // expect(res.body.data.status).to.eq(data.status);

               // data.email = `test${Math.floor(Math.random()*9999)}@mail.com` - check if assertion is working correct

                    expect(res.body.data).to.deep.include(data);
           });
       });
    });

    describe('METHOD PUT', ()=>{

        it.skip('PUT /users:id',   function () {
            const data = {
                email: faker.unique(faker.internet.email), //`test${Math.floor(Math.random()*9999)}@mail.com`
                name: faker.name.findName(),
            }
            return request
                .put('users/354')
                .set("Authorization",`Bearer ${TOKEN}`)
                .send(data)
                .then(res => {
              // console.log(res.body);
                    expect(res.body.data).to.deep.include(data);
            });
        });
    });

    describe('METHOD DELETE', ()=>{

        it.skip('DELETE /users:id ', function () {
            return request
                .delete ('users/7')
                .set("Authorization",`Bearer ${TOKEN}`)
                .then(res => {
                    expect(res.body.data).to.be.eq(null);
             });
         });
    });
});
