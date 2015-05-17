# chill.social

The content of the website [http://chill.social](http://chill.social).

## folder

`_drafts` contains notes and differents things to prepare the website. It should not be published.

`website` contains the website. This part should be published.

## installation

You must have `npm` and `bower` installed.

```bash
git clone git@github.com:Chill-project/chill.social
npm install
grunt install
```

#open in your browser:
firefox /path/to/repo/chill.social/website/index.html
```

The main page is website/index.html

## Contribute

Things to know :

- the task `grunt install` will install bower dependencies and minify js ;
- the task `grunt` will minify js and bootlint-check htm files.

