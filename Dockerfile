# Koristi node baziranu sliku
FROM node:14

# Postavi radni direktorijum u kontejneru
WORKDIR /app

# Kopiraj package.json i package-lock.json
COPY package*.json ./

# Instaliraj dependencies
RUN npm install

# Kopiraj ostale fajlove
COPY . .

# Otvori port
EXPOSE 5000

# Pokreni aplikaciju
CMD ["npm", "start"]
