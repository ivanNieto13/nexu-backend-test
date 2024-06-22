import 'dotenv/config';
import { app } from './app';
import { config } from 'dotenv';
import { getClient } from './db/db.client';

const run = async () => {
  config();
  try {
    await getClient().connect();
    app.listen(Number(process.env.PORT), String(process.env.HOSTNAME), Number.MIN_VALUE, () => {
      console.log(`app running on ${process.env.HOSTNAME}:${process.env.PORT}`);
    })
  } catch (err) {
    console.error(err);
  }
};

run();
