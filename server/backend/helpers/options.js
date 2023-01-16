module.exports = {
    formate: 'A4',
    orientation: 'landscape',
    border: '2mm',
    header: {
        height: '10mm',
        contents: '<h5 style=" color: red;font-size:20;font-weight:800;text-align:center;">CUSTOMER INVOICE</h5>'
    },
    footer: {
        height: '15mm',
        contents: {
            first: 'Cover page',
            2: 'Second page',
            default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', 
            last: 'Last Page'
        }
    }
}