import Link from 'next/link';

export default function BlogCard({ blog }) {
  return (
    <div className='blog-card'>
      <img src={blog.image} alt={blog.title} width="100%" />
      <h3>{blog.title}</h3>
      <p>{blog.excerpt}</p>
      <Link href={`/blog/${blog.id}`}>Read More</Link>
    </div>
  );
}
