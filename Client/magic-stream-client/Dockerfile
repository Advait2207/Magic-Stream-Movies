FROM node:20-alpine

WORKDIR /app

# Install envsubst
RUN apk add --no-cache gettext

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# CMD ["npm", "run", "dev", "--", "--host"]

CMD sh -c "envsubst < public/env.template.js > public/env.js && npm run dev -- --host"