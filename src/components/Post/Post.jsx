import React, { useEffect } from 'react'
import './Post.css'
import comment from '../../img/comment.png'
import share from '../../img/share.png'
import like from '../../img/like.png'
import notlike from '../../img/notlike.png'
import deletButton from '../../img/deleteButton.png'
import saved from '../../img/save-fill.png'
import notSaved from '../../img/save-line.png'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getTimelinePosts} from '../../api/PostRequest'
import InputEmoji from 'react-input-emoji'
import { addComment, likePost } from '../../actions/postAction'
import PostDeleteModal from '../PostDeleteModal/PostDeleteModal.jsx'
import { getUser } from '../../api/UserRequest'
import { format } from "timeago.js"
import DeleteComment from '../DeleteComment/DeleteComment.jsx'
import commentDelete from "../../img/commentDelete.png"
import { savePostApi } from '../../actions/userAction'
import reportPost from '../../img/reportPost.png'
import ReportPostModal from "../ReportPostModal/ReportPostModal"


const Post = ({ data }) => {

   const dispatch = useDispatch()
   const { user } = useSelector((state) => state.authReducer.authData)
   const [liked, setLiked] = useState(data.likes.includes(user._id))
   const [likes, setLikes] = useState(data.likes.length)
   const [postMan, setPostMan] = useState()
   const [modalOpen, setModalOpen] = useState(false)
   const [showModal, setShowModal] = useState(false)
   const [open, setOpen] = useState(false)
   const [savedPost,setSavedPost] = useState(user.savedposts.includes(data._id))
   const [commentString, setCommentString] = useState("")
   const [reportPostModalOpen,setReportPostModalOpen] = useState(false)
   const phase = process.env.REACT_APP_PHASE
   const FOLDER = phase === "testing" ? process.env.REACT_APP_PUBLIC_FOLDER_TESTING : process.env.REACT_APP_PUBLIC_FOLDER;

   useEffect(() => {
      const fetchUser = async () => {
         const postedUser = await getUser(data.userId)
         setPostMan(postedUser.data.firstname + " " + postedUser.data.lastname)
      }
      fetchUser()
   }, [])

   const handleLike = () => {
      setLiked((prev) => !prev)
       dispatch(likePost(data._id, user._id))
      // setLikes(data.likes.length)
      liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
   }
   const handleCommentBox = () => {
      setOpen((prev) => !prev)
   }

   const handleCommentChange = (commentString) => {
      setCommentString(commentString)

   }
   const handleSave=async()=>{
      dispatch(savePostApi(user._id,data._id))
      setSavedPost((prev)=>!prev)
   }
   const handleSubmit = async (e) => {
      e.preventDefault();
      const comment = {
         comment: commentString,
         commentedUser: user.firstname + ' ' + user.lastname,
         time: Date(),
         user: user._id
      }

      dispatch(addComment(data._id, comment))
      setOpen(false)

   }

   const reportPostFn =()=>{
      setReportPostModalOpen(true)
   }

   return (
      <div className="Post">
         <div className="abovePostPic">
         <span className="postTime">Posted {format(data.createdAt)}</span>
         {data.userId !== user._id &&
      
         <img src={reportPost} alt="" onClick={reportPostFn} style={{width:"15px",cursor:"pointer"}} />
         }
         </div>
         {
            <ReportPostModal reportPostModalOpen={reportPostModalOpen} setReportPostModalOpen={setReportPostModalOpen} userId={user._id} postId={data._id}/>
         }
         
         <img src={data.image ? FOLDER + data.image : ""} alt="" />
         <div className="postReact">
            <img src={liked ? like : notlike} alt="" style={{ cursor: "pointer" }} onClick={handleLike} />
            <img src={comment} onClick={handleCommentBox} alt="" />
            
            
            {data.userId === user._id &&
               <>
                  <img src={deletButton} onClick={() => setModalOpen((prev) => !prev)} style={{ width: "28px", height: "28px", display: "flex", alignSelf: 'flex-end' }} alt="" />
                  <PostDeleteModal modalOpen={modalOpen} setModalOpen={setModalOpen} id={data._id} currentUser={user._id} />
               </>
            }
            {data.userId !== user._id &&
            <img src={savedPost?saved:notSaved} onClick={handleSave} alt="" />
            }

         </div>
         <span style={{ color: "var(--gray)", fontSize: '12px' }}>{likes} likes</span>
         <div className="detail">
            <span><b>{postMan}</b> </span>
            <span>{data.desc}</span>

            <hr />
         </div>

         {open &&
            data.comments?.map((com) => {

               return (
                  <div className="commentDiv">
                     <span><b>{com.commentedUser}</b></span>

                     <span> {com.comment}</span>
                     {com.user === user._id &&
                        <>
                           <img src={commentDelete} style={{ width: "20px", height: "20px", marginLeft: "20px", cursor: "pointer" }} onClick={() => setShowModal((prev) => !prev)} alt="" />

                           <DeleteComment showModal={showModal} setShowModal={setShowModal} postId={data._id} commentId={com._id} />
                        </>
                     }
                     <div>
                        <span style={{ paddingRight: "10px" }}>{format(com.time)}</span>
                     </div>

                  </div>
               )
            })
         }

         {open &&
            <div className='addComment' >
               {/* <span><b>username</b></span> */}
               <InputEmoji className="InpEmo" value={commentString} onChange={handleCommentChange} />
               <button className="button commentBtn" onClick={handleSubmit}>Post</button>
            </div>
         }
      </div>

   )
}

export default Post