const auth = {
    isAuth: true,
    login() {
        this.isAuth = true;
    },
    logout() {
        this.isAuth = false;
    }
}
export default auth;