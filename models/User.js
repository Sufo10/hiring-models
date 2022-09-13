const shortid = require('shortid');
const bcrypt = require('bcrypt');

let UserModel = null;

module.exports = mongoose => {
  if (UserModel) return UserModel;
  const UserSchema = new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      fullName: {
        type: String,
        required: [true, "can't be blank"],
        trim: true,
      },
      displayName: {
        type: String,
        required: [true, "can't be blank"],
        trim: true,
      },
      gender: {
        type: String,
        enum: ['male', 'female', 'other'],
      },
      emailAddress: {
        type: String,
        required: [true, "can't be blank"],
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        unique: true,
        lowercase: true,
        trim: true,
      },
      phoneNumber: {
        type: String,
        trim: true,
      },
      password: {
        type: String,
        trim: true,
        required: [true, "can't be blank"],
      },
      profileImage: {
        type: String,
        trim: true,
      },
      role: {
        type: [String],
        enum: ['HR', 'interviewer', 'supervisor', 'admin'],
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  UserSchema.pre('find', function () {
    this.where({ isDeleted: { $ne: true } });
  });

  UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  UserSchema.methods.comparePassword = async function (pass) {
    return bcrypt.compare(pass, this.password);
  };

  UserModel = mongoose.model('User', UserSchema);
  return UserModel;
};
