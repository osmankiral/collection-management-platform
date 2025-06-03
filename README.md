🛠 Ortam Değişkenleri Hakkında Bilgilendirme
Projeyi klonladığınızda .env.local dosyası .gitignore kapsamında olduğundan projeyle birlikte gelmez. Bu nedenle proje ilk açıldığında gerekli ortam değişkenleri olmadan çalışmaz. Bu durum, projenin son teslim tarihinden sonra fark edilmiştir. Teslim süresi sona erdiğinden projede güncelleme yapılmamıştır. Ancak aşağıdaki iki çözüm yolundan biriyle projeyi sorunsuz çalıştırabilirsiniz:

✅ Çözüm 1 – Manuel .env.local Dosyası Oluşturmak
Proje kök dizinine bir .env.local dosyası oluşturup aşağıdaki içeriği yapıştırın:

NEXT_PUBLIC_API_BASE_URL=https://maestro-api-dev.secil.biz/

NEXTAUTH_SECRET=L8f9rN6qVz5JXwBhPk3YtZsRwDgU0aCm

Bu dosya sayesinde Next.js uygulaması gerekli environment değişkenlerine erişebilir ve sorunsuz çalışır.

✅ Çözüm 2 – docker-compose.yml Dosyasını Güncellemek
Eğer projeyi Docker ile ayağa kaldırıyorsanız, docker-compose.yml dosyasındaki ilgili servise aşağıdaki environment değişkenlerini ekleyin:

services:
  nextjs:
    build: .
    container_name: nextjsgit-app
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXTAUTH_SECRET=L8f9rN6qVz5JXwBhPk3YtZsRwDgU0aCm
      - NEXT_PUBLIC_API_BASE_URL=https://maestro-api-dev.secil.biz/
      
Bu yöntem sayesinde .env.local dosyasına ihtiyaç olmadan, environment değişkenleri doğrudan Docker container’ına aktarılır.

