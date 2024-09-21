export const registerUser = (email: string, password: string) => {
    return new Promise((resolve, reject) => {
        fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
            .then(res => {
                res
                    .json()
                    .then(json => resolve(json))
                    .catch(e => reject(e))
            })
            .catch(e => reject(e))
    })
}

export const verifyEmail = (email: string, code: string) => {
    return new Promise((resolve, reject) => {
        fetch('/api/verification', {
            method: 'POST',
            body: JSON.stringify({ email, code }),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
            .then(res => {
                res
                    .json()
                    .then(json => resolve(json))
                    .catch(e => reject(e))
            })
            .catch(e => reject(e))
    })
}