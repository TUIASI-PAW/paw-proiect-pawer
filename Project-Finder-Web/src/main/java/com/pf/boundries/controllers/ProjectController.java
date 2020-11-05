package com.pf.boundries.controllers;

import com.pf.boundries.dto.read.ReadProject;
import com.pf.boundries.dto.write.WriteProject;
import com.pf.entities.models.Project;
import com.pf.services.interfaces.ProjectService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600, allowedHeaders = "*")
@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService projectService;
    private final ModelMapper modelMapper;

    public ProjectController(ProjectService projectService, ModelMapper modelMapper) {
        this.projectService = projectService;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    ResponseEntity<?> CreateProject(@RequestBody WriteProject writeProject) {
        projectService.Save(modelMapper.map(writeProject, Project.class));

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/myprojects/{userId}")
    ResponseEntity<?> GetMyProjects(@PathVariable Long userId) {
        List<Project> projects = projectService.GetMyProjects(userId);

        return new ResponseEntity<>((List<ReadProject>) modelMapper.map(projects, new TypeToken<List<ReadProject>>() {
        }.getType()), HttpStatus.OK);
    }

    @GetMapping()
    ResponseEntity<?> GetAvailableProjects(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size) {
        Pageable paging = PageRequest.of(page, size);

        Page<Project> projectsPage = projectService.GetAllAvailableProjects(true, paging);
        Page<ReadProject> readProjects = projectsPage.map(m -> modelMapper.map(m, ReadProject.class));

        return new ResponseEntity<>(readProjects, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    ResponseEntity<?> UpdateProject(@PathVariable Long id, @RequestBody WriteProject writeProject) {
        try {
            projectService.Update(modelMapper.map(writeProject, Project.class), id);

            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NO_CONTENT);
        }
    }

    @DeleteMapping("/{id}")
    ResponseEntity<?> DeleteById(@PathVariable Long id) {
        try {
            projectService.Delete(id);

            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
