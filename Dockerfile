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
ENV DATABASE_URL="mongodb+srv://tejas:zoro_@cluster1.fd0kqlo.mongodb.net/guild"
ENV NEXTAUTH_JWT_SECRET="secret"
ENV NEXTAUTH_SECRET="secret"
ENV GITHUB_ID="4167bdaf0ae576b1a13d"
ENV GITHUB_SECRET="e53fcaa111c0419e4b6c38246a1341a975771159"
ENV NEXT_PUBLIC_PUSHER_APP_ID="1601390"
ENV NEXT_PUBLIC_PUSHER_APP_KEY="6cb06a8d2e5de44e71bf"
ENV NEXT_PUBLIC_PUSHER_SECRET="e1ad40daae5f1cf1a23c"
ENV NEXT_PUBLIC_PUSHER_CLUSTER="ap2"

# Build the Next.js application
RUN npm run build

# Run the Next.js application
CMD ["npm", "start"]
