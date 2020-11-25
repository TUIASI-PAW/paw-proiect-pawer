package com.pf.services.interfaces;

import com.pf.entities.models.Request;

import java.util.List;

public interface RequestService {
    List<Request> GetRequestByProjectId(long idProject);

    void Save(Request request);

    void Delete(long id);
}
