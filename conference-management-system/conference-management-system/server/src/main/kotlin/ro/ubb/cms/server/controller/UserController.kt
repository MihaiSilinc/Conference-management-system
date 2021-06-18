package ro.ubb.cms.server.controller

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.RestController
import ro.ubb.cms.api.dto.ConferenceDto
import ro.ubb.cms.api.dto.UserDto
import ro.ubb.cms.api.resource.UserResource
import ro.ubb.cms.server.service.UserService
import java.util.*

@RestController
@CrossOrigin(originPatterns = ["*"], allowCredentials = "true")
class UserController(
    @Autowired
    var userService: UserService
) : UserResource {
    override fun getPCMembersNotAlreadyAssigned(conferenceDto: ConferenceDto): List<UserDto> {
        return userService.getPCMembersNotAlreadyAssigned(conferenceDto)
    }

    override fun getReviewersForConference(conferenceId: UUID): List<UserDto> {
        return userService.getReviewersByConferenceId(conferenceId)
    }
}
