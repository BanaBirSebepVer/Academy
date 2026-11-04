---
ref: haber-portali-yaratma
lang: tr
layout: page
title: "Haber Portalı Yaratma - Ders Notları"
permalink: /dersler/haber-portali-yaratma/haber-portali-yaratma-ders-notlari/
active_nav: haber-portali-yaratma-ders-notlari
discord: "http://discord.gg/ar8aq7u6zN"
teams: ""
whatsapp: ""
telegram: ""
slack: ""
zoom: ""
email: "can@canbekcan.com"
---

## Haber Portalı Yaratma

### Doğu Akdeniz Üniversitesi İletişim Fakültesi Yeni Medya ve Gazetecilik Bölümü

## YMGA107 - 2026-27 Güz Dönemi Grupları

## Grup 1

Adem Görkem Fidanboy

Simla Görgü

Ediz Tekinalp

Ramazan Hakkı Kabakçıoğlu

Yusuf Selim Kaya

Melikşah Köse

## Grup 2

Kayra Kesin

Simay Altan

Sedanur Akkaya

Merve Cömertel

Eylül Naz Kılınç

Tunahan Tuna

## Grup 3

Yiğit Eren Silinmez

Batuhan Batu

Naz Alkan

Halil İbrahim Öz

İbrahim Arda Demir

Mehmet Mert Çamlı

## Grup 4

Zeynep Nazlı Erdil

Eylül Fidan

Azrabade Gökmen

Mert Yangöl

Hanife Çakmak

İltan Yalçın

## Grup 5

Ezgi Ezer

Yağmur Borazancı

Hatice Naz Adlun

Berk Berimoğlu

Yunus Yusupov

Pena Palvanov

## Grup 6

Nehir Kamer

Oğuzhan Külah

Mert Ege Bakan

Naz Türkoğlu

Sıla Zeybek

Shatlyk Jumadurdyyev

## Adım 1

Herhangi bir alan adı (domain) satıcısından kendinize ait alan adınızı almanız gerekiyor. Maliyetler servis sağlayıcılara göre değişiklik gösterebilir.

İkinci dersten önce alan adınızı almadıysanız ve öğrenci numaranızla sitenize giriş yapıyorsanız, alan adınızı aldıktan sonra Adım 2’ye geçin.

## Adım 2

Alan adınızı aldığınız servisten DNS ayarlarını NS1 için **ns1.bbsv.com.tr**, NS2 için **ns2.bbsv.com.tr** olarak düzenlemeniz gerekiyor.

DNS onaylama işlemi biraz zaman alabilir, beklemeniz gerekiyor.

## Adım 3

Dosyalarınızı yükleyebilmeniz için sunucuya ihtiyacınız var. Bu sebepten, bu dersi alan bütün öğrencilerin kullanacağı ortak sunucuya dahil olabilirsiniz veya kendinize bir sunucu alabilirsiniz, ancak kendi sunucunuzu alırsanız YÖK için hazırlanacak belgeler için beni sistemde yönetici olarak tanımlamanız gerekmektedir.

Eğer ortak sunucuya dahil olmak isterseniz öğrenci e-postanıza gönderilmiş bilgiler doğrultusunda ortak sunucu için payınıza düşen ödemeyi yapmanız gerekmektedir. Bu bilgiler ayrıca [Discord sunucusu’](http://discord.gg/ar8aq7u6zN)nda da paylaşıldı.

Sunucu kullanıcı bilgileriniz derse katılan öğrencilerin öğrenci bilgileriyle açılarak bağlantılar için gerekli olan bilgiler epostalarına gönderildi. Öğrenci e-posta adresinizi kontrol ederek sunucu bağlantı bilgilerinize ulaşabilirsiniz. e-Postayı gelen kutusunda bulamazsanız istenmeyenler klasöründe bulabilirsiniz.

WordPress sunucuları **kabul edilmemektedir**.

## Adım 4

Sunucudaki yönetici paneline giriş yapmak için iki yöntem bulunuyor.

### Birinci Yöntem

Kendi alan adınız bulunuyorsa alan adınızın sonuna **2082** port numarasını girerek yönetici panelinin girişine ulaşabilirsiniz. URL adresi **alanadınız:2082** olacak şekilde yazılmalıdır. Bağlantı bilgilerini öğrenci e-posta adresine gelen mesajdan bulabilirsiniz.

Eğer alan adınızı ikinci dersten sonra aldıysanız ikinci yöntemi kullanmanız gerekecek.

### İkinci Yöntem

Yönetici paneline bağlanabilmek öğrenci e-posta adresinize gelen bilgilerle, tarayıcınızda **bbsv.com.tr:2082** uzantısını açarak giriş yapabilirsiniz.

## Adım 4 - Ek olarak (yeni alan adı alanlar için)

Yeni alan adınızı sunucuda tanımlamanız gerekiyor. Bunun için **Hesap Yönetimi > Etki alanı ayarları**‘nı açıp **Yeni ekle** diyerek aldığınız alan adınızı yazmanız gerekiyor.

## Adım 5

Site kodlarını sunucuya yükleyebilmek için  **Sistem bilgileri ve dosyalar > Dosya yöneticisi**‘ni açmanız gerekiyor. Doğru dosya yolunu bulmanız ve dosyaları oraya aktarmanız gerekiyor. Açılan yeni sekmede **domains > alanadınız > public_html** klasörünü açmanı gerekiyor. Sıkıştırılmış dosyanızı (**.zip** veya **.rar**) sürükleyip bu alana bırakmanız gerekiyor.

Dosya yöneticisi tarayıcı içerisinde **public_html** klasörünün içerisine **klasör taşımanıza izin vermez**. Bu sebepten, yüklenecek dosyaları sıkıştırmamız gerekiyor.

Sıkıştırılmış dosyası yükledikten sonra tarayıcı içerisinde dışa aktarmamız (extract) gerekiyor. İşlem tamamlanınca yeni bir klasör oluşacak. Bu klasörü açıyoruz ve içerisinde bütün dosyaları seçiyoruz, ardından sağ tıklayarak **Şuraya kopyala/taşı** diyoruz. Karşımıza dosya yolunu gösteren bir pencere çıkacak ve oradaki son klasörün bilgisini siliyoruz (**domains/alanadınız/public_html/** şeklinde olması gerekiyor).

Bunları yaptıktan sonra yeni bir sekmede kendi alan adımızı (sitemizi) açıyoruz ve kurulum ekranına geliyoruz.

## Adım 6

Kayıtlarımız için veri tabanı oluşturmamız gerekiyor. Bunun için sunucu içerisinde işlem yapıyoruz.

Sunucu yönetim panelini açıyoruz ve **Hesap yönetimi > Veri tabanları**‘na gidiyoruz. Veri tabanımız için bir isim veriyoruz ve Ekle diyoruz. Karşımıza gelen ekrandaki bilgileri bir yere kayıt ediyoruz. Ardından, diğer sekmedeki sitemize dönerek aldığımız bilgilerle sitemizin kurulumunu yapmaya başlayabiliriz.

Bu işlem, veri tabanıyla kodlar arasında bağlantı kurarak yayınladığınız içerikleri kaydetmek için gerekli

## Adım 7

Site bağlantınız kurulduktan sonra sitenizin bilgilerini gireceğiniz ve kendi kullanıcı adınızla şifrenizi belirleyebileceğiniz sayfa açılacak. Burada kullanıcı adınızı ve şifrenizi siz belirleyeceksiniz.

[Haber Portalı Yaratma](https://www.canbekcan.com/lessons/haber-portali-yaratma/)
