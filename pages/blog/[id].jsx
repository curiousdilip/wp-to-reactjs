import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function BlogDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://dev.dilipmaurya.in/wp-json/wp/v2/posts/${id}?_embed`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Post not found');
        }
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>No post found.</p>;

  const featuredImage =
    post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
    '/images/default-blog.jpg';

  return (
    <div className="container">
      <div className="blog-detail">
        <h1>{post.title.rendered}</h1>
        <img
          src={featuredImage}
          alt={post.title.rendered}
          width="100%"
          style={{ marginBottom: '1rem' }}
        />
        <div
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
          <Link href={`/blog/`}>Back</Link>
      </div>
    </div>
  );
}
