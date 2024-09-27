/* eslint no-unused-vars: off */

import supertest from 'supertest';
import dotenv from 'dotenv';
dotenv.config();

const api = supertest(process.env.regres_url);

function getAPI(path) {
  return api
    .get(path)
    .set("Content-Type", "application/json")
}

function postAPI(path, body) {
  return api
    .post(path)
    .set("Content-Type", "application/json")
    .send(body);
}

function putAPI(path, body) {
  return api
    .put(path)
    .set("Content-Type", "application/json")
    .send(body);
}

function deleteAPI(path) {
  return api
    .delete(path)
    .set("Content-Type", "application/json")
}

export default {
  getAPI,
  postAPI,
  putAPI,
  deleteAPI
};
