FROM node:14

WORKDIR /src

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port that the Next.js application will run on
EXPOSE 3000

# Set environment variables
ENV MONGO_URI="mongodb+srv://tejas:zoro_@cluster1.fd0kqlo.mongodb.net/guild"

# Build the Next.js application
RUN npm run build

# Run the Next.js application
CMD ["npm", "start"]