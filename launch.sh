docker volume remove mongo_db_refacto
docker run -d --rm --name mongo-cont -v mongo_db_refacto:/data/db -v $(pwd)/scripts:/scripts -w /scripts -p 27017:27017 --network mern-app mongo mongod --replSet myReplicaSet --bind_ip localhost,mongo-cont

until docker exec mongo-cont mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1
do
    echo -n "."
    sleep 1
done
docker exec mongo-cont mongosh --eval "rs.initiate({_id:\"myReplicaSet\",members:[{_id:0,host:\"mongo-cont\"}]}); load(\"schema-production.js\")"

docker exec mongo-cont mongoimport --db mean_db --collection abonnements --file abonnements.json --jsonArray
docker exec mongo-cont mongoimport --db mean_db --collection services --file services.json --jsonArray
docker exec mongo-cont mongoimport --db mean_db --collection stations --file stations.json --jsonArray
docker exec mongo-cont mongoimport --db mean_db --collection statut_clients --file statut_clients.json --jsonArray
docker exec mongo-cont mongoimport --db mean_db --collection utilisateurs --file utilisateurs.json --jsonArray
docker exec mongo-cont mongoimport --db mean_db --collection niveaux --file niveaux.json --jsonArray
docker exec mongo-cont mongoimport --db mean_db --collection roles --file roles.json --jsonArray
docker exec mongo-cont mongoimport --db mean_db --collection mecaniciens --file mecaniciens.json --jsonArray

docker build -t app-server .

docker run -d --rm --name app-server-cont -v uploads:/app/uploads -p 3000:3000 --network mern-app app-server

docker run -d --rm --name redis-cache -p 6379:6379 -v cache:/data --network mern-app redis:7.4.2-alpine redis-server --save 10 1 --loglevel warning --requirepass eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81