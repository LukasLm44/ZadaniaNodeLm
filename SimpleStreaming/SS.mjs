import fs from 'fs'
import http from 'http'
import url from 'url'

const readableStream = http.createServer((req, res)=>{

    const queryObject = url.parse(req.url, true).query;
    const fileName = queryObject.file;

    if(fileName){
       
            fs.readFile('plik.txt','utf-8',(err,data)=>{
                if(err){
                    res.end("nie ma takiego pliku jakiego wpisal uzytkownik do paraetru file")
            
                } else {
                    res.end(data)    
                }

            })
    }

    else{
        res.end("bład nie paraetru file")
    }

   
})
    
readableStream.listen(3000, ()=>{
    console.log("serwer nasluchuje na 3000")
})




