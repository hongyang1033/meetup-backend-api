import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLenght: [6, 'Name must be present and at least 5 characters long']
  },
  description: {
    type: String,
    required: true,
    minLenght: [20, 'Name must be present and at least 20 characters long']
  },
  eventDate: {
    type: Date
  },
  category: {
    type: String
  },
  meetups: [{
    type: Schema.Types.ObjectId,
    ref: 'Meetup'
  }]
}, { timestamps: true });

GroupSchema.statics.addMeetup = async function (id, args) {
  const Meetup = mongoose.model('Meetup');

  const meetup = await new Meetup({ ...args, group: id });

  const group = await this.findByIdAndUpdate(id, { $push: { meetups: meetup.id } });

  return {
    meetup: await meetup.save(),
    group
  };
};

export default mongoose.model('Group', GroupSchema);
