import { AppConfig } from '@src/util/config';
import { app } from '@src/app';
import supertest, { agent } from 'supertest';

const appConfig = new AppConfig();

let fullUrl: string | null = null;

// compose and expose supertest object based on env variables,
// allows for typescript, compiled (js) and remote testing
const remoteTestUrl = 'https://eacp.energyaustralia.com.au/codingtest/api/v1';

if (remoteTestUrl) {
  // remote url provided
  fullUrl = remoteTestUrl;
} 
let request: supertest.SuperTest<supertest.Test>;

// check if we have a full url or not
if (!fullUrl) {
  console.log('loading typescript app into supertest');
  request = agent(app); // used for typescript
} else {
  console.log('loading full url into supertest:', fullUrl);
  request = agent(fullUrl);
}

export { request };