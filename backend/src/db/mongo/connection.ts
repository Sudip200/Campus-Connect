import mongoose, { ConnectionOptions } from 'mongoose';

import logger from '../../logger';
import { Password } from '../../services/password';
import User from '../../models/User';
import { email } from 'envalid/src/envalid';
import bcrypt from 'bcrypt';
import config from '../../config/config';

/**
 * Mongoose Connection Helper
 * Connects to mongodb reliably with retries
 */
export default class MongoConnection {
  private mongoUrl: string;
  private onConnectedCallback: Function;
  private isConnectedBefore = false;
  private connectionOptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true,
  };

  /**
   * @param mongoUrl MongoDB connection url example: mongodb://localhost:27017/books
   */
  constructor(mongoUrl: string) {
    this.mongoUrl = mongoUrl;
    mongoose.connection.on('error', this.onError);
    mongoose.connection.on('disconnected', this.onDisconnected);
    mongoose.connection.on('connected', this.onConnected);
    mongoose.connection.on('reconnected', this.onReconnected);
  }

  /**
   * Close connection to MongoDB
   * @param onClosed `err` passed as first argument in callback if there was an error while disconnecting
   */
  public close(onClosed: (err: Error) => void) {
    logger.info('Closing the MongoDB conection');
    mongoose.connection.close(onClosed);
  }

  /**
   * Attempt to connect to Mongo
   * @param onConnectedCallback Function to be called when connection is extablished
   */
  public connect(onConnectedCallback?: Function) {
    if (onConnectedCallback) {
      this.onConnectedCallback = onConnectedCallback;
    }
    mongoose.connect(this.mongoUrl, this.connectionOptions);
    mongoose.set('toJSON', { versionKey: false, virtuals: true });
    mongoose.set('toObject', { versionKey: false, virtuals: true });
  }

  /**
   * `onConnected` callback for mongoose
   */
  private onConnected = () => {
    this.isConnectedBefore = true;
    // one time mongoose connection configuration 
    // Bulk insert students
    const students = [
      { name: 'TAPOMOY GIRI', rollNumber: '27600122008' },
      { name: 'NISHANTA MAJUMDER', rollNumber: '27600122013' },
      { name: 'SNEHASISIH MONDAL', rollNumber: '27600122012' },
      { name: 'ARUNABHA CHATTERJEE', rollNumber: '2760012201' },
      { name: 'RAJA KUMAR', rollNumber: '27600120015' },
      { name: 'AFZAL KARIM', rollNumber: '27600121125' },
      { name: 'REHAN FAZAL', rollNumber: '27600121138' },
      { name: 'TRIDEV KUMAR PANDIT', rollNumber: '27600121134' },
      { name: 'MD MAAZ ALAM', rollNumber: '27600121186' },
      { name: 'SAROJ KUMAR', rollNumber: '27600121179' },
      { name: 'ANKIT KUMAR SHAW', rollNumber: '27600121088' },
      { name: 'DISHANTA KUMAR PANDA', rollNumber: '27600121089' },
      { name: 'IMAN PAUL', rollNumber: '27600121090' },
      { name: 'SANKHA ADAK', rollNumber: '27600121009' },
      { name: 'DEBANGSHU SAHA', rollNumber: '27600122015' },
      { name: 'MANYA RAI', rollNumber: '27600122018' },
      { name: 'WASIM SHEKH', rollNumber: '27600120042' },
      { name: 'CHANDAN KUMAR RAM', rollNumber: '27600122017' },
      { name: 'ATUL KUMAR', rollNumber: '27600121231' },
      { name: 'ANUBHAB DUTTA', rollNumber: '27600122016' },
      { name: 'SANJANA HAZRA', rollNumber: '27600121045' },
      { name: 'PRITHWISH HALDAR', rollNumber: '27600121047' },
      { name: 'AKASH PRADHAN', rollNumber: '27600121041' },
      { name: 'DWIPAYAN HALDER', rollNumber: '27600121048' },
      { name: 'SOUMYADIP SHI', rollNumber: '27600121078' },
      { name: 'PRIYANSHU PRASAD GUPTA', rollNumber: '27600121024' },
      { name: 'POUSHIL DHALI', rollNumber: '27600121155' },
      { name: 'RAJPRAKASH BEHERA', rollNumber: '27600121097' },
      { name: 'SOUMYA GANGULY', rollNumber: '27600121153' },
      { name: 'SAIKAT KARMAKAR', rollNumber: '27600121066' },
      { name: 'ANISH KOLEY', rollNumber: '27600121011' },
      { name: 'DEBOJYOTI MAHESH', rollNumber: '27600121002' },
      { name: 'PRASHANT SHAW', rollNumber: '27600121029' },
      { name: 'VIKASH KUMAR YADAV', rollNumber: '27600121168' },
      { name: 'ZAID KALAM', rollNumber: '27600221009' },
      { name: 'AYAN DE', rollNumber: '27600121033' },
      { name: 'UJJAL MANNA', rollNumber: '27600121036' },
      { name: 'RITARSHI CHAKRABORTY', rollNumber: '27600121037' },
      { name: 'SOUVIK MONDAL', rollNumber: '27600121061' },
      { name: 'SOVAN BAKSHI', rollNumber: '27600121053' },
      { name: 'NISHA PRASAD', rollNumber: '27600121038' },
      { name: 'LANANYO SAHA', rollNumber: '27600121032' },
      { name: 'ANUPAM SARKAR', rollNumber: '27600121054' },
      { name: 'IMD AFZAL', rollNumber: '27600121116' },
      { name: 'MD. TAABISH NASIM', rollNumber: '27600121073' },
      { name: 'RISHI KUMAR DAS', rollNumber: '27600121062' },
      { name: 'RONIT KUMAR DAS', rollNumber: '27600121010' },
      { name: 'BITTU KUMAR', rollNumber: '27600121143' },
      { name: 'SAHBAZ AHMAD', rollNumber: '27600121137' },
      { name: 'RISHI RAJ BURNWAL', rollNumber: '27600121142' },
      { name: 'MD NABIL AHMED', rollNumber: '27600121169' },
      { name: 'ANUJ KUMAR PANDEY', rollNumber: '27600121128' },
      { name: 'ANJALI KUMARI', rollNumber: '27600121121' },
      { name: 'MOHAMMAD JAIF ALAM', rollNumber: '27600121099' },
      { name: 'MD SHAHADAT SIDDIQUE', rollNumber: '27600121105' },
      { name: 'MD MODDASIR', rollNumber: '27600120065' },
      { name: 'MD WAQUAR ALI RAZA', rollNumber: '27600121129' },
      { name: 'MD SARIM KHAN', rollNumber: '27600121133' },
      { name: 'OVAIS FEROAZ', rollNumber: '27600221053' },
      { name: 'ARPAN KUMAR', rollNumber: '27600121082' },
      { name: 'SOUMYAJIT DAS', rollNumber: '27600121005' },
      { name: 'ARIJIT PAYNE', rollNumber: '27600121015' },
      { name: 'RISHAB SEN', rollNumber: '27600121019' },
      { name: 'ANKANENDU MONDAL', rollNumber: '27600121035' },
      { name: 'PRIYASH DAS', rollNumber: '27600121070' },
      { name: 'SK MD ABDUL BARI', rollNumber: '27600122005' },
      { name: 'AMIR FAHAD KHAN', rollNumber: '27600122009' },
      { name: 'ARUNAVA MAITY', rollNumber: '27600122007' },
      { name: 'GAUTAM KUMAR RAY', rollNumber: '27600122010' },
      { name: 'NAHID NASIM', rollNumber: '27600122020' },
    ];

    const sections = ['A', 'B', 'C'];

    const studentDocs = students.map((s, i) => ({
      name: s.name,
      email: `${s.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${s.rollNumber}@example.com`,
      password: 'Sudip@123',
      role: 'student',
      rollNumber: s.rollNumber,
      year: 4,
      section: sections[i % sections.length],
    }));

    // User.insertMany(studentDocs)
    //   .then(() => {
    //   logger.info('Default students created successfully');
    //   })
    //   .catch((err) => {
    //   logger.error('Error creating default students', err);
    //   });
    // hash default password for all users
    // Import UserRole from your User model or its type definition
    // import { UserRole } from '../../models/User';
    // User.find({role: 'student' as any})
    //   .then(users => {
    //     const updatePromises = users.map(user => {
    //       if (user.password) { // Check if password is not already hashed
    //         let passwordService = new Password(config);
    //         return passwordService.hashPassword("Sudip@123")
    //           .then(hashedPassword => {
    //             user.password = hashedPassword;
    //             return user.save();
    //           });
    //       }
    //       return Promise.resolve(); 
    //     });
    //     return Promise.all(updatePromises);
    //   })
    //   .then(() => {
    //     logger.info('Default students passwords hashed successfully');
    //   })
    //   .catch((err) => {
    //     logger.error('Error hashing default students passwords', err);
    //   });

    this.onConnectedCallback();
  }

  /**
   * `onReconnected` callback for mongoose
   */
  private onReconnected = () => {
    logger.info('Reconnected to MongoDB');
  };

  /**
   * `onError` callback for mongoose
   */
  private onError = () => {
    logger.error(`Could not connect to MongoDB at ${this.mongoUrl}`);
  };

  /**
   * `onDisconnected` callback for mongoose
   */
  private onDisconnected = () => {
    if (!this.isConnectedBefore) {
      logger.info('Retrying MongoDB connection');
      setTimeout(() => {
        this.connect();
      }, 2000);
    }
  };
}
