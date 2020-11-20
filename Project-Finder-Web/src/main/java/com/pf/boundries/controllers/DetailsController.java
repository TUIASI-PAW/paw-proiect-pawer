package com.pf.boundries.controllers;

import com.pf.boundries.dto.read.ReadDetails;
import com.pf.boundries.dto.write.WriteDetails;
import com.pf.entities.models.Details;
import com.pf.services.interfaces.DetailsService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/details")
public class DetailsController {
    private final DetailsService detailsService;
    private final ModelMapper modelMapper;

    public DetailsController(DetailsService detailsService, ModelMapper modelMapper) {
        this.detailsService = detailsService;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    ResponseEntity<?> CreateDetails(@RequestBody WriteDetails writeDetails) {
        detailsService.Save(modelMapper.map(writeDetails, Details.class));

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{idProject}")
    ResponseEntity<?> GetDetailsByProjectId(@PathVariable Long idProject) {
        try {
            ReadDetails readDetails = modelMapper.map(detailsService.GetDetailsByProjectId(idProject), ReadDetails.class);

            return new ResponseEntity<>(readDetails, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/{id}")
    ResponseEntity<?> GetDetailsByProjectId(@PathVariable Long id, @RequestBody WriteDetails writeDetails) {
        try {
            detailsService.Update(modelMapper.map(writeDetails, Details.class), id);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NO_CONTENT);
        }
    }
}
