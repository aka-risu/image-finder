const position = {
    currentPosition: 0,
    scrollToBottom() {
        window.scrollTo({
        top: this.currentPosition + 800,
        behavior: "smooth"
    })
    },
   
    scrollToCurrent() {
        window.scrollTo({
        top: this.currentPosition,
    })
    },
    setCurrentPosition() {
        this.currentPosition = window.pageYOffset;
    },

}
export default position
// function scrollTo() {
//         window.scrollTo({
//         //  top: this.position,
//         top: (this.page-1) * 500,
//         behavior: "smooth"
//     })
// }
    
// let scrollTop = window.pageYOffset ;