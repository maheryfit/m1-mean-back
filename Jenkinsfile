pipeline {
    agent any
    
    environment {
        IMAGE_NAME = 'app-server'
        DOCKER_TAG = 'latest'
        DOCKER_COMPOSE_FILE = 'docker-compose.yaml'
    }

    stages {
        stage('Clean Workspace') {
            steps {
                script {
                    sh 'rm -rf *'
                }
            }
        }
        
        stage('Checkout') {
            steps {
                checkout scm
                git branch: 'main', url: 'https://github.com/maheryfit/m1-mean-back.git'
            }
        }
        stage('Build') {
            steps {
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
