pipeline {
    agent any
    
    environment {
        IMAGE_NAME = 'app-server'
        DOCKER_TAG = 'latest'
        DOCKER_COMPOSE_FILE = 'docker-compose.yaml'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/maheryfit/m1-mean-back.git'
            }
        }
        stage('Build') {
            steps {
                echo "Creating .env"
                sh '''
                    cp .env.development .env
                '''
                script {   
                    docker.build(IMAGE_NAME)
                }
                echo "Docker compose build"
                sh '''
                    docker compose -f ${DOCKER_COMPOSE_FILE} build
                '''
            }
        }
        stage('Deploy') {
            steps {
                echo "Docker compose up"
                sh 'docker compose -f ${DOCKER_COMPOSE_FILE} up -d'
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
