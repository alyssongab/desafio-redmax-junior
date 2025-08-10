# Estágio único para desenvolvimento
FROM node:22.14.0-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de manifesto de pacote e instala as dependências
# Isso aproveita o cache do Docker se as dependências não mudarem
COPY package*.json ./
RUN npm install

# Expõe a porta que o servidor de desenvolvimento do Next.js usa
EXPOSE 3000

# O comando para iniciar o servidor de desenvolvimento
# O código-fonte será montado via volume no docker-compose.yml
CMD ["npm", "run", "dev"]