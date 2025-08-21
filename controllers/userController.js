const connectDB = require("../config/DB.js");
const bcrypt = require("bcryptjs");
const streamifier = require("streamifier");
const cloudinary = require("../config/cloudinary.js");
const userModel = require("../models/User.js")
const updateUser = async (req, res) => {
  try {
    await connectDB();
    if (req.body.userId === req.params.id) {
      // handle password hashing if user updates password
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      // if a file is uploaded, send it to cloudinary
      if (req.file) {
        const streamUpload = (fileBuffer) => {
          return new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "user_profiles" },
              (error, result) => {
                if (result) resolve(result);
                else reject(error);
              }
            );
            streamifier.createReadStream(fileBuffer).pipe(stream);
          });
        };

        try {
          const result = await streamUpload(req.file.buffer);
          req.body.profilePic = result.secure_url; // store only Cloudinary URL
        } catch (err) {
          return res.status(500).json({ message: "Cloudinary upload failed", err });
        }
      }

      // update user
      const updatedUser = await userModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      return res.status(200).json(updatedUser);
    } else {
      return res.status(401).json("You can update only your account!");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}

const deleteUser =  async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      await connectDB();
      const user = await userModel.findById(req.params.id);
      try {
        await userPost.deleteMany({ username: user.username });
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    } catch (error) {}
  } else {
    res.status(401).json("you can update only your account");
  }
}

const getUserBYId = async (req, res) => {
  try {
    await connectDB();
    const user = await userModel.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json("user does not have an account", error);
  }
}

module.exports = {updateUser, deleteUser, getUserBYId}