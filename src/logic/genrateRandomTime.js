export default function generateRandomTime () {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return {hours: hours, minutes: minutes}
}