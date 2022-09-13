module.exports = function (mongoose) {
  return {
    Candidate: require('./models/Candidate')(mongoose),
    User: require('./models/User')(mongoose),
    Organization: require('./models/Organization')(mongoose),
    Interview: require('./models/Interview')(mongoose),
  };
};

