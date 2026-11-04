---
ref: icerik-uretiminin-sonu-yakin
lang: tr
layout: post/single
title: "İçerik üretiminin sonu yakın"
date: 2024-11-17 10:40:40
author: "canbekcan"
categories: ["Genel"]
tags: []
excerpt: "Büyük Dil Modelleri;Large Language Model(LLM), her geçen gün hayatımızın parçası olmaya ve yönlendirmeye devam ediyor. Bunun sonucunda da komplo teorilerinin yanında mantıklı öngörülerin de olduğunu e"
featured_image: "https://canbekcan.com/wp-content/uploads/2024/11/DALL·E-2024-11-17-08.20.34-A-realistic-and-warm-toned-scene-blending-elements-of-an-1800s-library-with-futuristic-technology.-The-setting-includes-a-sleek-wooden-desk-with-a-mod.webp"
---

### Teknoloji bilgiye ulaşımımızı artırdı, peki bu bilginin üretimini bundan sonra kim veya ne yapacak?

```
Bu bir değerlendirme yazısıdır. Kişisel değerlendirmelerime yer verdiğim bu yazımda, benim için başta anlaması zor olan şeyleri sizler için anlaşılabilecek basit yöntemlerle aktarmaya çalışacağım.
```

Büyük Dil Modelleri; *Large Language Model* (LLM), her geçen gün hayatımızın parçası olmaya ve yönlendirmeye devam ediyor. Bunun sonucunda da komplo teorilerinin yanında mantıklı öngörülerin de olduğunu es geçmemek gerektiğini düşünüyorum. Bu değerlendirme yazımda da bu konulara değinme niyetindeyim.

## Büyük Dil Modeli Nedir?

Öncelikle, LLM[[1](#f8fa1298-dd9a-42a6-b048-263cebf8fdac)] nedir ve ne işe yarar ondan kısaca bahsetmek gerekiyor, nihayetinde herkesin bir tarafından bildiği ancak tam olarak anlaşılmadığını düşündüğüm bu önemli noktaya değinmeden geçmemek gerekiyor.

LLM, matematik formülünün metinler üzerine uygulanarak oluşturulmuş bir algoritma dizisi olarak görülmelidir. Algoritmaların çalışma mantığı “eğer bir şey istersem ve sende de o varsa bana ver” ile aynıdır. Buna en basit örnek [Google](http://www.google.com) arama motorudur. Bir şey aramak istediğinizde Google’a yazdığınız metinlerin karşılığı size farklı siteler olarak dönebilmesi için algoritmalara ihtiyaç duyulmaktadır. Algoritmalar ne kadar detaylıysa çıkan sonuçlar da o kadar detaylı ve doğru oluyor. Tabi, algoritmaların detayları sadece kendi hesaplamalarıyla değil hesaplamaları için aldıkları verilerle de güçleniyor. Burada ne demek istediğimi biraz açayım; internet üzerinde yaptığımız her işlem, hali hazırda telefonlarımızda kullandığımız her uygulama bizim verilerimizi topluyor ve bunları arşivliyor. Arşivlenen bilgilerin sonucunda olası ilgi alanları ortaya çıkıyor ve farklı algoritmalar bu ilgi alanlarına ne kadar yatkın olduğumuzu tekrar tekrar ölçerek bizleri kategorilere ayırıyor. Böylece kime nasıl bir arama sonucu çıkaracağını, hatta hangi reklamların gösterileceğini belirliyor.

Biraz daha basit bir örnekle algoritmaların nasıl çalıştığını anlatmak istiyorum. Bu basitleştirme yöntemiyle daha iyi kavradığım için sizin için de farklı bir açıdan değerlendirmenizi sağlamış olacağımı düşünüyorum. Mahallenizdeki bir marketten her gün ekmek almaya gittiğinizde artık market çalışanı sizi tanımaya başlar. Zamanla siz de o da sohbet etmeye başlarsınız. Hatta bazı durumlarda isimlerinizi bilirsiniz. İşte buna bilgi arşivleme diyoruz. Sürekli yaptığınız bir şeyin karşı tarafta bıraktığı iz, kayıt. Bir süre sonra farklı bir markete gitmeye başlarsanız o zaman oranın bilgilerini alır ve kendi bilgilerinizi de oraya verirsiniz. Fakat, önceki market çalışanı sizi unutmayacak, hatta tekrar gördüğünde selam verecektir. Ekmek dışında sürekli aldığınız bir ürün varsa da o ürünü alıp almayacağınızı kontrol edecek ve siz söylemeden o ürünü önünüze koyacaktır. İşte bu bilgi işleme yöntemine dijital ortamda algoritma diyoruz. Bu durumu en çok sosyal medya hesaplarınızda görürsünüz; takip ettiğiniz sayfalara, kişilere, ilgi alanlarınıza göre benzer gönderiler karşınıza çıkıp durur ve sürekli olarak sosyal medyada zaman geçirerek verimli zamanlarınızı bilgilerinizi paylaşarak harcarsınız.

### Algoritma ve LLM

Peki, bu algoritmaların LLM ile alakası nedir? LLM’ler, metinlerin düzenini anlamak için hazırlanmış veri tabanlarıdır, algoritmalar ise bu veri tabanlarından hangi bilgilerin hangi koşullarda alınacağını belirten yazılımlarla oluşturulmuş fonksiyonlardır. İnternette yapacağınız küçük bir araştırma sonucunda LLM algoritmalarının nasıl çalıştığını bulabilirsiniz ancak burada bu konuda teknik bilgiler vermeyeceğim. Herkes tarafından daha anlaşılır bir şekilde algoritmanın nasıl işlediğini aktarmaya çalışacağım.

Bizler, konuşmayı öğrendikten sonra neyi nasıl anlatacağımızı zamanla geliştiriyoruz. Bunun adına da öğrenme diyoruz. Öğrendiğimiz kelimeleri bir dizi halinde konuşuyoruz ve bu şekilde anlaşıyoruz. Genel olarak, aktarmak istediğimiz bir durumu ifade ederken hangi kelimeden sonra hangisinin geleceğini, kelime daarcığımıza göre, hızlıca düşünerek söyleyebiliriyoruz. Bu yazıyı okurken de hangi kelimeden sonra hangi kelimelerin gelebileceğini anlayabiliyorsunuz. Hatta bu şekilde kelime dizileri sizin için bir anlam ifade etmeye başlıyor. Burada kelime dizileri ifadesini kullanmamın sebebi LLM algoritmasının nasıl çalıştığına dair anlatımımın daha kolay anlaşılabilmesi için.

Konudan kopuyormuşum gibi bir izlenime kapılmayın. Hepsini tek tek anlatıyorum ki konuda anlaşılmayan kısımlar kalmasın.

Kelime bazlı çalışan algoritmaların en büyük özelliği çok fazla kelimeyi ve cümleyi hafızalarında bulundurmaları ve onlardan faydalanmaları. Şimdi, bir kelime düşünün ve ardından gelebilecek diğer kelimeleri bir yere yazdığınızı düşünün. LLM algoritmaları bunları saniyeler hatta saliseler içerisinde yaparak hafızasında olan kelimeleri ve cümleleri tarayarak olası kelimeleri ve cümleleri karşımıza çıkarır.

### Buna basit bir örnekle yaklaşalım

“Balık” kelimesinden sonra hangi kelimelerin gelebileceğini düşünelim. Mesela, “yemek” kelimesi gelsin. LLM algoritması “Balık yemek” olarak bir başlangıç ile aramaya başlar sonrasında aynı işlemi “yemek” kelimesiyle yapar ve peşinden “Balık yemek istiyorum” kelime dizisini oluşturabilir. Ardından tekrar bir algoritma ile “Balık yemek istiyorum, nerede yiyebilirim? Bir önerin var mı?” şeklinde kelime dizisi oluşacak şekilde bize bir sonuç verebilir. Tabi, bu sonuç daha önceden hafızasında böyle bir kelime dizisi veya bu kelime dizisine benzer bir kelime dizisi varsa gerçekleşebilir. Bizler nasıl çocukluktan itibaren kelime haznemizi geliştirip konuşmalarımızı daha derinlemesine yapabiliyorsak aynı şekilde LLM algoritmaları da hafızalarında bulunan verilerden faydalanarak bu işlemleri yapabiliyorlar.

Kelime dizileri nasıl oluyor da bizimle iletişim kurarcasına karşılık veriyor, diye düşünebilirsiniz. İşte burada da LLM devreye giriyor. Olası bütün diyaloglar karşılıklı olarak veri olarak yani hafızasında olacak şekilde kayıt ediliyor. Mesela, sabah uyandığımızda evdeki bireyler genellikle “günaydın” diye sesleniriz. Peki, LLM algoritması bunu nasıl yapıyor? Dijital cihazlarımız zamanı dijital ortamda barındırıyor, yani şuan saatinize baktığınızda dijital ortamda olan bu zaman dilimi herhangi bir LLM algoritması için de aynıdır. Eğer, sabah bir LLM’le iletişim kuruyorsanız saati dijital olarak sizin gibi algoritmayla anlayabileceği için “günaydın” mesajını size verecektir. Bu gibi bilgilerin çoğunluğu bir veri bankası içerisinde kayıtlı olduğu için olası bütün kombinasyonlarla kelime dizileri oluşturacaktır.

Anlayacağınız, LLM hali hazırda bizlerin bildikleri şeylerin dijital olarak kayıt altına alınmış halleridir. Algoritmalar ise kayıt altındaki bu bilgilerin kelime dizileri halinde gösterilmesini sağlayan sistemlerdir. İnternet ortamında bir çok LLM bulunmaktadır. Mesela, hukuk alanıyla ilgili bilgilerin bulunduğu LLM’ler bulunmaktadır, aynı şekilde kimya, fizik, matematik, sosyal bilimler vs. bir çok alanda hazılanmış veri bankaları bulunmaktadır. Bunlar, ilgi duyduğumuz alanlarla ilgili sorduğumuz sorulara kelime dizileri halinde bize yanıt verebilmektedir. Farklı LLM’ler için [Huggingface](http://huggingface.co) gibi sitelere bakabilirsiniz.

## İçerik üretimi nasıl son bulacak?

LLM’ler her alanda detaylı verilere sahip olduğunda artık algoritmalar yazılan istem (prompt) ile karşımıza derinlemesine bilgi yığınları koymaya başlayacak. Tabi, bunun etik kısımları bu yazımızın konusu değil. Karşımıza getirilen bilgiler de bireyleri tatmin ettiği derecede ilgi görecek ve bu da başka bir veri olarak LLM’lerin veri tabanlarına kayıt edilecektir. Böylece, büyük bir döngü içerisinde veriler hem kayıt altına alınacak hem de kelime dizileri olarak servis edilecektir. Bu noktada istem yazmanın önemine de dikkat çekmek gerekiyor.

İstem; İngilizce *prompt*, algoritmadan yapmasını istediğiniz şeyi metin tabanlı olarak kendisinden istemenizdir. Farkındaysanız, LLM ve algoritmadan bahsediyorum, yapay zeka olarak değinmiyorum. Bunun nedenine de ileride değineceğim.

İstem, yazma işlemi bir platform[[2](#5a537c2a-218c-4dd6-a87e-9e84200408f1)] veya programlama temelleriyle gerçekleşiyor. Burada kurmuş olduğunuz cümlelerdeki kelime dizileri algoritma tarafından veri tabanında sorgulanıp karşılığı gelen verileri işleyerek geri bildirim yapması sağlanıyor. Böylece, verilerle iletişim kurarak bilgileri karşınıza getirebiliyor. Buna en basit örnek yine arama motoru olan Google olacaktır. Arattığınız kelimeleri Google’ın veri tabanlarında aratarak karşımıza sonuçları çıkartılması en temel örnek. Burada, Google internetten arama yapıyor diye düşünebilirsiniz ancak Google arama motoru algoritmaları listelenmiş siteler içerisinden arama yaparak bizlere sonuç gösterir. Yani, yine bir veri tabanı ve o veri tabanından verilerin alınarak gösterilmesi gerekmektedir. İşte bu noktada, yazılacak istemin temel veya detaylı olması veri tabanındaki bilgilerle ne kadar uyuştuğuyla ilgili olarak karşımıza sonuçlar çıkaracaktır. Eğer, yazdığınız istem yeterli değil veya çok komplike ise karşımıza çıkacak sonuçlar da o derece alakasız olacaktır. Çünkü, algoritma *mantık* yürütmek yerine karşılığı olan verilerden yeni kelime dizileri üretmek üzere programlanmıştır.

### Algoritma etkisi

Bu algoritma içerik üretme konusunda ne gibi bir değişiklik yapacak? İşte, bütün mesele de burada. Algoritma, LLM’ler ne kadar kapsamlı olursa o kadar iyi sonuçlar vermeye başlayacaktır. Daha yeni konuşmayı öğrenen bir çocuğu düşünelim. Nasıl ki başlarda kelimelerle kendini ifade edebiliyorsa büyüdükçe kelime haznesi genişleyecek ve o derece komplike cümleler kuracaktır.

İçeriklerin üretilmesi bizlerin sağladığı içeriklerin veri tabanlarında algoritmalar tarafından işlenerek tekrar bilgi üretmek olarak algılanmamalıdır. Varolan bilginin dönüştürülerek tekrardan sunulması olarak değerlendirilmelidir. Bu ileride yeni bilgi üretimi olarak karşımıza çıkacaktır, işte o zaman yapay zeka ifadesini kullanabiliriz. Yani, dönüştürülmüş bilgi tanımı çok farklı da algılanmamalıdır. Benzer deneyimleri yaşamış olan kişilerin farklı şekillerde bu deneyimi aktarması gibi değerlendirilmeli. Herkes tek bir olayı farklı yönleriyle hatırlayacağı için olay örgüsü, hatta kelime dizisi de ona göre farklılık gösterecektir. Böyle bir durumda, farklı içeriklerin oluşturulması algoritmalar için çok daha kolay olacaktır. Bu konuda aynı istem ile farklı platformlarda yaptığım çalışmanın bir örneğini [Yapay Zekanın Ürettiği İçeriklerin Aynı İstemle Karşılaştırılması](https://www.canbekcan.com/blog/2024/04/15/yapay-zekanin-urettigi-iceriklerin-ayni-istemle-karsilastirilmasi/) yazımda görebilirsiniz.

Algoritmaların kelime dizileri oluşturmasında temel oluşturan LLM’ler geliştikçe ve kapsamları arttıkça bir çok alanda içerik üretimi algoritmalar tarafından yürütülen platformlar ve programlarla gerçekleştirilecek. Neticede, içerik üretimiyle ilişkili çalışmalar yapanların 10 sene içerisinde algoritmaların gerisinde kalacağını öngörüyorum. Bu bir dönüşüm olarak gerçekleşecektir. Başlarda algoritmayla birlikte içeriklerin üretilmesi sağlanacaktır. Algoritmalar ve LLM’ler geliştikçe insan faktörüne gerek kalmadan içeriklerin üretilmesi hatta baştan yaratılması mümkün olacaktır. Bunun ileride ne gibi istihdam sorunları yaratacağıyla ilgili bir çalışma yapılmamakla birlikte toplumların ve devletlerin bu duruma hazırlıklı olmaları gerektiği kanısındayım.

Bu yazımda sadece metin tabanlı algoritmalara değindim. Bunun dışında, dijital görüntü (yüz tanıma, plaka okuma, parmak izi tanıma, vs.) algoritması, optik karakter tanıma (OCR) algoritması ve ses (ASR, STT, Vocal) algoritmasına değinmedim. Bu algoritmalar da aynı metin tabanlı LLM’ler gibi kendi veri tabanları içerisinden tanımlanmış olan verileri alarak yeni verilere dönüştürebilmektedir.

## Sonuç

İçerik üretimi bir dizi işlem gerektiren bir süreçtir. Bu sürecin en temelinde bilgi birikimi gerekir. Bilgi birikimi insanlarda belli sınırlar dahilinde kalmakla birlikte algı yönünden aynı birikim farklı sonuçlar ortaya çıkarabilmektedir. Eğer, algoritmalar ve LLM’ler şimdiki durumlarından ileriye taşınabilirse içerik üretimi tamamen insan tekelinden çıkacaktır. İnsan faktörünün içerik üretiminden ayrıldığı noktada artık istem yazımı da algoritmalar tarafından hazırlanıp bir döngü olarak yapılacaktır. Bilgi işlenip dönüştürülüp tekrar sunulacaktır. Yeni bilgi üretimi gerçekleştirme konusunda algoritmalar insan faktörüne ihtiyaç duyacaklardır ancak yeni bilgi üretebilecek insan sayısı da az olduğu için içerik üretimi çok sınırlı bir insan topluluğunun elinde olacaktır.

Eğer, algoritmalar yeni bilgi üretebilecek mantık kazanırlarsa o zaman yapay zeka üretilmiş olacak ve insandan bağımsız düşünen bir nesne hayata geçirilmiş olacak. Bu durumun fazla bir zaman alacağını düşünmemekle birlikte doğurabileceği sonuçlarla ilgili de öngörülerim bulunmuyor. Kendi kendine mantık yürütebilen algoritma geliştirilirse o zaman insanların dijital ortamlarda pek de yetkin olabileceğini söylemek mümkün olmayacaktır.

Dönüşüm her zaman yenilikleri ve yeni sorunları yanında getirir. Odaklanılması gereken kısımlar bu sorunların nasıl aşılacağı olmalıdır, aksi halde yeniliklerin önüne geçilmesinin mümkünatı olmayacaktır.

---

1. Büyük Dil Modeli. Bu yazıda, LLM olarak değineceğim. [↩︎](#f8fa1298-dd9a-42a6-b048-263cebf8fdac-link)
2. [ChatGPT](https://chatgpt.com), [Gemini](https://gemini.google.com), [CoPilot](https://copilot.microsoft.com), vs. [↩︎](#5a537c2a-218c-4dd6-a87e-9e84200408f1-link)
