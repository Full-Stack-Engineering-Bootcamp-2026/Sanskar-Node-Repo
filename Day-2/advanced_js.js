// 1]Reference Types
const original = {
    id: 1,
    name: "Laptop",
    price: 50000
};

const copy = original; //Creates a shallow copy
copy.id = 10; //CHanges the id on both original and copy because copy points at the same object at which orginal reference is pointing due to shallow copy creation
console.log(original);
console.log(copy);

// 2]Spread and Rest
//Merge two arrays using Spread
const nums1 = [1,2,3,4];
const nums2 = [5,6,7,8];
const nums3 = [...nums1,...nums2];
console.log(nums3);

//Merge two objects using Spread
const id_name_price = {
    id: 1,
    name: "Laptop",
    price: 50000
};

const specs = {
    memory: 16,
    storage: 512,
    gpu: "RTX 4070"
};

const prod = {...id_name_price,...specs};
console.log(prod);

//Rest parameter function
const avg = (...nums)=>{
    sum = 0;
    for(let i = 0;i<nums.length;i++)
        sum += nums[i];
    return sum/nums.length;
}
console.log(avg(1,2,3,4,5));

// 3]Destructuring
//Destructure an object to extract at least 3 properties
const person = {
    name: "Sanskar",
    age: 23,
    hobbie: "Gaming",
}

const {name:userName,age,hobbie} = person;
console.log(userName);
console.log(age);
console.log(hobbie);

// Destructure an array to get the first and third elements
const nums = [1,2,3,4,5,6,7];
const {0:first,2:third} = nums;
console.log(first);
console.log(third);


// 4]Promise
const delay = (ms)=>{
    const promise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve("Done Waiting")
        },ms)
    })
    return promise;
}

delay(10000).then((text)=>console.log(text));



