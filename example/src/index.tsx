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

function logMountDuration(x: string) {
  let seconds = 0;

  const id = setInterval(() => {
    seconds++;
    console.log(`"${x}" was mounted ${seconds} seconds ago`);
  }, 1000);

  return () => clearInterval(id);
}

function ExampleB({ text }) {
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

ReactDOM.render(<ExampleB text="Example B" />, document.getElementById('example-b'));
