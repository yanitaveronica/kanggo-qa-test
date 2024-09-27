import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiJsonSchema);
const expect = chai.expect;

import loginSchema from '../../schema/loginschema.json' assert { type: 'json' };

import api from "../../helper/base_api.js";
const pathlist = "api/login";

describe("Login", () => {
  it('Success post login user', async () => {
    const body = {
      "email": "eve.holt@reqres.in",
      "password": "cityslicka"
    }

    const response = await api.postAPI(pathlist, body);
    expect(response.status).to.eql(200);
    expect(response.body).to.be.jsonSchema(loginSchema.login);
  });

  it('Unsuccessful post login user', async () => {
    const body = {
      "email": "eve.holt@reqres.in",
    }

    const response = await api.postAPI(pathlist, body);
    expect(response.status).to.eql(400);
    expect(response.body).to.be.jsonSchema(loginSchema.loginerr);
    expect(response.body.error).to.eql("Missing password");
  });
});
