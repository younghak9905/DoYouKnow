const path = require('path');

module.exports = {
    entry: './src/index.js', // 진입점 파일
    output: {
        path: path.resolve(__dirname, 'dist'), // 출력 디렉토리
        filename: 'bundle.js', // 번들 파일 이름
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, // JavaScript 및 JSX 파일 처리
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'], // 확장자 처리
    },
    devServer: {
        static: './public', // 정적 파일 경로
        port: 3000, // 개발 서버 포트
    },
    mode: 'development', // 개발 모드 설정
};
