<template>
  <div>
    <button @click="generatePdf">Generate PDF</button>
  </div>
</template>

<script>
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

export default {
  name: 'PdfGenerator',
  methods: {
    generatePdf() {
      // Register the fonts with pdfmake
      pdfMake.vfs = pdfFonts.pdfMake.vfs;

      // Define the table data with UTF-8 characters
      const tableData = [
        ['Name', 'Age', 'Country'],
        ['John Doe', 30, '日本'],
        ['Jane Smith', 25, '中国'],
        ['Bob Johnson', 35, '한국']
      ];

      // Define table styles
      const tableStyle = {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto'],
          body: tableData
        },
        header: {
          fillColor: '#F2F2F2',
          bold: true,
          fontSize: 12
        }
      };

      // Define the document content
      const docDefinition = {
        content: [
          'Table Example',
          {
            table: {
              headerRows: 2,
              widths: ['*', 'auto', 'auto'],
              body: [
                [{ text: 'Name', rowSpan: 2, style: 'header' }, 'Age', 'Country'],
                ['', { text: 'Age', style: 'header' }, { text: 'Country', style: 'header' }],
                ...tableData
              ]
            }
          }
        ],
        styles: {
          header: tableStyle.header
        },
        defaultStyle: {
          font: 'Roboto'
        }
      };

      // Create the PDF
      pdfMake.createPdf(docDefinition).open();
    }
  }
};
</script>