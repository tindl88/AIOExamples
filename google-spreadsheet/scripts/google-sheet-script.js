var SCRIPT_PROP = PropertiesService.getScriptProperties();
var TO_ADDRESS = 'abcxyz@gmail.com'; // Đổi email này thành email của mình
var sheetName = 'Sheet1'; // Sai tên sheet là nó không lưu đuợc

function doPost(e) {
    try {
        Logger.log(e);
        MailApp.sendEmail(TO_ADDRESS, 'Contact Form Submitted', JSON.stringify(e.parameters));
        insert(e);
        return ContentService
            .createTextOutput(
                JSON.stringify({status: true, message: 'Contact success!', data: JSON.stringify(e.parameters)}))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        Logger.log(error);
        return ContentService
            .createTextOutput(JSON.stringify({status: false, message: e}))
            .setMimeType(ContentService.MimeType.JSON);
    }
}

function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty('key', doc.getId());
}

function insert(e) {
    Logger.log(JSON.stringify(e));
    try {
        var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty('key'));
        var sheet = doc.getSheetByName(sheetName);
        var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        var nextRow = sheet.getLastRow() + 1;
        var row = [new Date()];

        for (var i = 1; i < headers.length; i++) {
            if (headers[i].length > 0) {
                row.push(e.parameter[headers[i]]);
            }
        }

        sheet.getRange(nextRow, 1, 1, row.length).setValues([row]);
    } catch (error) {
        Logger.log(e);
    } finally {
        return;
    }
}