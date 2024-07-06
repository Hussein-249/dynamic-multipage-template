# GUTENBERG - A blogging and newspaper solution
![](https://img.shields.io/badge/Development-Ongoing-blue)
![](https://img.shields.io/github/issues/hussein-249/dynamic-multipage-template)
![](https://img.shields.io/badge/Tests-Passing-green)
![](https://img.shields.io/badge/JavaScript-fde427)
![](https://img.shields.io/badge/EJS-maroon)
![](https://img.shields.io/badge/MongoDB-4db33d)

[README auf Deutsch <i>hier</i> verfügbar! :)](https://github.com/Hussein-249/dynamic-multipage-template/blob/main/README-DE.md)

> Gutenberg is an Express.js project aiming to provide a simple yet comprehensive solution for managing blogs and small news sites, aimed for both developers and producers (authors / orgs) alike.

# Purpose

Web applications and web sites whose main method of content delivery is through a large number of pages require a scalable method of delivery with a responsive and intuitive layout for both producers and consumers. This project aims to serve as a template for building apps while keeping code low, aside from customization choices such as styling or frontend features.

# Installation & Environment

## Packages

The server-side code is written in JavaScript using Node, and requires the following npm packages:

- ```Bootstrap``` for responsive and accessible styling
- ```Express``` for middleware
- ```ejs``` for templating
- ```mongodb``` for interacting with a mongodb database
- ```morgan``` for logging
- ```Jest``` and ```Selenium``` (see [Tests](#tests))

MongoDB is used to serve article / blog text. Media retrieval is achieved through local storage and a custom store and search implementation.

## Runtime Environment

This app is developed with ```Node.js v21.5.0```. All necessary packages are included in package.json.

## Installation

- Clone this repository
```
git clone
```
- Set up the environment by installing the required dependencies included in the ```package.json``` file using
```
npm install
```

## Debugging

In addition to a standard Morgan logger to track HTTP requests, I have implemented a custom logging implementation to separately track runtime errors and HTTP error responses. This allows the app to track non-critical exceptions (runtime errors that shouldn't happen, but in the event they do occur, the app handles them 'gracefully' and continues to operate) as well as report bad responses, which could indicate a broken or faulty link, or a deleted article that is being requested, or a timeout due to heavy server loads.

# Tests

<div id="tests">
This project will include both Jest for unit tests and Selenium for end-to-end testing. These packages are included under devDependencies in package.json. Currently, only a basic database unit test has been written.

I've also added Artillery as a dependency for load testing, with a spike test configured in artillery-config.yaml. In the application's current iteration, it does not appear to handle load testing well.
</div>

# Development Roadmap

Diagram coming soon.

## Implemented Features
- [x] Article generation via templates and text stored in the database
- [x] Media retrieval without database querying
- [x] Request and error logs

## Developing Features
- [ ] Final Homepage layout
- [ ] Live news feed logic and layout
- [ ] Integrated admin interface for post CRUD operations.

## Planned Features
- [ ] Integrated post analytics
- [ ] Colour and font customization

# Documentation

As this project is aimed both for other developers to build on and for writers or small organizations to use as a template for news sites and blogs, this documentation entails a description of the source code, how to customize the content and layout, and creating new content as an admin.
