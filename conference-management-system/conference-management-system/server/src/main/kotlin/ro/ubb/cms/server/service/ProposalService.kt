package ro.ubb.cms.server.service

import ro.ubb.cms.api.dto.ProposalDto
import ro.ubb.cms.server.entity.*
import java.util.*

interface ProposalService {
    fun createProposal(name: String, abstractParagraph: String, paper: Paper,
                       conference: Conference, author: Author): Proposal?

    fun getProposalsByConference(conferenceId: UUID): List<ProposalDto>
}
