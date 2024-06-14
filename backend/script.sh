docker run -v mtx_vol:/data/db --name mtx_db --network mtx_ntw -p 27017:27017 mongo
docker run -p 3000:3000 \
  -e Mongo_URL="mongodb://mtx_db:27017/MoneyTransferX" \
  -e JWT_Secret="NITJ25" \
  --name mtx_backend \
  --network mtx_ntw \
  moneytransferxbackend:v1
 docker run -p 4000:4000 --network mtx_ntw  moneytransferxfrontend:vdoc