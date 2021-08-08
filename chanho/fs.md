## fs 파일 시스템
### readFile
`fs.readFile`은 비동기로 동작합니다.
```javascript
console.log(1)
fs.readFile('./read.txt', (err, data)=>{
    console.log(data);
});
console.log(2)

//1
//2
//console.log(data); 순으로 출력
```
그리고 `console.log(data)`는 `Buffer`로 출력됩니다.

비동기를 위한 `readSync`란 것도 있긴하지만, 동기가 되면서 메인스레드가 놀고먹을수 있기에 좋지 않은 선택입니다.

하지만, 순서도 지키고 싶고, 비동기도 하고 싶다면, 콜백지옥을 펼치며 구현이 가능합니다.
```javascript
fs.readFile('./read.txt', (err, data)=>{
    console.log(data);
    fs.readFile('./read.txt', (err, data)=>{
        console.log(data);
        fs.readFile('./read.txt', (err, data)=>{
            console.log(data);
        });
    });
});
```
그냥 내부에 복붙 하면 됩니다. 이게 싫으면 `Promise`와 `await/async`를 공부합시다.
