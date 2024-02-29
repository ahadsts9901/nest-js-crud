import { useEffect, useRef, useState } from "react"
import "./App.css"
import { Toast, baseUrl } from "./core"
import axios from "axios"
import { SiNestjs } from "react-icons/si";
import Post from "./components/Post";
import Swal from "sweetalert2"

const App = () => {

  const [posts, setPosts]: any = useState([])

  // console.log(posts);

  const titleRef: any = useRef()
  const textRef: any = useRef()

  useEffect(() => {
    getPosts()
  }, [])

  const create = async (e: any) => {

    e.preventDefault()

    const title = titleRef.current.value
    const text = textRef.current.value

    if (!title || !text || title.trim() === "" || text.trim() === "") {
      return;
    }

    try {
      const resp = await axios.post(`${baseUrl}/posts`, {
        title: title,
        text: text
      })
      console.log(resp);
      Toast.fire({
        icon: "success",
        title: "Post done",
      });
      getPosts()
      e.target.reset()
    } catch (error) {
      console.log(error);
      Toast.fire({
        icon: "error",
        title: "Error in posting",
      });
    }

  }

  const getPosts = async () => {

    try {
      const resp = await axios.get(`${baseUrl}/posts`)
      setPosts([...resp.data.data])

    } catch (error) {
      console.log(error);
    }

  }

  const delPost = async (postId: number) => {

    if (!postId) {
      return
    }

    Swal.fire({
      title: 'Delete post ?',
      showCancelButton: true,
      cancelButtonColor: "#24232c",
      confirmButtonText: 'Delete',
      confirmButtonColor: "#24232c",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        try {
          const resp = await axios.delete(`${baseUrl}/posts/${postId}`)
          console.log(resp);
          Toast.fire({
            icon: "success",
            title: "Post deleted",
          });
          getPosts()
        } catch (error) {
          console.log(error);
          Toast.fire({
            icon: "error",
            title: "Can't delete post",
          });
        }
      }
    });

  }

  const editPost = async (e: any, postId: number) => {

    let toEditTitle = e.target.parentNode.parentNode.querySelector(".title").innerText
    let toEditText = e.target.parentNode.parentNode.querySelector(".text").innerText

    Swal.fire({
      title: 'Edit Post',
      html: `
        <input type="text" id="editTitle" class="swal2-input" placeholder="Post Title" value="${toEditTitle}" required>
        <textarea id="editText" class="swal2-input text" placeholder="Post Text" required>${toEditText}</textarea>
      `,
      showCancelButton: true,
      cancelButtonColor: "#24232c",
      confirmButtonText: 'Update',
      confirmButtonColor: "#24232c",
      preConfirm: async () => {

        const editedTitleElement = document.getElementById('editTitle')! as HTMLInputElement;
        const editedTextElement = document.getElementById('editText')! as HTMLInputElement;

        const editedTitle = editedTitleElement.value
        const editedText = editedTextElement.value

        if (!editedTitle.trim() || !editedText.trim()) {
          Swal.showValidationMessage('Title and text are required');
          setTimeout(() => {
            Swal.resetValidationMessage();
          }, 1500)
          return false;
        }

        try {
          const resp = await axios.put(`${baseUrl}/posts/${postId}`, {
            title: editedTitle,
            text: editedText
          })
          console.log(resp);
          Toast.fire({
            icon: "success",
            title: "Post updated",
          });
          getPosts()
        } catch (error) {
          console.log(error);
          Toast.fire({
            icon: "error",
            title: "Can't update post",
          });
        }
      }
    });

  }

  return (
    <>
      <h2 className="heading"><SiNestjs
        style={{
          width: "1.5em",
          height: "1.5em",
          marginRight: "0.5em"
        }}
      /><span>Nestjs</span><span className="crud">CRUD</span></h2>
      <form onSubmit={create}>
        <input ref={titleRef} type="text" placeholder="Enter title" maxLength={20} />
        <textarea ref={textRef} placeholder="Enter Text"></textarea>
        <button type="submit">Post</button>
      </form>
      <div className="posts">
        {
          posts?.length < 1 ? "" :
            posts?.map((post: any, i: number) => (
              <Post key={i} time={post?.time} title={post?.title} text={post?.text} id={post.id} del={delPost} edit={editPost} />
            ))
        }
      </div>
    </>
  )
}

export default App