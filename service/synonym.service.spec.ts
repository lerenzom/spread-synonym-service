const request = require('supertest');
const assert = require('assert');
const express = require('express');
const app = require('../app')


describe("Test the API", () => {
    test("Can add synonym", async () =>{
        const response1 = await request(app).post("/synonyms/add?a=equivalence&b=alikeness")
        expect(response1.headers['content-type']).toMatch(/json/)
        expect(response1.status).toEqual(200)

    })
});