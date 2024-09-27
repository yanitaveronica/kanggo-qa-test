import chai from 'chai';
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiJsonSchema);
const expect = chai.expect;

import listSchema from '../../schema/listschema.json' assert { type: 'json' };
import createSchema from '../../schema/createschema.json' assert { type: 'json' };
import updateSchema from '../../schema/updateschema.json' assert { type: 'json' };

import api from "../../helper/base_api.js";
const pathlist = "api/users";

describe("User", () => {
  it('Success get list user', async () => {
    const response = await api.getAPI(pathlist);
    expect(response.status).to.eql(200);
    expect(response.body).to.be.jsonSchema(listSchema.list);
  });

  it('Success get user', async () => {
    const resplist = await api.getAPI(pathlist);
    expect(resplist.status).to.eql(200);

    const response = await api.getAPI(pathlist + '/' + resplist.body.data[1].id);
    expect(response.status).to.eql(200);
    expect(response.body).to.be.jsonSchema(listSchema.getuser);
    expect(response.body.data.id).to.eql(resplist.body.data[1].id);
    expect(response.body.data.email).to.eql(resplist.body.data[1].email);
    expect(response.body.data.first_name).to.eql(resplist.body.data[1].first_name);
    expect(response.body.data.last_name).to.eql(resplist.body.data[1].last_name);
    expect(response.body.data.avatar).to.eql(resplist.body.data[1].avatar);
  });

  it('Success create user', async () => {
    const body = {
      "name": "morpheus",
      "job": "leader"
    }

    const response = await api.postAPI(pathlist, body);
    expect(response.status).to.eql(201);
    expect(response.body).to.be.jsonSchema(createSchema.createuser);
    expect(response.body.name).to.eql(body.name);
    expect(response.body.job).to.eql(body.job);
  });

  it('Success update user', async () => {
    const body = {
      "name": "morpheus",
      "job": "leader"
    }

    const resplist = await api.getAPI(pathlist);
    expect(resplist.status).to.eql(200);

    const response = await api.putAPI(pathlist + '/' + resplist.body.data[1].id, body);
    expect(response.status).to.eql(200);
    expect(response.body).to.be.jsonSchema(updateSchema.updateuser);
    expect(response.body.name).to.eql(body.name);
    expect(response.body.job).to.eql(body.job);
  });

  it('Success delete user', async () => {
    const resplist = await api.getAPI(pathlist);
    expect(resplist.status).to.eql(200);

    const response = await api.deleteAPI(pathlist + '/' + resplist.body.data[1].id);
    expect(response.status).to.eql(204);
  });
});
