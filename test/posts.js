import request from "../config/common";
require('dotenv').config();
import faker from 'faker';
import { expect } from 'chai';
import {createRandomUser,createRandomUserWithFaker} from "../helper/user_helper";

const TOKEN = '23735529a2f083e71a06289906cc8873c65bec7e7779855f322830d95c511019';

describe('User Posts', ()=> {
    let userId;
    let postId;

    before( async ()=> {
        userId= await createRandomUserWithFaker();
});
    it('/posts ', async function () {

                const data ={
                    user_id: userId,
                    title: faker.lorem.sentence(),
                    body:faker.lorem.paragraph(),
                }

                const postRes = await request
                    .post('posts')
                    .set("Authorization",`Bearer ${TOKEN}`)
                    .send(data);

                expect(postRes.body.data).to.deep.include(data);
                postId = postRes.body.data.id;
            });

    it('GET/posts/:id ', async function () {

        await request
            .get(`posts/${postId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(200);
    });

    describe('Negative Tests', () => {
        it('401 Authentication Failed ', async function () {
            const data ={
                user_id: userId,
                title: faker.lorem.sentence(),
                body:faker.lorem.paragraph(),
            };

            const postRes = await request
                .post('posts')
                .send(data)
            expect(postRes.body.code).to.eq(401);
            expect(postRes.body.data.message).to.eq("Authentication failed");
        });

        it.only('422 Validation Failed ', async function () {
            const data ={
                user_id: userId,
                title: '',
                body: faker.lorem.paragraphs(),
            };

            const postRes = await request
                .post('posts')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(data)
            // console.log(postRes);//to find out what is error message
            expect(postRes.body.code).to.eq(422);
            expect(postRes.body.data[0].message).to.eq("can't be blank");
        });
    });

});


