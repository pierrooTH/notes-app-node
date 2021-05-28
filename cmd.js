const yargs = require('yargs');
const fs = require('fs');
const chalk = require('chalk');

yargs.command({
    command: 'list',
    describe: 'Liste toutes mes notes',
    handler: () => {
        console.log("Voici la liste des notes :");

    fs.readFile("note.json", "utf-8", (err,dataStr) => {
    if(err) console.log(err);
    else {
        const dataObjJS = JSON.parse(dataStr);
        // Boucle for classique
        // for(let i = 0; i<dataObjJS.length; i++) {
        //     console.log(chalk.inverse.green(`${dataObjJS[i].id}. ${dataObjJS[i].title} a pour message ${dataObjJS[i].message}`))
        // }

        // foreach (plus agréable)
        dataObjJS.forEach(dataObj => {
            console.log(chalk.inverse.green(`${dataObj.id}. ${dataObj.title} a pour message ${dataObj.message}`))
        }) 
    }
})
    }
}).command({
    command: 'add',
    describe: "Ajoute une note",
    builder: {
        title: {
            describe: 'Titre de la note',
            demandOption: true,
            type: 'string'
        },
        message: {
            describe: 'Message de la note',
            demandOption: false,
            type: 'string'
        }
    },
    handler: (argv) => {
        // Objet nouvelle note 

        fs.readFile("note.json", "utf-8", (err,data) => {
            if(err) console.log(err);
            else {
                // 1a. Je récupère le contenu en chaîne de caractère
        
                // 1b. Je transforme la string JSON en objet JS
                const notes = JSON.parse(data);
                console.log(notes);
                //2. Exécuter les modifications en JS
                // 2.a je vais récupérer le dernier élément du tableau
                const lastNoteId = notes[notes.length-1].id;
                console.log(lastNoteId);
                const newNote = {
                    id: lastNoteId +1,
                    title: argv.title,
                    message: argv.message
                }
                notes.push(newNote)
                console.log(notes)
                //2b. Transformer mes modifs obj JS en chaine JSON
                const notesJSON = JSON.stringify(notes); 
                console.log(notesJSON);
                //3. Envoyer les modifs de mon JSON en écrasant le fichier
                fs.writeFile("note.json",notesJSON,(err) => {
                    if(err) console.log(chalk.inverse.red(err));
                else {
                    console.log(chalk.inverse.green("La note a été ajoutée"));
                }
            });
            }
        })
    }
}).command({
    command: 'remove',
    describe: "Supprime une note",
    builder: {
        id: {
            describe: 'ID de la note à supprimer',
            demandOption: true,
            type: BigInt
        }
    },
    handler: (argv) => {

        fs.readFile("note.json", "utf-8", (err,data) => {
            if(err) console.log(err);
            else {
                const notes = JSON.parse(data);
                const removeNotes = notes.filter(note => note.id !== argv.id)
                const removeNotesJSON = JSON.stringify(removeNotes); 
                fs.writeFile("note.json",removeNotesJSON,(err) => {
                    if(err) console.log(chalk.inverse.red(err));
                else {
                    console.log(chalk.inverse.green(`La ${argv.id === 1 ? argv.id + "ère" : argv.id + "ème"} note a été supprimée`));
                }
            });
            }
        })
        
    }
}).command({
    command: 'read',
    describe: "Affiche le détail d'une note",
    handler: () => {
        console.log("Voici le détail d'une note");
    }
}).argv;

