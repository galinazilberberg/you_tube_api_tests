
import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');
import faker from 'faker';

const TOKEN = '23735529a2f083e71a06289906cc8873c65bec7e7779855f322830d95c511019';

export const createRandomUserWithFaker = async () => {
    const userData ={
        email: faker.unique(faker.internet.email), //`test${Math.floor(Math.random()*9999)}@mail.com`
        name:faker.name.findName(),
        gender:faker.random.arrayElement(['Male','Female']),
        status:faker.random.arrayElement(['Active','Inactive'])
    };
    const res = await request
        .post('users')
        .set("Authorization",`Bearer ${TOKEN}`)
        .send(userData)
            return res.body.data.id;
 };