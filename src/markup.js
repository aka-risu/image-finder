import markup from "./markup.hbs"
export default function renderMarkup() {
    document.body.insertAdjacentHTML("afterbegin", markup());
}
