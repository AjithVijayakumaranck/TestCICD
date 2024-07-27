# Navigate to your application directory
cd /dealnbuy

# Pull the latest changes
git pull origin master

# Navigate to server directory and install dependencies
cd Backend
npm install

# Navigate to Socket directory and install dependencies
cd ../Socket
npm install


# Navigate to client directory, install dependencies, and build
cd ../client
npm install
npm run build
rm -rf /var/www/dealnbuy/*
mkdir /var/www/dealnbuy/client
cp -r build/* /var/www/dealnbuy/client


# Restart your application (assuming you use PM2 or a similar process manager)
pm2 restart all --update-env