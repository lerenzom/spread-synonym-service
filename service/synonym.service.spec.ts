const request = require('supertest');
const assert = require('assert');
const express = require('express');
const {app} = require( '../app')


describe("Test the API", () => {
    describe("/synonyms/add", () => {
        test("Can add synonym", async () =>{
            const response1 = await request(app).post("/synonyms/add?a=equivalence&b=alikeness")
            expect(response1.headers['content-type']).toMatch(/json/)
            expect(response1.status).toEqual(200)
        })

        test("Errors if two words are not passed in", async () =>{
            const response1 = await request(app).post("/synonyms/add?a=equivalence")
            expect(response1.headers['content-type']).toMatch(/json/)
            expect(response1.status).toEqual(400)
        })

        test("Errors if a word is null or undefined", async () =>{
            const response1 = await request(app).post("/synonyms/add?a=equivalence&b=")
            expect(response1.headers['content-type']).toMatch(/json/)
            expect(response1.status).toEqual(400)
        })
    })



    test("Can search for synonyms", async () => {
        const response1 = await request(app).post("/synonyms/add?a=equivalence&b=alikeness")
        const response2 = await request(app).get("/synonyms/search?word=equivalence")
        expect(response2.status).toEqual(200)
        expect(response2.headers['content-type']).toMatch(/json/)
        expect(response2.body.synonyms.length).toEqual(1)
    })

});