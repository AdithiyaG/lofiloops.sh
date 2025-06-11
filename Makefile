GIT_COMMIT_HASH=$$(git rev-parse --short HEAD)
DockerImage=asia-south1-docker.pkg.dev/sounish-cloud-workstation/sounish-cloud-workstation/lofiloops.sh

.PHONY: build-docker-img
build-docker-img:
	echo "Building Latest Docker image"
	docker build --platform linux/amd64 -t $(DockerImage):$(GIT_COMMIT_HASH) -f Dockerfile .

	echo "Authenticating the Google Artifact registry"
	gcloud auth configure-docker asia-south1-docker.pkg.dev

	echo "Preparing to push the docker image"
	docker push $(DockerImage):$(GIT_COMMIT_HASH)


.PHONY: deploy
deploy: build-docker-img
	echo "Deploying the latest docker image to Google cloud run"
	gcloud run deploy lofiloops \
	--image="$(DockerImage):$(GIT_COMMIT_HASH)" \
	--allow-unauthenticated \
	--port=80 \
	--service-account=797087556919-compute@developer.gserviceaccount.com \
	--max-instances=3 \
	--region=asia-south1