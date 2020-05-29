self.addEventListener("message", (event) => {
    console.log(event);
    if (event.data === 'load') {
        console.log("Loading...")
        var count = 0;
        for (var i = 0; i < 1000; i++) {
            count += 1;
        }
        self.postMessage({'message': count})
    }
})