namespace = "prodction"
serviceName = "barca-review"
service = "Barca Review"

pipeline {
  agent {
    label "Jenkins-Agent"
  }

  tools {
    nodejs "NodeJs"
    dockerTool "Docker"
  }

  enviroment {
    DOCKER_CREDENTIALS = credentials("dockerhub")
    IMAGE_NAME = "joseph0926" + "/" + "barca-review"
    IMAGE_TAG = "stable-${BUILD_NUMBER}"
  }

  stages {
    stage("Cleanup Workspace") {
      steps {
        cleanWs()
      }
    }

    stage("Prepare Enviroment") {
      steps {
        git branch: "main", credentialsId: "github", url: "https://github.com/joseph0926/Barca-Market.git"

        dir("packages/review-service") {
          sh "npm install"
        }
      }
    }
  }
}