export function customDbError(err: string) {
    let e =  {
        custom: true,
        error: err
    }

    return JSON.stringify(e)
}