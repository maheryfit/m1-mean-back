docker stop redis-cache
docker stop app-server-cont
docker stop mongo-cont

docker network remove mern-app
docker volume remove mongo_db_refacto