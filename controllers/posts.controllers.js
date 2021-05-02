const posts = require('../models/posts.model')


const newPost = async (req,res) => {
   const {author, content , authorID} = req.body
   const newPost = new posts({
       author : author,
       content : content,
       authorID : authorID
   })
   try {
       await newPost.save()
       res.status(200).json({success: "New post was Succesfully created" })
   }
   catch(err) {
    res.json({err : 'err'})
   }
}

const getAllPosts = async (req,res) => {
    try {
        const allPosts = await posts.find({})
        res.send(allPosts)
      }
      catch(err) {
       res.send(err)
      }
   }

   const likePost = async (req,res) => {
     const liker = req.params.id
     const post = req.params.post
     try {
      //  const didLike = posts.find({'_id':post}, {'likes':liker})
      //  console.log(didLike.data)
      const like = await posts.updateOne({_id : post},{$push : {likes : liker}})     
      await like.save()
      res.json({success : `new like`})
     }
     catch(err) {
      res.send(err)
     }    
  }
  const newComment = async (req,res) => {
    const post = req.params.post
    const commenter = req.params.id
    const {content} = req.body
    try {
    const comment = await posts.updateOne({_id:post}, {$push : {comments :{author : commenter, content : content}}})
    await comment.save()
    res.json({success : `new comment`})
    }
    catch(err) {
      res.send(err)
    }
  }


module.exports = {
  newPost,
  getAllPosts,
  likePost,
  newComment
}