import { useState, useEffect } from "react";
import BlogPosts from "../Components/BlogPosts";

const BlogTips = () => {
  const [jstips, setJstips] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const loadedJsPosts = [];
        const jstips = await fetch(
          "https://chinedu-website-blog-default-rtdb.firebaseio.com/jstips.json"
        );

        const jsposts = await jstips.json();

        for (const key in jsposts) {
          loadedJsPosts.push({
            id: key,
            title: jsposts[key].title,
            post: jsposts[key].post,
            uuid: jsposts[key].uuid,
          });
        }

        setJstips(loadedJsPosts);
      } catch {}
    };
    fetchPosts();
  }, []);

  return (
    <div className="p-10">
      <ul className="">
        {jstips.map((posts) => (
          <BlogPosts key={posts.id} title={posts.title} post={posts.post} />
        ))}
      </ul>
    </div>
  );
};

export default BlogTips;
