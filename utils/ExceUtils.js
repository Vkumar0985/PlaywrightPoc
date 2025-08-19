const xlsx = require('xlsx')
export class ExcelUtils {

    static getDataFromExcel(filepath, sheetname) {
        try {
            const workbook = xlsx.readFile(filepath)
            const sheet = workbook.Sheets[sheetname]
            const data = xlsx.utils.sheet_to_json(sheet)
            return data
        }
        catch (msg) {
            console.log(msg)
        }
    }
}