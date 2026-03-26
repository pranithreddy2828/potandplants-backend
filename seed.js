const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

const products = [
  {
    name: "Vepa (Neem)",
    price: 150.0,
    description: "Highly medicinal tree, natural pesticide, and air purifier common in Telangana and AP.",
    care_instructions: "Full sun • Water regularly until established • Grows into a large tree.",
    image_filename: "vepa.png",
    is_featured: true,
    is_best_seller: true,
    category_id: 2,
  },
  {
    name: "Mamidi (Mango - Banginapalli)",
    price: 450.0,
    description: "The King of Mangoes from Andhra Pradesh. High-quality grafted sapling.",
    care_instructions: "Full sun • Deep watering • Well-drained soil • Fertilize in spring.",
    image_filename: "mamidi.png",
    is_featured: true,
    is_best_seller: true,
    category_id: 2,
  },
  {
    name: "Malle (Jasmine)",
    price: 80.0,
    description: "Fragrant Jasmine flowers, a staple in every Telugu household garden.",
    care_instructions: "Full sun to partial shade • Keep soil moist • Prune after flowering.",
    image_filename: "malle.png",
    is_featured: true,
    is_best_seller: true,
    category_id: 2,
  },
  {
    name: "Banthi (Marigold)",
    price: 40.0,
    description: "Commonly used for festivals like Bathukamma and Sankranti. Easy to grow.",
    care_instructions: "Full sun • Water daily • Deadhead for more blooms.",
    image_filename: "banthi.png",
    is_featured: false,
    is_best_seller: true,
    category_id: 2,
  },
  {
    name: "Mandara (Hibiscus)",
    price: 120.0,
    description: "Beautiful red flowers used for worship and hair care in the Deccan region.",
    care_instructions: "6+ hours of sun • Regular watering • Feed every 2 weeks.",
    image_filename: "mandara.png",
    is_featured: true,
    is_best_seller: false,
    category_id: 2,
  },
  {
    name: "Karivepa (Curry Leaf)",
    price: 60.0,
    description: "Essential aromatic herb for South Indian cuisine. Must-have for the kitchen garden.",
    care_instructions: "Full sun to partial shade • Moderate watering • Pinch tips for bushiness.",
    image_filename: "karivepa.png",
    is_featured: true,
    is_best_seller: true,
    category_id: 2,
  },
  {
    name: "Thulasi (Tulsi / Holy Basil)",
    price: 50.0,
    description: "Sacred plant with medicinal properties, found in almost every Hindu home.",
    care_instructions: "Full sun • Water daily • Do not overwater in winter.",
    image_filename: "thulasi.png",
    is_featured: true,
    is_best_seller: true,
    category_id: 2,
  },
  {
    name: "Kalabanda (Aloe Vera)",
    price: 90.0,
    description: "Hardy succulent with healing gel, thrives well in the dry climate of Telangana.",
    care_instructions: "Bright light • Water only when soil is dry • Well-drained soil.",
    image_filename: "kalabanda.png",
    is_featured: false,
    is_best_seller: true,
    category_id: 1,
  },
  {
    name: "Jama (Guava)",
    price: 180.0,
    description: "Sweet and nutritious fruit tree suitable for home gardens in AP.",
    care_instructions: "Full sun • Regular watering • Prune to maintain shape.",
    image_filename: "jama.png",
    is_featured: false,
    is_best_seller: false,
    category_id: 2,
  },
  {
    name: "Danimma (Pomegranate)",
    price: 220.0,
    description: "Nutritious fruit that grows well in Semi-arid regions like Telangana.",
    care_instructions: "Full sun • Deep watering • Enrich with organic manure.",
    image_filename: "danimma.png",
    is_featured: false,
    is_best_seller: true,
    category_id: 2,
  },
  {
    name: "Munaga (Drumstick / Moringa)",
    price: 70.0,
    description: "Superfood with highly nutritious leaves and pods.",
    care_instructions: "Full sun • Drought tolerant once established • Minimal care.",
    image_filename: "munaga.png",
    is_featured: true,
    is_best_seller: false,
    category_id: 2,
  },
  {
    name: "Usiri (Amla / Indian Gooseberry)",
    price: 140.0,
    description: "Rich in Vitamin C, sacred and medicinal tree of the region.",
    care_instructions: "Full sun • Regular watering when young • Hardy once grown.",
    image_filename: "usiri.png",
    is_featured: false,
    is_best_seller: false,
    category_id: 2,
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB for seeding');

    // Clear existing
    await Product.deleteMany({});
    await User.deleteMany({});

    // Seed Products
    await Product.insertMany(products);
    console.log('Products seeded');

    // Create default Admin
    const adminUser = new User({
      phoneNumber: '9999999999',
      password: 'adminpassword123',
      name: 'Admin User',
      role: 'admin'
    });
    await adminUser.save();
    console.log('Admin user created');

    mongoose.connection.close();
    console.log('Seeding finished. Exiting...');
  } catch (err) {
    console.error(err);
  }
};

seedDB();
