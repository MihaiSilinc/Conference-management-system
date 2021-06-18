package ro.ubb.cms.server.entity

import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "T_PAPER")
open class Paper(
        @Id
        open var name: String,

        open var content: ByteArray,
        open var size: Long
)
