FROM node:latest

RUN mkdir parse

ADD . /parse
WORKDIR /parse
RUN npm install

ENV APP_NAME Photogram
ENV APP_ID myAppId
ENV MASTER_KEY MasterKey
ENV MASTER_KEY myMasterKey
ENV MASTER_KEY MPhotogramMasterKey

#ENV DATABASE_URI setMongoDBURI

ENV SERVER_URL 'http://photogram.codevibe.io:1337/api'
ENV DASHBOARD_URL '/dashboard'
ENV DASHBOARD_USER 'admin'
ENV DASHBOARD_PASSWORD 'admin123'

# PUSH ANDROID
ENV PUSH_ANDROID_SENDER 285805785383
ENV PUSH_ANDROID_API_KEY 'AIzaSyCBXV7CnhusYV0172lMsvvDy1zHfr96luk'

# MAILGUN
MAILGUN_API_KEY 'key-3a05e956706a4bd579982460b96cf43a'
MAILGUN_DOMAIN 'https://api.mailgun.net/v3/photogramapp.com'
MAILGUN_FROM_ADDRESS 'postmaster@photogramapp.com'

#ENV UPLOAD_LOCAL_PATH MPhotogramMasterKey

# Optional (default : 'parse/cloud/main.js')
# ENV CLOUD_CODE_MAIN cloudCodePath

# Optional (default : '/parse')
ENV PARSE_MOUNT '/parse'

EXPOSE 1337

# Uncomment if you want to access cloud code outside of your container
# A main.js file must be present, if not Parse will not start

# VOLUME /parse/cloud               

CMD [ "npm", "start" ]
