pipeline {
    agent any
    
    environment {
        DOCKER_TAG = 'latest'
        DOCKER_COMPOSE_FILE = 'docker-compose.yaml'
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Pulling project"
                git branch: 'main', url: 'https://github.com/maheryfit/m1-mean-back.git'    
            }
        }
        stage('Build') {
            steps {
                echo "Creating .env"
                sh 'cp .env.development .env'
            
                echo "Build node image"
                sh 'docker build -t app-server .'
                
                echo "Docker compose build"
                sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} build'

                echo "Docker compose up"
                sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} up -d'
            }
        }
    }
    
    post {
        success {
            echo 'Deployment successful!'
        }
        failure {
            echo 'Deployment failed.'
        }
    }
}
