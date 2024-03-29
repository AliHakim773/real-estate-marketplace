const { default: mongoose } = require("mongoose")
const bcrypt = require("bcrypt")

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: "Username is required",
      unique: "Username already exists",
      trim: true,
    },
    email: {
      type: String,
      required: "Email is required",
      unique: "Email already exists",
      trim: true,
    },
    password: { type: String, required: "Password is required", trim: true },
    avatar: {
      type: String,
      default:
        "https://isobarscience-1bfd8.kxcdn.com/wp-content/uploads/2020/09/default-profile-picture1.jpg",
    },
  },
  { timestamps: true }
)

UserSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
      next()
    } catch (error) {
      console.log("Error in Hasing Password")
      next(error)
    }
  }
})

const User = mongoose.model("User", UserSchema)

module.exports = User
