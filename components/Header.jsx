import Link from 'next/link';

export default function Header() {
  return (
    <header >
      <div className="container">
      <nav >
        <Link href="/">Home</Link> |{' '}
        <Link href="/services">Services</Link> |{' '}
        <Link href="/blog">Blog</Link> |{' '}
        <Link href="/contact">Contact</Link>
      </nav>
      </div>
    </header>
  );
}
