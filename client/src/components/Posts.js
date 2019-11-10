import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import "../App.scss";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState();
  const [currentPage, setCurrentPage] = useState(1); // page number
  const [postsPerPage] = useState(5); //limit
  const [pageUrl, setPageUrl] = useState(
    `/posts?page=${currentPage}&limit=${postsPerPage}`
  );

  const [prevPageUrl, setPrevPageUrl] = useState(null); //prev button link
  const [nextPageUrl, setNextPageUrl] = useState(null); //next button link

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
        console.log("pageurl", pageUrl);
      })
      .catch(err => console.log(err));
    console.log(`@useeffect= prevurl ${prevPageUrl} nexturl= ${nextPageUrl}`);

    return () => cancel();
  }, [pageUrl, postsPerPage, nextPageUrl, prevPageUrl]);

  const postsList = loading ? (
    <p className="loading">loading...</p>
  ) : posts ? (
    posts.map(post => (
      <li key={post.id || post._id}>
        <small>{post.id || post._id}</small>
        <h6>{post.title ? post.title : null}</h6>
        <p>{post.body || post.content || post.username}</p>
      </li>
    ))
  ) : null;

  function goToPrevPage() {
    setPageUrl(prevPageUrl);
  }

  function goToNextPage() {
    setPageUrl(nextPageUrl);
  }
  const paginate = async number => {
    setLoading(true);
    setCurrentPage(await number);
    setPageUrl(`/posts?page=${currentPage}&limit=${postsPerPage}`);
    setLoading(false);
  };
  return (
    <>
      <ul className="posts">{postsList}</ul>
      <Pagination
        goToNextPage={nextPageUrl ? goToNextPage : null}
        goToPrevPage={prevPageUrl ? goToPrevPage : null}
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        paginate={paginate}
        loading={loading}
      />
    </>
  );
};

export default Posts;
