package ro.ubb.cms.server.service.impl

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.stereotype.Service
import ro.ubb.cms.api.dto.AssignmentDto
import ro.ubb.cms.server.repository.AssignmentRepository
import ro.ubb.cms.server.service.AssignmentService
import ro.ubb.cms.server.service.mapper.AssignmentMapper

@Service
class AssignmentServiceImpl(
    @Autowired
    var assignmentRepository: AssignmentRepository,
    @Autowired
    var assignmentMapper: AssignmentMapper
): AssignmentService {
    override fun saveAssignment(assignmentDto: AssignmentDto): AssignmentDto? {
        var assignment = assignmentMapper.toEntity(assignmentDto)
        return try {
            assignmentMapper.toDto(assignmentRepository.save(assignment))
        } catch (exception: DataIntegrityViolationException) {
            null
        }
    }
}
