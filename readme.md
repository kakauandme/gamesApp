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
    - [PHP](http://php.net/downloads.php): Use the installer for your OS.
    - [MySQL](https://www.mysql.com/downloads/): Use the installer for your OS. After instalation execute *dump.sql* query to create nececery tables. 

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

While you're working on your project, run:

```bash
npm start
```

This will compile the Sass and assemble your Angular app. **Now go to `localhost:8080` in your browser to see it in action.** When you change any file in the `client` folder, the appropriate Gulp task will run to build new files.

To run the compiling process once, without watching any files, use the `build` command.

```bash
npm start build
```
