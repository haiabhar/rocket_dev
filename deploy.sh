#!/bin/sh
git pull origin production

echo "Git Pull Done..."

rails assets:precompile RAILS_ENV=production
 
sudo chmod g+s -R .

rails db:migrate RAILS_ENV=production

sudo service httpd restart

echo "Apache restarted... "
