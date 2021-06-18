package ro.ubb.cms.api.dto

import ro.ubb.cms.api.enum.Designation
import java.util.*


class AssignmentDto(
    val pcMemberId: UUID,
    val conferenceId: UUID,
    var designation: Designation
) { }
