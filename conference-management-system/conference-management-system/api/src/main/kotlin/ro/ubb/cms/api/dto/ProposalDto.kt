package ro.ubb.cms.api.dto

class ProposalDto(
    var id: String,
    var name: String,
    var abstractParagraph: String,
    var paperName: String,
    var authorName: String,
    var conferenceId: String,
    var reviewers: List<UserDto>? = null
)
