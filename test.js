function endZeros() {
    let s1 = str1.length
    let s2 = str2.length

    if (s1 != s2){
        return false
    }
    let countChars1 = new Array(26);
        countChars1.fill(0);
    let countChars2 = new Array(26);
        countChars2.fill(0);
    for(let i = 0; i < s1; i++)
        {
            console.log(str1[i].charCodeAt())
            countChars1[str1[i].charCodeAt()-'a']++
            countChars2[str2[i].charCodeAt()-'a']++
           
        }
       for(let i = 0; i < s1; i++) {
        if (countChars1[str1[i].charCodeAt()-'a'] !=
            countChars2[str2[i].charCodeAt()-'a'])
        {
            return false;
        }
    }
    return true;
}

console.log(endZeros("add", "egg"))
console.log(endZeros("foo", "bar"))
console.log(endZeros("bar", "foo"))
console.log(endZeros("", ""))
console.log(endZeros("all", "all"))
console.log(endZeros("gogopy", "doodle"))
console.log(endZeros("abba", "cccc"))