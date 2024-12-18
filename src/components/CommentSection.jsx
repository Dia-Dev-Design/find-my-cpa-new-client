import { useState, useEffect } from "react";
import { postComment, getComments } from "../services/commentService";
import Comment from "./Comment";

export default function commentSection({ cpaId }) {
  // Save comments queried from the database in state
  const [comments, setComments] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    name: "",
    content: "",
  });

  // Query the database for all comments that pertain to this artwork on component mount
  useEffect(() => {
    getComments(cpaId).then((comments) => setComments(comments));
  }, []);

  // Update the form fields as the user types
  function handleInputChange(event) {
    setCreateFormData({
      ...createFormData,
      [event.target.name]: event.target.value,
    });
  }

  // Render a form that allows a user to create a comment on submit
  function toggleCreateForm() {
    setShowCreateForm(!showCreateForm);
  }

  // Update the comments in the comment section after a database transaction
  function refreshComments() {
    getComments(cpaId).then((newCommentData) => setComments(newCommentData));
  }

  // Execute form submission logic
  function handleSubmit(event) {
    // prevent the page from reloading
    event.preventDefault();
    // clear the form
    setCreateFormData({
      name: "",
      content: "",
    });
    // close the form
    setShowCreateForm(false);
    // create the comment in the backend
    postComment({ ...createFormData, cpaId: cpaId }).then(() =>
      refreshComments()
    );
  }

  // conditionally render comments
  let commentElements = [
    <p key="0" className="text-center font-light">
      No comments yet. Be the first to comment!
    </p>,
  ];
  if (comments.length > 0) {
    commentElements = comments.map((comment) => {
      return (
        <Comment
          key={comment._id}
          data={comment}
          refreshComments={refreshComments}
        />
      );
    });
  }

  // conditionally display the text of the create form button
  let btnText = "Create";
  if (showCreateForm) {
    btnText = "Close";
  }

  return (
    <div className="comment-section mx-[10%] relative ">
      <h1 className="text-xl font-medium">Customer reviews</h1>
      <button
        onClick={toggleCreateForm}
        className="top-0 right-0 absolute text-white hover:bg-[#307DE8] font-bold py-2 px-4 bg-[#4e93f3] rounded cursor-pointer"
      >
        {btnText}
      </button>

      {/* Conditionally render the create form */}
      {showCreateForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-100 rounded-md p-4 my-4  w-[80vw] mx-auto text-right"
        >
          <input
            name="name"
            className="px-2 py-1 w-full bg-gray-100"
            placeholder="Your name"
            value={createFormData.name}
            onChange={handleInputChange}
          />
          <br />
          <textarea
            name="content"
            className="p-2 my-2 h-[100px] w-full bg-gray-100"
            placeholder="Share your thoughts!"
            value={createFormData.content}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="text-white hover:bg-gray-700 font-bold py-2 px-4 bg-gray-600 rounded cursor-pointer mr-2"
          >
            Submit
          </button>
        </form>
      )}

      {/* Display the value of the commentElements variable */}
      {commentElements}
    </div>
  );
}
