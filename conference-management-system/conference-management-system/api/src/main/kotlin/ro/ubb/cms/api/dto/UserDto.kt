package ro.ubb.cms.api.dto

import ro.ubb.cms.api.enum.UserType

class UserDto (
    var id: String? = null,
    var username: String? = null,
    var password: String? = null,
    var firstName: String? = null,
    var lastName: String? = null,
    var affiliation: String? = null,
    var emailAddress: String? = null,
    var webPage: String? = null,
    var userType: UserType? = null,
    var roles: List<String> = emptyList()
){ }
