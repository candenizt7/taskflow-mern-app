// READ (Okuma)
Todo.find()              // Tüm dökümanlar
Todo.find({ completed: true })  // Filtreleme
Todo.findById(id)        // ID ile tek döküman
Todo.findOne({ title: "..." })  // İlk eşleşen döküman

// CREATE (Oluşturma)
Todo.create({ title, completed })  // Yeni döküman

// UPDATE (Güncelleme)
Todo.findByIdAndUpdate(id, data, options)  // ID ile güncelle
Todo.updateOne({ title: "..." }, data)    // İlk eşleşeni güncelle
Todo.updateMany({ completed: false }, data)  // Çoklu güncelleme

// DELETE (Silme)
Todo.findByIdAndDelete(id)  // ID ile sil
Todo.deleteOne({ title: "..." })  // İlk eşleşeni sil
Todo.deleteMany({ completed: true })  // Çoklu silme