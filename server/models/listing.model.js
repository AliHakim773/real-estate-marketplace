const { default: mongoose } = require("mongoose")

const ListingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "The name is required",
    },
    description: {
      type: String,
      required: "Description is required",
    },
    address: {
      type: String,
      required: "The address is required",
    },
    regularPrice: {
      type: Number,
      required: "The price is required",
    },
    discountedPrice: {
      type: Number,
      required: "The discouned price is required",
    },
    badrooms: {
      type: Number,
      required: "The badrooms number is required",
    },
    bathrooms: {
      type: Number,
      required: "The bathrooms number is required",
    },
    furnished: {
      type: Boolean,
      required: "You need to state if it is furnished",
    },
    parking: {
      type: Boolean,
      required: "You need to state if it has a parking",
    },
    type: {
      type: String,
      required: "You need to specify the type",
    },
    offer: {
      type: Boolean,
      required: "You need to state if it has an offer",
    },
    imageUrls: {
      type: Array,
      required: "It is requred to have at least one image",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: "User Id is required",
    },
  },
  { timestamps: true }
)

const Listing = mongoose.model("Listing", ListingSchema)

module.exports = Listing
