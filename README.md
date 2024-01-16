## Description

In this repo I’ve set up a basic ExpressJS project for a synonym service. To get started you will need to run

```jsx
npm install 
npm start
npm test # runs the tests
```

The service itself has two endpoints:

### Add Synonyms

```jsx
POST http://localhost:3000/synonyms/add?a=equivalence&b=alikeness

//returns
{message: "ok"}
```

### Get Synonyms

```jsx
GET http://localhost:3000/synonyms/search?word=equivalence

//returns
{synonyms: [.....]}
```

If the word isn’t found in the service it will return a `404` instead.

### BFS for search

this implementation of the synonym search uses a bread-first search on a tree of `Word` objects. Each word has its list of synonyms, and these are recursively searched and collected into the final output.

### Workers

In order to make the code multi-threaded, the search and add methods are run in worker threads. Because JS only has synchronization for `TypedArray` types, which can only contain Ints or Floats, I opted to use immutable data structures instead of mutable data structures. This increases memory space when copying the `words` tree for processing, unfortunately.

## Additional Details

### Tests

I added a test suite that does some basic integration testing for the API routes to validate that they work correctly and return properly formatted data.

### OpenAPI

There is an OpenAPI spec in the repo which documents the api routes that are available, with their different return types

### CI Pipeline for tests

I added a testing step in the CI pipeline through github actions, which can be found at [.github/workflows/test.yml](.github/workflows/test.yml). It currently just runs the test suite on branch push and PR.