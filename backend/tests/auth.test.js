const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

describe('Kimlik Doğrulama (Auth) Testleri', () => {
    afterAll(async () => {
        await User.deleteMany();
        await mongoose.connection.close();
    });

    it('Yeni bir kullanıcı başarıyla kayıt olabilmeli', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@auth.com',
                password: 'password123'
            });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('token');
    });

    it('Yanlış şifre ile giriş denendiğinde 401 hatası vermeli', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@auth.com',
                password: 'yanlis-sifre'
            });
        expect(res.statusCode).toBe(401);
    });
});