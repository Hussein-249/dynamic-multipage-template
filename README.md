# Multipage Express Template
![](https://img.shields.io/badge/Development-Ongoing-blue)
![](https://img.shields.io/badge/Tests-Passing-green)
![](https://img.shields.io/badge/Node.js_v21.5-68A063)
![](https://img.shields.io/badge/Javascript-fde427)
![](https://img.shields.io/badge/EJS-maroon)
![](https://img.shields.io/badge/MongoDB-4db33d)

<!-- link to German README? -->

> An Express template / project to provide a solution for managing large websites, aimed for authors of blogs and news sites.

# Purpose

Web applications and web sites whose main method of content delivery is through a large number of pages require a scalable method of delivery. This project aims to serve as a template for building apps while keeping code low, aside from customization choices such as styling or frontend features.

# Packages & Environment

The server-side code is written in Javascript using Node, and requires the following npm packages:

- ```Bootstrap``` for responsive and accessible styling
- ```Express``` for middleware
- ```ejs``` for templating
- ```mongodb``` for interacting with a mongodb database
- ```redis``` for cacheing commonly-used elements across pages

MongoDB is used to serve article / blog text. Media retrieval is achieved through local storage and a custom store and search implementation accessible via the admin view.

## Environment

This app is developed with ```Node.js v21.5.0```. All necessary packages are included in package.json.

# Tests

This project will include both ```Jest``` for unit tests and ```Selenium``` for end-to-end testing. These packages are included under devDependencies in package.json. Currently, only a basic database unti test has been written.

# Development Roadmap

## Implemented Features

- [x] Article generation via templates and text stored in the database
- [x] Simple HTTP request logs

## Developing Features

- [ ] Final Homepage layout
- [ ] Final article layout
- [ ] Live news feed logic and layoutrticle generation via templates and text stored in the database
- [ ] Basic admin interface for post CRUD operations.
- [ ] Redis caching

## Planned Features
- [ ] In-built post analytics

Potentially:
- [ ] LaTeX integration (will likely need to update the data query logic to handle this)
- [ ] Colour and font customization

## Additional Features (i.e. security features)

Coming soon.

# Documentation
As this project is aimed both for other developer to build on and for writers or small organizations to use as a template for newsites and blogs, this documentation entails a description of the source code, how to customize the content and layout, and creating new content as an admin.
