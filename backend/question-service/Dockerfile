# Node.js 이미지 사용
FROM node:16-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# 포트 설정
EXPOSE 5000

# 애플리케이션 실행 명령
CMD ["node", "src/server.js"]
