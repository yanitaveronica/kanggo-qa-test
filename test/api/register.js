import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiJsonSchema);
const expect = chai.expect;

import registerSchema from '../../schema/registerschema.json' assert { type: 'json' };

import api from "../../helper/base_api.js";
const pathlist = "api/register";

describe("Register", () => {
  it('Success post register user', async () => {
    const body = {
      "email": "eve.holt@reqres.in",
      "password": "pistol"
    }

    const response = await api.postAPI(pathlist, body);
    expect(response.status).to.eql(200);
    expect(response.body).to.be.jsonSchema(registerSchema.register);
  });

  it('Unsuccessful post register user', async () => {
    const body = {
      "email": "eve.holt@reqres.in",
    }

    const response = await api.postAPI(pathlist, body);
    expect(response.status).to.eql(400);
    expect(response.body).to.be.jsonSchema(registerSchema.registererr);
    expect(response.body.error).to.eql("Missing password");
  });
});
