declare var React;
declare var ReactDOM;
const { useState } = React;
import { useEffect } from '../../src/portable-hooks';

const setTitleToCount = (x: string) => {
  document.title = `You clicked ${x} times`;
};

function ExampleA() {
  const [count, setCount] = useState(0);

  useEffect(setTitleToCount, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

ReactDOM.render(<ExampleA />, document.getElementById('example-a'));

function ExampleB() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

ReactDOM.render(<ExampleB />, document.getElementById('example-b'));

function ExampleC() {
  const [count, setCount] = useState(0);

  useEffect(
    x => {
      document.title = `You clicked ${x} times`;
    },
    [count]
  );

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

ReactDOM.render(<ExampleC />, document.getElementById('example-c'));
