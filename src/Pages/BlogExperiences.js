import { useState, useEffect } from "react";
import BlogPosts from "../Components/BlogPosts";

const BlogExperience = () => {
  const [myexp, setMyexp] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const loadedExpPosts = [];
        const myexp = await fetch(
          "https://chinedu-website-blog-default-rtdb.firebaseio.com/myexp.json"
        );

        const exposts = await myexp.json();

        for (const key in exposts) {
          loadedExpPosts.push({
            id: key,
            title: exposts[key].title,
            post: exposts[key].post,
            uuid: exposts[key].uuid,
          });
        }

        setMyexp(loadedExpPosts);
      } catch {}
    };
    fetchPosts();
  }, []);

  return (
    <div className="p-10">
      <ul className="">
        {myexp.map((posts) => (
          <BlogPosts key={posts.id} title={posts.title} post={posts.post} />
        ))}
      </ul>
    </div>
  );
};

export default BlogExperience;
