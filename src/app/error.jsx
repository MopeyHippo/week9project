"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>erm.... you shouldnt be seeing this.</h2>
        <p>maybe watch some youtube, while our team of monkeys fix this</p>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}