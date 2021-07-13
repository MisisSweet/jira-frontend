
const EMAIL_KEY='EMAIL';
const PASSWORD_KEY='PASSWORD';

const setEmail=(email: string)=>{
    localStorage.setItem(EMAIL_KEY, email)
}
const setPassword=(password:string)=>{
    localStorage.setItem(PASSWORD_KEY, password)
}
const getEmail=()=>{
    return localStorage.getItem(EMAIL_KEY)
}
const getPassword=()=>{
    return localStorage.getItem(PASSWORD_KEY)
}

const loacalStorageService={
    setEmail,
    getEmail,
    setPassword,
    getPassword
}

export default loacalStorageService;