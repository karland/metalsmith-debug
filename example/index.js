var Metalsmith  = require('metalsmith');
var collections = require('metalsmith-collections');
var debug       = require('./lib/mydebug');
var layouts     = require('metalsmith-layouts');
var markdown    = require('metalsmith-markdown');
var permalinks  = require('metalsmith-permalinks');



Metalsmith(__dirname)         // __dirname defined by node.js:
                              // name of current working directory
  .metadata({                 // add any variable you want
                              // use them in layout-files
    sitename: "My Static Site & Blog",
    siteurl: "http://example.com/",
    description: "It's about saying »Hello« to the world.",
    generatorname: "Metalsmith",
    generatorurl: "http://metalsmith.io/",
    facebookurl: "http://facebook.com/",
    githuburl: "http://github.com/",
    twitterurl: "http://twitter.com/"
  })
  .use(debug({log: ""}))               // to see debug output
                              // set $ DEBUG=metalsmith:*
  .source('./src')            // source directory
  .destination('./build')     // destination directory
  .clean(true)                // clean destination before
  .use(collections({          // group all blog posts by internally
    posts: 'posts/*.md'       // adding key 'collections':'posts'
  }))                         // use `collections.posts` in layouts
  .use(debug({
    log: "before markdown",
    metadata: false,
    source: false,
    destination: false,
    files: true,
    match: "posts/first-post.md"
  }))
  .use(markdown())            // transpile all md into html
  .use(permalinks({           // change URLs to permalink URLs
    relative: false           // put css only in /css
  }))
  .use(layouts({              // wrap layouts around html
    engine: 'handlebars',     // use the layout engine you like
  }))
  .use(debug({
    log: "after markdown",
    metadata: false,
    source: false,
    destination: false,
    files: true,
    match: "posts/first-post/*"
  }))
  .build(function(err) {      // build process
    if (err) throw err;       // error handling is required
  });
