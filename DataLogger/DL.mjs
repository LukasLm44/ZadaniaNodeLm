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

async function main() {
    try {
        
        const name = await askQuestion("Jak masz na imię?");
        const surname = await askQuestion("Jakie jest twoje nazwisko?");
        const age = await askQuestion("Ile masz lat?");
        
        
        const userData = {
            name,
            surname,
            age
        };

        
        await fs.writeFile('plikDoZapisu.json', JSON.stringify(userData, null, 2));
        const dataFromFile = await fs.readFile('plikDoZapisu.json', 'utf-8');
        console.log(dataFromFile);

    } catch (err) {
        console.err("BŁĄD :[")
    }
     finally {
        rl.close();
    }
}

main();