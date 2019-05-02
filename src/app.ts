import * as express from 'express';
import * as mongoose from 'mongoose';
import { prop, Typegoose } from 'typegoose';

class User extends Typegoose {
  @prop() name?: string;
}
const UserModel = new User().getModelForClass(User);

const app: express.Express = express();
app.get('/users', async (req, res) => {
  res.json(await UserModel.find());
});

import { MongoMemoryServer } from 'mongodb-memory-server';
const m = new MongoMemoryServer();
m.getConnectionString().then((mongoUri) => {
  mongoose.connect(mongoUri, { useNewUrlParser: true });

  const port: string = process.env.PORT || '3000';
  app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}`);
  });
});
