git checkout -b gh-page
yarn run build
cd dist
git init 
git add -A 
git commit -m 'New Deployment'
git push git@github.com:sangmin4208/sangmin4208.github.io.git main:gh-page -f
cd .. 
git checkout main -f
git branch -D gh-page