import { request } from './setup';

describe('Todo', () => {
// Testcase to validate 200 Response
  it('Get 200 Success response', async () => {
    expect.assertions(1);
    const res = await request.get('/festivals');
    console.log("Request endpoint" + res);
    expect(res.status).toEqual(200);
  });
});
