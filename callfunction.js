const { rejects } = require('assert');
const { resolve } = require('path');
const fs = require('fs'); //import module fs untuk filesystem
const validator = require('validator'); //import module validator untuk melakukan validasi
// const calljson = require('./data/contacts.json')
// console.log(calljson);

// const readline = require('readline'); //import module readline untuk membaca data
//membuat fungsi untuk memasukkan data
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
//membuat folder data jika folder data belum ada
const dirPath = './data';
if(!fs.existsSync(dirPath)){
    fs.mkdirSync(dirPath);
}
//membuat file baru bernama contacts.json didalam folder data jika file itu belum ada
const dataPath = './data/contacts.json';
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath,'[]','utf-8');
}
// membuat function question untuk petanyaan di app.js
// const question = (questions) => {
//     return new Promise((resolve, rejects) => {
//         rl.question(questions, (answer) => {
//             resolve(answer)
//         })
//     });
// }

//fungsi untuk menampilkan file di cli dengan menggunakan readfile
function show(){
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    contacts.forEach(function(arr,num){
        console.log(`${num+1}  ${arr.name} ${arr.email} ${arr.phone}`);
    });
}

//fungsi untuk menampilkan detail dari nama
function detail(name){
    //membaca file dari contacts.json
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    //untuk mentranslate file dari utf-8 ke json file
    const contacts = JSON.parse(file);
    //menggunakan web api find untuk mencari data yang spesifik 
    const detail = contacts.find((data) => data.name === name);
    if(detail){
        console.log(detail.name, detail.email, detail.phone);
    } else {
        console.log('Nama tidak ditemukan')
    }
}

//fungsi untuk memfilter command yang diberikan dengan menggunakan filter function
function hapus(name){
    //membaca file dari contacts.json
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    //untuk mentranslate file dari utf-8 ke json file
    const contacts = JSON.parse(file);
    //menggunakan fungsi filter untuk menyaring setiap inputan data dari parameter
    const del = contacts.filter((data) => data.name !== name)
    console.log(del);
}

//fungsi untuk update value yang diberikan di cli 
const update = (name, email, phone, exist) => {
    //membaca file dari contacts.json
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    //untuk mentranslate file dari utf-8 ke json file
    const contacts = JSON.parse(file);
    try{
        //fungsi untuk mengecek apakah parameter nama sama dengan parameter exist yang dikirimkan melalui cli
        const newobj = contacts.find((data) => data.name === exist )
        //find disini merupakan web api
        const duplicate = contacts.find(function(contact) { 
            return contact.name === name;
        })
        //jika object nama menyatakan tidak undefined atau ada value nya
        if(name != undefined){
            //mengecek jika ada duplikasi data
            if(duplicate){
                console.log(`nama ${name} already exist`);
                return false;
            }
            //maka name yang dikirimkan di valuenya akan ditimpa dengan object baru
            newobj.name = name
        }
        //jika object email menyatakan tidak undefined atau ada value nya
        if(email != undefined) {
            //mengecek format email dengan validator
            if(email){
                if(!validator.isEmail(email)){
                    console.log('your email is wrong format');
                    return(false);
                }
            }
            //maka email yang dikirimkan di valuenya akan ditimpa dengan object baru
            newobj.email = email
        }
        //jika object phone menyatakan tidak undefined atau ada value nya
        if(phone != undefined){
            if(phone){
                if(!validator.isMobilePhone(phone, 'id-ID')){
                    console.log('your phone is wrong format (use ID format)');
                    return(false);
                }
            }
            //maka email yang dikirimkan di valuenya akan ditimpa dengan object baru
            newobj.phone = phone
        }
        
        // contacts.push(contact.name,contact.email,contact.phone);
        // console.log(contacts);
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));

    }catch(e){
        console.log("data not found");
        return false;
    }
}

//membuat function datasave untuk mengecek validasi dari variable name, email, dan phone yang ada di app.js
const datasave = (name,email,phone) => {
        //membuat variable untuk menginputkan name, email, dan phone dalam bentuk object
        const contact = {name, email, phone};
        //membuat variable untuk membaca file dari contacts.json
        const file = fs.readFileSync('data/contacts.json', 'utf-8');
        //buat variable contacts yang didalamnya ada fungsi pharsing yang berfungsi untuk mentranslate file dari utf-8 menjadi file json
        const contacts = JSON.parse(file);

        //cek apakah ada nama yang sama di contacts.json
        const duplicate = contacts.find(function(contact) { //find disini merupakan web api
            return contact.name === name;
        })
        if(duplicate){
            console.log(`nama ${name} already exist`);
            return false;
        }
        if(email){
            if(!validator.isEmail(email)){
                console.log('your email is wrong format');
                // rl.close();
                return(false);
            }
        }
        if(phone){
            if(!validator.isMobilePhone(phone, 'id-ID')){
                console.log('your phone is wrong format (use ID format)');
                // rl.close();
                return(false);
            }
        }

        //function untuk menampilkan semua data yang ada dalam json
        


        // untuk menambah data
        contacts.push(contact);
        // setelah melakukan push, buat menjadi agar bisa di tuliskan di dalam contacts.json 
        fs.writeFileSync('data/contacts.json', JSON.stringify(contacts)); // fungsi stringify = mengubah file dari json menjadi string 
        console.log(`your name is ${name}`)
        console.log(`your email is ${email}`)
        console.log(`your phone is ${phone}`)
        console.log('terimakasih sudah memasukkan data');
        // rl.close();
}

//mengeksport function question dan datasave untuk dipanggil ke app.js
module.exports = { datasave, show, detail, hapus, update };