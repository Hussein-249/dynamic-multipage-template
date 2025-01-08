# Publizier - A blogging app like Medium and Substack
![](https://img.shields.io/github/issues/hussein-249/dynamic-multipage-template)
![](https://img.shields.io/badge/Tests-Passing-green)
![](https://img.shields.io/badge/Node.js-417E38)
![](https://img.shields.io/badge/MongoDB-4db33d)
![](https://img.shields.io/badge/Webpack-75AECB)

> Publizier (from the German verb "publizieren") is an Express.js project aiming to provide a simple yet comprehensive solution for creating and managing a blog or a small news site, catered towards both developers and producers (authors & organizations) alike. This project aims to serve as a template for hosting and managing a blog while keeping code low.

# Installation & Environment

This app uses ```Node.js 21.5``` as the runtime environment. Ensure Node is installed before proceeding with the installation.

## Packages

The server-side code is written in JavaScript using Node, and requires the following npm packages:

- ```Bootstrap``` for responsive and accessible styling
- ```Express``` for middleware
- ```ejs``` for page templating
- ```mongodb``` for interacting with a mongodb database
- ```morgan``` for logging

The development environment also includes the following npm packages:
- ```webpack``` and other webpack plugins for minifying and optimizing static files
- ```Jest``` and ```Selenium``` (see [Tests](#tests))

All of the above packages have been included in ```package.json```.

MongoDB is used to serve text and metadata. Media retrieval is achieved through local storage and a custom store-and-retrieve implementation.

## Installation Steps

- Clone this repository
```
git clone https://github.com/Hussein-249/dynamic-multipage-template
```
- Set up the environment by installing the required dependencies included in the ```package.json``` file using
```
npm install
```

- Start the app using the command
```
npm start
```

- To run the included tests, use
```
npm test
```

## Configuration Files

There a few ```.config``` files at the root directory. This section documents each of these files and their contents.

### jest.config.js

This configuration file is need to point jest towards the directory or directories containing tests using Jest.

### webpack.config.js

## Debugging

In addition to a standard morgan logger to track HTTP requests, I have implemented a custom logging implementation to separately track runtime errors and HTTP error responses. This allows the app to track non-critical exceptions as well as report bad responses, which could indicate a broken or faulty link, or a deleted article that is being requested, or a timeout.

# Tests

<div id="tests">
This project will include both Jest for unit tests and Selenium for end-to-end testing. These packages are included under devDependencies in ```package.json```.
</div>

# Development Roadmap

Diagram coming soon.

## Implemented Features
- [x] Article generation via templates and text stored in the database
- [x] Media retrieval without database querying
- [x] Request and error logs

## Developing Features
- [ ] Analytics collection and processing logic.
- [ ] Post text editor
- [ ] Post managing
- [ ] Final Homepage layout
- [ ] Live news feed logic and layout
- [ ] Integrated admin interface for post CRUD operations.
- [ ] Analytics and data viewer (data model must be finalized before this can be started)

# Documentation

To be completed once the first fully-working version of this app is released.
