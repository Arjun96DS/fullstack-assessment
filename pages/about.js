// export default About;
import Link from 'next/link';

export default function About() {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is an app to manage to-do items.</p>

      <Link href="/">
        <a>Go Back to Home</a>
      </Link>
    </div>
  );
}
