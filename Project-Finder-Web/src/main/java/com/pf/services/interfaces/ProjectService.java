package com.pf.services.interfaces;

import com.pf.entities.models.Project;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.*;


public interface ProjectService {
    List<Project> GetMyProjects(long userId);

    Page<Project> GetAllAvailableProjects(boolean isAvailable, Pageable paging);

    void Save(Project project);

    void Update(Project project, long id) throws Exception;

    void Delete(long id);
}
