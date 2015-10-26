# gamesApp

[![devDependency Status](https://david-dm.org/zurb/foundation-apps-template/dev-status.svg)](https://david-dm.org/zurb/foundation-apps-template#info=devDependencies)

gamesApp is based on the default template project for Foundation for Apps, powered by Gulp, Angular, and libsass.


## Requirements

You'll need the following software installed to get started.

  - Frontend
    - [Node.js](http://nodejs.org): Use the installer for your OS.
    - [Git](http://git-scm.com/downloads): Use the installer for your OS.
    - [Gulp](http://gulpjs.com/) and [Bower](http://bower.io): Run `npm install -g gulp bower`
      - Depending on how Node is configured on your machine, you may need to run `sudo npm install -g gulp bower` instead, if you get an error with the first command.
  - API
    - [Apache](http://www.apache.org/): Use the installer for your OS.
    - [PHP](http://php.net/downloads.php): Use the installer for your OS. PHP 5.1 is required for PHP Data Objects library.
    - [MySQL](https://www.mysql.com/downloads/): Use the installer for your OS.

## Get Started

Clone this repository, where `app` is the name of your app.

```bash
git clone https://github.com/kakauandme/gamesApp.git app
```

Change into the directory.

```bash
cd app
```

Install the dependencies. If you're running Mac OS or Linux, you may need to run `sudo npm install` instead, depending on how your machine is configured.

```bash
npm install
bower install
```

For data initialisation, create and select `rest_api_demo` database.

```bash
mysql > CREATE DATABASE rest_api_demo;
mysql > USE rest_api_demo;
```

Execute `dump.sql` query. Additionally check `api/includes/config.php` file and adjsut database settings if nececery.


```bash
mysql < dump.sql;
```


To build the project  use the `build` command. This will compile the Sass and assemble  Angular app. 

```bash
npm start build
```
**Now go to [http://localhost/~username/app/build/](http://localhost/~username/app/build/) in your browser to see it in action.** Where `app` is the name of your app and `~username/` is a location of a default web-server directory on your installation.

## API

Basic RESTful API interface was created with several endpoints accessible at `/api/v1/`
  - GET
    - `/games/` - fetches all games  
    - `/games/id` - pulls game with matching `id`
    - `/games/search?key=value` - lists games with matching key-value tuple 
  - POST
  	- `/games/?key1=value1&key2=value` - creates new game using passed keys and values

##### Examples
  - `/api/v1/games/search?description=lorem&name=real` - searches by name and description
  - `/api/v1/games/4` - displays game by id
  - `/api/v1/film` - not implemented endpoint

##### Response
```json
[
    {
        "id": "1",
        "name": "Real Racing",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros."
    },
    {
        "id": "2",
        "name": "Need for Speed",
        "description": "Nullam quis risus eget urna mollis ornare vel eu leo. Vestibulum id ligula porta felis euismod semper."
    },
    {
        "id": "3",
        "name": "Fifa 2016",
        "description": "Donec id elit non mi porta gravida at eget metus."
    },
    {
        "id": "4",
        "name": "Sims",
        "description": "Nullam id dolor id nibh ultricies vehicula ut id elit."
    },
    {
        "id": "5",
        "name": "Battelfield",
        "description": "Maecenas sed diam eget risus varius blandit sit amet non magna. Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    },
    {
        "id": "6",
        "name": "Real Racing 4",
        "description": "Vestibulum id ligula porta felis euismod semper. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui."
    }
]
```


## Future steps

##### Security

Here are few simple steps that will make RESTful API secure and robust
 - Authentication and session management
 - Protect against cross-site request forgery
 - Input validation & SQL injection prevention
 - Anti-farming
 - Whitelist allowable methods & hosts


##### Testing

  - [Chrome Extention](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo) for manual testing and exploration
  - Unit testing - a script wich will test successful and unsuccessful test cases, including randomly generated requests
  - High load testing - testing server capabilities










