const myArr = [];
for (let i = 0; i < 20; i++) {
    myArr.push(i);
}

let AppMe = '';
myArr.forEach((item) => (AppMe += `${item}\n`))
AppMe += '</<ul>';

export default AppMe;
