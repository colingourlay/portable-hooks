# portable-hooks

Wrappers for React's hooks that make them more versatile

```sh
$ npm i portable-hooks
```

## Usage

```js
import React from 'react';
import { useEffect } from 'portable-hooks';

function App({ text }) {
  useEffect(() => {
    document.title = text;
  }, [text]);

  return <h1>{text}</h1>;
}
```

### _"Wait, that's how React's `useEffect` already works!"_

Yeah, but what if you wanted to move that effect function outside component, so you can use in elsewhere? React's existing `useEffect` hook depends on the component function closure for access to props/state. If you wanted to extract the effect that sets `document.title`, you'd have to do this:

```js
import React, { useEffect } from 'react';

function setDocumentTitle(title) {
  document.title = title;
}

function App({ text }) {
  useEffect(() => setDocumentTitle(text), [text]);

  return <h1>{text}</h1>;
}
```

Notice that, if you're correctly managing dependencies, you have to write `text` in two places:

1. As an argument to `setDocumentTitle`, and
2. In the dependencies array (`useEffect`'s 2nd argument)

Why are we doing this? Functions arguments _are_ dependencies, by their very nature.

React is asking us to write out these arguments twice every time we use one of these dependency-based hooks, if we want to avoid bugs. Wouldn't it be more concise to only write them in one place:

```js
import React from 'react';
import { useEffect } from 'portable-hooks';

function setDocumentTitle(title) {
  document.title = title;
}

function App({ text }) {
  useEffect(setDocumentTitle, [text]);

  return <h1>{text}</h1>;
}
```

### _"What's going on here?"_

The `portable-hooks` package provides wrapped versions of React's own hooks, which call your functions with the dependencies as their arguments. I don't know about you, but that seems pretty elegant to me. Now, your function signature and your dependencies are the very same thing, and you're less likely to run into bugs.

### This lets us do cool things... like "effect props"

Wouldn't it be great to customise components by passing in effects:

```js
import axios from 'axios';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'portable-hooks';

function App({dataURL, fetchData}) {
  const [data, setData] = useState(null);

  useEffect(fetchData, [dataURL, setData]);

  return <div>{data ? <div>{
    /* use `data` for something here */
  }</div> : 'Loading...'}</div>;
}

async function fetchDataUsingAxios(url, setData) {
  const result = await axios(url);

  setData(result.data);
}

ReactDOM.render(<App dataURL="https://...", fetchData={fetchDataUsingAxios} />, document.body);
```

Now you have a component that expects its `fetchData` prop to be a function that matches a certain signature, but you can implement that function in **any way you want**.

### _"\*ahem\* Excuse me, but sometimes I wanna lie to `useEffect` about what's changed"_

Look, [lying about dependencies is a bad idea](https://overreacted.io/a-complete-guide-to-useeffect/#dont-lie-to-react-about-dependencies), and `portable-hooks` very much encourages you (by design) to not lie about dependencies, buuuuut in rare cases it is actually useful. Dont worry though, I got you covered.

Each hook in `portable-hooks` differs from React's version by caring about one extra optional argument. If you set it, React's hook will use this as its dependency list, and the original inputs will still be passed into your function.

Here's a (very contrived) example which will spam the console from the moment the component mounts to the moment it is unmounted, regardless of the number of times it is updated:

```js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useEffect } from 'portable-hooks';

function logMountDuration(x) {
  let seconds = 0;

  const id = setInterval(() => {
    seconds++;
    console.log(`"${x}" was mounted ${seconds} seconds ago`);
  }, 1000);

  return () => clearInterval(id);
}

function App({ text }) {
  const [count, setCount] = useState(0);

  useEffect(logMountDuration, [text], []);

  return (
    <div>
      <h1>{text}</h1>
      <button onClick={() => setCount(count + 1)}>
        {`I've been pressed `}
        {count}
        {` times`}
      </button>
    </div>
  );
}

ReactDOM.render(<App text="Example" />, document.body);

// > "Example" was mounted 1 seconds ago
// > "Example" was mounted 2 seconds ago
// > "Example" was mounted 3 seconds ago
// ...
```

## API

`portable-hooks` exports the following hooks (which all care about dependencies):

- `useCallback`
- `useEffect`
- `useImperativeHandle`
- `useLayoutEffect`
- `useMemo`

As explained earlier, they're all wrappers around React's own hooks, and expose the same API (with an additional optional argument for those situations where you wanna lie about dependencies), so you can use them interchangably.

This means that all of your existing anonymous-argumentless code is already compatible, and you can start a refactor by updating your imports:

```js
import React, { useEffect } from 'react';

// ...becomes...

import React from 'react';
import { useEffect } from 'portable-hooks';
```

## Authors

- Colin Gourlay ([colin@colin-gourlay.com](mailto:colin@colin-gourlay.com))
