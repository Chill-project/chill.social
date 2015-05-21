# chill.social

The content of the website [http://chill.social](http://chill.social).

## folder

`_drafts` contains notes and differents things to prepare the website. It should not be published.

`website` contains the website. This part should be published.

## installation

You must have `npm` and `bower` installed.

```bash
git clone git@github.com:Chill-project/chill.social
cd chill.social
npm install
grunt install
```

#open in your browser:
firefox /path/to/repo/chill.social/website/index.html
```

The main page is website/index.html

## deploy

A task `grunt deploy` will deploy on server running the website `http://chill.social`. This task will run the install task and, then, upload files to remote server.

Before running this command, you must :

- have access on the server :-)
- configure a .ftppass at the root of the project. A basic .ftppass will be : 

```json
{
  "chill.social": {
     "username": "root",
     "agent": true
  }
}

```

For complete configuration, see https://www.npmjs.com/package/grunt-sftp-deploy

## Contribute

Things to know :

- the task `grunt install` will install bower dependencies and minify js ;
- the task `grunt` will minify js and bootlint-check htm files.

### less files

The bootstrap framework is used, but unused parts are removed, and some are overriden.

In directory `src/less` you will find personalized components using bootstrap mixins. 

