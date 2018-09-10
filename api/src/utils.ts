export function joinPath(...paths: string[]): string {
    return paths.reduce((path, chunck) => {
        if (path.length > 0) {
            return (path.endsWith("/") ? path : path + "/") + (chunck.startsWith("/") ? chunck.slice(1, chunck.length) : chunck)
        } else return chunck
    },"")
}

export function urlify(str: string) {
    return str.replace(" ", "%20")
}