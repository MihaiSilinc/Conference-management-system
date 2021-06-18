package ro.ubb.cms.server.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController
import ro.ubb.cms.api.dto.AssignmentDto
import ro.ubb.cms.api.dto.ConferenceDto
import ro.ubb.cms.api.resource.AssignmentResource
import ro.ubb.cms.server.service.AssignmentService

@RestController
@CrossOrigin(originPatterns = ["*"], allowCredentials = "true")
class AssignmentController(
    @Autowired
    var assignmentService: AssignmentService
): AssignmentResource {
    override fun createAssignment(assignmentDto: AssignmentDto): ResponseEntity<AssignmentDto> {
        val savedAssignment: AssignmentDto = assignmentService.saveAssignment(assignmentDto)
            ?: return ResponseEntity(HttpStatus.BAD_REQUEST)

        return ResponseEntity(savedAssignment, HttpStatus.CREATED)
    }
}
