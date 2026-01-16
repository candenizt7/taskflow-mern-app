const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`MongoDB Bağlandı: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Bağlantı Hatası: ${error.message}`);
        process.exit(1); // Hata varsa sunucuyu durdur
    }
};

module.exports = connectDB;