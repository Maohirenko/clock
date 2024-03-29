function generateRandomTime (h) {
    let hours = Math.floor(Math.random() * h);
    let minutes = Math.floor(Math,random() * 60);
    return {hours: hours, minutes: minutes}
}