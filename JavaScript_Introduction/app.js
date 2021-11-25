let age = 32;
let userName = 'Patrick';
let hobbies = ['Sports', 'Cooking', 'Reading'];
let job = { 
    title: 'Developer' , 
    place: 'New York', 
    salary: 50000
};

let adultYears;

function calculateAdultYears(userAge) {
    return userAge - 18;
}

adultYears = calculateAdultYears(age);
alert(adultYears);

age = 45;
adultYears = calculateAdultYears(age);

alert(adultYears);