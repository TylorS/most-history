# most-history

## Installing (sorry not yet)

```
$ npm install --save most-history
```

## Basic usage

```js
import {history} from 'most-history'

const {push, stream} = history()


stream.filter(location => location.pathname === '/path')
  .observe(...)

route$.observe(push)

```
