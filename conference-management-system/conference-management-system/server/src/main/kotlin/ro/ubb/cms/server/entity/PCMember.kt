package ro.ubb.cms.server.entity

import javax.persistence.Entity

@Entity
class PCMember(
        var affiliation: String,
        var webPage: String,
        emailAddress: String,
        username: String,
        password: String,
        firstName: String,
        lastName: String
): Author(username, password, firstName, lastName, emailAddress)
