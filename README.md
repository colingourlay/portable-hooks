# portable-hooks

More versatile replacements for React's dependency-based hooks

```sh
$ npm i portable-hooks
```

## Usage

```js
import React from 'react';
import { useEffect } from 'portable-hooks';

function Title({ text }) {
  useEffect(() => (document.title = text), [text]);

  return <h1>{text}</h1>;
}
```

### _"Wait, that's just how I'd use React's `useEffect`!"_

Yeah, but do React's hooks let you do this?

```js
import React, { useEffect } from 'react';

function Title({ text }) {
  useEffect(updateTitle, [text]);

  return <h1>{text}</h1>;
}

function updateTitle(title) {
  document.title = title;
  // Uh oh. `document.title` is now `undefined`
}
```

### `portable-hooks` let you extract reusable functions:

```js
import React from 'react';
import { useEffect } from 'portable-hooks';

function Title({ text }) {
  useEffect(updateTitle, [text]);

  return <h1>{text}</h1>;
}

function updateTitle(title) {
  document.title = title;
  // `document.title` is now the same as the Title component's `text` prop
}
```

## API

`portable-hooks` exports the following hooks:

- `useCallback`
- `useEffect`
- `useImperativeHandle`
- `useLayoutEffect`
- `useMemo`

They're all just wrappers around React's own hooks.

## Authors

- Colin Gourlay ([colin@colin-gourlay.com](mailto:colin@colin-gourlay.com))
