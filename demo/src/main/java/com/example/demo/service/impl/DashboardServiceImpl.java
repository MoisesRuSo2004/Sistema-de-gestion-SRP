package com.example.demo.service.impl;

import java.util.Locale;
import java.time.format.TextStyle;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.entity.DashboardDTO;
import com.example.demo.model.mongo.DetalleEntrada;
import com.example.demo.model.mongo.DetalleSalida;
import com.example.demo.model.mongo.Entrada;
import com.example.demo.model.mongo.Salida;
import com.example.demo.repos.mongo.EntradaRepository;
import com.example.demo.repos.mongo.InsumoRepository;
import com.example.demo.repos.mongo.SalidaRepository;
import com.example.demo.service.DashboardService;

@Service
public class DashboardServiceImpl implements DashboardService {

        private final InsumoRepository insumoRepository;
        private final EntradaRepository entradaRepository;
        private final SalidaRepository salidaRepository;

        public DashboardServiceImpl(InsumoRepository insumoRepository,
                        EntradaRepository entradaRepository,
                        SalidaRepository salidaRepository) {
                this.insumoRepository = insumoRepository;
                this.entradaRepository = entradaRepository;
                this.salidaRepository = salidaRepository;
        }

        @Override
        public DashboardDTO generarResumen() {
                int totalInsumos = (int) insumoRepository.count(); // o cast si devuelve long
                int totalEntradas = calcularTotalEntradas();
                int totalSalidas = calcularTotalSalidas();
                int insumosBajoStock = insumoRepository.findByStockLessThan(1).size();
                Map<String, Integer> entradasPorMes = calcularEntradasPorMes();
                Map<String, Integer> salidasPorMes = calcularSalidasPorMes();

                return new DashboardDTO(
                                totalInsumos,
                                totalEntradas,
                                totalSalidas,
                                insumosBajoStock,
                                entradasPorMes,
                                salidasPorMes);
        }

        // metodo para obtener el total de entradas sin sumar las cantidades
        private int calcularTotalEntradas() {
                return (int) entradaRepository.count();
        }

        private int calcularTotalSalidas() {
                return (int) salidaRepository.count();
        }

        private Map<String, Integer> calcularEntradasPorMes() {
                List<Entrada> entradas = entradaRepository.findAll();
                return entradas.stream()
                                .collect(Collectors.groupingBy(
                                                e -> e.getFecha().getMonth().getDisplayName(TextStyle.SHORT,
                                                                new Locale("es")),
                                                TreeMap::new,
                                                Collectors.summingInt(e -> e.getDetalles().stream()
                                                                .mapToInt(DetalleEntrada::getCantidad)
                                                                .sum())));
        }

        private Map<String, Integer> calcularSalidasPorMes() {
                List<Salida> salidas = salidaRepository.findAll();
                return salidas.stream()
                                .collect(Collectors.groupingBy(
                                                s -> s.getFecha().getMonth().getDisplayName(TextStyle.SHORT,
                                                                new Locale("es")),
                                                TreeMap::new,
                                                Collectors.summingInt(s -> s.getDetalles().stream()
                                                                .mapToInt(DetalleSalida::getCantidad)
                                                                .sum())));
        }

}
