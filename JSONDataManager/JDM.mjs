import fs from 'fs/promises';
import readline from 'readline'; 

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout 
});

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer); 
        });
    });
}

async function addNewObject() {
    const name = await askQuestion("Podaj imię.. ");
    const age = await askQuestion("Podaj wiek.. ");
    const email = await askQuestion("Podaj email.. ");
    
    const userData = {
        name, 
        age, 
        email
    };

    try {
        let existingData = [];
        try {
            const dataFromFile = await fs.readFile('data.json', 'utf-8'); 
            existingData = JSON.parse(dataFromFile);
        } catch (err) {
            console.error("BŁĄD :[", err);
        }

        existingData.push(userData);
    
        await fs.writeFile('data.json', JSON.stringify(existingData, null, 2));
        console.log("Dane zostały zapisane do pliku 'data.json'.");
    } catch (err) {
        console.error("BŁĄD :[", err);
    }
}
//------------------------------------
async function displayData() {
    try {
        const dataFromFile = await fs.readFile('data.json', 'utf-8');
        const existingData = JSON.parse(dataFromFile); 

        console.log(existingData); 
    } catch (err) {
        console.error("BŁĄD :[", err);
    }
}

//--------------------------------
async function main() {
    const wybor = await askQuestion("Chcesz dodać nowy Kontakt Wpisz: [1] ||Chcesz wyświetlić Kontakt Wpisz: [2] ");
    
    if (wybor === '1') {
        await addNewObject(); 
    } else if (wybor === '2') {
        await displayData(); 
    } else {
        console.error("BŁĄD :[", err); 
    }
    
    rl.close(); 
}

main(); 