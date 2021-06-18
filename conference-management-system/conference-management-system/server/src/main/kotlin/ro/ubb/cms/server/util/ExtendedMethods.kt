package ro.ubb.cms.server.util

inline fun Boolean.then(block: () -> Unit) {
    if (this)
        block.invoke()
}
