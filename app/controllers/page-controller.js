const path = require('path');
const fs = require('fs');
const XLSX = require('xlsx');

// TODO: ELIMINAR DESPUES
const {data} = require("../../persistence/data");

const getHome = (req, res) => {
    const data = get_data(req, "Felipe Dueñas - SSr Backend Developer");
    res.render("pages/home", data);
};

const setForm = (req, res) => {
    let {name, diet} = req.body

    const file = path.join(__dirname, '..', '..', 'persistence', 'registro.xlsx');
    let workbook;
    let worksheet;

    try {
        if (fs.existsSync(file)) {
            // Read existing file
            workbook = XLSX.readFile(file);

            // Get the first sheet (in this case 'Users')
            const sheetName = workbook.SheetNames[0];
            worksheet = workbook.Sheets[sheetName];

            // Convert sheet to array of arrays
            const data = XLSX.utils.sheet_to_json(worksheet, {header: 1});

            // Add new row
            data.push([name, diet]);

            // Convert back to worksheet
            worksheet = XLSX.utils.aoa_to_sheet(data);

            // Update sheet in workbook
            workbook.Sheets[sheetName] = worksheet;
        } else {
            // If file does not exist, create a new one
            workbook = XLSX.utils.book_new();
            worksheet = XLSX.utils.aoa_to_sheet([
                ['Nombre', 'Restricción'],
                [name, diet]
            ]);
            workbook.Sheets = {'Users': worksheet};
            workbook.SheetNames = ['Users'];
        }

        // Save file
        XLSX.writeFile(workbook, file);
        console.log('Record added successfully');
        res.status(200).json({message: "Datos guardados exitosamente en el archivo Excel."});

    } catch (error) {
        console.error('Error adding record:', error.message);
        res.status(500).json({error: "Error al guardar los datos en el archivo Excel."});
    }
};

const getDocument = (req, res) => {
// Ruta al archivo que quieres que el usuario descargue
    const filePath = path.join(__dirname, '..', '..', 'persistence', 'registro.xlsx');

    // Verificar si el archivo existe
    if (fs.existsSync(filePath)) {
        // Si existe, enviar el archivo para su descarga
        res.download(filePath, (err) => {
            if (err) {
                console.error('Error al enviar el archivo:', err);
                res.status(500).send('Error al intentar descargar el archivo.');
            } else {
                console.log('Archivo enviado correctamente.');
            }
        });
    } else {
        // Si el archivo no existe, devolver un error
        res.status(404).send('El archivo no existe.');
    }
};

const getAbout = (req, res) => {
    const data = get_data(req, "About - Felipe Dueñas");
    res.render("pages/about", data);
};

const getServices = (req, res) => {
    const data = get_data(req, "Services - Felipe Dueñas");
    res.render("pages/services", data);
};

const getContact = (req, res) => {
    const data = get_data(req, "Contact - Felipe Dueñas");
    res.render("pages/contact", data);
};

const get_data = (req, title) => {
    return {
        layout: "welcome",
        path: req.path,
        title: title,
        data: data
    };
};

module.exports = {getHome, setForm, getDocument, getAbout, getServices, getContact};