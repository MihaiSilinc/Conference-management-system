package ro.ubb.cms.server.facade.impl

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.multipart.MultipartFile
import ro.ubb.cms.server.entity.Proposal
import ro.ubb.cms.server.facade.ProposalFacade
import ro.ubb.cms.server.service.ConferenceService
import ro.ubb.cms.server.service.PaperService
import ro.ubb.cms.server.service.ProposalService
import ro.ubb.cms.server.service.UserService
import java.util.*

@Component
class ProposalFacadeImpl(
    @Autowired
    var paperService: PaperService,

    @Autowired
    var proposalService: ProposalService,

    @Autowired
    var conferenceService: ConferenceService,

    @Autowired
    var userService: UserService
) : ProposalFacade {
    override fun createProposal(
        proposalName: String,
        abstractParagraph: String,
        multipartFile: MultipartFile,
        conferenceId: UUID,
        authorId: UUID
    ): Proposal? {
        return try {
            val author = userService.getAuthorById(authorId)
                ?: return null
            val paper = paperService.uploadPaper(multipartFile)
            val conference = conferenceService.getById(conferenceId)
                ?: return null
            proposalService.createProposal(proposalName, abstractParagraph, paper, conference, author)
        } catch (exception: Exception) {
            null
        }
    }
}
