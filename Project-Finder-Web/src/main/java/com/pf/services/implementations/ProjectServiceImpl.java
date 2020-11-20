package com.pf.services.implementations;

import com.pf.entities.models.Project;
import com.pf.entities.repositories.ProjectRepository;
import com.pf.services.interfaces.ProjectService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Page<Project> GetMyProjects(long userId, Pageable paging) {
        return projectRepository.findByOwnerIdOrderById(userId, paging);
    }

    @Override
    public Page<Project> GetAllAvailableProjects(boolean isAvailable, Pageable paging) {
        return projectRepository.findByIsAvailableOrderById(isAvailable, paging);
    }

    @Override
    public Project GetById(Long id) throws Exception {
        Optional<Project> project = this.projectRepository.findById(id);

        if (project.isPresent()) {
            return project.get();
        } else {
            throw new Exception("Project Not Found");
        }
    }

    @Override
    public Project Save(Project project) {
        return projectRepository.save(project);
    }

    @Override
    public void Update(Project project, long id) throws Exception {
        Project databaseProject = projectRepository.findById(id).orElse(null);

        if (databaseProject != null) {
            if (project.getName() != null) {
                databaseProject.setName(project.getName());
            }
            if (project.getTechnologies() != null) {
                databaseProject.setTechnologies(project.getTechnologies());
            }
            if (project.getIsAvailable() != null) {
                databaseProject.setIsAvailable(project.getIsAvailable());
            }
            projectRepository.save(databaseProject);
        } else {
            throw new Exception("Project to UPDATE Not Found");
        }
    }

    @Override
    public void Delete(long id) {
        projectRepository.deleteById(id);
    }
}
