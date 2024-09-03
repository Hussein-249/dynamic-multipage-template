# Publizier - A blogging & newspaper app
![](https://img.shields.io/badge/Development-Ongoing-blue)
![](https://img.shields.io/github/issues/hussein-249/dynamic-multipage-template)
![](https://img.shields.io/badge/Tests-Passing-green)
![](https://img.shields.io/badge/JavaScript-fde427)
![](https://img.shields.io/badge/EJS-maroon)
![](https://img.shields.io/badge/MongoDB-4db33d)

[README en Français <i>disponible ici! hier</i>](https://github.com/Hussein-249/dynamic-multipage-template/blob/main/README-DE.md)

[README auf Deutsch <i>hier verfügbar!</i>](https://github.com/Hussein-249/dynamic-multipage-template/blob/main/README-DE.md)

> Publizier (from the German verb "publizieren") is an Express.js project aiming to provide a simple yet comprehensive solution for creating and managing a blog or a small news site, catered towards both developers and producers (authors & organizations) alike. This project aims to serve as a template for hosting and managing a blog while keeping code low, aside from customization choices such as styling or frontend features.

# Installation & Environment

This app uses Node.js 21 as the runtime environment. Ensure Node is installed before proceeding with the installation.

## Packages

The server-side code is written in JavaScript using Node, and requires the following npm packages:

- ```Bootstrap``` for responsive and accessible styling
- ```Express``` for middleware
- ```ejs``` for page templating
- ```mongodb``` for interacting with a mongodb database
- ```morgan``` for logging
- ```Jest``` and ```Selenium``` (see [Tests](#tests))

All of the above packages have been included in ```package.json```.

MongoDB is used to serve article / blog text. Media retrieval is achieved through local storage and a custom store-and-retrieve implementation.

## Installation

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
node server.js
```

## Debugging

In addition to a standard morgan logger to track HTTP requests, I have implemented a custom logging implementation to separately track runtime errors and HTTP error responses. This allows the app to track non-critical exceptions (the app handles runtime errors 'gracefully' and continues to operate) as well as report bad responses, which could indicate a broken or faulty link, or a deleted article that is being requested, or a timeout due to heavy server loads.

# Tests

<div id="tests">
This project will include both Jest for unit tests and Selenium for end-to-end testing. These packages are included under devDependencies in ```package.json```.

I have also added Artillery as a dependency for load testing, with a spike test configured in ```artillery-config.yaml```. In the application's current iteration, it does not appear to handle load testing well. I will look into this.
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

As this project is aimed both for other developers to build on and for writers or small organizations to use as a template for news sites and blogs, this documentation entails a description of the source code, how to customize the content and layout, and creating new content as an admin.
