package ro.ubb.cms.api.enum

enum class UserType {
    AUTHOR,
    LISTENER,
    PCMEMBER;

    companion object {
        fun of(type: String): UserType? {
            return when(type) {
                "PCMEMBER" -> PCMEMBER
                "LISTENER" -> LISTENER
                "AUTHOR" -> AUTHOR
                else -> null
            }
        }
    }
}
