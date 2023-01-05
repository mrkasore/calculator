function add(x, y) {
    return x + y;
}

function substract(x, y) {
    return x - y;
}

function multiply (x, y) {
    return x * y;
}

function divide (x, y) {
    return x / y;
}

function degree (x, y) {
    return x ** y;
}

function operator (num1, num2, op) {
    if(op === '+') {
        return add(num1, num2);
    }
    else if(op === '-') {
        return substract(num1, num2);
    } else if (op === '*'){
        return multiply(num1, num2);
    } else if (op === '/') {
        return divide(num1, num2);
    } else if (op === '^') {
        return degree(num1, num2);
    }
}

let inp = document.querySelector('.window_show');
let btn = document.querySelectorAll('button');
let screen = '';
let arr = [];
let res;

function display(name) {
    if (arr.length >= 2) {
        if (arr[0] === '-') {
            arr = [`-${arr[1]}`, arr[2]];
        } else if (isNaN(arr[0])) {
            arr = [arr[1], arr[2]];
        }
    }

    if (document.querySelector('.window_show').innerHTML === 'undefined') {
        console.log('ubd');
        screen = '';
        document.querySelector('.window_show').innerHTML = '';
        arr = [];
    }

    if (arr[arr.length-1] === '') {
        arr.pop();
    }
    if (name === 'delete') {
        console.log('delete');
        arr[arr.length-1] = arr[arr.length-1].slice(0, arr[arr.length-1].length-1);
        //console.log(arr);
        document.querySelector('.window_show').innerHTML = '';
        for (let i = 0; i < arr.length; i++) {
            if(arr[i] != '') {
                document.querySelector('.window_show').innerHTML += arr[i];
            }
        }
        document.querySelector('.window_value').innerHTML = arr[arr.length-1];
        return;
    }

    if (name === 'clear') {
        arr = [];
        screen = '';
        document.querySelector('.window_value').innerHTML = '';
        document.querySelector('.window_show').innerHTML = '';
    }
    if (name === 'even') {
        //console.log(arr);
        document.querySelector('.window_value').innerHTML = operator(Number(arr[0]), Number(arr[2]), arr[1]);
        document.querySelector('.window_show').innerHTML = operator(Number(arr[0]), Number(arr[2]), arr[1]);
        res = operator(Number(arr[0]), Number(arr[2]), arr[1]);
        arr = [];
        screen = String(res);
        return;
    }
    res = operator(Number(arr[0]), Number(arr[2]), arr[1]);
    //console.log(res);
    if (arr.length >= 3) {
        arr = [String(res), arr[arr.length-1]];
        document.querySelector('.window_value').innerHTML = res;
        document.querySelector('.window_show').innerHTML = `${res}${arr[1]}`;
        //console.log(arr);
    }
}

btn.forEach(item => {
    item.addEventListener('click', function(e) {
        if (e.target.className != "delete") {
            screen += e.target.innerHTML;
            document.querySelector('.window_show').innerHTML += e.target.innerHTML;
            document.querySelector('.window_value').innerHTML = screen;
        }
        
        if (e.target.className === 'operator') {
            if (screen.slice(0, screen.length - 1) != '') {
                arr.push(screen.slice(0, screen.length - 1));
            }
            arr.push(screen.slice(screen.length - 1, screen.length));
            //console.log(arr);
            screen = '';
            display();
        } else if (e.target.className === 'even') {
            //console.log(screen.slice(0, screen.length - 1));
            arr.push(screen.slice(0, screen.length - 1));
            screen = '';
            display('even');
        } else if (e.target.className === "clear") {
            display('clear');
        } else if (e.target.className === "delete") {
            if(screen != '') {
                arr.push(screen.slice(0, screen.length));
                screen = '';
                //display();
                display('delete');
                return;
            } else {
                display('delete');
                return;
            }
        }
        display();
    })    
});


