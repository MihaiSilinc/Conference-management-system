package ro.ubb.cms.server.facade

import org.springframework.web.multipart.MultipartFile
import ro.ubb.cms.server.entity.Proposal
import java.util.*

interface ProposalFacade {
    fun createProposal(proposalName: String, abstractParagraph: String,
                       multipartFile: MultipartFile, conferenceId: UUID, authorId: UUID): Proposal?
}
