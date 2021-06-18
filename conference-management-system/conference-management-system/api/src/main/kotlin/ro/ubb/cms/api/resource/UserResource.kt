package ro.ubb.cms.api.resource

import io.swagger.annotations.Api
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import ro.ubb.cms.api.dto.ConferenceDto
import ro.ubb.cms.api.dto.UserDto
import java.util.*

@Api(value = "User resource")
@RequestMapping(value = ["/api/users"])
interface UserResource {

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping(value = ["/pcmembers"])
    fun getPCMembersNotAlreadyAssigned(@RequestBody conferenceDto: ConferenceDto): List<UserDto>

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping(value = ["/reviewers/{conferenceId}"])
    fun getReviewersForConference(@PathVariable conferenceId: UUID): List<UserDto>


}
