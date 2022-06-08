
ME_CONFIG_MONGODB_ADMINUSERNAME=$(grep -Po '(?<=^ME_CONFIG_MONGODB_ADMINUSERNAME=).*$' ~/backend-service-intercept.env)
ME_CONFIG_MONGODB_ADMINPASSWORD=$(grep -Po '(?<=^ME_CONFIG_MONGODB_ADMINPASSWORD=).*$' ~/backend-service-intercept.env)
# We want to expose the server as the host IP so that we can resolve it from outside the cluster
ME_CONFIG_MONGODB_SERVER=$(grep -Po '(?<=^MONGODB_SERVICE_SERVICE_HOST=).*$' ~/backend-service-intercept.env)

echo 'Exporting values:'
echo $ME_CONFIG_MONGODB_ADMINUSERNAME
echo $ME_CONFIG_MONGODB_ADMINPASSWORD
echo $ME_CONFIG_MONGODB_SERVER

export ME_CONFIG_MONGODB_ADMINUSERNAME
export ME_CONFIG_MONGODB_ADMINPASSWORD
export ME_CONFIG_MONGODB_SERVER
