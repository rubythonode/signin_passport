# 1. signin form

## 1.1 개발환경

install node.js

[install node.js](https://nodejs.org)

```
$ node -v
v4.2.1
$ npm -v
3.9.5
```

install bower

[install bower](http://bower.io/#install-bower)

```
$ npm install -g bower
$ bower --version
1.7.9
```

## 1.2 directory structure

```
signin/
├── public
│   ├── img/
│   ├── css/
│   ├── js/
│   ├── libs/
│   ├── views/
│   └── index.html 
└── node_modules/
```

## 1.3 Install client side library

`bower`의 기본 설치 디렉터리(bower_components)를 변경하기 위해 `.bowerrc` 파일을 생성하여 프로젝트 루트에 저장하고 이하의 내용으로 편집한다.

참고로 `npm`은 기본 설치 디렉터리(node_modules)을 변경할 수 없다.

```
{
  "directory" : "public/libs"
}
```

default설정으로 `init`를 실행한다.

```
cd <project-home>
$ bower init
```

`bower.json` 파일이 생성된다.

```
{
  "name": "signin",
  "authors": [
    "leeungmo <ungmo2@gmail.com>"
  ],
  "description": "signin example",
  "main": "",
  "moduleType": [],
  "license": "MIT",
  "homepage": "",
  "ignore": [
    "**/.*",
    "node_modules",
    "bower_components",
    "libs",
    "test",
    "tests"
  ]
}
```

설치가 필요한 의존 라이브러리를 설치한다.

```
bower install jquery --save
bower install jquery-validation --save
bower install jquery-backstretch-2 --save
bower install bootstrap --save
bower install fontawesome --save 
```

`.bowerrc` 파일에서 지정한 설치 리렉터리(libs)에 라이브러리가 설치되고 `bower.json`의 `dependencies`에 설치한 라이브러리의 이름과 버전이 추가된다.

```
"dependencies": {
    "jquery": "~2.2.4",
    "bootstrap": "~3.3.6",
    "jquery-backstretch-2": "~2.1.13",
    "font-awesome": "fontawesome#~4.6.3",
    "jquery-validation": "~1.15.0"
}
```

   

```
# installs the project dependencies listed in bower.json
$ bower install
```


## 1.4 Signin Form

# 2. validation & event handle

# 3. Database

# 4. sever-side

```
CREATE DATABASE my_db;

USE my_db;

CREATE TABLE USERS
(
email varchar(255),
password varchar(255)
);

INSERT INTO USERS (email, password)
VALUES ('ungmo2@gmail.com','1111');

SELECT * FROM USERS;
```

## 4.1 개발환경

install express

```
cd <project-home>
npm init

npm install express --save
npm install morgan --save
npm install mysql --save
npm install body-parser --save
npm install cookie-parser --save
npm install express-session --save
npm install jade --save
npm install passport --save
npm install passport-local --save
npm install util --save
```

package.json을 아래와 같이 수정한다.

```
{
  "name": "signin",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "start": "node index"
  },
  "dependencies": {
    "body-parser": "^1.15.1",
    "connect-flash": "^0.1.1",
    "cookie-parser": "^1.4.3",
    "express": "^4.13.4",
    "express-session": "^1.13.0",
    "jade": "^1.11.0",
    "morgan": "^1.7.0",
    "mysql": "^2.10.2",
    "passport": "^0.3.2",
    "passport-local": "^1.0.0",
    "util": "^0.10.3"
  }
}
```

root에 server.js 생성

```javascript
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
```

```
npm start
```


