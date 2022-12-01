const func = require('./callfunction.js')
const yargs = require('yargs');

yargs.command({
    command: 'add',
    describe: 'add new contact',
    builder:{
        name:{
            describe:'contact name',
            demandOption:true,
            type:'string',
        },
        email:{
            describe:'contact email',
            demandOption:false,
            type:'string',
        },
        phone:{
            describe:'contact mobile phone number',
            demandOption:true,
            type:'string',
        },
    },
    //apa yang akan dilakukan selanjutnya
    handler(argv){
        //menggunakan function datasave untuk menerapkan module yargs diterminal
        func.datasave(argv.name,argv.email,argv.phone)
    },
})

//membuat command menampilkan list di cli
yargs.command({
    command: 'show-list',
    describe: 'add new contact',
    handler(){
        func.show()
    }
})

yargs.command({
    command: 'show-detail-list',
    describe: 'detail list',
    //menggunakan argv untuk mengirimkan value name
    handler(argv){
        func.detail(argv.name)
    }
})

yargs.command({
    command: 'delete',
    describe: 'delete list',
    //menggunakan argv untuk mengirimkan value name
    handler(argv){
        func.hapus(argv.name)
    }
})

yargs.command({
    command: 'update',
    describe: 'update object value',
    builder:{
        name:{
            describe:'contact name',
            demandOption:true,
            type:'string',
        },
        email:{
            describe:'contact email',
            demandOption:false,
            type:'string',
        },
        phone:{
            describe:'contact mobile phone number',
            demandOption:false,
            type:'string',
        },
        exist:{
            describe:'if exist',
            demandOption:false,
            type:'string',
        }
    },
    //menggunakan argv untuk mengirimkan value name
    handler(argv){
        func.update(argv.name,argv.email,argv.phone,argv.exist);
    }
})

yargs.parse();