export default class loadMoreBtn {
    constructor() {
        this.btnRef = document.querySelector(".loadMore");
        this.hidden = false
}
    enable(){
    this.btnRef.disabled = false;
    
    }

    disable() {
        this.btnRef.disabled = true;
    }

    show() {
        this.btnRef.classList.remove("loadMore--notShown");
    }
    hide() {
        this.btnRef.classList.add("loadMore--notShown");
    }

}