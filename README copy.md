scp -r . deploy@195.19.12.81:/var/www/matters-lab/matters-backend
pm2 start ./matters-backend/src/main.js --name matters-backend

   ssh deploy@195.19.12.81
   ssh root@195.19.12.81

   rsync -avz --exclude='node_modules' --exclude='.git' ./ deploy@195.19.12.81:/var/www/matterslab/matters-backend/


   rsync -avz --exclude='node_modules' --exclude='.git' ./ deploy@195.19.12.81:/var/www/matterslab/matters-frontend/


конфиг nginx
   sudo nano /etc/nginx/sites-available/matterslab.ru



vps
+ https://rdp-onedash.ru/#prices
+ https://cloud.estt.ru/


sudo /usr/bin/mv /etc/apt/apt.conf.d/*packagekit* /etc/apt/apt.conf.d/00-disabled-packagekit.bak 2>/dev/null
sudo /usr/bin/mv /etc/apt/apt.conf.d/*update-notifier* /etc/apt/apt.conf.d/00-disabled-update-notifier.bak 2>/dev/null
sudo /usr/bin/mv /etc/apt/apt.conf.d/99-ubuntu-virt.conf /etc/apt/apt.conf.d/99-ubuntu-virt.conf.bak 2>/dev/null