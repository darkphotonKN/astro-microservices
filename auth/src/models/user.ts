// Mongoose User Model for storing registrated users
import mongoose from 'mongoose';

// interface to describe the properties that are REQUIRED
// to create a new user for the database
interface UserAttrs {
  email: string;
  password: string;
}

// An Interface that describes the properties that a
// User Model has.
// Extending mongoose Model's default interface to include our
// build methods
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): any;
}

// An Interface that describes what properties a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// adding a custom function into our user model,
// "statics" is automatically provided by mongoose's
// schema object instantiations
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};
// above is the alternate version of :
// allowing typescript to type-check the model's properties
// const buildUser = (attrs: UserAttrs) => {
//   return new User(attrs);
// };

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
