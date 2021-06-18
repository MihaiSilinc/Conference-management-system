package ro.ubb.cms.server.service.impl

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.dao.DataIntegrityViolationException
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import ro.ubb.cms.api.dto.ConferenceDto
import ro.ubb.cms.api.dto.ConferenceWithChairDto
import ro.ubb.cms.api.dto.UserDto
import ro.ubb.cms.api.enum.Designation
import ro.ubb.cms.server.entity.Assignment
import ro.ubb.cms.server.entity.Conference
import ro.ubb.cms.server.entity.key.AssignmentKey
import ro.ubb.cms.server.repository.AssignmentRepository
import ro.ubb.cms.server.repository.ConferenceRepository
import ro.ubb.cms.server.service.AssignmentService
import ro.ubb.cms.server.service.ConferenceService
import ro.ubb.cms.server.service.mapper.ConferenceMapper
import ro.ubb.cms.server.service.mapper.UserMapper
import java.util.*
import java.util.stream.Collectors

@Service
class ConferenceServiceImpl(
    @Autowired
    var conferenceRepository: ConferenceRepository,
    @Autowired
    var assignmentRepository: AssignmentRepository,
    @Autowired
    var conferenceMapper: ConferenceMapper
): ConferenceService {

    override fun saveConference(conferenceDto: ConferenceDto, userId: UUID): ConferenceDto? {
        var conference = conferenceMapper.toEntity(conferenceDto)
        return try {
            var result = conferenceRepository.save(conference)
            val assignment = Assignment(
                AssignmentKey(userId, result.id),
                Designation.CHAIR
            )
            assignmentRepository.save(assignment)
            conferenceMapper.toDto(result)
        } catch (exception: DataIntegrityViolationException) {
            null
        }
    }

    override fun getConferences(): List<ConferenceWithChairDto> {
        var result = assignmentRepository.findAll()
            .filter { it.conference != null}
            .filter { it.designation == Designation.CHAIR}
            .map {
                ConferenceWithChairDto(
                conferenceMapper.toDto(it.conference!!),
                it.pcMember!!.id.toString()
            ) }
        return result
    }

    override fun getById(id: UUID): Conference? {
        return conferenceRepository.findByIdOrNull(id)
    }
}
