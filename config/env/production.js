'use strict';

module.exports = {
  //db: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/heroku_app35133957',
  //db: 'mongodb://heroku_app35133957:3t7kom4vg7jaa8eskl02r924nn@ds053877.mongolab.com:53877/heroku_app35133957',
  db: 'mongodb://blyssy:blyss001@ds031751.mongolab.com:31751/heroku_scxc0vzl',
  /**
   * Database options that will be passed directly to mongoose.connect
   * Below are some examples.
   * See http://mongodb.github.io/node-mongodb-native/driver-articles/mongoclient.html#mongoclient-connect-options
   * and http://mongoosejs.com/docs/connections.html for more information
   */
  dbOptions: {
    /*
    server: {
        socketOptions: {
            keepAlive: 1
        },
        poolSize: 5
    },
    replset: {
      rs_name: 'myReplicaSet',
      poolSize: 5
    },
    db: {
      w: 1,
      numberOfRetries: 2
    }
    */
  },
  app: {
    name: 'MEAN - A Modern Stack - Production'
  },
  logging: {
    format: 'combined'
  },
  facebook: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: 'CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  github: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
  google: {
    clientID: 'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  linkedin: {
    clientID: 'API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  emailFrom: 'lyssybrian2@gmail.com', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'gmail',
    auth: {
      user: 'lyssybrian2@gmail.com',
      pass: 'PASSWORD'
    }
  }
};
