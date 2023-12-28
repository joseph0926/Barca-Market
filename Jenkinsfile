namespace = "prodction"
serviceName = "barca-review"
service = "Barca Review"

def groovyMethods

m1 = Ststem.currentTimeMillis()

pipeline {
  agent {
    label "Jenkins-Agent"
  }

  tools {
    nodejs "NodeJs"
    dockerTool "Docker"
  }

  environment {
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
        sh "[ -d pipeline ] || mkdir pipeline"
        dir("pipeline") {
          git branch: "main", credentialsId: "github", url: "https://github.com/joseph0926/Barca-Market.git"  
          
          dir("packages/jenkins") {
            script {
              groovyMethods = load("functions.groovy")
            }
          }
        }

        git branch: "main", credentialsId: "github", url: "https://github.com/joseph0926/Barca-Market.git"

        dir("packages/review-service") {
          sh "npm install"
        }
      }
    }

    stage("Lint Check") {
      steps {
        sh "npm lint:check"
      }
    }
    
    stage("Prettier Check") {
      steps {
        sh "npm prettier:check"
      }
    }
    
    stage("Test Check") {
      steps {
        sh "npm run test"
      }
    }
    
    stage("Build and Push") {
      steps {
        sh "docker login -u $DOCKERHUB_CREDENTIALS_USR --password $DOCKERHUB_CREDENTIALS_PSW"
        sh "docker build -t $IMAGE_NAME ."
        sh "docker tag $IMAGE_NAME $IMAGE_NAME:$IMAGE_TAG"
        sh "docker tag $IMAGE_NAME $IMAGE_NAME:stable"
        sh "docker push $IMAGE_NAME:$IMAGE_TAG"
        sh "docker push $IMAGE_NAME:stable"
      }
    }

    stage("Clean Artifacts") {
      steps {
        sh "docker rmi $IMAGE_NAME:$IMAGE_TAG"
        sh "docker rmi $IMAGE_NAME:stable"
      }
    }

    stage("Create New Pods") {
      steps {
        withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'minikube', contextName: 'minikube', credentialsId: 'jenkins-k8s-token', namespace: '', serverUrl: 'https://172.31.157.28:8443']]) {
          script {
            def pods = groovyMethods.findPodsFromName("${namespace}", "${serviceName}")
            for (padName in pods) {
              sh """
                kubectl delete -n ${namespace} pod ${padName}
                sleep 10s
              """
            }
          }
        }
      }
    }
  }

  post {
    success {
      script {
        m2 = System.currentTimeMillis()
        def durationTime = groovyMethods.durationTime(m1, m2)
        def auth = groovyMethods.readCommitAuthor()
      }
    }
    failure {
      script {
        m2 = System.currentTimeMillis()
        def durationTime = groovyMethods.durationTime(m1, m2)
        def auth = groovyMethods.readCommitAuthor()
      }
    }
  }
}