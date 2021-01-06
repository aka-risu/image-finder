const position = {
    currentPosition: 0,
    scrollToBottom() {
        window.scrollTo({
        top: (this.page-1) * 500,
        behavior: "smooth"
    })
    },
   
    scrollToCurrent() {
        window.scrollTo({
        top: this.currentPosition,
    })
    },
    
    set currentPosition(value) {
    this.currentPosition = value
    },
    
    get currentPosition() {
    return this.currentPosition
    },
}

function scrollTo() {
        window.scrollTo({
        //  top: this.position,
        top: (this.page-1) * 500,
        behavior: "smooth"
    })
}
    
let scrollTop = window.pageYOffset ;