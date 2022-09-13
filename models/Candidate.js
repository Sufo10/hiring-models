const shortid = require('shortid');

let CandidateModel = null;

module.exports = mongoose => {
  if (CandidateModel) return CandidateModel;

  const skillSetSchema = new mongoose.Schema({
    programmingLanguages: {
      type: [String],
      trim: true,
    },
    frameworks: {
      type: [String],
      trim: true,
    },
    others: {
      type: [String],
      trim: true,
    },
  });

  const experienceSchema = new mongoose.Schema({
    company: {
      type: String,
      trim: true,
    },
    duration: {
      type: String,
      trim: true,
    },
    Position: {
      type: String,
      trim: true,
    },
  });

  const supervisionSchema = new mongoose.Schema({
    supervisorID: {
      type: String,
      trim: true,
    },
    probationPeriod: {
      type: String,
      trim: true,
    },
  });

  const CandidateSchema = new mongoose.Schema(
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
      skillSet: skillSetSchema,
      experience: [experienceSchema],
      level: {
        type: String,
        enum: ['intern', 'trainee', 'mid-level', 'associate', 'senior'],
      },
      cv: {
        type: String,
        trim: true,
      },
      profileImage: {
        type: String,
        trim: true,
      },
      status: {
        type: String,
        enum: ['open', 'request-interview', 'interview-scheduled', 'in-review', 'hired', 'rejected', 'withdrawn'],
        default: 'open',
      },
      supervision: supervisionSchema,
      referrer: {
        type: String,
        trim: true,
      },
      remarks: {
        type: String,
        trim: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  CandidateSchema.pre('find', function () {
    this.where({ isDeleted: { $ne: true } });
  });

  CandidateModel = mongoose.model('Candidate', CandidateSchema);
  return CandidateModel;
};
