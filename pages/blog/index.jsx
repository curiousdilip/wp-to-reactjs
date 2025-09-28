import { useEffect, useState } from 'react';
import BlogCard from '../../components/BlogCard';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://dev.dilipmaurya.in/wp-json/wp/v2/posts?_embed') // _embed gives access to featured image
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Error fetching blog posts:', err));
  }, []);

  const filteredPosts = posts.filter((post) => {
    const title = post.title.rendered.toLowerCase();
    return title.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="container">
      <div className="blog">
        <h2>Blog</h2>

        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            placeholder="Search blog posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.5rem', width: '60%' }}
          />
        </div>

        <div className="blogs">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              // Get featured image from embedded data
              const featuredImage =
                post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
                '/images/default-blog.jpg';

              return (
                <BlogCard
                  key={post.id}
                  blog={{
                    id: post.id,
                    title: post.title.rendered,
                    excerpt: post.excerpt.rendered.replace(/<[^>]+>/g, ''),
                    image: featuredImage,
                  }}
                  link={`/blog/${post.id}`}
                />
              );
            })
          ) : (
            <p>No blog posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
