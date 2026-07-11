scp -r . deploy@195.19.12.81:/var/www/matters-lab/matters-backend
pm2 start ./matters-backend/src/main.js --name matters-backend
   ssh deploy@195.19.12.81

   rsync -avz --exclude='node_modules' --exclude='.git' ./ deploy@195.19.12.81:/var/www/matters-lab/matters-backend/


   rsync -avz --exclude='node_modules' --exclude='.git' ./ deploy@195.19.12.81:/var/www/matters-lab/matters-frontend/



vps
+ https://rdp-onedash.ru/#prices
+ https://cloud.estt.ru/