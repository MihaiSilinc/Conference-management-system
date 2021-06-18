package ro.ubb.cms.server.entity

import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.ManyToOne
import javax.persistence.Table

@Entity
@Table(name = "T_KEYWORD")
open class Keyword(
        @Id
        open var name: String,

        @ManyToOne
        open var proposal: Proposal
)
