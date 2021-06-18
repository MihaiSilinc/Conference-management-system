package ro.ubb.cms.server.service

import ro.ubb.cms.api.dto.AssignmentDto
import ro.ubb.cms.api.dto.ConferenceDto

interface AssignmentService {
    fun saveAssignment(assignmentDto: AssignmentDto): AssignmentDto?
}
