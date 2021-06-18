package ro.ubb.cms.server.service.impl

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import ro.ubb.cms.api.dto.ConferenceDto
import ro.ubb.cms.api.dto.UserDto
import ro.ubb.cms.api.enum.Designation
import ro.ubb.cms.server.entity.Author
import ro.ubb.cms.server.entity.PCMember
import ro.ubb.cms.server.repository.AssignmentRepository
import ro.ubb.cms.server.repository.UserRepository
import ro.ubb.cms.server.service.UserService
import ro.ubb.cms.server.service.mapper.UserMapper
import java.util.*

@Service
class UserServiceImpl(
    @Autowired
    var userRepository: UserRepository,
    @Autowired
    var assignmentRepository: AssignmentRepository,
    @Autowired
    var userMapper: UserMapper
): UserService {
    override fun getPCMembersNotAlreadyAssigned(conferenceDto: ConferenceDto): List<UserDto> {
        var assignedPCMembers = assignmentRepository.findAll()
            .filter { it.conference!!.id.toString() == conferenceDto.id }
            .map { it.pcMember }
        return userRepository.findAll()
            .filter{ it is PCMember}
            .filter{ it !in assignedPCMembers }
            .map { userMapper.toDto(it) }
    }

    override fun getAuthorById(id: UUID): Author? {
        return userRepository.findByIdOrNull(id).takeIf { it is Author } as Author?
    }

    override fun getReviewersByConferenceId(conferenceId: UUID): List<UserDto> {
        return assignmentRepository.findAllByDesignation(Designation.REVIEWER)
            .filter { it.conference!!.id == conferenceId }
            .map { userMapper.toDto(it.pcMember!!) }
    }
}
