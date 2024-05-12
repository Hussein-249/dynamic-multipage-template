![](https://img.shields.io/badge/EJS-red)
# Multipage Express Template
![](https://img.shields.io/badge/Development-Ongoing-blue)
![](https://img.shields.io/badge/EJS-maroon) 
![](https://img.shields.io/badge/Javascript-fde427)

> An Express template / project to provide a solution for managing large websites, aimed for blogs and news sites.

# Purpose

Web applications and web sites whose main method of content delivery is through a large number of pages require a scalable method of delivery. This project aims to serve as a template for building apps while keeping code low, aside from customization choices asuch as styling or frontend features.

# Technologies Used

The serverside code is written in Javascript using Node, and requires the following npm packages:

- ```Bootstrap``` for responsive and accessible styling
- ```Express``` for middleware
- ```ejs``` for templating
- ```mongodb``` for interacting with a mongodb database
- ```redis``` for cacheing commonly-used elements across pages

MongoDB is used to serve article / blog text. Media retrieval is achieved through local storage and a custom store and search implementation accessible via the admin view.

# Environment

This app is developed with ```Node.js v21.5.0```. All necessary packages are included in package.json.

# Implemented Features

No features have been fully implemented, as this project is in very early development.

# Planned Features

# Documentation
As this project is aimed both for other developer to build on and for writers or small organizations to use as a template for newsites and blogs, this documentation entails a description of the source code, how to customize the content and layout, and creating new content as an admin.