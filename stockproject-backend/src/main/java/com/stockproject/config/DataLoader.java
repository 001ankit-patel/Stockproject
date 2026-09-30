package com.stockproject.config;

import com.stockproject.entity.User;
import com.stockproject.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataLoader {

    @Bean
    public CommandLineRunner loadData(UserRepository userRepository) {
        return args -> {
            if (userRepository.findByUsername("admin").isEmpty()) {
                userRepository.save(new User("admin", "admin123", "Administrator"));
            }
        };
    }
}
