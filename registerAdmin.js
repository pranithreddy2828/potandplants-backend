const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    await User.deleteMany({ phoneNumber: '9999999999' });

    const adminUser = new User({
      phoneNumber: '9999999999',
      password: 'adminpassword123',
      name: 'Admin User',
      role: 'admin'
    });

    console.log('Attempting save...');
    const result = await adminUser.save();
    console.log('Admin user saved:', result);
    
    process.exit(0);
  } catch (err) {
    if (err.name === 'ValidationError') {
      for (let field in err.errors) {
        console.error(`Validation error on field '${field}': ${err.errors[field].message}`);
      }
    } else {
      console.error('Error:', err);
    }
    process.exit(1);
  }
};

createAdmin();
