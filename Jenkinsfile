pipeline {
    agent any { dockerfile true }
    
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
        
        stage('Copy .env file') {
            steps {
                sh 'cp .env.development .env'
            }
        }
        
        stage('Build node JS image using Dockerfile') {
            steps {
                sh 'docker build -t app-server .' 
            }
        }
        
        stage('Run docker compose file') {
            steps {
                sh 'docker-compose -f ${DOCKER_COMPOSE_FILE} build'
            }
        }
        stage('Deploy') {
            steps {
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
