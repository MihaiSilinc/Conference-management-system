package ro.ubb.cms.server.service

import ro.ubb.cms.api.dto.ConferenceDto
import ro.ubb.cms.api.dto.UserDto
import ro.ubb.cms.server.entity.Author
import ro.ubb.cms.server.entity.User
import java.util.*

interface UserService {
    fun getPCMembersNotAlreadyAssigned(conferenceDto: ConferenceDto): List<UserDto>
    fun getAuthorById(id: UUID): Author?
    fun getReviewersByConferenceId(conferenceId: UUID): List<UserDto>
}
