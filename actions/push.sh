echo "Pushing images to dockerhub"

docker login 
# Consider: deploy only the current commit tag
docker push kobbikobb/guessthename_api --all-tags
docker push kobbikobb/guessthename_frontend --all-tags

echo "Pushed all images to dockerhub"