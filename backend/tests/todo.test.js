const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Todo = require('../models/Todo');

describe('Todo Yetkilendirme (Authorization) Testleri', () => {
    
    // Her testten önce DB temizliği
    beforeEach(async () => {
        await User.deleteMany();
        await Todo.deleteMany();
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('Bir kullanıcı, başka bir kullanıcının Todo verisine erişememeli (BOLA)', async () => {
        // 1. User A Kayıt
        const userA = await request(app).post('/api/auth/register').send({ 
            name: 'User A', 
            email: 'usera@test.com', 
            password: 'password123' 
        });
        const tokenA = userA.body.token;

        // 2. User A ile Todo Oluştur (Hata kontrolü ekledik)
        const todoResponse = await request(app)
            .post('/api/todos')
            .set('Authorization', `Bearer ${tokenA}`)
            .send({ title: 'User A Gizli Notu' });
        
        // EĞER BURASI UNDEFINED DÖNERSE TESTİ BURADA PATLATALIM Kİ SEBEBİNİ ANLAYALIM
        expect(todoResponse.status).toBe(201); 
        const todoIdA = todoResponse.body._id;

        // 3. User B Kayıt
        const userB = await request(app).post('/api/auth/register').send({ 
            name: 'User B', 
            email: 'userb@test.com', 
            password: 'password123' 
        });
        const tokenB = userB.body.token;

        // 4. KRİTİK TEST: User B, A'nın ID'si ile sızmaya çalışıyor
        const res = await request(app)
            .get(`/api/todos/${todoIdA}`)
            .set('Authorization', `Bearer ${tokenB}`);

        // SONUÇ: User B bu ID'li todo'yu bulamamalı (404)
        expect(res.statusCode).toBe(404);
    });
});