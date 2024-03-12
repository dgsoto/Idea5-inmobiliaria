import request from 'supertest';
import { Given, Then, BeforeAll, AfterAll, BeforeStep } from '@cucumber/cucumber';
import assert from 'assert';
import { BackendApp } from '../../../../src/app/BackendApp';
import { EnvironmentArranger } from '../../../modules/shared/infrastructure/EnvironmentArranger';
import { testContainer } from '../../../modules/shared/testContainer';

let _request: request.Test;
let application: BackendApp;
let _response: request.Response;

const environmentArranger: EnvironmentArranger = testContainer.resolve('PrismaEnvironmentArranger');

BeforeAll(async () => {
  await environmentArranger.arrange();
  application = new BackendApp();
  await application.start();
});

BeforeStep(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
});
AfterAll(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
  await application.stop();
});

Given('I send a GET request to {string}', (route: string) => {
  if (application.httpServer) {
    _request = request(application.httpServer).get(route);
  }
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Given('I send a POST request to {string} with body:', (route: string, body: string) => {
  if (application.httpServer) {
    _request = request(application.httpServer)
      .post(route)
      .send(JSON.parse(body) as object);
  }
});

Then('the response should be', () => {
  assert.deepStrictEqual(_response.body, {
    succesed: true,
    code: 201,
    status_code: 'Created',
  });
});
