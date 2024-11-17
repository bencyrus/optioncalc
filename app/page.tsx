import Link from "next/link";

export default async function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/options">See Options</Link>
    </div>
  );
}
