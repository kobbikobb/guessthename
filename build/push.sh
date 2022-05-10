echo "Pushing images to dockerhub"

COMMIT=$(git rev-parse --verify HEAD)
echo "Pushing image with commit #$COMMIT"


docker login 
docker push kobbikobb/guessthename_api:$COMMIT
docker push kobbikobb/guessthename_frontend:$COMMIT

echo "Pushed all images to dockerhub"
