# Getting started with flux

brew install fluxcd/tap/flux
flux check --pre

git checkout -b flux-bootstrap
git push -u origin flux-bootstrap

flux bootstrap github \
 --owner=kobbikobb \
 --repository=guessthename \
 --branch=flux-bootstrap \
 --path=./clusters/my-cluster \
 --personal
