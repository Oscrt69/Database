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

//Tampilkan ringkasan transaksi pada tanggal 22 Mei 2025
db.transaksi.aggregate([
  {
    $match: {
      tanggal_transaksi: {
        $gte: ISODate("2025-05-22T00:00:00"),
        $lte: ISODate("2025-05-22T23:59:59")
      }
    }
  },
  {
    $project: {
      _id: 0,
      tanggal_transaksi: 1,
      total: 1,
      metode_pembayaran: 1
    }
  }
]);

//Daftar kategori
db.produk.distinct("kategori");

//Hitung jumlah pelanggan
db.pelanggan.countDocuments();

// Update stok dan harga beli “Indomie Goreng Spesial”
db.produk.updateOne(
  { nama_produk: "Indomie Goreng Spesial" },
  {
    $inc: { stok: 50 },
    $set: { harga_beli: 2800 }
  }
);

//Tambahan 10 poin untuk pelanggan yang bergabung sebelum 1 Jan 2024
db.pelanggan.updateMany(
  { tanggal_bergabung: { $lt: ISODate("2024-01-01") } },
  { $inc: { poin_loyalitas: 10 } }
);

//Update alamat Pak Budi Hartono
db.pelanggan.updateOne(
  { nama_pelanggan: "Budi Hartono" },
  { $set: { alamat: "Jl. Cendrawasih No. 5, Gresik" } }
);

// Hapus produk “Permen X”
db.produk.deleteOne({
  nama_produk: "Permen X"
});

// Hapus transaksi “Tunai” sebelum tahun 2023
db.transaksi.deleteMany({
  metode_pembayaran: "Tunai",
  tanggal_transaksi: { $lt: ISODate("2023-01-01") }
});

// Total pendapatan per metode pembayaran, urutkan dari terbesar
db.transaksi.aggregate([
  {
    $group: {
      _id: "$metode_pembayaran",
      total_pendapatan: { $sum: "$total" }
    }
  },
  { $sort: { total_pendapatan: -1 } }
]);

// Tiga pelanggan paling sering bertransaksi
db.transaksi.aggregate([
  {
    $group: {
      _id: "$nama_pelanggan",
      jumlah_transaksi: { $sum: 1 }
    }
  },
  { $sort: { jumlah_transaksi: -1 } },
  { $limit: 3 }
]);

// Daftar produk dengan stok < 5, urutkan dari yang tersedikit
db.produk.find(
  { stok: { $lt: 5 } },
  { _id: 0, nama_produk: 1, kategori: 1, stok: 1 }
).sort({ stok: 1 });
