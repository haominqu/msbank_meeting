pipeline {
  agent any
  stages {
    stage('pull sourcecode') {
      steps {
        git(url: 'http://172.19.88.27/isp/auth.git', branch: 'master', credentialsId: 'git:9affc45a7bdbe673aa275c0281547fc4ea0206c7a812330ae5cb2afa16220550')
      }
    }

    stage('build') {
      steps {
        sh '/app/buildf.sh "${JOB_NAME}" "${GIT_COMMIT}"'
      }
    }

    stage('deploy') {
      steps {
        sh '/app/deployf.sh "${JOB_NAME}" copy "${GIT_COMMIT}" auth'
      }
    }

  }
}
