## Node JS와 event loop
1. `노드 프로그램이 시작`되면, `노드`는 `하나의 thread를 생성`하고, 이 `하니의 thread 내부`에서 `모든 코드를 실행`합니다.
2. `노드가 하나의 thread를 생성`하고, `그 내부에 event loop`를 가지게 됩니다. `event loop`는 `하나의 threa`d`에서 언제 어떤일을 해야할지 관리하는 녀석입니다.
3. `모든 프로그램`은 `정확히 하나의 event loop`를 가지고 있습니다.
4. 노드의 성능은 event loop의 행동에 달려있으므로 event loop를 이해하는거 매우 중요합니다.

### event loop는 어떻게 동작하는가?
```typescript
// node myFile.js

const pendingTimers = [];
//우리가 http서버를 생성할때 바로 exit되서 terminal로 가지 않는 이유는 pendingOSTasks가 있기 때문입니다.
const pendingOSTasks = [];
const pendingOperations = [];

//처음 노드를 실행할때 event loop는 실행되지 않습니다. 그냥 myFile.js코드를 전부 실행합니다.
myFile.runContent()
//그리고 코드를 실행할 때, 이 때 event loop로 들어갑니다.

function shouldContinue(){
    // check one: any pending setTimeout, setInterval, setImmediate?

    // check two: any pending os tasks?(server listening to port)
    // check three: any pending long running operations?(like fs module)

    return pendingTimers.length || pendingOSTasks.length || pendingOperations.length;
}

//event loop: Entire body executes in one 'tick'
while(shouldContinue){
    //five steps that are executed during every execution of the event loop.
    
    //1) node looks at pendingTimers and sees if any functions
    //are ready to be called;(setTimeout, setInterval)

    //2) node looks at pendingOSTasks and pendingOperations
    //and calls relevant callbacks

    //3) Pause execution(node actually pauses execution temporarily).
    // during this pause, node js sits around and waits for new events to occur
    // i will continue whenever some numbers of events occur
    // - a new pendingOSTask is done
    // - a new pendingOperation is done
    // - a timer is about to complete

    //4) Look at pendingTimers. Call any setImmediate
    //5) handle any `close` event(clean up)
}

// exit back to terminal
``` 