
# JavaScript ile CRUD Application

![Uygulama Resmi](https://r.resimlink.com/fagN7o-.png)

## Uygulamaya genel bakış

Uygulama JavaScript programlama dili ile geliştirilerek yapılmış bir **CRUD** (Create, Read, Update, Delete) Application'dır. Yani uygulamaya veri ekleme, okuma, silme, güncelleme gibi standart işlemler kolaylıkla yapılabilir.

Ayrıca uygulamada yapılan değişiklikler Local Storage'de kaydedilmektedir. Bu sayede uygulama yeniden başlatılsa dahi yapılan işlemler kaybolmayacaktır.

## Uygulamanın kullanımı

Uygulamada 4 adet **Invoked Function** bulunmaktadır. Bunlar **SeedApplication, UIControl, ButtonControl** ve **StorageControl** şeklindedir. Kullanım amaçları aşağıda verilmiştir.

* **SeedApplication:** Uygulama ilk açıldığında yapılacak işlemleri barındırmaktadır. Örneğin; Bilgilerin ekrana yazılması, Fonksiyonların çağırılması.

* **UIControl:** Kullanıcı arayüzü katmanıdır. Yapılan işlemlerin ekranda gösterilmesiyle ilgili işlemler yapılmıştır. Örneğin; verilerin ekranda gösterilmesi, veya kullanıcıya mesaj gösterilmesi.

* **ButtonControl:** Edit butonuna tıklanıldığında gerçekleşecek işlemler yapılmıştır. Örneğin; veri silme, veri güncelleme.

* **StorageControl:** Local Storage ile ilgili **CRUD** (Create, Read, Update, Delete) işlemleri yapıldı.
