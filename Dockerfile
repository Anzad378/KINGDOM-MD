FROM node:lts-buster
RUN git clone https://github.com/Anzad378/KINGDOM-MD./root/anzad_md
WORKDIR /root/anzad_md
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]
