# Set the base image
FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Copy package.json AND package-lock.json
COPY package*.json ./

# Install all dependencies
RUN npm ci

# Copy the rest of the code
COPY . .

# Expose the port 
EXPOSE 8001
# Define the command that should be executed
CMD [ "npm", "run", "dev" ]

# wrong becoz config.ts is taking key from these env keys
# docker run --rm --publish 8000:8001 -v $HOME/.aws:/root/.aws --env POSTGRESS_HOST=$POSTGRES_HOST --env POSTGRESS_USERNAME=$POSTGRES_USERNAME --env POSTGRESS_PASSWORD=$POSTGRES_PASSWORD --env POSTGRESS_DB=$POSTGRES_DATABASE --env AWS_REGION=$AWS_REGION --env AWS_PROFILE=$AWS_PROFILE --env AWS_BUCKET=$AWS_MEDIA_BUCKET --env JWT_SECRET=$JWT_SECRET --name feed sakshee19/udacity-feed-service

# correct
# docker run --rm --publish 8000:8000 -v $HOME/.aws:/root/.aws --env POSTGRES_HOST=$POSTGRES_HOST --env POSTGRES_USERNAME=$POSTGRES_USERNAME --env POSTGRES_PASSWORD=$POSTGRES_PASSWORD --env POSTGRES_DATABASE=$POSTGRES_DATABASE --env AWS_REGION=$AWS_REGION --env AWS_PROFILE=$AWS_PROFILE --env AWS_MEDIA_BUCKET=$AWS_MEDIA_BUCKET --env JWT_SECRET=$JWT_SECRET --name feed4 sakshee19/udacity-feed-service 