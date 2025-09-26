import { useRouter } from 'next/router';
import blogs from '../../data/blogs.json';

export default function BlogDetails() {
  const router = useRouter();
  const { id } = router.query;

  const blog = blogs.find((b) => b.id === parseInt(id));

  if (!blog) return <p>Loading...</p>;

  return (
  <div className="container">
      <div className='blog-detail'>
      <h1>{blog.title}</h1>
      <img src={blog.image} alt={blog.title} width="100%" />
      <p>{blog.content}</p>
    </div>
  </div>
  );
}