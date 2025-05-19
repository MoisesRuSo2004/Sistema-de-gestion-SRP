package com.example.demo.service;

import com.example.demo.entity.ReporteDTO;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

public class ReporteExcelGenerator {

    public static ByteArrayInputStream generarExcel(List<ReporteDTO> data) {
        try (Workbook workbook = new XSSFWorkbook()) {
            Sheet sheet = workbook.createSheet("Reporte de Insumos");

            // Estilos
            CellStyle headerStyle = workbook.createCellStyle();
            headerStyle.setFillForegroundColor(IndexedColors.LIGHT_BLUE.getIndex());
            headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            headerStyle.setAlignment(HorizontalAlignment.CENTER);
            headerStyle.setBorderBottom(BorderStyle.THIN);
            headerStyle.setBorderTop(BorderStyle.THIN);
            headerStyle.setBorderLeft(BorderStyle.THIN);
            headerStyle.setBorderRight(BorderStyle.THIN);

            Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerFont.setColor(IndexedColors.WHITE.getIndex());
            headerStyle.setFont(headerFont);

            CellStyle titleStyle = workbook.createCellStyle();
            titleStyle.setAlignment(HorizontalAlignment.CENTER);
            Font titleFont = workbook.createFont();
            titleFont.setBold(true);
            titleFont.setFontHeightInPoints((short) 14);
            titleStyle.setFont(titleFont);

            CellStyle numberStyle = workbook.createCellStyle();
            numberStyle.setDataFormat(workbook.createDataFormat().getFormat("#,##0"));

            // Título del reporte
            Row titleRow = sheet.createRow(0);
            Cell titleCell = titleRow.createCell(0);
            titleCell.setCellValue("REPORTE DE INSUMOS");
            titleCell.setCellStyle(titleStyle);
            sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(0, 0, 0, 3));

            // Fecha de generación
            Row dateRow = sheet.createRow(1);
            Cell dateCell = dateRow.createCell(0);
            dateCell.setCellValue(
                    "Fecha de generación: " + LocalDate.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(1, 1, 0, 3));

            // Fila en blanco
            sheet.createRow(2);

            // Encabezados
            Row headerRow = sheet.createRow(3);
            String[] columns = { "#", "Nombre Insumo", "Entradas", "Salidas", "Stock Actual" };

            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
                cell.setCellStyle(headerStyle);
            }

            // Datos
            int rowNum = 4;
            int index = 1;

            // Calcular totales para el resumen
            int totalConStock = 0;
            int totalEntradas = 0;
            int totalSalidas = 0;
            int totalCero = 0;

            for (ReporteDTO item : data) {
                Row row = sheet.createRow(rowNum++);

                row.createCell(0).setCellValue(index++);
                row.createCell(1).setCellValue(item.getNombreInsumo() != null ? item.getNombreInsumo() : "");

                Cell entradasCell = row.createCell(2);
                entradasCell.setCellValue(item.getEntradas());
                entradasCell.setCellStyle(numberStyle);

                Cell salidasCell = row.createCell(3);
                salidasCell.setCellValue(item.getSalidas());
                salidasCell.setCellStyle(numberStyle);

                Cell stockCell = row.createCell(4);
                stockCell.setCellValue(item.getStockActual());
                stockCell.setCellStyle(numberStyle);

                // Actualizar totales
                if (item.getStockActual() > 0)
                    totalConStock++;
                if (item.getStockActual() == 0)
                    totalCero++;
                totalEntradas += item.getEntradas();
                totalSalidas += item.getSalidas();
            }

            // Agregar fila en blanco
            rowNum += 2;

            // Resumen de métricas
            CellStyle resumeStyle = workbook.createCellStyle();
            resumeStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
            resumeStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
            resumeStyle.setBorderBottom(BorderStyle.THIN);
            resumeStyle.setBorderTop(BorderStyle.THIN);
            resumeStyle.setBorderLeft(BorderStyle.THIN);
            resumeStyle.setBorderRight(BorderStyle.THIN);

            Font resumeFont = workbook.createFont();
            resumeFont.setBold(true);
            resumeStyle.setFont(resumeFont);

            Row resumenTitleRow = sheet.createRow(rowNum++);
            Cell resumenTitleCell = resumenTitleRow.createCell(0);
            resumenTitleCell.setCellValue("RESUMEN");
            resumenTitleCell.setCellStyle(resumeStyle);
            sheet.addMergedRegion(new org.apache.poi.ss.util.CellRangeAddress(rowNum - 1, rowNum - 1, 0, 4));

            Row insumoRow = sheet.createRow(rowNum++);
            insumoRow.createCell(0).setCellValue("Total Insumos con stock:");
            insumoRow.createCell(1).setCellValue(totalConStock);

            Row entradasRow = sheet.createRow(rowNum++);
            entradasRow.createCell(0).setCellValue("Total Entradas:");
            entradasRow.createCell(1).setCellValue(totalEntradas);

            Row salidasRow = sheet.createRow(rowNum++);
            salidasRow.createCell(0).setCellValue("Total Salidas:");
            salidasRow.createCell(1).setCellValue(totalSalidas);

            Row ceroRow = sheet.createRow(rowNum++);
            ceroRow.createCell(0).setCellValue("Insumos con cantidad cero:");
            ceroRow.createCell(1).setCellValue(totalCero);

            // Auto dimensionar columnas
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            // Convertir el workbook a un InputStream
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            workbook.write(outputStream);
            return new ByteArrayInputStream(outputStream.toByteArray());

        } catch (IOException ex) {
            ex.printStackTrace();
            return null;
        }
    }
}