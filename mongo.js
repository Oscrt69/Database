Use WarungPakBudi_5027241053;

//buat 3 koleksi
db.produk
db.transaksi
db.pelanggan

// mencari kategori minuman dengan stok kurang dari 10
db.produk.find({
  kategori: "Minuman",
  stok: { $lt: 10 }
});

// Tampilkan data pelanggan “Siti Aminah”
db.pelanggan.find({
  nama_pelanggan: "Siti Aminah"
});

