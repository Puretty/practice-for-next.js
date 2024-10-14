# practice-for-next.js

...

1. git clone 

2. yarn install

3. yarn build 

4. local : docker-compose -f docker-compose.local.yml up --build <br>
    prod : docker-compose -f docker-compose.production.yml up --build

=== DB ===

init 

local : yarn prisma-local-migrate-init <br>
prod : yarn prisma-prod-migrate-init

modify

local : yarn prisma-local-migrate "content of modification" <br>
prod : yarn prisma-prod-migrate "content of modification"