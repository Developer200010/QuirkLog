const postModel = require("../models/Post");
const connectDB = require("../config/DB");
const cloudinary = require("../config/cloudinary");


const addPost =  async (req, res) => {
  try {
    await connectDB();

    // Helper to save after (maybe) uploading
    const savePost = async (photoUrl = "") => {
      const newPost = new postModel({
        title: req.body.title,
        desc: req.body.desc,
        username: req.body.username,
        categories: req.body.categories,
        photo: photoUrl, // Cloudinary URL or ""
      });

      const savedPost = await newPost.save();
      return res.status(200).json(savedPost);
    };

    // No file? Save directly.
    if (!req.file) return await savePost("");

    // Upload stream to Cloudinary
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "blog_posts",
        resource_type: "image",         // Cloudinary auto-detects too
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      async (error, result) => {
        if (error) return res.status(500).json(error);
        await savePost(result.secure_url);
      }
    );

    stream.end(req.file.buffer);
  } catch (error) {
    res.status(500).json(error.message || "Upload failed");
  }
}

const updatePost = async (req, res) => {
  try {
    await connectDB();
    const post = await postModel.findById(req.params.id);
    if (post.username !== req.body.username) {
      return res.status(403).json("you can update only your post!");
    }
    const updatedPost = await postModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const deletePost = async (req, res) => {
  try {
    await connectDB();
    const post = await postModel.findById(req.params.id);
    if (post.username !== req.body.username) {
      return res.status(403).json("you can delete only your post!");
    }
    await post.deleteOne();
    res.status(200).json("post has been deleted!");
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const getPostById = async (req, res) => {
  try {
    await connectDB();
    const post = await postModel.findById(req.params.id);
    if (!post) return res.status(404).json("Post not found");
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error.message);
  }
}

const getAllPosts = async (req, res) => {
  const username = req.query.user;
  try {
    await connectDB();
    let query = {};

    if (username) query.username = username;
    // ✅ fetch ALL posts, sorted
    const posts = await postModel.find(query).sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {addPost, getAllPosts, getPostById, deletePost, updatePost}