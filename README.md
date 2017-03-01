# kirinuki-core

Kirinuki is a library that convert any html to JSON using CSS selectors.

## [Demo](https://rike422.github.io/kirinuki)

https://rike422.github.io/kirinuki


## Usage

```javascript

const kirinuki = require('kirinuki');
const schema = {}
const html = `
<html>
  <head>
    <title>Hero News!</title>
  </head>
  <body>
    <div class="main">
        <h3 class="topic">Amalgam</h3>
        <ul class="news-list">
            <li>
              <span class="content">Batman come back in Gossam City!</span>
              <img class="thumbnail" src="https://exmaple.com/batman.png"></img>
            </li>
            <li>
              <span class="content">Dr. Strange got into a traffic accident.</span>
              <img  class="thumbnail" src="https://exmaple.com/strange.png"></img>
            </li>
        </ul>
    </div>
  </body>
</html>
`;
const schema = {
  topic: {
    content: ".content"
  }
}

kirinuki(schema, html)
// > { topic: { content: 'Batman come back in Gossam City!' } }
```