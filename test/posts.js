import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');
import faker from 'faker';
import { expect } from 'chai';
import {createRandomUser} from "./helper/user_helper";

const TOKEN = '23735529a2f083e71a06289906cc8873c65bec7e7779855f322830d95c511019';

describe('User posts', ()=> {
    let userId;
    let postId;

    before( async ()=> {
        userId= await createRandomUser();
});
    it('/posts ', async function () {

                const data ={
                    user_id: userId,
                    title: "My title",
                    body:"My Blog Post"
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
});


