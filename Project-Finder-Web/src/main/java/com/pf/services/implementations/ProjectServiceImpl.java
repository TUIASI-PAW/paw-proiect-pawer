package com.pf.services.implementations;

import com.pf.entities.models.Project;
import com.pf.entities.models.User;
import com.pf.entities.repositories.ProjectRepository;
import com.pf.services.interfaces.ProjectService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public List<Project> GetMyProjects(long userId) {
        return projectRepository
                .findAll()
                .stream()
                .parallel()
                .filter(m -> m.getTeam().stream().parallel().filter(u -> u.getId() == userId).count() > 0)
                .collect(Collectors.toList());
    }

    @Override
    public List<Project> GetAllAvailableProjects(long userId) {
        return projectRepository
                .findAll()
                .stream()
                .parallel()
                .filter(m -> m.isAvailable() && !(m.getTeam().stream().parallel().filter(u -> u.getId() == userId).count() > 0))
                .collect(Collectors.toList());
    }

    @Override
    public void Save(Project project) {
        projectRepository.save(project);
    }

    @Override
    public void Update(Project project, long id) throws Exception {
        Optional<Project> databaseProject = projectRepository.findById(id);

        if (databaseProject.isPresent()) {
            projectRepository.save(project);
        } else {
            throw new Exception("Project to UPDATE Not Found");
        }
    }

    @Override
    public void Delete(long id) {
        projectRepository.deleteById(id);
    }
}
