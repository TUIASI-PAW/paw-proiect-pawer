package com.pf.services.interfaces;

import com.pf.entities.models.Project;

import java.util.*;


public interface ProjectService {
    List<Project> GetMyProjects(long userId);

    List<Project> GetAllAvailableProjects(long userId);

    void Save(Project project);

    void Update(Project project, long id) throws Exception;

    void Delete(long id);
}
