module.exports = {
    apps: [
      {
        name: "my-react-app",  // 애플리케이션 이름
        script: "serve",       // 실행할 서버 파일
        args: "-s dist -l 8010", // 빌드된 dist 폴더에서 8010 포트로 서빙
        env: {
          NODE_ENV: "production"
        }
      }
    ]
  }