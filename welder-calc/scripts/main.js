(function () {
    var mod = $('.tin');
    var btnCalc = $('.btn-calc');

    btnCalc.on('click', function () {
        calc();
    });

    function calc() {
         // Chiều dài cây sắt
        var doDaiCaySat = 600;
        // Kích thước sắt 2x4
        var chieuNgangCaySat = 4;
        // Kích thước sản phẩm
        var doDaiSanPham = 100;
        var chieuCaoSanPham = 100;
        // Khoảng hở giữa các cây sắt
        var khoangHo = 10;
        // Số cây sau khi cắt
        var soSatSauKhiCat = (doDaiCaySat / chieuCaoSanPham).toFixed(2);
        var ketQua = soSatSauKhiCat;

        mod.html(ketQua);

        // khung 100 cao 50 hở 10
    }
})();


170
5
12

170/12=14.16 
trừ 2.5 đầu và 2.5 cuối 14.16 - 5 = 9.16
12 cây nhân 110 cao = 1320 dọc + 340 ngang / 600 = 2.76 cây


