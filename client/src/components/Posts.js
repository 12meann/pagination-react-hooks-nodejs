import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState();
  const [currentPage, setCurrentPage] = useState(1); // page number
  const [postsPerPage, setPostsPerPage] = useState(5); //limit
  const [pageUrl, setPageUrl] = useState(
    `/posts?page=${currentPage}&limit=${postsPerPage}`
  );
  const [prevPageUrl, setPrevPageUrl] = useState(""); //prev button link
  const [nextPageUrl, setNextPageUrl] = useState(""); //next button link
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios
      .get(pageUrl, {
        cancelToken: new axios.CancelToken(c => (cancel = c)),
        headers: {
          "Content-type": "application/json"
        }
      })
      .then(res => {
        setLoading(false);
        setPosts(res.data.result);
        setTotalPosts(res.data.totalDocuments);
        setPrevPageUrl(
          res.data.prev
            ? `/posts?page=${res.data.prev.page}&limit=${postsPerPage}`
            : null
        );
        setNextPageUrl(
          res.data.next
            ? `/posts?page=${res.data.next.page}&limit=${postsPerPage}`
            : null
        );
      })
      .catch(err => setErrorMsg(err));
    console.log(`@useeffect= prevurl ${prevPageUrl} nexturl= ${nextPageUrl}`);

    return () => cancel();
  }, [pageUrl, postsPerPage, nextPageUrl, prevPageUrl]);

  const postsList = loading ? (
    <p>loading...</p>
  ) : posts ? (
    posts.map(post => (
      <li key={post.id}>
        <small>{post.id}</small>
        <h6>{post.title}</h6>
        <p>{post.body}</p>
      </li>
    ))
  ) : null;

  function goToPrevPage() {
    setPageUrl(prevPageUrl);
  }

  function goToNextPage() {
    setPageUrl(nextPageUrl);
  }

  return (
    <div>
      {postsList}

      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Posts;
