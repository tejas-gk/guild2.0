# Use the official Node.js image as the base image
FROM node:16-alpine

# Set the working directory to /src
WORKDIR /src

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code to the container
COPY . .

# Build the Next.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV DATABASE_URL=mongodb+srv://tejas:nishant@cluster1.fd0kqlo.mongodb.net/guild
ENV NEXTAUTH_JWT_SECRET=secret
ENV NEXTAUTH_SECRET=secret
ENV GITHUB_ID=4167bdaf0ae576b1a13d
ENV GITHUB_SECRET=e53fcaa111c0419e4b6c38246a1341a975771159
ENV GOOGLE_CLIENT_ID=4167bdaf0ae576b1a13d
ENV GOOGLE_CLIENT_SECRET=e53fcaa111c0419e4b6c38246a1341a975771159

# Start the application
CMD ["npm", "start"]
