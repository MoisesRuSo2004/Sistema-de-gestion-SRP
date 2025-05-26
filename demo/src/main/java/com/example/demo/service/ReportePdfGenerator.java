package com.example.demo.service;

import com.example.demo.entity.ReporteDTO;
import com.lowagie.text.*;
import com.lowagie.text.pdf.*;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;
import java.util.stream.Stream;

public class ReportePdfGenerator {

    public static ByteArrayInputStream generarPdf(List<ReporteDTO> data) {
        Document document = new Document();
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Título
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Reporte", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);

            document.add(new Paragraph(" "));
            document.add(new Paragraph("Fecha de generación: " + java.time.LocalDate.now()));

            // Tabla
            PdfPTable table = new PdfPTable(4);
            table.setWidthPercentage(100);
            table.setWidths(new int[] { 4, 2, 2, 2 });

            table.setSpacingBefore(20f); // 20 puntos de espacio antes de la tabla

            // Encabezados
            Stream.of("Nombre Insumo", "Entradas", "Salidas", "Stock Actual")
                    .forEach(headerTitle -> {
                        PdfPCell header = new PdfPCell();
                        Font headFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
                        header.setBackgroundColor(java.awt.Color.LIGHT_GRAY);
                        header.setHorizontalAlignment(Element.ALIGN_CENTER);
                        header.setPhrase(new Phrase(headerTitle, headFont));
                        table.addCell(header);
                    });

            // Datos
            for (ReporteDTO item : data) {
                table.addCell(item.getNombreInsumo());
                table.addCell(String.valueOf(item.getEntradas()));
                table.addCell(String.valueOf(item.getSalidas()));
                table.addCell(String.valueOf(item.getStockActual()));
            }

            document.add(table);
            document.close();

        } catch (DocumentException ex) {
            ex.printStackTrace();
        }

        return new ByteArrayInputStream(out.toByteArray());
    }
}
