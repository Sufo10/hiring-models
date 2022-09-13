const shortid = require('shortid');

let OrganizationModel = null;

module.exports = mongoose => {
  if (OrganizationModel) return OrganizationModel;
  const EmailSchema = new mongoose.Schema({
    type: {
      type: String,
      enum: ['Public', 'Organization'],
    },
    email: {
      type: String,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
      lowercase: true,
      trim: true,
    },
  });

  const SocialMediaSchema = new mongoose.Schema({
    site: {
      type: String,
      enum: ['Facebook', 'Instagram', 'LinkedIn'],
    },
    link: {
      type: String,
      lowercase: true,
      trim: true,
    },
  });

  const OrganizationSchema = new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      name: {
        type: String,
        required: [true, "can't be blank"],
        trim: true,
      },
      address: {
        type: String,
        required: [true, "can't be blank"],
        trim: true,
      },
      contactEmail: [EmailSchema],
      contactNumber: {
        type: String,
        trim: true,
      },
      image: {
        type: String,
        trim: true,
      },
      socialMedias: [SocialMediaSchema],
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  OrganizationSchema.pre('find', function () {
    this.where({ isDeleted: { $ne: true } });
  });

  OrganizationModel = mongoose.model('Organization', OrganizationSchema);
  return OrganizationModel;
};
