export const isRunning = () => {
    return true;
}

console.log('Worker started!');

if(isRunning()) {
    console.log('Worker is running!');
}