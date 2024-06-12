echo "wait db server"
chmod +x ./wait-for-it.sh
./wait-for-it.sh  $DB_HOST:$DB_PORT

cd frontend
npm run build
cd ../backend

echo "start node server"
npm run prisma
npm run seed
npm run start
