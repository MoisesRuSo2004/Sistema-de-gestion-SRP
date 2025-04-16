package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.model.Admin;
import com.example.demo.repos.AdminRepository;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Admin createAdmin(String usuario, String contrasena) {
        Admin admin = new Admin();
        admin.setUsuario(usuario);
        admin.setContrasena(passwordEncoder.encode(contrasena));
        return adminRepository.save(admin);
    }

    public Optional<Admin> findByUsuario(String usuario) {
        return adminRepository.findByUsuario(usuario);
    }

    public boolean existsByUsuario(String usuario) {
        return adminRepository.findByUsuario(usuario).isPresent();
    }

    public void inicializarAdminPorDefecto() {
        if (!existsByUsuario("admin")) {
            createAdmin("admin", "admin123");
            System.out.println("Administrador por defecto creado: admin/admin123");
        }
    }
}
