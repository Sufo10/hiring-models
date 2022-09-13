const shortid = require('shortid');

let InterviewModel = null;

module.exports = mongoose => {
  if(InterviewModel) return InterviewModel;

  const FeedbackSchema = new mongoose.Schema({
    HRFeedback: {
      type: String,
      trim: true,
    },
    interviewerFeedback: {
      type: String,
      trim: true,
    },
  });

  const InterviewSchema = new mongoose.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      CandidateId: String,
      Interviewer: {
        type: String,
        ref: 'User',
        required: [true, "can't be blank"],
      },
      HR: {
        type: String,
        ref: 'User',
        required: [true, "can't be blank"],
      },
      OrganizationId: String,
      InterviewDate: {
        type: String,
        trim: true,
      },
      InterviewTime: {
        type: String,
        trim: true,
      },
      feedback: FeedbackSchema,
      isDeleted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true }
  );

  InterviewSchema.pre('find', function () {
    this.where({ isDeleted: { $ne: true } });
  });

  InterviewModel = mongoose.model('Interview', InterviewSchema);
  return InterviewModel;
}

