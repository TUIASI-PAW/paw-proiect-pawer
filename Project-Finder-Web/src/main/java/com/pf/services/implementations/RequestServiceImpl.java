package com.pf.services.implementations;

import com.pf.entities.models.Request;
import com.pf.entities.repositories.RequestRepository;
import com.pf.services.interfaces.RequestService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RequestServiceImpl implements RequestService {
    private final RequestRepository requestRepository;

    public RequestServiceImpl(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }

    @Override
    public List<Request> GetRequestByProjectId(long idProject) {
        return requestRepository.getRequestByProjectId(idProject);
    }

    @Override
    public void Save(Request request) {
        requestRepository.save(request);
    }

    @Override
    public void Delete(long id) {
        requestRepository.deleteById(id);
    }
}
