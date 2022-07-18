import { useGetPosts } from './lib/api-hooks';
import { FetchState } from './types';
import './App.css';
import 'reactjs-popup/dist/index.css';
import Modal from './components/Modal';
import { useState, useCallback } from 'react'


function App() {
  const [posts, setPosts, fetchState, getPosts] = useGetPosts();
  const [isOpen, setIsOpen] = useState(false)
  const [postId, setPostId] = useState<number | null>(null)
  const [body, setBody] = useState('')

  const toggleModal = useCallback((id: number, body: string) => () => {
    setIsOpen(!isOpen);
    setPostId(id)
    setBody(body)
  }, [isOpen]);

  const deletePost = (id: number) => {
    setPosts(posts.filter(post => post.id !== id))
  }

  return (
    <div className="container">
      <h1>React TypeScript API List of Posts</h1>
      {fetchState === FetchState.DEFAULT && (
        <>
          <p>
            Hello there, click the button below to get the list of posts from
            the API.
          </p>
          <button className='btnGetPosts' onClick={getPosts}>Get Posts</button>
        </>
      )}
      {fetchState === FetchState.LOADING && <p>Fetching posts...</p>}
      {fetchState === FetchState.ERROR && (
        <>
          <p>Oops! Something went wrong. Please try again.</p>
          <button onClick={getPosts}>Get Posts</button>
        </>
      )}
      {fetchState === FetchState.SUCCESS && (
        <>
          <ul className="posts-list">
            {posts.slice(0, 15).map((post) => (
              <li key={post.id} className="post">
                <h3>
                  {post.title}
                </h3>
                <div className="btnPostsList">
                  <button
                    className='btnMore'
                    onClick={
                      toggleModal(post.id, post.body)
                    }>Read more</button>
                  <button className='btnDel' onClick={() =>
                    deletePost(post.id)
                  }>Delete</button>
                </div>

              </li>
            ))}
          </ul>
          {isOpen && <Modal closeModal={setIsOpen} postInfo={postId} postBody={body} />}

        </>

      )
      }
    </div >
  );
}

export default App;
