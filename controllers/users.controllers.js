const users = require('../models/users.model')

const createNewUser = async (req, res) => {
  const { name, email, password } = req.body
  const newUser = new users({
    name: name,
    email: email,
    password: password
  })
  try {
    const token = await newUser.generateToken()
    await newUser.save()
    res.status(200).json({ success: "New Account was Succesfully created", newUser })
  }
  catch (err) {
    res.json({ err: 'err' })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await users.findOne({ email: email })       //add password to approve login
    const token = await user.generateToken()
    res.status(200).json({ success: "Yoou now logged in", token, user })
  }
  catch (err) {
    res.status(400).json({ error: "Incorrect Inputs" })
  }

}

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await users.find({})
    res.send(allUsers)
  }
  catch (err) {
    res.send(err)
  }
}

const getUserByID = async (req, res) => {
  const id = req.params.id
  try {
    const user = await users.findOne({ _id: id })       //add password to approve login
    res.status(200).json({ user })
  }
  catch (err) {
    res.status(400).json({ error: "user does not exist" })
  }

}

const follow = async (req, res) => {                     //is there a nicer way to write it?
  const follower = req.params.follower
  const beingFollow = req.params.following
  try {
    const alredayFollowing = await users.findOne({ _id: follower }).findOne({ following: { $in: beingFollow } })
    if (!alredayFollowing) {
          const followUser = await users.updateOne({ _id: follower }, { $push: { following: beingFollow } })
          const followingUser = await users.updateOne({ _id: beingFollow }, { $push: { followers: follower } })
          followUser.save()
          followingUser.save()
          return res.json({ success: 'following success' })
    } else {
          const unFollowUser = await users.updateOne({ _id: follower }, { $pull: { following: beingFollow } })
          const unFollowingUser = await users.updateOne({ _id: beingFollow }, { $pull: { followers: follower } })
          unFollowUser.save()
          unFollowingUser.save()
          return res.json({ success: 'unfollowing success' })
    }
  }
  catch (err) {
    res.send(err)
  }
}


module.exports = {
  createNewUser,
  loginUser,
  getAllUsers,
  getUserByID,
  follow
}