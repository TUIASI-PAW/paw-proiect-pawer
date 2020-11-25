package com.pf.boundries.controllers;


import com.pf.boundries.dto.read.ReadRequest;
import com.pf.boundries.dto.write.WriteRequest;
import com.pf.entities.models.Request;
import com.pf.services.interfaces.RequestService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/requests")
public class RequestController {
    private final RequestService requestService;
    private final ModelMapper modelMapper;

    public RequestController(RequestService requestService, ModelMapper modelMapper) {
        this.requestService = requestService;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    ResponseEntity<?> CreateRequest(@RequestBody WriteRequest writeRequest) {
        requestService.Save(modelMapper.map(writeRequest, Request.class));

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{idProject}")
    ResponseEntity<?> GetRequestByProjectId(@PathVariable Long idProject) {
        try {
            List<ReadRequest> readRequests = requestService.GetRequestByProjectId(idProject).stream().map(
                    x -> modelMapper.map(x, ReadRequest.class)
            ).collect(Collectors.toList());

            return new ResponseEntity<>(readRequests, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> DeleteById(@PathVariable Long id) {
        try {
            requestService.Delete(id);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

}
