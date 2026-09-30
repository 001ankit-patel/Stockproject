package com.stockproject.service;

import com.stockproject.entity.Location;
import com.stockproject.exception.ResourceNotFoundException;
import com.stockproject.repository.LocationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    public LocationService(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    public Location getLocationById(Long id) {
        return locationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Location", id));
    }

    public List<Location> getLocationsByStatus(String status) {
        return locationRepository.findByStatus(status);
    }

    public Location createLocation(Location location) {
        return locationRepository.save(location);
    }

    public Location updateLocation(Long id, Location locationDetails) {
        Location location = getLocationById(id);

        location.setName(locationDetails.getName());
        location.setType(locationDetails.getType());
        location.setAddress(locationDetails.getAddress());
        location.setManager(locationDetails.getManager());
        location.setStock(locationDetails.getStock());
        location.setStatus(locationDetails.getStatus());

        return locationRepository.save(location);
    }

    public void deleteLocation(Long id) {
        Location location = getLocationById(id);
        locationRepository.delete(location);
    }

    public long getLocationCount() {
        return locationRepository.count();
    }
}
