import blogs from '../../data/blogs.json';
import BlogCard from '../../components/BlogCard';

export default function Blog() {
  return (
    <div className='container'>
    <div className="blog">
        <h2>Blog</h2>
      <div className='blogs'>
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
    </div>
  );
}