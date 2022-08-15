import { useEffect, useState } from "react";
import PostList from "../Components/PostList";

const Posts = () => {
  const [jstips, setJstips] = useState([]);
  const [myexp, setMyexp] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const loadedJsPosts = [];
        const loadedExpPosts = [];
        const myexp = await fetch(
          "https://chinedu-website-blog-default-rtdb.firebaseio.com/myexp.json"
        );
        const jstips = await fetch(
          "https://chinedu-website-blog-default-rtdb.firebaseio.com/jstips.json"
        );
        const exposts = await myexp.json();
        const jsposts = await jstips.json();

        for (const key in exposts) {
          loadedExpPosts.push({
            id: key,
            title: exposts[key].title,
            post: exposts[key].post,
            uuid: exposts[key].uuid,
          });
        }
        for (const key in jsposts) {
          loadedJsPosts.push({
            id: key,
            title: jsposts[key].title,
            post: jsposts[key].post,
            uuid: jsposts[key].uuid,
          });
        }

        setMyexp(loadedExpPosts);
        setJstips(loadedJsPosts);
      } catch {}
    };
    fetchPosts();
  }, []);

  return (
    <div className="md:w-3/4 w-10/12 right-0 top-14 absolute bg-crbg border-t-2 md:px-10 px-4 py-6 border-txt text-white animate__animated animate__fadeInRight">
      <div className=" flex justify-center text-xl text-white font-bold">
        <h1>POSTS</h1>
      </div>
      <div className="border-txt border-2 rounded p-4">
        <h1 className="text-2xl text-center font-semibold ">
          My Experience Posts
        </h1>
        <div className="">
          <ul className="">
            {myexp.map((posts) => (
              <PostList key={posts.id} title={posts.title} uuid={posts.uuid} />
            ))}
          </ul>
        </div>
      </div>
      <div className="border-txt border-2 rounded p-4 mt-6">
        <h1 className="text-2xl text-center font-semibold ">
          My JavaScript Tips
        </h1>
        <div className="">
          <ul className="">
            {jstips.map((posts) => (
              <PostList
                key={posts.id}
                uuid={posts.uuid}
                title={posts.title}
                location={"jstips"}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Posts;
