# #nodejs
## Node JS 내부 동작

![](../images/chanho/nodejs_libuv_v8.png)

1. `WRITTEN CODE`: 우리가 실행하는 코드입니다.
2. `NODE JS`: 위 코드가 실행되면 `Node JS 프로젝트를 발생`시킵니다. Node JS는 실제로 `의존성 집합`들을 가지고 있는데
   이 `의존성 집합`들이 실제로 우리가 작성하는 코드를 실행하게 해주는 것들입니다.
3. `Node js 의존성 집합`
    * `V8`: `js engine`으로, 브라우저 외부에서도 `js`를 실행할 수 있게 해줍니다.
    * `libuv`: `C++` 오픈소스로, `nodejs`가 `os`에 접근할 수 있게 해줍니다. ex) `파일시스템`, `네트워크`, `동시시스템`

### NODEJS에서 직접적으로 사용하지 않고, V8, libuv를 사용하는 이유.
`js`만으로는 `os`접근할 수 없어서, C++를 이용하려고 하는데, 여기서 `NODE JS`가 좋은 `interface`역할을 합니다.


![nodejs_library_modules](../images/chanho/nodejs_library_modules.png)

`Node js`부분에 정의되어있는 `http`, `fs`, `crypto`, `path`의 실제 구현은 `libuv`에 있습니다.
`Node js`에서는 인터페이스로 선언만하고 실제 구현은 `libuv`에서 합니다.

## nodejs 코드의 실제 구현장소 보기

[실제 nodejs 라이브러리(lib) url](https://github.com/nodejs/node/tree/master/lib): `js side, js world of node project` 우리가 require하는 모든 자바스크립트 정의와 함수, 모듈들을 포함하고 있습니다.

[실제 nodejs 라이브러리 구현(src) url](https://github.com/nodejs/node/tree/master/src): `위의 함수의 c++ 구현장소` 입니다. `nodejs`가 실제로 `v8`, `libuv`에서 가져오는 저장소 입니다.

### 1. lib(javascript world)
![](../images/chanho/nodejs_usingv8_usinguv.png)
[pbkdf2.js(lib)](https://github.com/nodejs/node/blob/master/lib/internal/crypto/pbkdf2.js)
: 우리가 사용하는 `pbkdf2`의`js`영역 입니다.
```typescript
function pbkdf2(password, salt, iterations, keylen, digest, callback) {
  ...
  const job = new PBKDF2Job(...);
  ...
  job.run();
}
```
실제로 이런 코드가 있습니다. 여기서 `job`은 `PBKDF2JOB` 인스턴스를 가져오는데. 위에서 `internalBinding()`을 통해 C++와 js를 연결해 줍니다.
> internalBinding(): the private internal C++ binding loader, inaccessible
from user land unless through `require('internal/test/binding')`.
These C++ bindings are created using NODE_MODULE_CONTEXT_AWARE_INTERNAL()
and have their nm_flags set to NM_F_INTERNAL.
```typescript
const {
  PBKDF2Job,
  ...
} = internalBinding('crypto');
```
`lib`(js world)에서 `binding`을 통해 `src`(C++ world)에 실제로 구현되어있는 함수를 연결해 줍니다.

### 2. src(c++ world)
[crypto_pbkdf2.cc(src)](https://github.com/nodejs/node/blob/master/src/crypto/crypto_pbkdf2.cc)
### v8
내부에 보면 `v8`을 사용하는 이런 코드가 있습니다.
```C++
using v8::Context;
using v8::Local;
using v8::Object;
using v8::TryCatch;
using v8::Value;
```
* `node source code`내부에 있는 `v8`의 목적은 `js`의 정의된 것들을 `C++`가 이해할수 있게 도와줍니다.
### libuv
[uv의 사용처](https://github.com/nodejs/node/blob/master/src/inspector_io.cc)
* 내부에 있는 `uv`는 `C++ side`에서 `동시성`과 `생성자 processing`을 위해 사용한다고 하는데 이게 뭔 말인지 앞으로 공부하면서 알았으면 좋겠습니다.

