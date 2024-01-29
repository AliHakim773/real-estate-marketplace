const { default: mongoose } = require("mongoose")

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    email: { type: String, required: true },
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
