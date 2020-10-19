function arrMatch(arr1, arr2) {
    //lọc những phần tử trung nhau của 2 mảng arr1 và arr2
    
    let arrA = arr1.filter(x =>  {
        if (arr2.indexOf(x) === -1) return x;
    });
    let arrB = arr2.filter(y => {
        if (arr1.indexOf(y) === -1) return y;
    });
    return arrA.concat(arrB);
}
console.log(arrMatch([1,2,3,6,15,19,"x"], [6,19,"x","y",3,2,1,0]))