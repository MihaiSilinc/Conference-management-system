package ro.ubb.cms.api.resource

import io.swagger.annotations.Api
import org.springframework.http.ResponseEntity
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import ro.ubb.cms.api.dto.AssignmentDto
import ro.ubb.cms.api.dto.ConferenceDto

@Api(value = "Assignment")
@RequestMapping(value = ["/api/assignment"])
interface AssignmentResource {

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = ["/create"])
    fun createAssignment(@RequestBody assignmentDto: AssignmentDto): ResponseEntity<AssignmentDto>
}
