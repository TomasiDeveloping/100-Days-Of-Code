// "for"
for (let i = 0; i < 10; i++) {
    console.log(i);
}

// "for-of" (for Arrays)
const users = ['Max', 'Anna', 'Joel']

for (const user of users) {
    console.log(user);
}

// "for-in" (for Object)
const loggedInUser = {
    name: 'Max',
    age: 32,
    isAdmin: true
};

for (const key in loggedInUser) {
    console.log(key);
    console.log(loggedInUser[key]);
}

// while
let isFinished = false;

while (!isFinished) {
    isFinished =  confirm('Do you want to quit?');
}
console.log('Done!');